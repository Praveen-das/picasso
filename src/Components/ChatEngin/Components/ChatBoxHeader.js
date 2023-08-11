import React from "react";
import { useStore } from "../../../Context/Store";
import { Box, IconButton, Typography } from "@mui/material";
import { OnlineBadge } from "../../MUIComponents/OnlineBadge";
import Avatar from "../../Avatar/Avatar";
import moment from "moment";
import CloseIcon from '@mui/icons-material/Close';
import MinimizeIcon from '@mui/icons-material/Remove';

export function ChatBoxHeader() {
  const setChatWidget = useStore(s => s.setChatWidget);
  const { expanded, user } = useStore(s => s.chatWidget);

  const handleClose = () => {
    setChatWidget(false);
  };

  const handleExpand = () => {
    setChatWidget(true, !expanded);
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
          <OnlineBadge online={user?.active}>
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
  );
}
