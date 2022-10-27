import { useEffect, useState } from "react";
import "./addProduct.css";
import {
    Grid,
    Typography,
    Button,
    ThemeProvider,
    Modal,
    TextField,
    Slide,
    MenuItem,
    CircularProgress,
} from "@mui/material";

import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { Box } from "@mui/system";
import { useHelper } from "../../../Context/HelperContext";
import { IKContext, IKUpload } from "imagekitio-react";
import { useDatabase } from "../../../Hooks/useDatabase";
import { useStore } from "../../../Context/Store";
import { Formik } from 'formik';
import { productValidation } from "../../../Schema/YupSchema";
import { box_style, TF_Style } from "./style";
import ImageTemplate from "./imageTemplate/ImageTemplate";
import { addProduct, deleteImage, fetchProducts } from "../../../lib/product.api";

import {
    useQueryClient,
    useMutation
} from '@tanstack/react-query'

function AddProduct({ setModel, model, _product }) {
    const queryClient = useQueryClient()
    const mutation = useMutation(addProduct, {
        onSuccess: () => {
            queryClient.invalidateQueries(['products'])
        },
    })

    const [placeholder, setPlaceholder] = useState();
    const [defaultImage, setDefaultImage] = useState(0);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const { theme } = useHelper();
    // const currentUser = useStore((state) => state?.auth?.user);

    useEffect(() => {
        if (model !== "update") {
            setPlaceholder({});
            return;
        }
        setPlaceholder(_product);
    }, [model, _product]);

    const handleActions = async (e) => {
        e.preventDefault();
        console.log(
            // {
            //     name: name.current.value,
            //     description: description.current.value,
            //     category_id: category_id.current.value,
            //     material_id: material_id.current.value,
            //     size: size.current.value,
            //     quantity: quantity.current.value,
            //     discount: discount.current.value,
            //     price: price.current.value,
            // }
        );

        if (model === "update") {

            return;
        }

        // switch (action) {

        //     case 'submit':
        //         setModel({ open: false })
        //         setLoading(true)
        //         product.image = images
        //         product.defaultImage = defaultImage
        //         product.tags = newTag
        //         product.uid = currentUser.uid
        //         addProductToDatabase(product)
        //         setProduct('')
        //         setLoading(false)
        //         setImages([])
        //         break;

        //     case 'update':
        //         product.image = [...images, ...product.image]
        //         product.defaultImage = defaultImage
        //         product.tags = newTag
        //         await model.isConfirmed(product)
        //         setModel({
        //             open: false
        //         })
        //         setProduct([])
        //         break;

        //     case 'close':
        //         setModel({ open: false })
        //         setProduct([])
        //         setImageTemplate([])
        //         setImages([])
        //         break;
        //     default:
        //         break;
        // }
    };

    const open = model === "add" || model === "update"

    const initialValues = {
        name: '',
        desc: '',
        category_id: 1,
        material_id: 1,
        width: 4,
        height: 2,
        quantity: 1,
        price: 1000,
        discount: 0,
    }

    function handleSubmit({ width, height, ...rest }) {
        const obj = {
            size: `${width}m x ${height}m`,
            images,
            ...rest
        }
        mutation.mutate(obj)
        setModel(false)
        setImages([])
    }

    function handleImages(image, index) {
        const setDefault = () => setDefaultImage(index)
        const _deleteImage = () =>
            deleteImage(image.fileId).then(() => {
                setImages(pre => pre.filter(o => o.fileId !== image.fileId))
            })

        return {
            setDefault,
            _deleteImage
        }
    }

    return (
        <>
            <ThemeProvider theme={theme}>
                <Modal
                    open={open}
                    onClose={() => setModel(false)}
                    closeAfterTransition
                >
                    <Slide direction="left" in={open} mountOnEnter unmountOnExit>
                        <Box sx={box_style}  >
                            <Formik
                                initialValues={initialValues}
                                validationSchema={productValidation}
                                onSubmit={(values, { setSubmitting }) => {
                                    handleSubmit(values);
                                    setSubmitting(false);
                                }}
                                validateOnChange={false}
                            >
                                {({
                                    values,
                                    errors,
                                    touched,
                                    handleChange,
                                    handleBlur,
                                    handleSubmit,
                                    isSubmitting,
                                }) => (
                                    <form action="submit" onSubmit={handleSubmit}>
                                        <Grid container minWidth={'300px'} spacing={3.2}  >
                                            {/*********** NAME ***********/}
                                            <Grid item xs={12} >
                                                <TextField
                                                    id="name"
                                                    name="name"
                                                    label="Product Name*"
                                                    defaultValue={placeholder?.name}
                                                    value={values.name}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={touched.name && Boolean(errors.name)}
                                                    {...TF_Style}
                                                />
                                            </Grid>
                                            {/*********** DESCRIPTION ***********/}
                                            <Grid item xs={12}>
                                                <TextField
                                                    id="desc"
                                                    name="desc"
                                                    label="Description*"
                                                    defaultValue={placeholder?.description}
                                                    rows={3}
                                                    multiline
                                                    value={values.desc}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={touched.desc && Boolean(errors.desc)}
                                                    {...TF_Style}
                                                />
                                            </Grid>
                                            {/*********** CATEGORY ***********/}
                                            <Grid item xs={3} md={3}>
                                                <TextField
                                                    id="category_id"
                                                    name="category_id"
                                                    label='Category'
                                                    select
                                                    value={values.category_id}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={
                                                        touched.category_id &&
                                                        Boolean(errors.category_id)
                                                    }
                                                    {...TF_Style}
                                                >
                                                    <MenuItem value={1}>Ten</MenuItem>
                                                    <MenuItem value={2}>Twenty</MenuItem>
                                                    <MenuItem value={3}>Thirty</MenuItem>
                                                </TextField>
                                            </Grid>
                                            {/*********** MATERIAL ***********/}
                                            <Grid item xs={3} md={3}>
                                                <TextField
                                                    id="material_id"
                                                    name="material_id"
                                                    label='Material'
                                                    select
                                                    value={values.material_id}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={touched.material_id && Boolean(errors.material_id)}
                                                    {...TF_Style}
                                                >
                                                    <MenuItem value={1}>Ten</MenuItem>
                                                    <MenuItem value={2}>Twenty</MenuItem>
                                                    <MenuItem value={3}>Thirty</MenuItem>
                                                </TextField>
                                            </Grid>
                                            {/*********** WIDTH ***********/}
                                            <Grid item xs={2} md={3}>
                                                <TextField
                                                    id="width"
                                                    name="width"
                                                    label="Width(m)"
                                                    type='number'
                                                    defaultValue={placeholder?.width}
                                                    value={values.width}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={touched.width && Boolean(errors.width)}
                                                    {...TF_Style}
                                                />
                                            </Grid>
                                            {/*********** HEIGHT ***********/}
                                            <Grid item xs={2} md={3}>
                                                <TextField
                                                    id="height"
                                                    name="height"
                                                    label="Height(m)"
                                                    type='number'
                                                    defaultValue={placeholder?.height}
                                                    value={values.height}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={touched.height && Boolean(errors.height)}
                                                    {...TF_Style}
                                                />
                                            </Grid>
                                            {/*********** QUANTITY/AVAILABILITY ***********/}
                                            <Grid item xs={3} md={4}>
                                                <TextField
                                                    id="quantity"
                                                    name="quantity"
                                                    label="Quantity"
                                                    type="number"
                                                    defaultValue={placeholder?.quantity}
                                                    value={values.quantity}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={touched.quantity && Boolean(errors.quantity)}
                                                    {...TF_Style}
                                                />
                                            </Grid>
                                            {/*********** PRICE ***********/}
                                            <Grid item xs={4}>
                                                <TextField
                                                    id="price"
                                                    name="price"
                                                    label="Price"
                                                    type="number"
                                                    defaultValue={placeholder?.price}
                                                    value={values.price}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={touched.price && Boolean(errors.price)}
                                                    {...TF_Style}
                                                />
                                            </Grid>
                                            {/*********** DISCOUNT ***********/}
                                            <Grid item xs={4}>
                                                <TextField
                                                    id="discount"
                                                    name="discount"
                                                    label="Discount(%)"
                                                    type="number"
                                                    defaultValue={placeholder?.discount}
                                                    inputProps={{ pattern: '[0-9]*' }}
                                                    value={values.discount}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={touched.discount && Boolean(errors.discount)}
                                                    {...TF_Style}
                                                />
                                            </Grid>
                                            {/*********** IMAGEKIT ***********/}
                                            <Grid item xs={12} gap="2rem" mt={2}>
                                                <Typography variant="h6" fontSize={16} fontWeight={500}>
                                                    {model === "update" ? 'Add more Images' : 'Upload Images*'}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12}  >
                                                <div className="imageTray">
                                                    <Button
                                                        disabled={images?.length === 5 || loading}
                                                        component="label"
                                                        sx={{ aspectRatio: "1", border: "1px dashed #a1a1a1dc" }}
                                                    >
                                                        {
                                                            loading ?
                                                                <CircularProgress />
                                                                :
                                                                <AddAPhotoIcon />
                                                        }
                                                        <IKContext
                                                            publicKey={process.env.REACT_APP_PUBLIC_KEY}
                                                            urlEndpoint={process.env.REACT_APP_URL_ENDPOINT}
                                                            authenticationEndpoint={process.env.REACT_APP_AUTH_ENDPOINT}
                                                        >
                                                            <IKUpload
                                                                onUploadStart={() => setLoading(true)}
                                                                onError={(err) => console.log(err)}
                                                                onSuccess={(res) => {
                                                                    setImages(pre => [...pre, res]);
                                                                    setLoading(false)
                                                                }}
                                                                hidden
                                                            />
                                                        </IKContext>
                                                    </Button>
                                                    {
                                                        images?.map((image, index) =>
                                                            index === defaultImage ?
                                                                <ImageTemplate key={image.fileId} image={image} defaultImage {...handleImages(image, index)} />
                                                                :
                                                                <ImageTemplate key={image.fileId} image={image} {...handleImages(image, index)} />
                                                        )
                                                    }
                                                </div>
                                            </Grid>
                                            <Grid item xs={6} >
                                                <Button
                                                    component="label"
                                                    variant="contained"
                                                    fullWidth
                                                    size="medium"
                                                    onClick={() => {
                                                        setImages([])
                                                        setModel(false)
                                                    }}
                                                >
                                                    CANCEL
                                                </Button>
                                            </Grid>
                                            <Grid item xs={6}  >
                                                <Button
                                                    component="label"
                                                    variant="contained"
                                                    fullWidth
                                                    size="medium"
                                                    disabled={isSubmitting}
                                                >
                                                    {
                                                        model === "update" ?
                                                            <>
                                                                UPDATE < input type="submit" hidden />
                                                            </> :
                                                            <>
                                                                ADD <input type="submit" hidden />
                                                            </>
                                                    }
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </form>
                                )}
                            </Formik>
                        </Box>
                    </Slide>
                </Modal>
            </ThemeProvider>
        </>
    );
}

export default AddProduct;
