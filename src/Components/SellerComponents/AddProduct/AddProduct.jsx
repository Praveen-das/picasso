import { useState } from "react";
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
import { FieldArray, Formik } from "formik";
import {
  productUpdateValidation,
  productValidation,
} from "../../../Schema/YupSchema";
import { box_style, TF_Style } from "./style";
import ImageTemplate from "./imageTemplate/ImageTemplate";
import {
  deleteImage,
} from "../../../lib/product.api";

import { useAdmin } from "../../../Hooks/useProducts";

function AddProduct({ setModel, model, _product }) {

  const { addProduct, updateProduct, products } = useAdmin()

  const [loading, setLoading] = useState(false);
  const { theme } = useHelper();

  const open = model === "add" || model === "update";

  const initialValues = {
    name: "",
    desc: "",
    category_id: 0,
    material_id: 0,
    width: "",
    height: "",
    quantity: "",
    price: "",
    discount: 0,
    images: undefined,
    defaultImage: "",
  };

  const updatesPlaceholder = {
    name: _product?.name,
    desc: _product?.desc,
    category_id: _product?.category.id,
    material_id: _product?.material.id,
    width: _product?.width,
    height: _product?.height,
    quantity: _product?.quantity,
    price: _product?.price,
    discount: _product?.discount,
    images: _product?.images,
    defaultImage: _product?.defaultImage,
  };

  function handleSubmit(obj) {
    if (model === "add")
      return addProduct.mutateAsync(obj)
        .then(() => setModel(false))
    updateProduct.mutateAsync({ id: _product.id, updates: obj }).then(() =>
      setModel(false)
    );
  }

  function handleImages(images, index, remove, setDefaultImage) {
    const setDefault = () =>
      setDefaultImage("defaultImage", images[index].fileId);
    const _deleteImage = () =>
      deleteImage(images[index].fileId).then(() => {
        if (index === 0) setDefaultImage("defaultImage", images[1].fileId);
        remove(index);
      });

    return {
      setDefault,
      _deleteImage,
      key: images[index].fileId,
      image: images[index],
    };
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <Modal
          open={open}
          onClose={() => setModel("null")}
          closeAfterTransition
        >
          <Slide direction="left" in={open} mountOnEnter unmountOnExit>
            <Box sx={box_style}>
              <Formik
                initialValues={model === "add" ? initialValues : updatesPlaceholder}
                validationSchema={
                  model === "add" ? productValidation : productUpdateValidation
                }
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
                  isSubmitting,
                  setFieldValue,
                  setFieldError,
                  handleSubmit
                }) => (
                  <form onSubmit={handleSubmit}>
                    <Grid container minWidth={"300px"} spacing={3.2}>
                      <>
                        {/*********** NAME ***********/}
                        <Grid item xs={12}>
                          <TextField
                            id="name"
                            name="name"
                            label="Product Name*"
                            value={values?.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.name && Boolean(errors.name)}
                            helperText={touched.name && errors.name}
                            {...TF_Style}
                          />
                        </Grid>
                        {/*********** DESCRIPTION ***********/}
                        <Grid item xs={12}>
                          <TextField
                            id="desc"
                            name="desc"
                            label="Description*"
                            value={values?.desc}
                            rows={3}
                            multiline
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.desc && Boolean(errors.desc)}
                            helperText={touched.desc && errors.desc}
                            {...TF_Style}
                          />
                        </Grid>
                        {/*********** CATEGORY ***********/}
                        <Grid item xs={3} md={3}>
                          <TextField
                            id="category_id"
                            name="category_id"
                            label="Category"
                            select
                            value={values?.category_id}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              touched.category_id && Boolean(errors.category_id)
                            }
                            helperText={touched.category_id && errors.category_id}
                            {...TF_Style}
                          >
                            {
                              products.data && products.data[2]?.map(category => (
                                <MenuItem key={category?.id} value={category?.id}>{category?.name}</MenuItem>
                              ))
                            }
                          </TextField>
                        </Grid>
                        {/*********** MATERIAL ***********/}
                        <Grid item xs={3} md={3}>
                          <TextField
                            id="material_id"
                            name="material_id"
                            label="Material"
                            select
                            value={values?.material_id}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              touched.material_id && Boolean(errors.material_id)
                            }
                            helperText={touched.material_id && errors.material_id}
                            {...TF_Style}
                          >
                            {
                              products.data && products.data[3]?.map(material => (
                                <MenuItem key={material?.id} value={material?.id}>{material?.name}</MenuItem>
                              ))
                            }
                          </TextField>
                        </Grid>
                        {/*********** WIDTH ***********/}
                        <Grid item xs={2} md={3}>
                          <TextField
                            id="width"
                            name="width"
                            label="Width(m)"
                            type="number"
                            value={values?.width}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.width && Boolean(errors.width)}
                            helperText={touched.width && errors.width}
                            {...TF_Style}
                          />
                        </Grid>
                        {/*********** HEIGHT ***********/}
                        <Grid item xs={2} md={3}>
                          <TextField
                            id="height"
                            name="height"
                            label="Height(m)"
                            type="number"
                            value={values?.height}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.height && Boolean(errors.height)}
                            helperText={touched.height && errors.height}
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
                            value={values?.quantity}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.quantity && Boolean(errors.quantity)}
                            helperText={touched.quantity && errors.quantity}
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
                            value={values?.price}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.price && Boolean(errors.price)}
                            helperText={touched.price && errors.price}
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
                            value={values?.discount}
                            inputProps={{ pattern: "[0-9]*" }}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.discount && Boolean(errors.discount)}
                            helperText={touched.discount && errors.discount}
                            {...TF_Style}
                          />
                        </Grid>
                        {/*********** IMAGEKIT ***********/}
                        <Grid item xs={12} gap="2rem" mt={2}>
                          <Typography variant="h6" fontSize={16} fontWeight={500}>
                            {model === "update"
                              ? "Add more Images"
                              : "Upload Images*"}
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <FieldArray id="images" name="images">
                            {({ remove, insert }) => (
                              <div className="imageTray">
                                <Button
                                  // disabled={images?.length === 5 || loading}
                                  component="label"
                                  sx={{
                                    aspectRatio: "1",
                                    border: `1px dashed ${touched?.images && Boolean(errors?.images)
                                      ? "red"
                                      : "#a1a1a1dc"
                                      }`,
                                  }}
                                >
                                  {loading ? (
                                    <CircularProgress />
                                  ) : (
                                    <AddAPhotoIcon />
                                  )}
                                  <IKContext
                                    publicKey={process.env.REACT_APP_PUBLIC_KEY}
                                    urlEndpoint={
                                      process.env.REACT_APP_URL_ENDPOINT
                                    }
                                    authenticationEndpoint={
                                      process.env.REACT_APP_AUTH_ENDPOINT
                                    }
                                  >
                                    <IKUpload
                                      onUploadStart={() => setLoading(true)}
                                      onError={(err) => console.log(err)}
                                      onSuccess={(res) => {
                                        setFieldValue("defaultImage", res.fileId);
                                        setLoading(false);
                                        insert(0, res);
                                        setFieldError("images", "");
                                      }}
                                      hidden
                                    />
                                  </IKContext>
                                </Button>
                                {values.images?.map((image, index) =>
                                  image.fileId === values?.defaultImage ? (
                                    <ImageTemplate
                                      {...handleImages(
                                        values.images,
                                        index,
                                        remove,
                                        setFieldValue
                                      )}
                                      defaultImage
                                    />
                                  ) : (
                                    <ImageTemplate
                                      {...handleImages(
                                        values.images,
                                        index,
                                        remove,
                                        setFieldValue
                                      )}
                                    />
                                  )
                                )}
                              </div>
                            )}
                          </FieldArray>
                        </Grid>
                      </>
                      <Grid item xs={6}>
                        <Button
                          component="label"
                          variant="contained"
                          fullWidth
                          size="medium"
                          onClick={() => setModel("null")}
                        >
                          CANCEL
                        </Button>
                      </Grid>
                      <Grid item xs={6}>
                        <Button
                          variant="contained"
                          fullWidth
                          size="medium"
                          type="submit"
                          disabled={isSubmitting}
                        >
                          {model === "update" ? "UPDATE" : "ADD"}
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
