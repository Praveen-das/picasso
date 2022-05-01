import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faEdit, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useFirebase } from '../../../Context/FirebaseContext'
import './products.css'
import AddProduct from '../AddProduct/AddProduct'
import Search from '../../Search/Search'
import { confirmAction } from '../../ConfirmationDialog/ConfirmationDialog'
import { useDatabase } from '../../../Hooks/useDatabase'
import { useStore } from '../../../Context/Store'

function Products() {
    const { useSearch } = useFirebase()
    const { removeProduct, updateProduct } = useDatabase()
    const getDataFromDB = useStore(state => state.getDataFromDB)
    const uid = useStore(state => state.auth.user?.uid)
    const loading = false

    const [toggleEditButton, setToggleEditButton] = useState(false)
    const [toggleAddProduct, setToggleAddProduct] = useState({ open: false })
    const [dialog, setDialog] = useState('')
    const [data, setData] = useState([])

    const { result, setSearchQuery } = useSearch('adminProducts')

    useEffect(() => {
        getDataFromDB('adminProducts', undefined, uid).then(res => {
            setData(res.data)
        })
    }, [getDataFromDB,uid])

    const handleAction = (action, product) => {
        switch (action) {
            case 'add':
                setToggleAddProduct({
                    open: true
                })
                break;
            case 'edit':
                toggleEditButton ?
                    setToggleEditButton(false) :
                    setToggleEditButton(true)
                break;
            case 'update':
                setToggleAddProduct({
                    open: true,
                    action: 'update',
                    payload: product,
                    isConfirmed: (updates) => updateProduct(product.id, updates),
                })

                break;
            case 'delete':
                setDialog(!dialog)
                confirmAction(
                    'Remove Product',
                    'Press Confirm to Remove your product',
                    () => removeProduct(product.id)
                )
                break;
            default:
                break;
        }
    }

    return (
        <>
            {/* <ConfirmationDialog
                title='Remove Product'
                message='Press Confirm to Remove your product'
                dialog={dialog}
                setDialog={setDialog}
                callBackAction={{
                    confirm: () => removeProduct(productId),
                    close: () => setDialog(false)
                }}
            /> */}
            <div className="dashboard-wrapper">
                {/* <AlertMessage
                    dialog={dialog}
                    setDialog={setDialog}
                /> */}
                <AddProduct setToggleAddProduct={setToggleAddProduct} toggleAddProduct={toggleAddProduct} />
                <div id="dashboard">
                    <div className="actionbar">
                        <span style={{ marginLeft: 'auto' }}>
                            <Search onKeyUp={(e) => setSearchQuery(e.target.value)} />
                        </span>
                        <div className="actions">
                            <button color='secondary' onClick={() => handleAction('add')} className='addProduct'>
                                <Icon className='faAddIcon' icon={faPlus} /> ADD
                            </button>
                            <button onClick={() => handleAction('edit')} className='editProducts'>
                                <Icon className='faAddIcon' icon={faEdit} />EDIT
                            </button>
                        </div>
                    </div>
                    <table className='productTable' style={{ width: '100%' }}>
                        <thead>
                            <tr>
                                <th>no</th>
                                <th>image</th>
                                <th>name</th>
                                <th>id</th>
                                <th>availible</th>
                                <th>discount</th>
                                <th>PRice</th>
                                {toggleEditButton && <th>action</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                // ((!result.searching) || (!loading)) ?
                                //     (result.data.length > 0 ? result.data : data
                                //     )
                                data?.map((data, index) =>
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td><img id='dashbord_product--image' src={data.image[data.defaultImage] + '/tr:w-100'} alt="" /></td>
                                        <td>{data.name}</td>
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
                                ) 
                            //     :
                            // 'Loading...'
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Products
