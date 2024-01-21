import { useState } from 'react'
import './products.css'
import Search from '../../../Ui/Search/Search'
import confirmAction from '../../../Ui/ConfirmationDialog/ConfirmationDialog'
import { useAdmin } from '../../../../Hooks/useProducts'
import { Box, Button, CircularProgress, Fade, IconButton, Menu, MenuItem, MenuList, Pagination, Skeleton, Typography } from '@mui/material'
import { CopyToClipboard } from '../../../../lib/CopyToClipboard'
import { TransitionGroup } from 'react-transition-group';
import CloseIcon from '@mui/icons-material/Close';

import MoreIcon from '@mui/icons-material/MoreVert';

import { useFilter } from '../../../Layouts/Sidebar/useFilter'
import useFacets from '../../../../Hooks/useFacets'
import { AddItem } from './AddItem'

const skeleton = new Array(5).fill()

function Products() {
    const [model, setModel] = useState({ open: false, payload: null })
    const [product, setProduct] = useState(null)

    const { filter, setFilter, deleteFilter } = useFilter()
    const { facets: { data } } = useFacets()
    const total = data?.total || 0

    const { products: { data: productList, isFetching }, deleteProduct } = useAdmin()

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const closeMenu = () => {
        setAnchorEl(null);
        setProduct(null)
    };

    function handleDelete(productId) {
        confirmAction(
            'Remove Product',
            'Press Confirm to Remove your product',
            () => {
                deleteProduct.mutate(productId)
            }
        )
        closeMenu()
    }

    function handleSearch(value) {
        if (value === '') return deleteFilter('q')
        setFilter('q', value, true)
    }

    return (
        <TransitionGroup style={{ height: '100%' }} exit={false} >
            {!model.open ?
                <Fade style={{ height: '100%' }} key={1}>
                    <div className="dashboard-wrapper">
                        <div id="dashboard">
                            <div className="actions">
                                <Search onKeyUp={handleSearch} />
                                <Button size='small' variant='contained' onClick={() => setModel(m => ({ ...m, open: true }))} >
                                    add
                                </Button>
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
                                        <th>action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        !isFetching ? productList?.map((product) =>
                                            < tr key={product.id} >
                                                <td>{product?.name}</td>
                                                <td>
                                                    <img
                                                        id='dashbord_product--image'
                                                        src={product.images[0]?.thumbnailUrl}
                                                        alt="" />
                                                </td>
                                                <td>
                                                    <Box display='flex' alignItems='center' >
                                                        <Typography noWrap variant='caption'>{product?.id}</Typography>
                                                        <CopyToClipboard name='Product id' value={product?.id} />
                                                    </Box>
                                                </td>
                                                <td>{product?.quantity}</td>
                                                <td>{product?.discount}</td>
                                                <td>{product?.price}</td>
                                                <td>
                                                    <div>
                                                        <IconButton
                                                            id={`menu-button`}
                                                            aria-controls={open ? `basic-menu` : undefined}
                                                            aria-haspopup="true"
                                                            aria-expanded={open ? 'true' : undefined}
                                                            onClick={(e) => {
                                                                setProduct(product)
                                                                setAnchorEl(e.currentTarget);
                                                            }}
                                                            size='small'
                                                        >
                                                            <MoreIcon fontSize='small' />
                                                        </IconButton>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                            :
                                            skeleton.map((_, i) => (
                                                <tr key={i}>
                                                    <td>
                                                        <Skeleton animation="wave" />
                                                    </td>
                                                    <td>
                                                        <Skeleton animation="wave" />
                                                    </td>
                                                    <td>
                                                        <Skeleton animation="wave" />
                                                    </td>
                                                    <td>
                                                        <Skeleton animation="wave" />
                                                    </td>
                                                    <td>
                                                        <Skeleton animation="wave" />
                                                    </td>
                                                    <td>
                                                        <Skeleton animation="wave" />
                                                    </td>
                                                </tr>
                                            ))

                                        //     :
                                        // 'Loading...'
                                    }
                                    <Menu
                                        id={`basic-menu`}
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={closeMenu}
                                        MenuListProps={{
                                            'aria-labelledby': `menu-button`,
                                        }}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'left',
                                        }}
                                        transformOrigin={{
                                            vertical: 'center',
                                            horizontal: 'right',
                                        }}
                                    >
                                        <MenuList dense disablePadding>
                                            <MenuItem onClick={() => {
                                                setModel(({ open: true, payload: product }))
                                                closeMenu()
                                            }}>Edit</MenuItem>
                                            <MenuItem onClick={() => handleDelete(product.id)}>Delete</MenuItem>
                                        </MenuList>
                                    </Menu>
                                </tbody>
                            </table>
                        </div>
                        {
                            productList?.length > 10 &&
                            <Pagination page={filter.find(({ item }) => item === 'p')?.value || 1} color="primary" sx={{ mt: 'auto' }} onChange={(_, value) => setFilter('p', value, true)} count={Math.ceil(total / 10)} />
                        }
                    </div >
                </Fade>
                :
                <Fade style={{ height: '100%' }} key={2}>
                    <div >
                        <AddItem payload={model.payload} onClose={() => setModel(({ open: false, payload: null }))} />
                    </div>
                </Fade>
            }
        </TransitionGroup >
    )
}

export default Products

