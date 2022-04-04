import React, { useEffect, useState } from 'react'
import './addProduct.css'
import { Grid, Typography, Backdrop, Button, ThemeProvider, CircularProgress, Modal, Chip, Stack, Tooltip, TextField } from '@mui/material'
import InputField from '../../TextField/InputField'
import { useFirebase } from '../../../Context/FirebaseContext'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { Box } from '@mui/system'
import { useHelper } from '../../../Context/HelperContext'
import { IKUpload } from 'imagekitio-react'

function AddProduct({ setToggleAddProduct, toggleAddProduct }) {
    const [loading, setLoading] = useState(false)
    const [product, setProduct] = useState()
    const [defaultImage, setDefaultImage] = useState(0)
    const [imageURL, setImageURL] = useState([])
    const [imageTemplate, setImageTemplate] = useState([])
    const { theme } = useHelper()
    const [tag, setTag] = useState()
    const [newTag, setNewTag] = useState([])

    useEffect(() => {
        if (toggleAddProduct.action !== 'update') return
        setProduct(toggleAddProduct.payload)
        setImageTemplate(toggleAddProduct.payload.image)
        setNewTag(toggleAddProduct.payload.tags)
    }, [toggleAddProduct])

    const { addProductToDatabase, currentUser } = useFirebase()

    const handleActions = async (action, e) => {
        switch (action) {

            case 'submit':
                setToggleAddProduct({ open: false })
                setLoading(true)
                product.image = imageURL
                product.defaultImage = defaultImage
                product.tags = newTag
                product.uid = currentUser.uid
                addProductToDatabase(product)
                setNewTag([])
                setProduct('')
                setLoading(false)
                setImageTemplate([])
                setImageURL([])
                break;

            case 'update':
                product.image = [...imageURL, ...product.image]
                product.defaultImage = defaultImage
                product.tags = newTag
                await toggleAddProduct.isConfirmed(product)
                setToggleAddProduct({
                    open: false
                })
                setProduct([])
                setNewTag([])
                break;

            case 'close':
                setToggleAddProduct({ open: false })
                setProduct([])
                setNewTag([])
                setImageTemplate([])
                setImageURL([])
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
        width: '70%',
        bgcolor: 'background.paper',
        boxShadow: 5,
        overflow: 'hidden'
    };

    const handleTag = (action, input) => {
        switch (action) {
            case 'add':
                tag && setNewTag(pre => [tag, ...pre])
                setTag('')
                break;
            case 'remove':
                setNewTag(newTag?.filter(o => o !== input))
                break;

            default:
                break;
        }
    }

    return (
        <>
            <ThemeProvider theme={theme}>
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={loading}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
                <Modal
                    open={toggleAddProduct.open}
                    onClose={() => handleActions('close')}
                >
                    <Box sx={box_style}>
                        <form action='submit' onSubmit={(e) => {
                            e.preventDefault()
                            handleActions('submit')
                        }}>
                            <div className='boxHeader'>

                                {
                                    toggleAddProduct.action === 'update' ?
                                        <Typography variant='h6' fontSize={18}>Update Product</Typography> :
                                        <Typography variant='h6' fontSize={18}>Add Product</Typography>
                                }

                            </div>
                            <Grid container minWidth={300} padding='1em 2em 2em 2em' spacing={1} columnSpacing={3}>
                                <InputField required xs={12} value={product && product.name} label='Product Name' onChange={(e) => setProduct(pre => { return { ...pre, name: e.target.value } })} />
                                <InputField xs={12} md={12} value={product && product.description} label='Description' rows={3} onChange={(e) => setProduct(pre => { return { ...pre, description: e.target.value } })} />
                                <InputField required xs={3} md={2} value={product && product.category} label='Category' onChange={(e) => setProduct(pre => { return { ...pre, category: e.target.value } })} />
                                <InputField required xs={3} md={2} value={product && product.material} label='Material' onChange={(e) => setProduct(pre => { return { ...pre, material: e.target.value } })} />
                                <InputField required xs={6} md={2} value={product && product.dimension} label='Dimension' onChange={(e) => setProduct(pre => { return { ...pre, dimension: e.target.value } })} />
                                <Grid item xs={2}>
                                    <TextField variant='standard' size='small' type='number' required value={product && product.quantity} label='Quantity' onChange={(e) => setProduct(pre => { return { ...pre, quantity: e.target.value } })} />
                                </Grid>
                                <Grid item xs={2}>
                                    <TextField variant='standard' size='small' type='number' required value={product && product.price} label='Price' onChange={(e) => setProduct(pre => { return { ...pre, price: e.target.value } })} />
                                </Grid>
                                <Grid item xs={2}>
                                    <TextField variant='standard' size='small' type='number' required value={product && product.discount} label='Discount' onChange={(e) => setProduct(pre => { return { ...pre, discount: e.target.value } })} />
                                </Grid>
                                <Grid item xs={12} mt={2}>
                                    <Tooltip placement="bottom-start" arrow title="Add Tags for better search availability">
                                        <span>
                                            <Typography sx={{ display: 'inline-flex' }} mb={0.5} variant='h6' fontSize={16} fontWeight={500}>Tags</Typography>
                                        </span>
                                    </Tooltip>
                                    <Stack direction="row" spacing={1}>
                                        <InputField id='tagInput' value={tag} onChange={(e) => setTag(e.target.value)} md={2} label='Add tag' />
                                        <Button onClick={() => handleTag('add')} sx={{ height: '25px', alignSelf: 'flex-end' }}>Add</Button>
                                        {
                                            newTag && newTag.length > 0 && newTag.map((o, i) => (
                                                <Chip key={i} sx={{ alignSelf: 'flex-end' }} size='small' label={o} variant="outlined" onDelete={() => handleTag('remove', o)} />
                                            ))
                                        }
                                    </Stack>
                                </Grid>
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
                                            imageTemplate && imageTemplate.map((image, index) => {
                                                if (index === defaultImage)
                                                    return <div key={index} className='templateImage default'><img src={image} alt='' /></div>
                                                return <div key={index} onClick={() => setDefaultImage(index)} className='templateImage'><img src={image} alt='' /></div>
                                            })
                                        }
                                        <Button component="label" sx={{ aspectRatio: '1', border: '1px dashed grey' }}>
                                            <AddAPhotoIcon />
                                            <IKUpload
                                                folder={"/products-images"}
                                                onError={(err) => console.log(err)}
                                                onSuccess={(res) => {
                                                    setImageURL(pre => [...pre, res.url])
                                                    setImageTemplate(pre => [...pre, res.thumbnailUrl])
                                                }}
                                                hidden
                                            />
                                        </Button>
                                    </div>
                                </Grid>
                                <span style={{ display: 'flex', marginLeft: 'auto', marginTop: -45, gap: 10 }}>
                                    <Button sx={{ fontSize: 12, maxHeight: 30, minWidth: 120 }} component="label" variant='contained' fullWidth size='large' onClick={() => handleActions('close')}>CANCEL</Button>
                                    {
                                        toggleAddProduct.action === 'update' ?
                                            <Button sx={{ fontSize: 12, maxHeight: 30, minWidth: 120 }} component="label" variant='contained' fullWidth size='large' onClick={() => handleActions('update')}>
                                                UPDATE
                                            </Button> :
                                            <Button sx={{ fontSize: 12, maxHeight: 30, minWidth: 120 }} component="label" variant='contained' fullWidth size='large'>
                                                ADD <input type="submit" hidden />
                                            </Button>
                                    }
                                </span>
                            </Grid>
                        </form>
                    </Box>
                </Modal>
            </ThemeProvider>
        </>
    )
}

export default AddProduct
