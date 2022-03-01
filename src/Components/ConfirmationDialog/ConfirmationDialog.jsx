import Modal from '@mui/material/Modal';
import Box from '@mui/system/Box';
import React from 'react'
import './confirmationDialog.css'
import reviewed from '../../Assets/Images/reviewed.svg'
import Slide from '@mui/material/Slide';

function ConfirmationDialog({ dialog, setDialog, title, message, callBackAction }) {

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
        callBackAction.confirm()
        callBackAction.close()
        setDialog(!dialog)
    }

    return (
        <>
            <Modal
                open={dialog}
                onClose={() => setDialog(!dialog)}
            >
                <Box sx={box_style}>
                    <Slide in={dialog}>
                        <div className="dialog">
                            <label>{title}</label>
                            <p>{message}</p>
                            <div className='dialog_buttons'>
                                <button onClick={() => setDialog(!dialog)} className='button_text'>CANCEL</button>
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