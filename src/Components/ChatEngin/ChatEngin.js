import React, { Suspense, lazy, useEffect, useState } from "react";
import sockett from '../../lib/ws';
import { useStore } from "../../Context/Store";
import { createRoomId } from "../../Utils/utils";
import useCurrentUser from '../../Hooks/useCurrentUser'

const ChatWidget = lazy(() => import("./ChatWidget"));

export default function ChatEngin() {
  const setOnlineUsers = useStore(s => s.setOnlineUsers);
  const addUser = useStore(s => s.addOnlineUser);
  const removeUser = useStore(s => s.removeDisconnectedUser);
  const setMessage = useStore(s => s.setMessage);
  const deleteMessage = useStore(s => s.deleteMessage);
  const setUnreadMessages = useStore(s => s.setUnreadMessages);
  const changeStatus = useStore(s => s.changeStatus);
  const blockRoom = useStore(s => s.blockRoom);
  const unblockRoom = useStore(s => s.unblockRoom);
  const { currentUser } = useCurrentUser()

  const [socket, setSocket] = useState(null);

  const { open, expanded } = useStore(s => s.chatWidget);

  useEffect(() => {
    if (!currentUser.data) return

    let user_id = currentUser.data?.id;
    let username = currentUser.data?.displayName || 'unknown user';
    let photo = currentUser.data?.photo || '';

    sockett.auth = { user: { username, photo, user_id } };
    sockett.user_id = user_id;
    sockett.connect()
    setSocket(sockett)

    return () => {
      sockett.disconnect();
    }
  }, [currentUser])

  useEffect(() => {
    if (!socket) return
    //-----------------get connected users-----------------//
    socket.on('users', ({ users, messages, requests, blockedUsers }) => {
      const onlineUsers = users.map((user) => {
        const id = createRoomId(user.user_id, socket.user_id);
        return { ...user, room: { id, status: 'inactive' } };
      });
      setOnlineUsers(onlineUsers);
      setUnreadMessages(messages);
      deleteMessage(requests);
      blockRoom(blockedUsers);
    });

    //-----------------listen for newly connected users-----------------//
    socket.on("user connected", (user) => {
      const id = createRoomId(user.user_id, socket.user_id);
      changeStatus(id, 'received');
      addUser({ ...user, room: { id, status: 'inactive' } });
    });

    //-----------------listen for disconnected users-----------------//
    socket.on("user disconnected", (user) => removeUser(user));

    //-----------------listen for messages-----------------//
    socket.on('receive', chat => {
      let
        otherUser = chat.from,
        roomId = createRoomId(chat.from, chat.to);
      if (chat.from === socket.selectedUser) {
        chat.active = true;
      }
      if (otherUser === socket.user_id) {
        chat.self = true;
      }
      if (chat.self || chat.active || (open && expanded)) {
        setMessage(chat, roomId);
      }
      else setUnreadMessages([[roomId, [chat]]]);
    });

    socket.on('chatSeen', (roomId) => changeStatus(roomId, 'seen'));
    socket.on('roomBlocked', (user_id) => blockRoom([user_id]));
    socket.on('unblock_room', (user_id) => unblockRoom(user_id));
    socket.on('delete', request => deleteMessage(request));

    return () => {
      socket.off('users');
      socket.off('user connected');
      socket.off('user disconnected');
      socket.off('receive');
      socket.off('chatSeen');
      socket.off('roomBlocked');
      socket.off('unblock_room');
      socket.off('delete');
    };

    // eslint-disable-next-line
  }, [open, expanded, socket]);
  
  return (
    <Suspense>
      {
        socket &&
        <ChatWidget />
      }
    </Suspense>
  );
}
