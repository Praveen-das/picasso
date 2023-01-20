import { useState } from 'react'
import './dashboard.css'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faClock, faHandHoldingUsd, faUndo } from '@fortawesome/free-solid-svg-icons'
import Status from '../../Status/Status'
import EditIcon from '@mui/icons-material/Edit';
import { IconButton, Skeleton } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import AlertMessage from '../../Alert/Alert'
import confirmAction from '../../ConfirmationDialog/ConfirmationDialog'
import useSales from '../../../Hooks/Sales/useSales'
import useSalesOrders from "../../../Hooks/Sales/useSalesOrders"
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import CancelIcon from '@mui/icons-material/Cancel';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

const options = [
    'pending',
    'shipped',
    'completed',
    'declined',
    'refunded',
    'cancelled',
]

function Dashboard() {
    const [toggleEdit, setToggleEdit] = useState(false)
    const [dialog, setDialog] = useState('')
    const [status, setStatus] = useState('')

    const { updateStatus } = useSales()
    const salesOrders = useSalesOrders()

    const handleOrders = (orderStatus) => {
        if (status.status)
            if (status.status !== orderStatus)
                return confirmAction(
                    'Change order status',
                    'Press OK to confirm your action',
                    () => updateStatus.mutateAsync(status).then(() => setToggleEdit(false))
                )

        setToggleEdit(false)
    }

    return (
        <>
            <AlertMessage dialog={dialog} setDialog={setDialog} />
            <div className="dashboard-wrapper">
                <div id="dashboard">
                    <div className="dashboard-items">
                        <div className='rows'>
                            <div className="total_orders" onClick={() => salesOrders.groupBy('')}>
                                <label htmlFor="">
                                    {
                                        (salesOrders.data && salesOrders.data[1]) ||
                                        0
                                    }
                                </label>
                                <FormatListBulletedIcon fontSize='large' className='icon' />
                            </div>
                            <div className="order-pending" onClick={() => salesOrders.groupBy('pending')}>
                                <label htmlFor="">
                                    {
                                        (salesOrders.data && salesOrders.data[2]?.find(o => o.status === "pending")?._count.status) ||
                                        0
                                    }
                                </label>
                                <Icon className='icon' icon={faClock}></Icon>
                            </div>
                        </div>
                        <div className='rows'>
                            <div className="order-shipped" onClick={() => salesOrders.groupBy('shipped')}>
                                <label htmlFor="">
                                    {
                                        (salesOrders.data && salesOrders.data[2].find(o => o.status === 'shipped')?._count.status) ||
                                        0
                                    }
                                </label>
                                <LocalShippingIcon fontSize='large' className='icon' />
                            </div>
                            <div className="order-completed" onClick={() => salesOrders.groupBy('completed')}>
                                <label htmlFor="">
                                    {
                                        (salesOrders.data && salesOrders.data[2].find(o => o.status === 'completed')?._count.status) ||
                                        0
                                    }
                                </label>
                                <AssignmentTurnedInIcon fontSize='large' className='icon' />
                            </div>
                        </div>
                        <div className='rows'>
                            <div className="order-declined" onClick={() => salesOrders.groupBy('declined')}>
                                <label htmlFor="">
                                    {
                                        (salesOrders.data && salesOrders.data[2].find(o => o.status === 'declined')?._count.status) ||
                                        0
                                    }
                                </label>
                                <ThumbDownAltIcon fontSize='large' className='icon' />
                            </div>
                            <div className="order-cancelled" onClick={() => salesOrders.groupBy('cancelled')}>
                                <label htmlFor="">
                                    {
                                        (salesOrders.data && salesOrders.data[2].find(o => o.status === 'cancelled')?._count.status) ||
                                        0
                                    }
                                </label>
                                <CancelIcon fontSize='large' className='icon' />
                            </div>
                        </div>
                        <div className='rows'>
                            <div className="order-refunded" onClick={() => salesOrders.groupBy('refunded')}>
                                <label htmlFor="">
                                    {
                                        (salesOrders.data && salesOrders.data[2].find(o => o.status === 'refunded')?._count.status) ||
                                        0
                                    }
                                </label>
                                <Icon className='icon' icon={faUndo}></Icon>
                            </div>
                            <div className="todays_income">
                                <label htmlFor="">₹
                                    {
                                        (salesOrders.data && salesOrders.data[3].dailyEarnings) || 0
                                    }
                                </label>
                                <Icon className='icon' icon={faHandHoldingUsd}></Icon>
                            </div>
                        </div>
                    </div>
                    {/* <label className='recentOrders' htmlFor="">Recent orders</label> */}
                    <table style={{ width: '100%' }}>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Order id</th>
                                <th>Order date</th>
                                <th>payment method</th>
                                <th>quantity</th>
                                <th>total</th>
                                <th>Status</th>
                                <th>Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                salesOrders.data && salesOrders.data[0]?.map((order, index) =>
                                    <tr key={index} style={{ height: '70px' }}>
                                        <td>{order?.cart_item?.product?.name}</td>
                                        <td>{order?.id}</td>
                                        <td>{order?.timer_order_taken}</td>
                                        <td>{order?.payment_method}</td>
                                        <td>{order?.cart_item?.quantity}</td>
                                        <td>{order?.cart_item?.price}</td>
                                        <td style={{ width: '120px' }}>
                                            {
                                                toggleEdit !== index ?
                                                    <span>
                                                        <Status status={order?.status} />
                                                    </span> :
                                                    <select onChange={(e) => setStatus({ id: order.id, status: e.target.value })} name="status" id="dashbord_select">
                                                        <option hidden className='status_options' >{order?.status}</option>
                                                        {
                                                            options.map((value) =>
                                                                <option
                                                                    className='status_options'
                                                                    key={value}
                                                                    value={status.status}
                                                                >
                                                                    {value}
                                                                </option>
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
                                                        <IconButton sx={{ padding: 0 }} onClick={() => handleOrders(order?.status)} variant='contained'>
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
