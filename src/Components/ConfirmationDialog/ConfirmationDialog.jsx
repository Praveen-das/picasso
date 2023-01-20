import Modal from '@mui/material/Modal';
import Box from '@mui/system/Box';
import './confirmationDialog.css'
import Slide from '@mui/material/Slide';
import ReactDom from 'react-dom';
import { useState } from 'react';

export default function confirmAction(title, message, onConfirmation) {
    const portal = document.getElementById('portal')

    const removeDialog = () => {
        ReactDom.unmountComponentAtNode(portal)
    }

    ReactDom.render(
        <Dialog
            removeDialog={removeDialog}
            title={title}
            message={message}
            onConfirmation={onConfirmation}
        />, portal)
}

function Dialog({ removeDialog, title, message, onConfirmation }) {
    const [open, setOpen] = useState(true)

    const box_style = {
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        left: 0,
        right: 0,
        top: '20px',
        bgcolor: 'background.paper',
        outline: 'none',
    };

    const handleSubmit = () => {
        onConfirmation()
        setOpen(false)
    }

    return (
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            closeAfterTransition
        >
            <Slide in={open} onExited={() => removeDialog()}>
                <Box sx={box_style}>
                    <div className="dialog">
                        <label>{title}</label>
                        <p>{message}</p>
                        <div className='dialog_buttons'>
                            <button onClick={() => setOpen(false)} className='button_text'>CANCEL</button>
                            <button onClick={handleSubmit}
                                className='button_secondary'>CONFIRM</button>
                        </div>
                    </div>
                </Box>
            </Slide>
        </Modal >
    )
}