import React, { useState } from 'react'
import './dropdown.css'

function NavItem(props) {
    const [open, setOpen] = useState(false)

    return (
        <>
            <div className='nav-item' onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)} >
                {{...props.menu}}
                {
                    open &&
                    <div className='dropdown-menu-wrapper'>
                        <li className='dropdown-menu'>
                            {
                                props.children.map((element, index) =>
                                    <div
                                        key={index}
                                        className='dropdown-menu-item'
                                    >
                                        {element.props.lefticon}
                                        {element}
                                    </div>
                                )
                            }
                        </li>
                    </div>
                }
            </div>
        </>
    )
}

export default NavItem
