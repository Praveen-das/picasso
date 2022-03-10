import Modal from '@mui/material/Modal';
import Box from '@mui/system/Box';
import React from 'react'
import './confirmationDialog.css'
import Slide from '@mui/material/Slide';
import ReactDom from 'react-dom';

export function confirmAction(title, message, onConfirmation) {
    const portal = document.getElementById('portal')

    const removeDialog = () => {
        ReactDom.unmountComponentAtNode(portal)
    }

    ReactDom.render(
        <ConfirmationDialog
            removeDialog={removeDialog}
            title={title}
            message={message}
            onConfirmation={onConfirmation}
        />, portal)
}

function ConfirmationDialog({ removeDialog, title, message, onConfirmation }) {

    const box_style = {
        position: 'absolute',
        top: '10px',
        left: '50%',
        transform: 'translate(-50%, 0)',
        bgcolor: 'background.paper',
        boxShadow: 5,
        outline: 'none'
    };

    const handleSubmit = () => {
        onConfirmation()
        removeDialog()
    }

    return (
        <>
            <Modal
                open={true}
                onClose={() => removeDialog()}
            >
                <Box sx={box_style}>
                    <Slide in={true}>
                        <div className="dialog">
                            <label>{title}</label>
                            <p>{message}</p>
                            <div className='dialog_buttons'>
                                <button onClick={() => removeDialog()} className='button_text'>CANCEL</button>
                                <button onClick={handleSubmit}
                                    className='button_secondary'>CONFIRM</button>
                            </div>
                        </div>
                    </Slide>
                </Box>
            </Modal>
        </>
    )
}

export default ConfirmationDialog