import react from 'react'
import './header.css'

function header({page}) {
    return (
        
            <div className="admin-header">
                <label htmlFor="">{page}</label>
                <input id='search' type="text" />
                <div id='profilePicture'></div>
            </div>
    )
}

export default header
