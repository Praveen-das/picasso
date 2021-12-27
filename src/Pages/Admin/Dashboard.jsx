import React from 'react'
import Dashboard from '../../Components/Admin/Dashboard/Dashboard'
import Navbar from '../../Components/Admin/Navbar/Navbar'
import './style.css'

function DashboardPage() {
    return (
        <div className='admin-wrapper'>
            <Navbar/>
            <Dashboard/>
        </div>
    )
}

export default DashboardPage
