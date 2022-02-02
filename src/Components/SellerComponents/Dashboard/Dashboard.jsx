import React, { useEffect, useRef, useState } from 'react'
import './dashboard.css'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faClock, faEdit, faHandHoldingUsd, faTimesCircle, faTrash, faUndo } from '@fortawesome/free-solid-svg-icons'
import { useFirebase } from '../../../Context/FirebaseContext'
import Status from '../../Status/Status'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import EditIcon from '@mui/icons-material/Edit';
import { Button, IconButton, OutlinedInput } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import AlertMessage from '../../Alert/Alert'

function Dashboard() {
    const { availableOrders, handleOrder } = useFirebase()
    const [toggleEdit, setToggleEdit] = useState()
    const [status, setStatus] = useState()
    const [dialog, setDialog] = useState('')
    const [orders, setOrders] = useState([])

    useEffect(() => {
        if (!availableOrders) return
        setOrders(availableOrders.sort((x, y) => {
            return new Date(x.date_added.toDate()) - new Date(y.date_added.toDate())
        }).reverse());
    }, [availableOrders])

    const options = ['Delivering', 'Delivered', 'Cancelled']

    const handleOrders = (orderId) => {
        setDialog({
            open: true,
            confirmationMessage: 'Press CONFIRM to apply changes',
            successMessage: 'Order updated successfully',
            onConfirmation: () => handleOrder(status, orderId).then(() => {
                setToggleEdit(null)
            }),
            type: 'confirmation'
        })
    }

    if (!availableOrders) return
    return (
        <>
            <AlertMessage dialog={dialog} setDialog={setDialog} />
            <div className="dashboard-wrapper">
                <div id="dashboard">
                    <div className="dashboard-items">
                        <div className='rows'>
                            <div className="order-pending">
                                <label htmlFor="">2132</label>
                                <Icon className='icon' icon={faClock}></Icon>
                            </div>
                            <div className="order-cancel">
                                <label htmlFor="">80</label>
                                <Icon className='icon' icon={faTimesCircle}></Icon>
                            </div>
                        </div>
                        <div className='rows'>
                            <div className="order-return">
                                <label htmlFor="">20</label>
                                <Icon className='icon' icon={faUndo}></Icon>
                            </div>
                            <div className="todays_income">
                                <label htmlFor="">$54321</label>
                                <Icon className='icon' icon={faHandHoldingUsd}></Icon>
                            </div>
                        </div>
                    </div>
                    <label className='recentOrders' htmlFor="">Recent orders</label>
                    <table style={{ width: '100%' }}>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Order id</th>
                                <th>Order data</th>
                                <th>payment method</th>
                                <th>order date</th>
                                <th>total</th>
                                <th>Status</th>
                                <th>Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orders?.map((product, index) =>
                                    <tr key={index} style={{ height: '70px' }}>
                                        <td>{index + 1}</td>
                                        <td>{product.order_id}</td>
                                        <td>{
                                            product.date_added.toDate().toDateString() + ' ' +
                                            product.date_added.toDate().toLocaleTimeString()
                                        }</td>
                                        <td>{product.paymentMethod}</td>
                                        <td>45645</td>
                                        <td>{product.totalAmount}</td>
                                        <td style={{ width: '120px' }}>
                                            {
                                                toggleEdit !== index ?
                                                    <span>
                                                        <Status status={product.status} />
                                                    </span> :
                                                    <select onChange={(e) => setStatus(e.target.value)} name="status" id="dashbord_select">
                                                        <option hidden className='status_options' value="Processing">Processing</option>
                                                        {
                                                            options.map((option, index) =>
                                                                product.status === 'Cancelled' ?
                                                                    <option disabled key={index} value={option}>{option}</option>
                                                                    :
                                                                    product.status === 'Delivering' && index === 0 ?
                                                                        ''
                                                                        :
                                                                        product.status === 'Delivered' ?
                                                                            index === 0 ? '' : index === 1 ? '' :
                                                                                <option key={index} value={option}>{option}</option>
                                                                            :
                                                                            <option key={index} value={option}>{option}</option>
                                                            )
                                                        }
                                                    </select>
                                            }
                                        </td>
                                        <td style={{ width: '60px' }}>
                                            {
                                                toggleEdit === index ?
                                                    <div id='dashbord_edit' style={{
                                                        zIndex: toggleEdit === index ? 3 : 1,
                                                        opacity: toggleEdit === index ? 1 : 0,
                                                        transitionDelay: toggleEdit === index ? '0.2s' : '0s',
                                                    }}>
                                                        <IconButton sx={{ padding: 0 }} onClick={() => setToggleEdit(null)} variant='contained'>
                                                            <ClearIcon /></IconButton>
                                                        <IconButton sx={{ padding: 0 }} onClick={() => handleOrders(product.order_id)} variant='contained'>
                                                            <CheckIcon />
                                                        </IconButton>
                                                    </div> :
                                                    <IconButton
                                                        onClick={() => setToggleEdit(toggleEdit !== index ? index : null)}
                                                        sx={{ transform: 'translateY(-3px)' }}
                                                    >
                                                        <EditIcon sx={{ fontSize: '18px' }} />
                                                    </IconButton >
                                            }
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Dashboard
