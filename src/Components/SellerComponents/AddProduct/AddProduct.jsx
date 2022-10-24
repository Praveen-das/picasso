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
} from "@mui/material";
import InputField from "../../TextField/InputField";
import { useFirebase } from "../../../Context/FirebaseContext";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { Box } from "@mui/system";
import { useHelper } from "../../../Context/HelperContext";
import { IKUpload } from "imagekitio-react";
import { useDatabase } from "../../../Hooks/useDatabase";
import { useStore } from "../../../Context/Store";

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
    const [product, setProduct] = useState({
        name: '',
        description: '',
        category_id: 1,
        material_id: 1,
        size: '',
        quantity: '',
        discount: '',
        price: ''
    });

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

        if (model === "update") {
            console.log(product);

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
        setProduct((pre) => ({ ...pre, [key]: value }));
    }

    const open = model === "add" || model === "update"

    console.log(product);

    const box_style = {
        boxSizing: 'border-box',
        position: "absolute",
        display: 'grid',
        alignItems: 'center',
        inset: 0,
        margin: { xs: '0.5rem 1rem 0 1rem ', md: '0.5rem auto' },
        marginRight: { md: '0.5rem' },
        padding: { xs: '0 2rem', sm: '0 4rem' },
        maxWidth: { xs: '100%', md: '60%', lg: '45%' },
        bgcolor: "background.paper",
        boxShadow: 5,
        borderRadius: { md: '20px' },
    };

    const TF_Style = {
        variant: 'standard',
        fullWidth: true,
        required: true
    }

    return (
        <>
            <ThemeProvider theme={theme}>
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
                            <form action="submit" onSubmit={(e) => handleActions(e)}>
                                <Grid container minWidth={'300px'} spacing={3.2}  >
                                    {/*********** NAME ***********/}
                                    <Grid item xs={12} >
                                        <TextField
                                            label="Product Name"
                                            defaultValue={placeholder?.name}
                                            value={product?.name}
                                            onChange={(e) => setProductDetails("name", e.target.value)}
                                            {...TF_Style}
                                        />
                                    </Grid>
                                    {/*********** DESCRIPTION ***********/}
                                    <Grid item xs={12}>
                                        <TextField
                                            label="Description"
                                            defaultValue={placeholder?.description}
                                            value={product?.description}
                                            rows={3}
                                            multiline
                                            onChange={(e) =>
                                                setProductDetails("description", e.target.value)
                                            }
                                            {...TF_Style}
                                        />
                                    </Grid>
                                    {/*********** CATEGORY ***********/}
                                    <Grid item xs={3} md={6}>
                                        <TextField
                                            select
                                            label='Category'
                                            value={1}
                                            onChange={e => setProductDetails('category_id', e.target.value)}
                                            {...TF_Style}
                                        >
                                            <MenuItem value={1}>Ten</MenuItem>
                                            <MenuItem value={2}>Twenty</MenuItem>
                                            <MenuItem value={3}>Thirty</MenuItem>
                                        </TextField>
                                    </Grid>
                                    {/*********** MATERIAL ***********/}
                                    <Grid item xs={3} md={6}>
                                        <TextField
                                            select
                                            label='Material'
                                            value={1}
                                            onChange={e => setProductDetails('material_id', e.target.value)}
                                            {...TF_Style}
                                        >
                                            <MenuItem value={1}>Ten</MenuItem>
                                            <MenuItem value={2}>Twenty</MenuItem>
                                            <MenuItem value={3}>Thirty</MenuItem>
                                        </TextField>
                                    </Grid>
                                    {/*********** SIZE ***********/}
                                    <Grid item xs={6} md={3}>
                                        <TextField
                                            label="Dimension"
                                            defaultValue={placeholder?.size}
                                            value={product?.size}
                                            onChange={(e) => setProductDetails("size", e.target.value)}
                                            {...TF_Style}
                                        />
                                    </Grid>
                                    {/*********** QUANTITY/AVAILABILITY ***********/}
                                    <Grid item xs={3} md={3}>
                                        <TextField
                                            label="Quantity"
                                            type="number"
                                            defaultValue={placeholder?.quantity}
                                            value={product?.quantity}
                                            onChange={(e) => setProductDetails("quantity", e.target.value)}
                                            {...TF_Style}
                                        />
                                    </Grid>
                                    {/*********** PRICE ***********/}
                                    <Grid item xs={3}>
                                        <TextField
                                            label="Price"
                                            type="number"
                                            defaultValue={placeholder?.price}
                                            value={product?.price}
                                            onChange={(e) => setProductDetails("price", e.target.value)}
                                            {...TF_Style}
                                        />
                                    </Grid>
                                    {/*********** DISCOUNT ***********/}
                                    <Grid item xs={3}>
                                        <TextField
                                            label="Discount"
                                            type="number"
                                            defaultValue={placeholder?.discount}
                                            value={product?.discount}
                                            inputProps={{ type: 'number' }}
                                            onChange={(e) => setProductDetails("discount", e.target.value)}
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
