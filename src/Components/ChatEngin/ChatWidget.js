import React from "react";
import { useStore } from "../../Context/Store";
import { Collapse, List, Slide } from "@mui/material";
import { ChatBox } from "../Messenger/ChatBox/ChatBox";
import { ChatButton } from "./Components/ChatButton";
import { ChatBoxHeader } from "./Components/ChatBoxHeader";

export default function ChatWidget() {
  const setChatWidget = useStore(s => s.setChatWidget);
  const { open, expanded, user: chatUser } = useStore(s => s.chatWidget);

  return (<Slide direction="up" in={open} mountOnEnter unmountOnExit>
    <List sx={{
      position: 'fixed',
      bottom: 20,
      right: 20,
      display: 'grid',
      gap: 1,
      zIndex: 100
    }} component="div" aria-labelledby="nested-list-subheader" disablePadding>
      <Collapse sx={{
        p: '25px 25px 0 25px',
        translate: '25px'
      }} in={expanded}>
        <List sx={{
          borderRadius: '10px',
          boxShadow: '-10px -10px 30px #0000002e',
          bgcolor: 'white',
          width: 300,
          height: 400,
          display: 'flex',
          flexDirection: 'column'
        }} component="div" disablePadding>
          <ChatBoxHeader user={chatUser} />
          <ChatBox data={chatUser} />
        </List>
      </Collapse>
      <ChatButton onClick={() => setChatWidget(true, !expanded)} roomId={chatUser?.room?.id} expanded={expanded} />
    </List>
  </Slide>);
}
