import { useEffect, useMemo, useState } from 'react'
import './products.css'
import Search from '../../Search/Search'
import confirmAction from '../../ConfirmationDialog/ConfirmationDialog'
import { deleteImage } from '../../../lib/product.api'
import { useAdmin } from '../../../Hooks/useProducts'
import { Alert, Box, Button, Chip, CircularProgress, Fade, Grid, IconButton, InputLabel, LinearProgress, Menu, MenuItem, MenuList, Pagination, Skeleton, Slide, Snackbar, Typography } from '@mui/material'
import { CopyToClipboard } from '../../../Utils/CopyToClipboard'
import { TransitionGroup } from 'react-transition-group';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';

import MoreIcon from '@mui/icons-material/MoreVert';
import TextField from '../../MUIComponents/TextField'
import { FastField, Field, FieldArray, Form, Formik } from 'formik'
import { productUpdateValidation, productValidation } from '../../../Schema/YupSchema'

import { ImageUploader } from './ImageUploader'
import { findChangedValues } from '../../../Utils/utils'
import { uploadImages } from '../../../Utils/uploadImages'
import { useFilter } from '../../Sidebar/useFilter'
import useFacets from '../../../Hooks/useFacets'

const skeleton = new Array(20).fill()

function Products() {
    const [model, setModel] = useState({ open: false, payload: null })
    const [product, setProduct] = useState(null)

    const { filter, setFilter, deleteFilter } = useFilter()
    const { facets: { data } } = useFacets()
    const total = data?.total || 0

    const { products: { data: productList, isLoading }, deleteProduct } = useAdmin()

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
                <Fade style={{ height: '100%' }} key={model.open}>
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
                                        // ((!result.searching) || (!loading)) ?
                                        //     (result.data.length > 0 ? result.data : data
                                        //     )
                                        !isLoading ? productList?.map((product) =>
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
                <Fade style={{ height: '100%' }} key={model.open}>
                    <div >
                        <AddItem payload={model.payload} onClose={() => setModel(({ open: false, payload: null }))} />
                    </div>
                </Fade>
            }
        </TransitionGroup >
    )
}

export default Products

let extras = {
    width: "",
    height: "",
    unit: 'm',
}

const initialValues = {
    name: "",
    desc: "",
    quantity: "",
    price: "",
    discount: "",
    images: [],
    size: [],
    category_id: 1,
    material_id: 1,
    ...extras
};

function AddItem({ onClose, payload }) {
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState(null);
    const { addProduct, updateProduct } = useAdmin()

    const inititalValuesForUpdates = useMemo(() => ({ ...payload, ...extras }), [payload])

    function handleSubmit({ deletedImages, ...productData }, { setSubmitting, resetForm }) {
        delete productData.width
        delete productData.height
        delete productData.unit

        function handleUpdates(updates) {
            updateProduct
                .mutateAsync({ id: payload.id, updates })
                .then(() => {
                    setStatus('success')
                    resetForm({
                        values: {
                            ...productData,
                            ...updates,
                            ...extras
                        }
                    })
                })
                .catch(err => {
                    setStatus('error')
                })
                .finally(() => {
                    setProgress(0)
                    setSubmitting(false)
                })
        }

        if (payload) {
            let updates = findChangedValues(payload, productData)
            if (!Object.values(updates).length) {
                setStatus('no changes')
                setSubmitting(false)
                return
            }

            if (!!deletedImages?.length) deleteImage(deletedImages)

            if (!!updates.images) {
                setStatus('uploading')
                uploadImages(updates.images, (value) => setProgress(value))
                    .then(res => {
                        let data = { ...updates, images: res }
                        handleUpdates(data)
                    })
            } else {
                handleUpdates(updates)
            }

        }
        else {
            setStatus('uploading')
            uploadImages(productData.images)
                .then(res => {
                    let data = { ...productData, images: res }
                    addProduct
                        .mutateAsync(data)
                        .then(() => {
                            setStatus('success')
                            resetForm()
                        })
                        .catch(err => {
                            setStatus('error')
                        })
                        .finally(() => {
                            setProgress(0)
                            setSubmitting(false)
                        })
                })
        }
    }

    return (
        <>
            <Formik
                initialValues={
                    payload ?
                        inititalValuesForUpdates :
                        initialValues
                }
                enableReinitialize
                validationSchema={payload ? productUpdateValidation : productValidation}
                onSubmit={handleSubmit}
                validateOnChange={false}
            >
                {
                    ({ values, setErrors, isSubmitting, resetForm }) => (
                        <>
                            <UploadingModel progress={progress} status={status} onSuccess={() => setStatus(null)} />
                            <Form >
                                <Grid container columnSpacing={6} rowSpacing={4} px={4} py={2} minHeight='100%'>
                                    <Grid item xs={5} >
                                        <Typography variant="h6" fontWeight={800} color="#333" >Product Images</Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Typography variant="h6" fontWeight={800} color="#333" >Product Info</Typography>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Box display='flex' gap={2} sx={{ float: 'right' }} >
                                            <Button onClick={() => {
                                                resetForm()
                                                onClose()
                                            }}
                                            >
                                                close
                                            </Button>
                                            <Button
                                                disabled={isSubmitting}
                                                type='submit'
                                                variant='contained'
                                            >
                                                {
                                                    isSubmitting ? 'submitting' :
                                                        'Publish'
                                                }
                                            </Button>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={5} minHeight='100%'>
                                        <FieldArray name='images'>
                                            {({ remove, replace, form }) => (
                                                <Box height='100%'>
                                                    <ImageUploader
                                                        mode={payload ? 'edit' : 'add'}
                                                        handlers={{ progress, setProgress, form, remove, replace }}
                                                    />
                                                </Box>
                                            )}
                                        </FieldArray>
                                    </Grid>
                                    <Grid item xs>
                                        <Box>
                                            <AddProductForm handlers={{ setErrors, values }} />
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Form>
                        </>
                    )
                }
            </Formik >
        </>
    )
}

