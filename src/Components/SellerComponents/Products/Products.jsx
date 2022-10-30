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
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { deleteProduct, fetchProducts } from '../../../lib/product.api'
import { useProductData } from '../../../Hooks/useProductData'
import { Pagination, Skeleton } from '@mui/material'

const skeleton = new Array(20).fill()
function Products() {
    const queryClient = useQueryClient()
    const { removeProduct, updateProduct } = useDatabase()
    const uid = useStore(state => state.auth.user?.uid)
    const [toggleEditButton, setToggleEditButton] = useState(false)
    const [model, setModel] = useState('')
    const [dialog, setDialog] = useState('')
    const [product, setProduct] = useState()

    const { data, page, query, isLoading } = useProductData()
    const { mutate } = useMutation(deleteProduct, {
        onSuccess: () => {
            queryClient.invalidateQueries(['products'])
        },
    })
    const products = data ? data.data[0] : []
    const count = data ? data.data[1]?.id : 1

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

                break;
            default:
                break;
        }
    }

    function _updateProduct(product) {
        setModel('update')
        setProduct(product)
    }

    useEffect(() => {
        window.scrollTo({ top: 0 })
    }, [products])

    function handleDelete(productId) {
        confirmAction(
            'Remove Product',
            'Press Confirm to Remove your product',
            () => mutate(productId)
        )
    }

    return (
        <>
            {model && <AddProduct setModel={setModel} model={model} _product={product} />}
            <div className="dashboard-wrapper">
                {/* <AlertMessage
                    dialog={dialog}
                    setDialog={setDialog}
                /> */}
                <div id="dashboard">
                    <div className="actionbar">
                        <span >
                        </span>
                        <div className="actions">
                            <Search
                                onKeyUp={value => query(value)}
                                onSearch={value => query(value)}
                            />
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
                                !isLoading ? products.map((product) =>
                                    < tr key={product.id} >
                                        <td>{product?.name}</td>
                                        <td><img id='dashbord_product--image' src={product.images[0]?.thumbnailUrl} alt="" /></td>
                                        <td>{product?.id}</td>
                                        <td>{product?.quantity}</td>
                                        <td>{product?.discount}</td>
                                        <td>{product?.price}</td>
                                        {
                                            toggleEditButton && <td>
                                                <div className='action'>
                                                    <Icon className='actionButtons' onClick={() => _updateProduct(product)} icon={faEdit} />
                                                    <Icon className='actionButtons' onClick={() => handleDelete(product.id)} icon={faTrash} />
                                                </div>
                                            </td>
                                        }
                                    </tr>
                                )
                                    :
                                    skeleton.map((_, i) => (
                                        <tr key={i}>
                                            <td height={'70px'} width={'15%'}>
                                                <Skeleton animation="wave" />
                                            </td>
                                            <td height={'70px'} width={'20%'}>
                                                <Skeleton animation="wave" />
                                            </td>
                                            <td height={'70px'} width={'39%'}>
                                                <Skeleton animation="wave" />
                                            </td>
                                            <td height={'70px'}>
                                                <Skeleton animation="wave" />
                                            </td>
                                            <td height={'70px'}>
                                                <Skeleton animation="wave" />
                                            </td>
                                            <td height={'70px'}>
                                                <Skeleton animation="wave" />
                                            </td>
                                        </tr>
                                    ))

                                //     :
                                // 'Loading...'
                            }
                        </tbody>
                    </table>
                    <Pagination color="primary" sx={{ mt: 3, justifyItems: 'center' }} onChange={(_, value) => page(value)} count={Math.ceil(count / 10)} />
                </div>
            </div>
        </>
    )
}

export default Products
