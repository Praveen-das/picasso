import React, { useEffect, useRef } from 'react'
import './dashboard.css'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faClock, faEdit, faHandHoldingUsd, faTimesCircle, faTrash, faUndo } from '@fortawesome/free-solid-svg-icons'
import { useFirebase } from '../../../Context/FirebaseContext'
import Status from '../../Status/Status'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function Dashboard() {
    const { availableOrders } = useFirebase()

    const [age, setAge] = React.useState('Processing');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    if (!availableOrders) return
    console.log(availableOrders);
    return (
        <>
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
                                <th>Order id</th>
                                <th>payment method</th>
                                <th>order date</th>
                                <th>total</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                availableOrders.map((product, index) =>
                                    <tr>
                                        <td>{product.order_id}</td>
                                        <td>{product.paymentMethod}</td>
                                        <td>45645</td>
                                        <td>{product.totalAmount}</td>
                                        <td>
                                            {/* <select id='select' name="asdasd" id="">
                                                <option value="asdsad">asda</option>
                                            </select> */}
                                            <FormControl  variant="outlined" sx={{minWidth: 50 }} fullWidth>
                                                <InputLabel id="demo-simple-select-label">{age}</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={age};
                                                    label={age}
                                                    size='small'
                                                    onChange={handleChange}
                                                >
                                                    <MenuItem value={10}>Ten</MenuItem>
                                                    <MenuItem value={20}>Twenty</MenuItem>
                                                    <MenuItem value={30}>Thirty</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </td>
                                        {/* <td><Status status={product.status} /></td> */}
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
