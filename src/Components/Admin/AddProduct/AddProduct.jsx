import React, { useState } from 'react'
import Footer from '../../Admin/Header/Header'
import './addProduct.css'
import { Grid, Typography, TextField, Button, ThemeProvider, createTheme, CircularProgress } from '@mui/material'
import Stack from '@mui/material/Stack';
import InputField from './InputField'
import { useFirebase } from '../../../Context/FirebaseContext'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons';


function AddProduct({ setToggleAddProduct }) {
    const [productName, setProductName] = useState()
    const [category, setCategory] = useState()
    const [description, setDescription] = useState()
    const [quantity, setQuantity] = useState()
    const [price, setPrice] = useState()
    const [discount, setDiscount] = useState()
    const [material, setMaterial] = useState()
    const [dimension, setDimension] = useState()

    const { addProductToDatabase, uploadImage, uploadProgress, imageUrl } = useFirebase()

    const theme = createTheme({
        palette: {
            primary: {
                main: 'rgb(255, 126, 21)',
                dark: 'rgb(255, 150, 30)',
                contrastText: '#fff'
            },
            secondary: {
                main: 'hsl(0, 0%, 20%);',
                dark: 'hsl(0, 0%, 30%);',
                contrastText: '#fff'
            }
        }
    })


    const handleActions = (action, event) => {

        switch (action) {
            case 'submit':
                const data =
                {
                    id: 'id_' + Math.floor(Math.random() * 100000000000 + 1),
                    product: productName,
                    description: description ? description : '',
                    category: category,
                    material: material,
                    diamension: dimension,
                    quantity: quantity,
                    price: price,
                    discount: discount ? discount : ''
                }
                addProductToDatabase(data)
                break;
            case 'reset':
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
                const file = event.target.files[0]
                uploadImage(file)
                break;
            default:
                break;
        }
    }

    return (
        <>
            <ThemeProvider theme={theme}>
                <form action='submit' onSubmit={(e) => {
                    e.preventDefault()
                    handleActions('submit')
                }}>
                    <Grid container minWidth={300} mt={'1rem'} maxWidth={'102%'} spacing={2} sx={{
                        position: 'relative',
                        zIndex: '1',
                        mb: '3rem'
                    }}>
                        <Grid item xs={12} >
                            <Typography variant='h6'>Add Product</Typography>
                        </Grid>
                        <InputField required={true} xs={12} value={productName} label='Product Name' onChange={(e) => setProductName(e.target.value)} />
                        <InputField xs={12} value={description} label='Description' rows={4} onChange={(e) => setDescription(e.target.value)} />
                        <InputField required={true} xs={12} value={category} md={6} label='Category' onChange={(e) => setCategory(e.target.value)} />
                        <InputField required={true} xs={12} value={material} md={6} label='Material' onChange={(e) => setMaterial(e.target.value)} />
                        <InputField required={true} xs={6} value={dimension} md={3} label='Dimension' onChange={(e) => setDimension(e.target.value)} />
                        <InputField required={true} xs={6} value={quantity} md={3} label='Quantity' onChange={(e) => setQuantity(e.target.value)} />
                        <InputField required={true} xs={6} value={price} md={3} label='Price' onChange={(e) => setPrice(e.target.value)} />
                        <InputField xs={6} value={discount} md={3} label='Discount' onChange={(e) => setDiscount(e.target.value)} />
                        <Grid item xs={12} gap='2rem'>
                            <div className='imageTray'>
                                {
                                    imageUrl &&
                                    imageUrl.map((image,index) => {
                                        return <img key={index} style={{
                                            width: '100px',
                                            height: '100px',
                                            backgroundSize: 'cover',
                                            display: 'block'
                                        }} src={image} />
                                    })
                                }
                                <Button
                                    component="label"
                                    variant='contained'
                                    color='secondary'
                                    sx={{
                                        width: '100px',
                                        height: '100px',
                                        textAlign: 'center',
                                        borderRadius: '0',
                                        fontSize: '12px'
                                    }}
                                >   {
                                        uploadProgress ?
                                            uploadProgress === 100 ?
                                            <Icon style={{fontSize:'2em'}} icon={faPlus}/> :
                                                <CircularProgress variant='determinate' value={uploadProgress} color='primary' /> : 'upload images'
                                    }
                                    <input type="file" onInput={(e) => handleActions('uploadImage', e)} hidden />
                                </Button>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Button
                                component="label"
                                variant='contained'
                                fullWidth
                                size='large'
                            >
                                Submit
                                <input type="submit" hidden />
                            </Button>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Button
                                component="label"
                                variant='contained'
                                fullWidth
                                size='large'
                                onClick={() => handleActions('reset')}
                            >
                                Reset
                            </Button>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Button
                                component="label"
                                variant='contained'
                                fullWidth
                                size='large'
                                onClick={() => handleActions('close')}
                            >
                                Close
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </ThemeProvider>
        </>
    )
}

export default AddProduct
