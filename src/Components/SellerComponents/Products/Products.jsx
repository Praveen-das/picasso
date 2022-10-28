import react, { useEffect, useState } from 'react'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faEdit, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useFirebase } from '../../../Context/FirebaseContext'
import './products.css'
import AddProduct from '../AddProduct/AddProduct'
import Search from '../../Search/Search'
import { confirmAction } from '../../ConfirmationDialog/ConfirmationDialog'
import { useDatabase } from '../../../Hooks/useDatabase'
import { useStore } from '../../../Context/Store'
import { useQuery } from '@tanstack/react-query'
import { fetchProducts } from '../../../lib/product.api'
import { useProductData } from '../../../Hooks/useProductData'
import { Pagination } from '@mui/material'

function Products() {
    // const { useSearch } = useFirebase()
    const { removeProduct, updateProduct } = useDatabase()
    const uid = useStore(state => state.auth.user?.uid)
    const [toggleEditButton, setToggleEditButton] = useState(false)
    const [model, setModel] = useState('')
    const [dialog, setDialog] = useState('')
    const [product, setProduct] = useState()

    const { data, page } = useProductData()
    const products = data ? data.data[0] : []
    const count = data ? data.data[1].id : 1

    const handleAction = (action, product) => {
        switch (action) {
            case 'update':
                setModel({
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

    function _updateProduct(product) {
        setModel('update')
        setProduct(product)
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
            <AddProduct setModel={setModel} model={model} _product={product} />
            <div className="dashboard-wrapper">
                {/* <AlertMessage
                    dialog={dialog}
                    setDialog={setDialog}
                /> */}
                <div id="dashboard">
                    <div className="actionbar">
                        <span style={{ marginLeft: 'auto' }}>
                            {/* <Search onKeyUp={(e) => setSearchQuery(e.target.value)} /> */}
                        </span>
                        <div className="actions">
                            <button color='secondary' onClick={() => setModel('add')} className='addProduct'>
                                <Icon className='faAddIcon' icon={faPlus} /> ADD
                            </button>
                            <button onClick={() => setToggleEditButton(pre => !pre)} className='editProducts'>
                                <Icon className='faAddIcon' icon={faEdit} />EDIT
                            </button>
                        </div>
                    </div>
                    <table className='productTable' style={{ width: '100%' }}>
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>image</th>
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
                                // !isFetching &&
                                products?.map((product, index) =>
                                    < tr key={index} >
                                        <td>{product?.name}</td>
                                        <td><img id='dashbord_product--image' src={product.images[0]?.thumbnailUrl} alt="" /></td>
                                        <td>{product?.id}</td>
                                        <td>{product?.quantity}</td>
                                        <td>{product?.discount}</td>
                                        <td>{product?.price}</td>
                                        {toggleEditButton && <td>
                                            <div className='action'>
                                                <Icon className='actionButtons' onClick={() => _updateProduct(product)} icon={faEdit} />
                                                <Icon className='actionButtons' onClick={() => handleAction('delete', product)} icon={faTrash} />
                                            </div>
                                        </td>}
                                    </tr>
                                )
                                //     :
                                // 'Loading...'
                            }
                        </tbody>
                    </table>
                    <Pagination color="primary" sx={{ mt: 3 }} onChange={(_, value) => page(value)} count={Math.ceil(count / 10)} />
                </div>
            </div>
        </>
    )
}

export default Products
