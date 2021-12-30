import React, { useRef, useState } from 'react'
import './addProduct.css'
import { Grid, Typography, Backdrop, Button, ThemeProvider, createTheme, CircularProgress, Modal, IconButton } from '@mui/material'
import InputField from './InputField'
import { useFirebase } from '../../../Context/FirebaseContext'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import CloseIcon from '@mui/icons-material/Close';
import { Box } from '@mui/system'


function AddProduct({ setToggleAddProduct, toggleAddProduct, product }) {
    const [productName, setProductName] = useState()
    const [category, setCategory] = useState()
    const [description, setDescription] = useState()
    const [quantity, setQuantity] = useState()
    const [price, setPrice] = useState()
    const [discount, setDiscount] = useState()
    const [material, setMaterial] = useState()
    const [dimension, setDimension] = useState()
    const [templates, setTemplates] = useState([])
    const [payload, setPayload] = useState([])
    const [loading, setLoaing] = useState(false)

    const fileRef = useRef()

    const { addProductToDatabase, uploadImage, uploadProgress } = useFirebase()

    const theme = createTheme({
        palette: {
            primary: {
                main: 'rgb(255, 126, 21)',
                dark: 'rgb(255, 150, 30)',
                contrastText: '#fff'
            },
            secondary: {
                main: 'hsl(0, 0%, 90%);',
                dark: 'hsl(0, 0%, 80%);',
                contrastText: '#111'
            }
        }
    })


    const handleActions = (action, e) => {
        switch (action) {
            case 'submit':
                setLoaing(true)
                Promise.all(payload.map((file) => uploadImage(file)))
                    .then((imageURL) => {
                        const data =
                        {
                            id: 'id_' + Math.floor(Math.random() * 100000000000 + 1),
                            product: productName,
                            description: description ? description : 'null',
                            category: category,
                            material: material,
                            diamension: dimension,
                            quantity: quantity,
                            price: price,
                            discount: discount ? discount : 'null',
                            image_url: imageURL
                        }
                        addProductToDatabase(data)
                        setPayload([])
                        setProductName('')
                        setDescription('')
                        setCategory('')
                        setMaterial('')
                        setDimension('')
                        setQuantity('')
                        setPrice('')
                        setDiscount('')
                        setLoaing(false)
                        setTemplates([])
                    }).catch(error => console.log(error))
                break;

            case 'reset':
                setTemplates([])
                setProductName('')
                setDescription('')
                setCategory('')
                setMaterial('')
                setDimension('')
                setQuantity('')
                setPrice('')
                setDiscount('')
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

    const style = {
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
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={loading}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
                <Modal
                    open={toggleAddProduct.open}
                    onClose={() => setToggleAddProduct(false)}
                >
                    <Box sx={style}>
                        <form action='submit' onSubmit={(e) => {
                            e.preventDefault()
                            handleActions('submit')
                        }}>
                            <Grid container minWidth={300} spacing={1.5}>
                                <Grid item sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} xs={12} mb={2}>
                                    <Typography variant='h6'>Add Product</Typography>
                                    <IconButton>
                                        <CloseIcon onClick={() => setToggleAddProduct(false)} />
                                    </IconButton>
                                </Grid>
                                <InputField required={true} xs={12} value={productName} label='Product Name' onChange={(e) => setProductName(e.target.value)} />
                                <InputField xs={12} value={description} label='Description' rows={4} onChange={(e) => setDescription(e.target.value)} />
                                <InputField required={true} xs={12} value={category} md={6} label='Category' onChange={(e) => setCategory(e.target.value)} />
                                <InputField required={true} xs={12} value={material} md={6} label='Material' onChange={(e) => setMaterial(e.target.value)} />
                                <InputField required={true} xs={6} value={dimension} md={3} label='Dimension' onChange={(e) => setDimension(e.target.value)} />
                                <InputField required={true} xs={6} value={quantity} md={3} label='Quantity' onChange={(e) => setQuantity(e.target.value)} />
                                <InputField required={true} xs={6} value={price} md={3} label='Price' onChange={(e) => setPrice(e.target.value)} />
                                <InputField xs={6} value={discount} md={3} label='Discount' onChange={(e) => setDiscount(e.target.value)} />
                                <Grid item xs={12} gap='2rem' mt={2}>
                                    <Typography variant='h6' fontSize={16} fontWeight={500}>Upload Images</Typography>
                                </Grid>
                                <Grid item xs={12} gap='2rem' mb={2}>
                                    <div className='imageTray'>
                                        {
                                            templates.map((image, index) => {
                                                return <img key={index} src={image} alt='' />
                                            })
                                        }
                                        <Button component="label" variant='contained' color='secondary' sx={{ aspectRatio: '1' }}
                                        >
                                            {
                                                uploadProgress ?
                                                    uploadProgress === 100 ?
                                                        <Icon style={{ fontSize: '2em' }} color='grey' icon={faPlus} /> :
                                                        <CircularProgress variant='determinate' value={uploadProgress} color='primary' /> :
                                                    <Icon style={{ fontSize: '2em' }} color='grey' icon={faPlus} />
                                            }
                                            <input ref={fileRef} type="file" onInput={(e) => handleActions('uploadImage', e)} hidden />
                                        </Button>
                                    </div>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Button component="label" variant='contained' fullWidth size='large'>
                                        ADD
                                        <input type="submit" hidden />
                                    </Button>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Button component="label" variant='contained' fullWidth size='large' onClick={() => handleActions('reset')}
                                    >
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
