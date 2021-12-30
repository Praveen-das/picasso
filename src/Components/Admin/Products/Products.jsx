import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faCheck, faEdit, faPlus, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useFirebase } from '../../../Context/FirebaseContext'
import './products.css'
import AddProduct from '../AddProduct/AddProduct'
import AlertMessage from '../../Alert/Alert'

function Products() {
    const [toggleEditButton, setToggleEditButton] = useState(true)
    const [toggleEdit, setToggleEdit] = useState(false)
    const [toggleAddProduct, setToggleAddProduct] = useState(false)
    const { adminProducts, removeProduct } = useFirebase()
    const [confirmationMessage, setConfirmationMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')

    const [confirmationDialog, setConfirmationDialog] = useState({
        open: false,
        isSuccess: false
    })

    const handleAction = (action, product) => {
        switch (action) {
            case 'add':
                toggleAddProduct ?
                    setToggleAddProduct(false) :
                    setToggleAddProduct(true)
                break;
            case 'edit':
                toggleEditButton ?
                    setToggleEditButton(false) :
                    setToggleEditButton(true)
                break;
            case 'update':
                setToggleAddProduct({
                    open:true,
                    payload:'data'
                })
                break;
            case 'delete':
                setConfirmationMessage('Press CONFIRM to remove product')
                setSuccessMessage('Product Removed successfully')
                setConfirmationDialog({
                    open: true,
                    isSuccess: false,
                    isConfirmed: () => removeProduct(product)
                })
                break;
            default:
                break;
        }
    }

    return (
        <>
            <div className="dashboard-wrapper">
                <AlertMessage
                    confirmationDialog={confirmationDialog}
                    setConfirmationDialog={setConfirmationDialog}
                    confirmationMessage={confirmationMessage}
                    successMessage={successMessage}
                />
                <div id="dashboard">
                    <div className="actions">
                        <button color='secondary' onClick={() => handleAction('add')} className='addProduct'>
                            <Icon className='faAddIcon' icon={faPlus} /> ADD
                        </button>
                        <button onClick={() => handleAction('edit')} className='editProducts'><
                            Icon className='faAddIcon' icon={faEdit} />EDIT
                        </button>
                    </div>
                    <AddProduct setToggleAddProduct={setToggleAddProduct} toggleAddProduct={toggleAddProduct} />
                    <table className='productTable' style={{ width: '100%' }}>
                        <thead>
                            <tr>
                                <th>no</th>
                                <th>image</th>
                                <th>product name</th>
                                <th>product id</th>
                                <th>availible</th>
                                <th>discount</th>
                                <th>PRice</th>
                                {toggleEditButton && <th>action</th>}
                                {/* {toggleEditButton && <th><input onChange={(e) => handleSelected(e)} className='checkbox' type="checkbox" /></th>} */}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                adminProducts?.map((data, index) => {
                                    return toggleEdit ?
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td><img id='productImage' src={data.image_url} alt="" /></td>
                                            <td>zxczxc</td>
                                            <td>{data.id}</td>
                                            <td>zxczxc</td>
                                            <td>zxczxc</td>
                                            <td>zxczxc</td>
                                            {toggleEditButton && <td>
                                                <div className='action'>
                                                    <Icon className='actionButtons' icon={faCheck} />
                                                    <Icon className='actionButtons' onClick={() => setToggleEdit(false)} icon={faTimes} />
                                                </div>
                                            </td>}
                                        </tr>
                                        :
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td><img id='productImage' src={data.image_url} alt="" /></td>
                                            <td>{data.product}</td>
                                            <td>{data.id}</td>
                                            <td>{data.quantity}</td>
                                            <td>{data.discount}</td>
                                            <td>{data.price}</td>
                                            {toggleEditButton && <td>
                                                <div className='action'>
                                                    <Icon className='actionButtons' onClick={() => handleAction('update', data)} icon={faEdit} />
                                                    <Icon className='actionButtons' onClick={() => handleAction('delete', data)} icon={faTrash} />
                                                </div>
                                            </td>}
                                        </tr>
                                }
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
