import { useEffect, useMemo, useState } from 'react';
import { deleteImage } from '../../../../Services/product.api';
import { useAdmin } from '../../../../Hooks/useProducts';
import { Alert, Box, Button, Grid, LinearProgress, MenuItem, Snackbar, Typography } from '@mui/material';
import TextField from '../../../Ui/TextField';
import { FastField, Field, FieldArray, Form, Formik } from 'formik';
import { productUpdateValidation, productValidation } from "../../../../Schema/productSchema";
import { ImageUploader } from './ImageUploader';
import { findChangedValues } from '../../../../Utils/utils';
import { uploadImages } from '../../../../lib/uploadImages';
import useFacets from '../../../../Hooks/useFacets';
import LoadingScreen from '../../../Ui/LoadingScreen'

export function AddItem({ onClose, payload }) {
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState(null);
    const { addProduct, updateProduct } = useAdmin();

    const { facets: { data, isLoading }, } = useFacets();
    const categories = data?.allCategories || [];
    const subCategory = data?.allMediums || [];
    const subject = data?.allSubjects || [];
    const style = data?.allStyles || [];
    const materials = data?.allMaterials || [];
    const collections = data?.collections || [];

    function handleSubmit({ deletedImages, ...productData }, { setSubmitting, resetForm }) {

        if (productData.collections_id === '')
            productData.collections_id = null

        function handleUpdates(updates) {
            updateProduct
                .mutateAsync({ id: payload.id, updates })
                .then(() => {
                    setStatus('success');
                    resetForm({
                        values: {
                            ...productData,
                            ...updates,
                        }
                    });
                })
                .catch(err => {
                    setStatus('error');
                })
                .finally(() => {
                    setProgress(0);
                    setSubmitting(false);
                });
        }

        if (payload) {
            let updates = findChangedValues(payload, productData);
            if (!Object.values(updates).length) {
                setStatus('no changes');
                setSubmitting(false);
                return;
            }

            if (!!deletedImages?.length) deleteImage(deletedImages);

            if (!!updates.images) {
                setStatus('uploading');
                uploadImages(
                    updates.images,
                    (value) => setProgress(value))
                    .then(res => {
                        let data = { ...updates, images: res };
                        handleUpdates(data);
                    })
                    .catch(err => console.log(err));
            } else {
                handleUpdates(updates);
            }

        }
        else {
            setStatus('uploading');
            uploadImages(productData.images)
                .then(res => {
                    let data = { ...productData, images: res };
                    addProduct
                        .mutateAsync(data)
                        .then(() => {
                            setStatus('success');
                            resetForm();
                        })
                        .catch(err => {
                            setStatus('error');
                        })
                        .finally(() => {
                            setProgress(0);
                            setSubmitting(false);
                        });
                })
                .catch((err) => console.log(err));
        }
    }

    const initialValues = {
        name: "",
        desc: "",
        quantity: "",
        price: "",
        discount: 0,
        images: [],
        category_id: categories?.[0]?.id,
        subCategory_id: subCategory?.[0]?.id,
        collections_id: '',
        subject_id: subject?.[0]?.id,
        style_id: style?.[0]?.id,
        material_id: materials?.[0]?.id,
        widthInInches: "",
        heightInInches: "",
        sellingOption: 'ORIGINAL'
    };

    if (isLoading) return <LoadingScreen />
    return (
        <>
            <Formik
                initialValues={payload ?
                    payload :
                    initialValues}
                enableReinitialize
                validationSchema={payload ? productUpdateValidation : productValidation}
                onSubmit={handleSubmit}
                validateOnChange={false}
            >
                {({ isSubmitting, resetForm }) => (
                    <>
                        <UploadingModel progress={progress} status={status} onSuccess={() => setStatus(null)} />
                        <Form>
                            <Grid container columnSpacing={6} rowSpacing={2} px={4} pb={4} height='100%'  >
                                <Grid item xs={12}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <Typography variant="h5" fontWeight={800} color="#333">Artwork Details</Typography>
                                        <Box sx={{ float: 'right' }}>
                                            <Button
                                                onClick={() => {
                                                    resetForm();
                                                    onClose();
                                                }}
                                                sx={{ mr: 2 }}
                                            >
                                                close
                                            </Button>
                                            <Button
                                                disabled={isSubmitting}
                                                type='submit'
                                                variant='contained'
                                            >
                                                {isSubmitting ? 'submitting' :
                                                    'Publish'}
                                            </Button>
                                        </Box>
                                    </Box>
                                </Grid>
                                <Grid
                                    container
                                    item
                                    xs
                                    rowSpacing={6}
                                    columnSpacing={3}
                                >
                                    {/* -----------Images----------- */}
                                    <Grid item xs={12}>
                                        <Typography
                                            sx={{
                                                fontWeight: 600,
                                                fontSize: 14,
                                                color: 'grey',
                                                mb: 2
                                            }}>Images</Typography>
                                        <FieldArray name='images'>
                                            {({ remove, replace, form }) => (
                                                <ImageUploader
                                                    mode={payload ? 'edit' : 'add'}
                                                    handlers={{ progress, setProgress, form, remove, replace }}
                                                />
                                            )}
                                        </FieldArray>
                                    </Grid>
                                </Grid>
                                <Grid
                                    container
                                    item
                                    xs={7}
                                    rowSpacing={4}
                                    columnSpacing={3}
                                >
                                    {/* -----------name----------- */}
                                    <Grid item xs={12}>
                                        <FastField name="name">{({ field, form }) =>
                                            <TextField
                                                label="Artwork name"
                                                error={form.touched.name && form.errors.name}
                                                {...field}
                                            />}
                                        </FastField>
                                    </Grid>
                                    {/* -----------Desc----------- */}
                                    <Grid item xs={12}>
                                        <FastField name="desc">{({ field, form }) => <TextField
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
                                            {...field} />}</FastField>
                                    </Grid>
                                    {/* -----------category----------- */}
                                    <Grid item xs={6}>
                                        <Field name="category_id">{({ field }) =>
                                            <TextField
                                                label="Category"
                                                select
                                                {...field}
                                            >
                                                {categories?.map(({ id, name }) => (
                                                    <MenuItem key={name} value={id}>{name}</MenuItem>
                                                ))}
                                            </TextField>}
                                        </Field>
                                    </Grid>
                                    {/* -----------sub-category----------- */}
                                    <Grid item xs={6}>
                                        <Field name="subCategory_id">{({ field }) => <TextField
                                            label="Sub-category"
                                            select
                                            {...field}
                                        >
                                            {subCategory?.map(({ id, name }) => (
                                                <MenuItem key={name} value={id}>{name}</MenuItem>
                                            ))}
                                        </TextField>}</Field>
                                    </Grid>
                                    {/* -----------Subject----------- */}
                                    <Grid item xs={4}>
                                        <Field name="subject_id">{({ field }) => <TextField
                                            label="Subject"
                                            select
                                            {...field}
                                        >
                                            {subject?.map(({ id, name }) => (
                                                <MenuItem key={name} value={id}>{name}</MenuItem>
                                            ))}
                                        </TextField>}</Field>
                                    </Grid>
                                    {/* -----------style----------- */}
                                    <Grid item xs={4}>
                                        <Field name="style_id">{({ field }) => <TextField
                                            label="Style"
                                            select
                                            {...field}
                                        >
                                            {style?.map(({ id, name }) => (
                                                <MenuItem key={name} value={id}>{name}</MenuItem>
                                            ))}
                                        </TextField>}</Field>
                                    </Grid>
                                    {/* -----------material----------- */}
                                    <Grid item xs={4}>
                                        <Field name="material_id">{({ field }) => <TextField
                                            label="Material"
                                            select
                                            {...field}
                                        >
                                            {materials?.map(({ id, name }) => (
                                                <MenuItem key={name} value={id}>{name}</MenuItem>
                                            ))}
                                        </TextField>}</Field>
                                    </Grid>
                                    {/* -----------Size----------- */}
                                    <Grid item xs={12}>
                                        <Box
                                            sx={{
                                                width: '100%',
                                                display: 'flex',
                                                gap: 3
                                            }}
                                        >
                                            <Field name="widthInInches">{({ field, form }) => <TextField
                                                label='Size'
                                                placeholder='width(in)'
                                                type='number'
                                                error={(form.touched.width && form.errors.width) || (form.touched.size && typeof form.errors.size === 'string' && form.errors.size)}
                                                {...field} />}</Field>
                                            <Field name="heightInInches">{({ field, form }) => <TextField
                                                label=' '
                                                placeholder='height(in)'
                                                type='number'
                                                error={(form.touched.height && form.errors.height) || (form.touched.size && typeof form.errors.size === 'string' && form.errors.size)}
                                                {...field} />}</Field>
                                        </Box>
                                    </Grid>
                                    {/* -----------Price----------- */}
                                    <Grid item xs={6}>
                                        <FastField name="price">{({ field, form }) => <TextField
                                            label="Price"
                                            type='number'
                                            error={form.touched.price && form.errors.price}
                                            {...field} />}</FastField>
                                    </Grid>
                                    {/* -----------Discount----------- */}
                                    <Grid item xs={6}>
                                        <FastField name="discount">{({ field, form }) => <TextField
                                            label="Discount"
                                            type='number'
                                            error={form.touched.discount && form.errors.discount && `${form.errors.discount}%`}
                                            startAdornment={<Typography fontWeight={600} sx={{ pr: 0.5 }}>%</Typography>}
                                            {...field} />}</FastField>
                                    </Grid>
                                    {/* -----------selling option----------- */}
                                    <Grid item xs={6}>
                                        <Field name="sellingOption">{({ field }) => <TextField
                                            label="Selling options"
                                            select
                                            {...field}
                                        >
                                            <MenuItem value='ORIGINAL'>Original</MenuItem>
                                            <MenuItem value='PRINT'>Print</MenuItem>
                                        </TextField>}</Field>
                                    </Grid>
                                    {/* -----------stock----------- */}
                                    <Grid item xs={6}>
                                        <FastField name="quantity">{({ field, form }) => <TextField
                                            label="In Stock"
                                            type='number'
                                            error={form.touched.quantity && form.errors.quantity}
                                            {...field} />}</FastField>
                                    </Grid>
                                    {/* -----------Add to collection----------- */}
                                    <Grid item xs={12}>
                                        <Field name="collections_id">{({ field }) => <TextField
                                            label="Add to collection"
                                            placeholder='Optional'
                                            select
                                            {...field}
                                        >
                                            {collections?.map(({ id, name }) => (
                                                <MenuItem key={name} value={id}>{name}</MenuItem>
                                            ))}
                                        </TextField>}</Field>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Form>
                    </>
                )}
            </Formik >
        </>
    );
}

