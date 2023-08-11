import { Box, Button, Grid, IconButton, Tab, Tabs, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.css";
import Masonry from '@mui/lab/Masonry';
import { useProducts } from '../../Hooks/useProducts';
import Card from '../Card/Card'

function initializeCropper(elm) {
    return new Cropper(elm, {
        viewMode: 3,
        dragMode: 'move',
        autoCropArea: 1,
        restore: false,
        modal: false,
        cropBoxMovable: false,
        cropBoxResizable: false,
        toggleDragModeOnDblclick: false,
    });
}

export default function Store() {
    const { data } = useProducts()

    return (
        <>
            <Grid container>
                <Grid item xs={12} >
                    <CoverPhoto />
                </Grid>
                <Grid item xs={12} >
                    <Box
                        sx={{ height: 90, bgcolor: 'tan' }}
                    >

                    </Box>
                </Grid>
                <Grid item xs={12} p={3}>
                    <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} spacing={2}>
                        {
                            data?.map((o) => (
                                <Card sx={{ width: '100%', borderRadius: 10 }} key={o.id} product={o} />
                            ))
                        }
                    </Masonry>
                </Grid>
            </Grid>
        </>
    )
}


function CoverPhoto() {
    const [coverPhoto, setCoverPhoto] = useState()
    const coverPhotoRef = useRef(null);
    const cropperRef = useRef(null);

    function addCoverPhoto(e) {
        const file = e.target.files[0]
        if (file && file.type.startsWith('image/'))
            setCoverPhoto(URL.createObjectURL(file));
        else console.log('wrong file type');
    }

    useEffect(() => {
        coverPhotoRef.current.onload = () => {
            if (cropperRef.current) return cropperRef.current = null
            cropperRef.current = initializeCropper(coverPhotoRef.current)
        }
        return () => cropperRef.current?.destroy()
    }, [])

    const getCropData = () => {
        if (typeof cropperRef.current?.cropper !== "undefined") {
            const cropper = cropperRef.current
            setCoverPhoto(cropper.getCroppedCanvas().toDataURL('image/webp'));
            cropper.destroy()
        }
    };

    return (
        <>
            <Box sx={{
                position: 'relative',
                bgcolor: 'grey',
            }}>
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: 20,
                        right: 20,
                        display: 'flex',
                        gap: 2,
                        zIndex: 200
                    }}
                >
                    <IconButton
                        color="default"
                        aria-label="upload picture"
                        component="label"
                    >
                        <input onChange={addCoverPhoto} hidden accept="image/*" type="file" />
                        <PhotoCamera
                            sx={{
                                color: 'white',
                                // mixBlendMode: 'color'
                            }}
                        />
                    </IconButton>
                    <Button variant='contained' color='primary' onClick={getCropData}>Apply</Button>
                </Box>
                <div
                    style={{
                        width: '100%',
                        height: '400px',
                    }}
                >
                    <img
                        ref={coverPhotoRef}
                        style={{
                            display: 'block',
                            width: '100%',
                            maxWidth: '100%',
                            height: '100%',
                            objectFit: 'cover',
                        }} src={coverPhoto} alt=""
                    />
                </div>
            </Box>
        </>
    )
}
