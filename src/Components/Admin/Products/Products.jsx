import React, { useState } from 'react'
import Header from '../Header/Header'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faChevronLeft, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useFirebase } from '../../../Context/FirebaseContext'
import './products.css'
import { Link } from 'react-router-dom'
import { useEffect } from 'react/cjs/react.development'
import AddProduct from '../AddProduct/AddProduct'

function Products() {
    const [toggleDelete, setToggleDelete] = useState(false)
    const [toggleAddProduct, setToggleAddProduct] = useState(false)
    const [isSelected, setIsSelected] = useState([])
    const { adminProducts } = useFirebase()

    const handleAction = (action) => {
        switch (action) {
            case 'add':
                toggleAddProduct ?
                    setToggleAddProduct(false) :
                    setToggleAddProduct(true)
                break;
            case 'delete':
                toggleDelete ?
                    setToggleDelete(false) :
                    setToggleDelete(true)
                break;
            default:
                break;
        }
    }

    const handleSelected = (event, id) => {
        if (event.target.checked) {
            if (!id) {
                document.querySelectorAll('.single').forEach(o => o.checked = true)
                return setIsSelected(adminProducts.map(o => o.id))
            }
            setIsSelected(pre => {
                return [...pre, ...id]
            })
            return
        }
        if (!event.target.checked) {
            if (!id) {
                document.querySelectorAll('.single').forEach(o => o.checked = false)
                return setIsSelected([])
            }
            return setIsSelected(isSelected.filter(o => o !== id))
        }
    }

    return (
        <>
            <div className="dashboard-wrapper">
                {/* <Header page='Products' /> */}
                <div id="dashboard">
                    {!toggleAddProduct && <div className="actions">
                        <button onClick={() => handleAction('add')} className='addProduct'>
                            <Icon className='faAddIcon' icon={faPlus} /> ADD
                        </button>
                        <button onClick={() => handleAction('delete')} className='editProducts'><
                            Icon className='faAddIcon' icon={faTrash} />DELETE
                        </button>
                    </div>}
                    {toggleAddProduct && <AddProduct setToggleAddProduct={setToggleAddProduct}/>}
                    <table style={{ width: '100%' }}>
                        <thead>
                            <tr>
                                <th>no</th>
                                <th>image</th>
                                <th>product name</th>
                                <th>product id</th>
                                <th>availible</th>
                                <th>discount</th>
                                <th>PRice</th>
                                {toggleDelete && <th><input onChange={(e) => handleSelected(e)} className='checkbox' type="checkbox" /></th>}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                adminProducts &&
                                adminProducts.map((data, index) =>
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>1</td>
                                        <td>{data.product}</td>
                                        <td>{data.id}</td>
                                        <td>{data.quantity}</td>
                                        <td>{data.discount}</td>
                                        <td>{data.price}</td>
                                        {toggleDelete && <td>
                                            <input onChange={(e) => handleSelected(e, data.id)} className='checkbox single' type="checkbox" />
                                        </td>}
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

export default Products
