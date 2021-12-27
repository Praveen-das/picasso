import React from 'react'
import './dashboard.css'
import Header from '../Header/Header'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faClock, faEdit, faHandHoldingUsd, faTimesCircle, faTrash, faUndo } from '@fortawesome/free-solid-svg-icons'

function Dashboard() {
    return (
        <>
            <div className="dashboard-wrapper">
                <Header page='Dashboard'/>
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
                                <th>action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>6456</td>
                                <td>4564</td>
                                <td>45645</td>
                                <td>123</td>
                                <td>123</td>
                                <td>
                                    <div className='action'>
                                        <Icon icon={faEdit} />
                                        <Icon icon={faTrash} />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>6456</td>
                                <td>4564</td>
                                <td>45645</td>
                                <td>123</td>
                                <td>123</td>
                                <td>
                                    <div className='action'>
                                        <Icon icon={faEdit} />
                                        <Icon icon={faTrash} />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>6456</td>
                                <td>4564</td>
                                <td>45645</td>
                                <td>123</td>
                                <td>123</td>
                                <td>
                                    <div className='action'>
                                        <Icon icon={faEdit} />
                                        <Icon icon={faTrash} />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>6456</td>
                                <td>4564</td>
                                <td>45645</td>
                                <td>123</td>
                                <td>123</td>
                                <td>
                                    <div className='action'>
                                        <Icon icon={faEdit} />
                                        <Icon icon={faTrash} />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>6456</td>
                                <td>4564</td>
                                <td>45645</td>
                                <td>123</td>
                                <td>123</td>
                                <td>
                                    <div className='action'>
                                        <Icon icon={faEdit} />
                                        <Icon icon={faTrash} />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>6456</td>
                                <td>4564</td>
                                <td>45645</td>
                                <td>123</td>
                                <td>123</td>
                                <td>
                                    <div className='action'>
                                        <Icon icon={faEdit} />
                                        <Icon icon={faTrash} />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>6456</td>
                                <td>4564</td>
                                <td>45645</td>
                                <td>123</td>
                                <td>123</td>
                                <td>
                                    <div className='action'>
                                        <Icon icon={faEdit} />
                                        <Icon icon={faTrash} />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>6456</td>
                                <td>4564</td>
                                <td>45645</td>
                                <td>123</td>
                                <td>123</td>
                                <td>
                                    <div className='action'>
                                        <Icon icon={faEdit} />
                                        <Icon icon={faTrash} />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>6456</td>
                                <td>4564</td>
                                <td>45645</td>
                                <td>123</td>
                                <td>123</td>
                                <td>
                                    <div className='action'>
                                        <Icon icon={faEdit} />
                                        <Icon icon={faTrash} />
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Dashboard