function UploadingModel({ progress, status, onSuccess }) {
    const [open, setOpen] = useState(null)

    useEffect(() => {
        setOpen(s => !s ? status : false)
    }, [status])

    function handleExit() {
        setOpen(s => {
            if (s === false) return status
            else {
                onSuccess()
                return null
            }
        })
    }

    function handleClose(_, reason) {
        reason === "timeout" && setOpen(null)
    }

    return (
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            TransitionProps={{ onExited: handleExit }}
            open={Boolean(open)}
            onClose={handleClose}
            autoHideDuration={open !== 'uploading' ? 2000 : null}
            sx={{ width: 300 }}
        >{
                open === 'uploading' ?
                    <Box
                        sx={{
                            width: '100%',
                            // height: 50,
                            bgcolor: 'white',
                            borderRadius: 2,
                            boxShadow: '2px 2px 15px #c9d4e7',
                            display: 'grid',
                            alignItems: 'center',
                            px: 2,
                            py: 3,
                            gap: 0.5
                            // bgcolor:'var(--brand)'
                        }}
                    >
                        <Box display='flex' justifyContent='space-between'>
                            <Typography color='var(--brand)' >Publishing...</Typography>
                            <Typography color='var(--brand)' >{progress}%</Typography>
                        </Box>
                        <Box width='100%'>
                            <LinearProgress variant={progress < 100 ? 'determinate' : 'indeterminate'} value={progress} />
                        </Box>
                    </Box> :
                    status === 'error' ?
                        <Alert variant='filled' severity="error" sx={{ width: '100%' }} >There's an error, please try again</Alert> :
                        status === 'no changes' ?
                            <Alert variant='filled' severity="info" sx={{ width: '100%' }} >No changes have been made.</Alert> :
                            <Alert variant='filled' severity="success" sx={{ width: '100%' }} >Published successfully</Alert>
            }
        </Snackbar>
    )
}

