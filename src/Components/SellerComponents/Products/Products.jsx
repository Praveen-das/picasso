import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faEdit, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useFirebase } from '../../../Context/FirebaseContext'
import './products.css'
import AddProduct from '../AddProduct/AddProduct'
import AlertMessage from '../../Alert/Alert'
import Search from '../../Search/Search'

function Products() {
    const [toggleEditButton, setToggleEditButton] = useState(false)
    const [toggleAddProduct, setToggleAddProduct] = useState({ open: false })
    const [dialog, setDialog] = useState('')
    const [query, setQuery] = useState()
    const { adminProducts, removeProduct, updateProduct, handleSearch, searchFor } = useFirebase()
    const [searchResult, setSearchResult] = useState()

    useEffect(() => {
        if (!query) return setSearchResult()
        searchFor(query).then(data => {
            setSearchResult(data)
        })
    }, [query])

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
                setDialog({
                    open: true,
                    confirmationMessage: 'Press CONFIRM to remove product',
                    successMessage: 'Product removed successfully',
                    onConfirmation: () => removeProduct(product.id),
                    type: 'confirmation'
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
                    dialog={dialog}
                    setDialog={setDialog}
                />
                <AddProduct setToggleAddProduct={setToggleAddProduct} toggleAddProduct={toggleAddProduct} />
                <div id="dashboard">
                    <div className="actionbar">
                        <span style={{ marginLeft: 'auto' }}>
                            <Search onTheFly={true} callback={(q) => setQuery(q)} />
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
                                (
                                    searchResult && searchResult ? searchResult : adminProducts
                                ).map((data, index) =>
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
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Products
