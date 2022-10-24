import React, { useEffect, useRef, useState } from "react";
import "./addProduct.css";
import {
    Grid,
    Typography,
    Backdrop,
    Button,
    ThemeProvider,
    CircularProgress,
    Modal,
    TextField,
    Slide,
    MenuItem,
    CssBaseline,
    FormControl,
    InputLabel,
    Input,
    FormHelperText,
} from "@mui/material";
import InputField from "../../TextField/InputField";
import { useFirebase } from "../../../Context/FirebaseContext";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { Box } from "@mui/system";
import { useHelper } from "../../../Context/HelperContext";
import { IKUpload } from "imagekitio-react";
import { useDatabase } from "../../../Hooks/useDatabase";
import { useStore } from "../../../Context/Store";
import { useFormik } from 'formik';
import { productValidation } from "../../../Schema/YupSchema";
import { box_style, TF_Style } from "./style";

function AddProduct({ setModel, model, _product }) {
    const [loading, setLoading] = useState(false);
    const [placeholder, setPlaceholder] = useState();
    const [defaultImage, setDefaultImage] = useState(0);
    const [imageURL, setImageURL] = useState([]);
    const [imageTemplate, setImageTemplate] = useState([]);
    const { theme } = useHelper();
    const [tag, setTag] = useState();
    const [newTag, setNewTag] = useState([]);
    const currentUser = useStore((state) => state?.auth?.user);
    const { updateProduct } = useDatabase();

    useEffect(() => {
        if (model !== "update") {
            setPlaceholder({});
            setImageTemplate([]);
            setNewTag([]);
            return;
        }
        setImageTemplate(_product?.image);
        setNewTag(_product?.tags);
        setPlaceholder(_product);
    }, [model]);

    const { addProductToDatabase } = useDatabase();

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
        //         product.image = imageURL
        //         product.defaultImage = defaultImage
        //         product.tags = newTag
        //         product.uid = currentUser.uid
        //         addProductToDatabase(product)
        //         setNewTag([])
        //         setProduct('')
        //         setLoading(false)
        //         setImageTemplate([])
        //         setImageURL([])
        //         break;

        //     case 'update':
        //         product.image = [...imageURL, ...product.image]
        //         product.defaultImage = defaultImage
        //         product.tags = newTag
        //         await model.isConfirmed(product)
        //         setModel({
        //             open: false
        //         })
        //         setProduct([])
        //         setNewTag([])
        //         break;

        //     case 'close':
        //         setModel({ open: false })
        //         setProduct([])
        //         setNewTag([])
        //         setImageTemplate([])
        //         setImageURL([])
        //         break;
        //     default:
        //         break;
        // }
    };

    function setProductDetails(key, value) {
        // setProduct((pre) => ({ ...pre, [key]: value }));
    }

    const open = model === "add" || model === "update"

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            category_id: 1,
            material_id: 1,
            width: 2,
            height: 2,
            quantity: 1,
            price: 1000,
            discount: 0,
        },
        validationSchema: productValidation,
        onSubmit: (values) => {
            console.log(values);
        },
    });

    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {/* <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={loading}
                >
                    <CircularProgress color="inherit" />
                </Backdrop> */}
                <Modal
                    open={open}
                    onClose={() => setModel(false)}
                    closeAfterTransition
                >
                    <Slide direction="left" in={open} mountOnEnter unmountOnExit>
                        <Box sx={box_style}  >
                            <form action="submit" onSubmit={formik.handleSubmit}>
                                <Grid container minWidth={'300px'} spacing={3.2}  >
                                    {/*********** NAME ***********/}
                                    <Grid item xs={12} >
                                        <TextField
                                            id="name"
                                            name="name"
                                            label="Product Name"
                                            defaultValue={placeholder?.name}
                                            value={formik.values.name}
                                            onChange={formik.handleChange}
                                            error={formik.touched.name && Boolean(formik.errors.name)}
                                            // helperText={formik.touched.name && formik.errors.name}
                                            {...TF_Style}
                                        />
                                        <FormHelperText
                                            sx={{ position: 'absolute', right: 0, bottom: 6 }}
                                            error={formik.touched.name && Boolean(formik.errors.name)}
                                            id="name"
                                            name="name"
                                        >{formik.touched.name && formik.errors.name}
                                        </FormHelperText>
                                        {/* </FormControl> */}
                                        {/* <TextField
                                            id="name"
                                            name="name"
                                            label="Product Name"
                                            defaultValue={placeholder?.name}
                                            value={formik.values.name}
                                            onChange={formik.handleChange}
                                            error={formik.touched.name && Boolean(formik.errors.name)}
                                            helperText={formik.touched.name && formik.errors.name}
                                            {...TF_Style}
                                        /> */}
                                    </Grid>
                                    {/*********** DESCRIPTION ***********/}
                                    <Grid item xs={12}>
                                        <TextField
                                            id="description"
                                            name="description"
                                            label="Description"
                                            defaultValue={placeholder?.description}
                                            rows={3}
                                            multiline
                                            value={formik.values.description}
                                            onChange={formik.handleChange}
                                            error={formik.touched.description && Boolean(formik.errors.description)}
                                            helperText={formik.touched.description && formik.errors.description}
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
                                            value={formik.values.category_id}
                                            onChange={formik.handleChange}
                                            error={formik.touched.category_id && Boolean(formik.errors.category_id)}
                                            helperText={formik.touched.category_id && formik.errors.category_id}
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
                                            value={formik.values.material_id}
                                            onChange={formik.handleChange}
                                            error={formik.touched.material_id && Boolean(formik.errors.material_id)}
                                            helperText={formik.touched.material_id && formik.errors.material_id}
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
                                            defaultValue={placeholder?.width}
                                            value={formik.values.width}
                                            onChange={formik.handleChange}
                                            error={formik.touched.width && Boolean(formik.errors.width)}
                                            helperText={formik.touched.width && formik.errors.width}
                                            {...TF_Style}
                                        />
                                    </Grid>
                                    {/*********** HEIGHT ***********/}
                                    <Grid item xs={2} md={3}>
                                        <TextField
                                            id="height"
                                            name="height"
                                            label="Height(m)"
                                            defaultValue={placeholder?.height}
                                            value={formik.values.height}
                                            onChange={formik.handleChange}
                                            error={formik.touched.height && Boolean(formik.errors.height)}
                                            helperText={formik.touched.height && formik.errors.height}
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
                                            value={formik.values.quantity}
                                            onChange={formik.handleChange}
                                            error={formik.touched.quantity && Boolean(formik.errors.quantity)}
                                            helperText={formik.touched.quantity && formik.errors.quantity}
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
                                            value={formik.values.price}
                                            onChange={formik.handleChange}
                                            error={formik.touched.price && Boolean(formik.errors.price)}
                                            helperText={formik.touched.price && formik.errors.price}
                                            {...TF_Style}
                                        />
                                    </Grid>
                                    {/*********** DISCOUNT ***********/}
                                    <Grid item xs={4}>
                                        <TextField
                                            id="discount"
                                            name="discount"
                                            label="Discount"
                                            type="number"
                                            defaultValue={placeholder?.discount}
                                            inputProps={{ pattern: '[0-9]*' }}
                                            value={formik.values.discount}
                                            onChange={formik.handleChange}
                                            error={formik.touched.discount && Boolean(formik.errors.discount)}
                                            helperText={formik.touched.discount && formik.errors.discount}
                                            {...TF_Style}
                                        />
                                    </Grid>
                                    {/*********** IMAGEKIT ***********/}
                                    <Grid item xs={12} gap="2rem" mt={2}>
                                        <Typography variant="h6" fontSize={16} fontWeight={500}>
                                            {model === "update" ? 'Add more Images' : 'Upload Images'}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}  >
                                        <div className="imageTray">
                                            <Button
                                                disabled={imageURL?.length === 5}
                                                component="label"
                                                sx={{ aspectRatio: "1", border: "1px dashed #a1a1a1dc" }}
                                            >
                                                <AddAPhotoIcon />
                                                <IKUpload
                                                    folder={"/products-images"}
                                                    onError={(err) => console.log(err)}
                                                    onSuccess={(res) => {
                                                        console.log(res);
                                                        setImageURL((pre) => [...pre, res]);
                                                    }}
                                                    hidden
                                                />
                                            </Button>
                                            {
                                                imageURL?.map((image, index) =>
                                                    index === defaultImage ?
                                                        <div key={image.fileId} className="templateImage default">
                                                            <img src={image.thumbnailUrl} alt="" />
                                                        </div>
                                                        :
                                                        <div
                                                            key={image.fileId}
                                                            onClick={() => setDefaultImage(index)}
                                                            className="templateImage"
                                                        >
                                                            <img src={image.thumbnailUrl} alt="" />
                                                        </div>
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
                                                setImageURL([])
                                                setImageTemplate([])
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
                        </Box>
                    </Slide>
                </Modal>
            </ThemeProvider>
        </>
    );
}

export default AddProduct;
