import React, { useEffect, useRef, useState } from 'react'
import './addProduct.css'
import { Grid, Typography, Backdrop, Button, ThemeProvider, CircularProgress, Modal, IconButton } from '@mui/material'
import InputField from '../../TextField/InputField'
import { useFirebase } from '../../../Context/FirebaseContext'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import CloseIcon from '@mui/icons-material/Close';
import { Box } from '@mui/system'
import AlertMessage from '../../Alert/Alert'
import { useHelper } from '../../../Context/HelperContext'

function AddProduct({ setToggleAddProduct, toggleAddProduct }) {
    const [templates, setTemplates] = useState([])
    const [payload, setPayload] = useState([])
    const [loading, setLoading] = useState(false)
    const [product, setProduct] = useState()
    const [defaultImage, setDefaultImage] = useState(0)
    const [dialog, setDialog] = useState('')
    const { theme } = useHelper()

    const fileRef = useRef()

    useEffect(() => {
        if (toggleAddProduct.action !== 'update') return
        setProduct(toggleAddProduct.payload)
        setTemplates(toggleAddProduct.payload.image)
    }, [toggleAddProduct])

    const { addProductToDatabase, uploadImage, uploadProgress } = useFirebase()

    const handleActions = async (action, e) => {
        switch (action) {

            case 'submit':
                setToggleAddProduct({ open: false })
                setLoading(true)
                uploadImage(payload)
                    .then((imageURL) => {
                        product.image = imageURL
                        product.defaultImage = defaultImage
                        product.uid = 'asdasdasdasd'
                        addProductToDatabase(product)
                        setProduct('')
                        setPayload([])
                        setLoading(false)
                        setTemplates([])
                        setDialog({
                            open: true,
                            successMessage: 'Product added successfully',
                            type: 'success'
                        })
                    }).catch(error => console.log(error))
                break;

            case 'reset':
                setProduct(null)
                setPayload([])
                setTemplates([])
                break;

            case 'update':
                const image = await uploadImage(payload)
                if (image)
                    product.image = [...image, ...product.image]
                product.defaultImage = defaultImage
                await toggleAddProduct.isConfirmed(product)
                setToggleAddProduct({
                    open: false
                })
                setDialog({
                    open: true,
                    successMessage: 'Product updated successfully',
                    type: 'success'
                })
                setProduct([])
                break;

            case 'close':
                setToggleAddProduct(false)
                break;

            case 'uploadImage':
                const file = e.target.files[0]
                const previewRef = fileRef.current.files[0]
                if (!file) return
                if (!previewRef) return
                const preview = URL.createObjectURL(previewRef)
                setTemplates(pre => {
                    return [preview, ...pre]
                })
                setPayload(pre => {
                    return [file, ...pre]
                })
                break;
            default:
                break;
        }
    }

    const box_style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 700,
        bgcolor: 'background.paper',
        boxShadow: 5,
        p: 4,
    };

    return (
        <>
            <ThemeProvider theme={theme}>
                <AlertMessage
                    dialog={dialog}
                    setDialog={setDialog}
                />
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={loading}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
                <Modal
                    open={toggleAddProduct.open}
                    onClose={() => setToggleAddProduct({ open: false })}
                >
                    <Box sx={box_style}>
                        <form action='submit' onSubmit={(e) => {
                            e.preventDefault()
                            handleActions('submit')
                        }}>
                            <Grid container minWidth={300} spacing={1.5}>
                                <Grid item sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} xs={12} mb={2}>
                                    {
                                        toggleAddProduct.action === 'update' ?
                                            <Typography variant='h6'>Update Product</Typography> :
                                            <Typography variant='h6'>Add Product</Typography>
                                    }
                                    <IconButton onClick={() => setToggleAddProduct({ open: false })}>
                                        <CloseIcon />
                                    </IconButton>
                                </Grid>
                                <InputField required xs={12} value={product && product.name} label='Product Name' onChange={(e) => setProduct(pre => { return { ...pre, name: e.target.value } })} />
                                <InputField xs={12} value={product && product.description} label='Description' rows={4} onChange={(e) => setProduct(pre => { return { ...pre, description: e.target.value } })} />
                                <InputField required xs={12} value={product && product.category} md={6} label='Category' onChange={(e) => setProduct(pre => { return { ...pre, category: e.target.value } })} />
                                <InputField required xs={12} value={product && product.material} md={6} label='Material' onChange={(e) => setProduct(pre => { return { ...pre, material: e.target.value } })} />
                                <InputField required xs={6} value={product && product.dimension} md={3} label='Dimension' onChange={(e) => setProduct(pre => { return { ...pre, dimension: e.target.value } })} />
                                <InputField required xs={6} value={product && product.quantity} md={3} label='Quantity' onChange={(e) => setProduct(pre => { return { ...pre, quantity: e.target.value } })} />
                                <InputField required xs={6} value={product && product.price} md={3} label='Price' onChange={(e) => setProduct(pre => { return { ...pre, price: e.target.value } })} />
                                <InputField xs={6} value={product && product.discount} md={3} label='Discount' onChange={(e) => setProduct(pre => { return { ...pre, discount: e.target.value } })} />
                                {
                                    toggleAddProduct.action === 'update' ?
                                        <Grid item xs={12} gap='2rem' mt={2}>
                                            <Typography variant='h6' fontSize={16} fontWeight={500}>Add more Images</Typography>
                                        </Grid> :
                                        <Grid item xs={12} gap='2rem' mt={2}>
                                            <Typography variant='h6' fontSize={16} fontWeight={500}>Upload Images</Typography>
                                        </Grid>
                                }
                                <Grid item xs={12} gap='2rem' mb={2}>
                                    <div className='imageTray'>
                                        {
                                            templates.map((image, index) => {
                                                if (index === defaultImage)
                                                    return <div key={index} className='templateImage default'><img src={image} alt='' /></div>
                                                return <div key={index} onClick={() => setDefaultImage(index)} className='templateImage'><img src={image} alt='' /></div>
                                            })
                                        }
                                        <Button component="label" variant='contained' color='secondary' sx={{ aspectRatio: '1' }}
                                        >
                                            {
                                                uploadProgress ?
                                                    uploadProgress === 100 ?
                                                        <Icon box_style={{ fontSize: '2em' }} color='grey' icon={faPlus} /> :
                                                        <CircularProgress variant='determinate' value={uploadProgress} color='primary' /> :
                                                    <Icon style={{ fontSize: '2em' }} color='grey' icon={faPlus} />
                                            }
                                            <input accept="image/*" ref={fileRef} type="file" onInput={(e) => handleActions('uploadImage', e)} hidden />
                                        </Button>
                                    </div>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    {
                                        toggleAddProduct.action === 'update' ?
                                            <Button component="label" sx={{ borderRadius: '50px' }} variant='contained' fullWidth size='large' onClick={() => handleActions('update')}>
                                                UPDATE
                                            </Button> :
                                            <Button component="label" sx={{ borderRadius: '50px' }} variant='contained' fullWidth size='large'>
                                                ADD <input type="submit" hidden />
                                            </Button>
                                    }
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Button component="label" sx={{ borderRadius: '50px' }} variant='contained' fullWidth size='large' onClick={() => handleActions('reset')}>
                                        RESET
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Box>
                </Modal>
            </ThemeProvider>
        </>
    )
}

export default AddProduct
