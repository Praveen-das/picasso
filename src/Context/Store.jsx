import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import produce from "immer";

const INITIAL_STATE = {
  model: {
    toggle: false,
  },
  alert: {
    message: "",
    toggled: false,
    type: "success",
    time: 3000,
  },
  room: null,
  messages: {},
  form: { error: { global: undefined } },
  edit: { name: false, username: false, email: false },
  onlineUsers: []
  // query: '',
};

const store = (set, get) => ({
  ...INITIAL_STATE,
  query: '',
  setQuery: (value) => set(state => state.query = value),
  setOnlineUsers: (users) => set(({ onlineUsers: users })),
  addOnlineUser: (user) => {
    set(state => {
      if (state.onlineUsers.find(o => o.user_id === user.user_id))
        return {
          onlineUsers: state.onlineUsers.map(o => {
            if (o.user_id === user.user_id) {
              o.sid = user.sid
              o.active = true
            }
            return o
          })
        }
      return { onlineUsers: [...state.onlineUsers, user] }
    })
  },
  setMessage: (chat) => set(pre => {
    const room = get().room
    if (chat.room === room) chat.active = true
    if (pre.messages[chat.room]) {
      return { messages: { [chat.room]: [...pre.messages[chat.room], chat] } }
    }
    return { messages: { [chat.room]: [chat] } }
  }),
  setRoom: (uid, sid) => set({ room: [uid || 0, sid || 1].sort().join('|') }),
  changeActiveStatus: (room, time) => set(pre => {
    const messages = pre.messages[room].map((chat) => {
      if (chat.receivedOn === time) {
        chat.active = true
      }
      return chat
    })
    return { messages: { [room]: messages } }
  }),
  removeDisconnectedUser: (user) => {
    set(state => ({
      onlineUsers: state.onlineUsers.map(o => {
        if (o.user_id === user.user_id) {
          o.active = false
          o.lastActive = user.lastActive
        }
        return o
      })
    }))
  },
  filter: [],
  set: (fn) => set(produce(fn)),
});

export const useStore = create(devtools(store));