function UploadingModel({ progress, status, onSuccess }) {
    const [open, setOpen] = useState(null);

    useEffect(() => {
        setOpen(s => !s ? status : false);
    }, [status]);

    function handleExit() {
        setOpen(s => {
            if (s === false) return status;
            else {
                onSuccess();
                return null;
            }
        });
    }

    function handleClose(_, reason) {
        reason === "timeout" && setOpen(null);
    }

    return (
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            TransitionProps={{ onExited: handleExit }}
            open={Boolean(open)}
            onClose={handleClose}
            autoHideDuration={open !== 'uploading' ? 2000 : null}
            sx={{ width: 300 }}
        >{open === 'uploading' ?
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
                    <Typography color='var(--brand)'>Publishing...</Typography>
                    <Typography color='var(--brand)'>{progress}%</Typography>
                </Box>
                <Box width='100%'>
                    <LinearProgress variant={progress < 100 ? 'determinate' : 'indeterminate'} value={progress} />
                </Box>
            </Box> :
            status === 'error' ?
                <Alert variant='filled' severity="error" sx={{ width: '100%' }}>There's an error, please try again</Alert> :
                status === 'no changes' ?
                    <Alert variant='filled' severity="info" sx={{ width: '100%' }}>No changes have been made.</Alert> :
                    <Alert variant='filled' severity="success" sx={{ width: '100%' }}>Published successfully</Alert>}
        </Snackbar>
    );
}

function AddProductForm({ handlers: { setErrors, values } }) {


    return (
        <></>
    );
}
