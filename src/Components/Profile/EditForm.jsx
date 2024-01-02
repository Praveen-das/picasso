import { Box, Button, Modal, Typography } from '@mui/material'
import React, { useState } from 'react'
import TextField from '../MUIComponents/TextField';
import useCurrentUser from '../../Hooks/useCurrentUser';
import { useStore } from '../../Context/Store';
import { Formik } from 'formik';
import { personalInfoSchema, socialSchema, userAddressSchema } from '../../Schema/YupSchema';

function Edits(
    {
        open,
        onClose,
        user
    }) {

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        borderRadius: '10px',
        py: 5,
        px: 5,
        pb: 6,
        outline: 'none',
        display: 'grid',
        gap: 4
    };

    const forms = {
        'personalInfo': <PersonalInfo data={user} {...{ onClose }} />,
        'address': <Address data={user?.default_address} {...{ onClose }} />,
        'socialMediaLinks': <SocialMediaLinks data={user} {...{ onClose }} />
    }

    return (
        <>
            <Modal
                open={Boolean(open)}
                onClose={() => onClose(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} >
                    {forms[open]}
                </Box>
            </Modal>
        </>
    )
}

function removieEmptyValues(values) {
    Object.keys(values).forEach(key => {
        if (values[key] === '' || values[key] === null) {
            delete values[key];
        }
    });
}

function PersonalInfo({ data, onClose }) {
    const { updateUser } = useCurrentUser()

    const setAlert = useStore((s) => s.setAlert);

    function handleClose() {
        onClose(false)
    }

    const handleUpdate = (values, { resetForm, setFieldError, setSubmitting }) => {
        removieEmptyValues(values);

        updateUser.mutateAsync(values)
            .then(() => {
                setAlert({
                    message: `${Object.keys(data)[0]} changed successfully`,
                    type: 'success',
                    toggled: true,
                });
                resetForm();
                handleClose()
                setSubmitting(false);
            })
            .catch((err) => {
                const { field, message } = err.response?.data;
                setFieldError(field.toLowerCase(), message);
                setSubmitting(false);
            });
    }

    const initialValues = {
        displayName: '',
        email: '',
        phoneNumber: '',
        bio: ''
    }

    return (
        <Formik
            initialValues={initialValues}
            validateOnChange={false}
            validationSchema={personalInfoSchema}
            onSubmit={handleUpdate}
        >
            {
                ({ handleChange, handleSubmit }) => (
                    <>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                pb: 2,
                                gap: 2
                            }}
                        >
                            <Typography variant='title.primary'>Edit Personal Info</Typography>
                            <Button onClick={handleClose} sx={{ ml: 'auto' }} size='small'>cancel</Button>
                            <Button disabled={updateUser.isLoading} onClick={handleSubmit} size='small' variant='contained'>apply</Button>
                        </Box>
                        <TextField name='displayName' onChange={handleChange} label='Display Name' placeholder={data?.displayName} />
                        <TextField name='phoneNumber' onChange={handleChange} label='Phone Number' placeholder={data?.phoneNumber} />
                        {data?.provide === 'web' &&
                            <TextField name='email' onChange={handleChange} label='Email' placeholder={data?.email} />}
                        {/* <TextField name='bio' onChange={handleChange} multiline rows={3} label='Bio' placeholder={data?.bio} /> */}
                    </>
                )
            }
        </Formik>

    )
}

function Address({ data, onClose }) {
    const { updateUserAddress } = useCurrentUser()
    const setAlert = useStore((s) => s.setAlert);

    function handleClose() {
        onClose(false)
    }

    const handleUpdate = (values, { resetForm, setFieldError, setSubmitting }) => {
        removieEmptyValues()

        updateUserAddress.mutateAsync({ id: data?.id, ...values })
            .then(() => {
                setAlert({
                    message: `${Object.keys(data)[0]} changed successfully`,
                    type: 'success',
                    toggled: true,
                });
                resetForm();
                handleClose()
                setSubmitting(false);
            })
            .catch((err) => {
                const { field, message } = err.response?.data;
                setFieldError(field.toLowerCase(), message);
                setSubmitting(false);
            });
    }

    const initialValues = {
        name: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
        isDefault: true
    }

    return (
        <Formik
            initialValues={initialValues}
            validateOnChange={false}
            validationSchema={userAddressSchema}
            onSubmit={handleUpdate}
        >
            {
                ({ handleChange, handleSubmit, values }) => (
                    <>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                pb: 2,
                                gap: 2
                            }}
                        >
                            <Typography variant='title.primary'>Edit Address</Typography>
                            <Button onClick={handleClose} sx={{ ml: 'auto' }} size='small'>cancel</Button>
                            <Button disabled={updateUserAddress.isLoading} onClick={handleSubmit} size='small' variant='contained'>apply</Button>
                        </Box>
                        {/* <TextField onChange={handleChange} name='name' label='Name' placeholder={data?.name}></TextField> */}
                        <TextField onChange={handleChange} name='address' multiline rows={2} label='House name/Flat number' placeholder={data?.address}></TextField>
                        <TextField onChange={handleChange} name='city' label='City' placeholder={data?.city}></TextField>
                        <TextField onChange={handleChange} name='state' label='State' placeholder={data?.state}></TextField>
                            <TextField onChange={handleChange} name='pincode' label='Pincode/Zipcode' placeholder={data?.pincode}></TextField>
                        {/* <Box display='flex' gap={4}>
                            <TextField onChange={handleChange} name='mobile' label='Phone Number' placeholder={data?.pincode}></TextField>
                        </Box> */}
                        <Box>
                            <input
                                id="isDefault"
                                name="isDefault"
                                onChange={handleChange}
                                defaultChecked
                                style={{ transform: "translateY(1.5px)", marginRight: 15 }}
                                type="checkbox"
                            />
                            <label htmlFor='isDefault' style={{ fontSize: "0.9rem" }} >
                                Set as default shipping address.
                            </label>
                        </Box>
                    </>
                )}
        </Formik>
    )
}

