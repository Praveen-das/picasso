import { Box, Modal } from '@mui/material'
import React from 'react'
import useCurrentUser from '../../../Hooks/useCurrentUser';
import { Address } from '../../Form/Address';
import { SocialMediaLinks } from '../../Form/SocialMediaLinks';
import { PersonalInfo } from '../../Form/PersonalInfo';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '10px',
    py: 5,
    px: 5,
    pb: 6,
    outline: 'none',
    display: 'grid',
    gap: 4
};

function EditsModal({ open, onClose, }) {
    const { currentUser: { data: user } } = useCurrentUser()

    const forms = {
        'personalInfo': <PersonalInfo data={user} {...{ onClose }} />,
        'address.add': <Address {...{ onClose }} />,
        'address.update': <Address data={user?.default_address} {...{ onClose }} />,
        'socialMediaLinks': <SocialMediaLinks data={user} {...{ onClose }} />
    }

    return (
        <>
            <Modal
                open={Boolean(open)}
                onClose={() => onClose(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} >
                    {forms?.[open]}
                </Box>
            </Modal>
        </>
    )
}

export default EditsModal
