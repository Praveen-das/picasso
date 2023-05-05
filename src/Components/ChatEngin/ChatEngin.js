import React, { useEffect, useMemo, useState } from "react";
import sockett from '../../lib/ws';
import { useStore } from "../../Context/Store";
import { createRoomId } from "../../Utils/utils";
import { Badge, Box, Collapse, Fab, Grow, IconButton, List, Modal, Popover, Popper, Slide, Snackbar, SpeedDialIcon, Typography } from "@mui/material";
import { ChatBox } from "../Messenger/ChatBox/ChatBox";
import { OnlineBadge } from "../MUIComponents/OnlineBadge";
import Avatar from "../Avatar/Avatar";
import moment from "moment";
import CloseIcon from '@mui/icons-material/Close';
import MinimizeIcon from '@mui/icons-material/Remove';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function ChatEngin({ currentUser }) {
  const setOnlineUsers = useStore(s => s.setOnlineUsers);
  const addUser = useStore(s => s.addOnlineUser);
  const removeUser = useStore(s => s.removeDisconnectedUser);
  const setMessage = useStore(s => s.setMessage);
  const deleteMessage = useStore(s => s.deleteMessage);
  const setUnreadMessages = useStore(s => s.setUnreadMessages);
  const changeStatus = useStore(s => s.changeStatus);
  const setChatWidget = useStore(s => s.setChatWidget);
  const blockRoom = useStore(s => s.blockRoom);
  const unblockRoom = useStore(s => s.unblockRoom);
  const [socket, setSocket] = useState(null);

  const { open, expanded, user: chatUser } = useStore(s => s.chatWidget);

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
    //-----------------get connected users-----------------//
    if (!socket) return
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
      if (chat.self || chat.active || open && expanded) {
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
  }, [open, expanded, socket]);

  return (
    <>
      <Slide direction="up" in={open} mountOnEnter unmountOnExit>
        <List
          sx={{
            position: 'fixed',
            bottom: 20,
            right: 20,
            display: 'grid',
            gap: 1,
            zIndex: 100
          }}
          component="div"
          aria-labelledby="nested-list-subheader"
          disablePadding
        >
          <Collapse sx={{ p: '25px 25px 0 25px', translate: '25px' }} in={expanded} >
            <List
              sx={{
                borderRadius: '10px',
                boxShadow: '-10px -10px 30px #0000002e',
                bgcolor: 'white',
                width: 300,
                height: 400,
                display: 'flex',
                flexDirection: 'column',
              }} component="div" disablePadding
            >
              <ChatBoxHeader user={chatUser} />
              <ChatBox data={chatUser} />
            </List>
          </Collapse>
          <ChatButton onClick={() => setChatWidget(true, !expanded)} roomId={chatUser?.room?.id} expanded={expanded} />
        </List>
      </Slide >
    </>
  );
}

function ChatButton({ onClick, expanded, roomId }) {
  const unreadMessages = useStore(s => s.unreadMessages);
  const uum = useMemo(() => unreadMessages.get(roomId), [unreadMessages, roomId]) || []
  const setMessages = useStore(s => s.setMessages);

  function handleClick() {
    setMessages(roomId, uum)
    onClick()
  }

  return <Fab onClick={handleClick} sx={{ marginLeft: 'auto' }} color='default' size="medium">
    <Badge badgeContent={expanded ? 0 : uum?.length} color={"primary"}>
      <SpeedDialIcon
        icon={<ChatBubbleIcon fontSize='medium' />}
        openIcon={<ExpandMoreIcon />}
        open={expanded} />
    </Badge>
  </Fab>;
}

function ChatBoxHeader() {
  const setChatWidget = useStore(s => s.setChatWidget);
  const { expanded, user } = useStore(s => s.chatWidget);

  const handleClose = () => {
    setChatWidget(false)
  };

  const handleExpand = () => {
    setChatWidget(true, !expanded)
  };

  return (
    <Box
      boxSizing='border-box'
      width='100%'
      height='30px'
      display='flex'
      alignItems='center'
      justifyContent='space-between'
      borderRadius='9px 9px 0 0'
      pl={2}
      pr={1}
      sx={{ background: 'var(--brand)' }}
    >
      <Box width='100%' display='flex' justifyContent='space-between' alignItems='center'>
        <Box sx={{ translate: '0 -10px' }}>
          <OnlineBadge online={user?.active} scale={1.7} >
            <Avatar displayName={user?.username} profilePicture={user?.photo} sx={{ width: 40, height: 40 }} />
          </OnlineBadge>
        </Box>
        {/* <Box>
          <Typography color='white' fontWeight={600} fontSize={14}>{user?.username}</Typography>
        </Box> */}
        <Typography color='#ffffff85' whiteSpace='nowrap' fontSize={12}>{!user?.active ? `Active ${moment(user?.lastActive).fromNow()}` : 'Online'}</Typography>
        <div style={{ color: 'white', display: 'flex' }}>
          <IconButton sx={{ width: 25, height: 25 }} onClick={handleExpand} color="inherit" variant="contained" size="small">
            <MinimizeIcon color="inherit" fontSize="small" />
          </IconButton>
          <IconButton sx={{ width: 25, height: 25 }} onClick={handleClose} color="inherit" variant="contained" size="small">
            <CloseIcon color="inherit" fontSize="small" />
          </IconButton>
        </div>
      </Box>
    </Box>
  )
}