function AddProductForm({ handlers: { setErrors, values } }) {
    const { facets:{data} } = useFacets()
    const categories = data?.allCategories || []
    const materials = data?.allMaterials || []

    return (
        <Grid
            container
            spacing={3}
        >
            {/* -----------name----------- */}
            <Grid item xs={12}>
                <FastField name="name">{({ field, form }) =>
                    <TextField
                        label="Product name"
                        error={form.touched.name && form.errors.name}
                        {...field}
                    />
                }</FastField>
            </Grid>
            {/* -----------category----------- */}
            <Grid item xs={6}>
                <Field name="category_id">{({ field }) =>
                    <TextField
                        label="Category"
                        select
                        {...field}
                    >
                        {
                            categories?.map(({ id, name }) => (
                                <MenuItem key={name} value={id}>{name}</MenuItem>
                            ))
                        }
                    </TextField>
                }</Field>
            </Grid>
            {/* -----------material----------- */}
            <Grid item xs={6}>
                <Field name="material_id">{({ field }) =>
                    <TextField
                        label="Material"
                        select
                        {...field}
                    >
                        {
                            materials?.map(({ id, name }) => (
                                <MenuItem key={name} value={id}>{name}</MenuItem>
                            ))
                        }
                    </TextField>
                }</Field>
            </Grid>
            {/* -----------Desc----------- */}
            <Grid item xs={12}>
                <FastField name="desc">{({ field, form }) =>
                    <TextField
                        label="Description"
                        rows={3}
                        multiline
                        error={form.touched.desc && form.errors.desc}
                        sx={{
                            ".MuiInputAdornment-root": {
                                mt: 'auto',
                                translate: '0 -9px'
                                // alignItems: 'end'
                            }
                        }}
                        {...field}
                    />
                }</FastField>
            </Grid>
            {/* -----------Price----------- */}
            <Grid item xs={4}>
                <FastField name="price">{({ field, form }) =>
                    <TextField
                        label="Price"
                        type='number'
                        error={form.touched.price && form.errors.price}
                        {...field}
                    />
                }</FastField>
            </Grid>
            {/* -----------Discount----------- */}
            <Grid item xs={4}>
                <FastField name="discount">{({ field, form }) =>
                    <TextField
                        label="Discount"
                        type='number'
                        error={form.touched.discount && form.errors.discount && `${form.errors.discount}%`}
                        startAdornment={<Typography fontWeight={600} sx={{ pr: 0.5 }}>%</Typography>}
                        {...field}
                    />
                }</FastField>
            </Grid>
            {/* -----------stock----------- */}
            <Grid item xs={4}>
                <FastField name="quantity">{({ field, form }) =>
                    <TextField
                        label="In Stock"
                        type='number'
                        error={form.touched.quantity && form.errors.quantity}
                        {...field}
                    />
                }</FastField>
            </Grid>
            {/* -----------Size----------- */}
            <Grid item xs={12}>
                <InputLabel sx={{
                    fontWeight: 600,
                    fontSize: 13,
                    color: 'grey',
                }}>Size</InputLabel>
                <FieldArray validateOnChange name='size'>
                    {
                        ({ unshift, remove, form }) =>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: 2,
                                    mt: 1,
                                    overflow: 'hidden'
                                }}
                            >
                                <Box width='100%' display='flex'>
                                    <Slide in={true} direction='right' mountOnEnter unmountOnExit>
                                        <Box
                                            sx={{
                                                width: '100%',
                                                display: 'flex',
                                                gap: 4
                                            }}
                                        >
                                            <Field name="unit">{({ field }) =>
                                                <TextField
                                                    sx={{ width: 200 }}
                                                    placeholder='unit'
                                                    defaultValue='m'
                                                    select
                                                    {...field}
                                                >
                                                    <MenuItem value='cm'>cm</MenuItem>
                                                    <MenuItem value='m'>m</MenuItem>
                                                    <MenuItem value='in'>in</MenuItem>
                                                    <MenuItem value='ft'>ft</MenuItem>
                                                </TextField>
                                            }</Field>
                                            <Field name="width">{({ field, form }) =>
                                                <TextField
                                                    placeholder='width'
                                                    type='number'
                                                    error={(form.touched.width && form.errors.width) || (form.touched.size && typeof form.errors.size === 'string' && form.errors.size)}
                                                    {...field}
                                                />
                                            }</Field>
                                            <Field name="height">{({ field, form }) =>
                                                <TextField
                                                    placeholder='height'
                                                    type='number'
                                                    error={(form.touched.height && form.errors.height) || (form.touched.size && typeof form.errors.size === 'string' && form.errors.size)}
                                                    {...field}
                                                />
                                            }</Field>
                                        </Box>
                                    </Slide>
                                    <IconButton
                                        variant='contained'
                                        size='small'
                                        onClick={() => {
                                            if (values.width && values.height) {
                                                return unshift(`${values.width + values.unit} x ${values.height + values.unit}`)
                                            }
                                            setErrors(
                                                {
                                                    width: !values.width && 'this field is required',
                                                    height: !values.height && 'this field is required',
                                                })
                                        }}
                                    >
                                        <DoneIcon />
                                    </IconButton>
                                </Box>
                                {values.size?.map((size, key) => <Chip onClick={() => remove(key)} color='primary' variant='outlined' key={key} label={size} />)}
                            </Box>
                    }
                </FieldArray>
            </Grid>
        </Grid >
    )
}