function SocialMediaLinks({ data, onClose }) {
    const { addSocialMediaLink, removeSocialMediaLink } = useCurrentUser()
    const setAlert = useStore((s) => s.setAlert);

    function handleClose() {
        onClose(false)
    }

    function handleUpdate({ social }, { setSubmitting, setFieldError, resetForm }) {
        addSocialMediaLink.mutateAsync(social)
            .then(() => {
                setAlert({
                    message: 'Link added successfully',
                    type: 'success',
                    toggled: true,
                });
                resetForm();
                setSubmitting(false);
            })
            .catch((err) => {
                const { field, message } = err.response?.data;
                setFieldError(field.toLowerCase(), message);
                setSubmitting(false);
            });
    }

    function handleRemovingSocialMediaLink(data) {
        if (!data) return
        removeSocialMediaLink.mutateAsync(data?.id)
            .then(() => {
                setAlert({
                    message: `${data?.name} link removed`,
                    type: 'success',
                    toggled: true,
                })
            })
    }

    const initSocial = {
        social: [
            {
                name: 'facebook',
                url: ''
            },
            {
                name: 'instagram',
                url: ''
            },
            {
                name: 'twitter',
                url: ''
            },
            {
                name: 'linkedIn',
                url: ''
            },
        ]
    }

    return (
        <Formik
            initialValues={initSocial}
            validateOnChange={false}
            validationSchema={socialSchema}
            onSubmit={handleUpdate}
        >
            {
                ({ handleChange, handleSubmit, touched, errors }) => (
                    <>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                pb: 2,
                                gap: 2
                            }}
                        >
                            <Typography variant='title.primary'>Edit Social Media Links</Typography>
                            <Button onClick={handleClose} sx={{ ml: 'auto' }} size='small'>cancel</Button>
                            <Button disabled={addSocialMediaLink.isLoading} onClick={handleSubmit} size='small' variant='contained'>apply</Button>
                        </Box>
                        <TextField
                            id="social.0.url"
                            label="Facebook URL"
                            onChange={handleChange}
                            initialValue={data?.social['facebook']?.url}
                            error={touched.social?.[0]?.url && errors.social?.[0]?.url && errors.social?.[0]?.url}
                            onClick={() => handleRemovingSocialMediaLink(data?.social['facebook'])}
                        />
                        <TextField
                            id="social.1.url"
                            label="Instagram URL"
                            onChange={handleChange}
                            initialValue={data?.social['instagram']?.url}
                            error={touched.social?.[1]?.url && errors.social?.[1]?.url && errors.social?.[1]?.url}
                            onClick={() => handleRemovingSocialMediaLink(data?.social['instagram'])}
                        />
                        <TextField
                            id="social.2.url"
                            label="Twitter URL"
                            onChange={handleChange}
                            initialValue={data?.social['twitter']?.url}
                            error={touched.social?.[2]?.url && errors.social?.[2]?.url && errors.social?.[2]?.url}
                            onClick={() => handleRemovingSocialMediaLink(data?.social['twitter'])}
                        />
                        <TextField
                            id="social.3.url"
                            label="LinkedIn URL"
                            onChange={handleChange}
                            initialValue={data?.social['linkedIn']?.url}
                            error={touched.social?.[3]?.url && errors.social?.[3]?.url && errors.social?.[3]?.url}
                            onClick={() => handleRemovingSocialMediaLink(data?.social['linkedIn'])}
                        />
                    </>
                )}</Formik>
    )
}

export default Edits
