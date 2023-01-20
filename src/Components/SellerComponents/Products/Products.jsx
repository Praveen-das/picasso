import  { useEffect, useState } from 'react'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faEdit, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import './products.css'
import AddProduct from '../AddProduct/AddProduct'
import Search from '../../Search/Search'
import confirmAction from '../../ConfirmationDialog/ConfirmationDialog'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { _deleteProduct } from '../../../lib/product.api'
import { useAdmin } from '../../../Hooks/useProducts'
import { Pagination, Skeleton } from '@mui/material'

const skeleton = new Array(20).fill()
function Products() {
    const queryClient = useQueryClient()

    const [toggleEditButton, setToggleEditButton] = useState(false)
    const [model, setModel] = useState('')
    const [product, setProduct] = useState()

    const { products, setPage, setQuery, isLoading } = useAdmin()
    
    const { mutate } = useMutation(_deleteProduct, {
        onSuccess: () => {
            queryClient.invalidateQueries(['products'])
        },
    })

    const productList = products.data ? products.data[0] : []
    const count = products.data ? products.data[1].id : 1

    function _updateProduct(product) {
        setModel('update')
        setProduct(product)
    }

    useEffect(() => {
        window.scrollTo({ top: 0 })
    }, [productList])

    function handleDelete(productId) {
        confirmAction(
            'Remove Product',
            'Press Confirm to Remove your product',
            () => mutate(productId)
        )
    }

    return (
        <>
            {model && <AddProduct setModel={setModel} model={model} _product={model === 'update' ? product : null} />}
            <div className="dashboard-wrapper">
                <div id="dashboard">
                    <div className="actionbar">
                        <span >
                        </span>
                        <div className="actions">
                            <Search
                                onKeyUp={value => setQuery(value)}
                                onSearch={value => setQuery(value)}
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
                                !isLoading ? productList?.map((product) =>
                                    < tr key={product.id} >
                                        <td>{product?.name}</td>
                                        <td><img
                                            id='dashbord_product--image'
                                            src={product.images.find(o => o.fileId === product.defaultImage)?.thumbnailUrl}
                                            alt="" /></td>
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
                    <Pagination color="primary" sx={{ mt: 3, justifyItems: 'center' }} onChange={(_, value) => setPage(value)} count={Math.ceil(count / 10)} />
                </div>
            </div>
        </>
    )
}

export default Products
