import CameraAltRoundedIcon from "@mui/icons-material/CameraAltRounded";
import "../styles.css";

import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";

import useCurrentUser from "../../../Hooks/useCurrentUser";
import useAuth from "../../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Avatar from "../../Avatar/Avatar";
import { lazy, useRef, useState } from "react";
import { uploadImages } from "../../../Utils/uploadImages";
import socket from "../../../lib/ws";

import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EditForm from "../EditForm";

const Editor = lazy(() => import("../../ImageEditor/Editor"));

const actionBtnStyle = {
  sx: { borderRadius: '5000px' }, size: 'small'
}

function ProfileDetails() {
  const { currentUser: { data: user } } = useCurrentUser();
  const address = user?.default_address

  const [open, setOpen] = useState(null)

  const { logout, handleLogout } = useAuth()
  const navigate = useNavigate()

  return (
    <>
      <EditForm user={user} open={open} onClose={setOpen} />
      <Grid item xs={12} >
        <Typography variant="tabTitle">
          My Profile
        </Typography>
      </Grid>
      <Box m="2rem 2rem">
        <Grid container rowSpacing={6} columnSpacing={4} >
          <Grid item xs={6} gap={4} display="flex" alignItems="center">
            <ProfilePicture user={user} />
            <div style={{ width: '100%' }}>
              <Typography
                whiteSpace="nowrap"
                variant="h5"
                fontSize={26}
                fontWeight={700}
                mb={0.5}
              >
                {user?.displayName || 'loading...'}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} mt={2}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant='title.colored'>Personal Information</Typography>
              <Button {...actionBtnStyle} variant="outlined" onClick={() => setOpen('personalInfo')}>Edit</Button>
            </Box>
          </Grid>
          <Grid container item xs={12} rowSpacing={2} columnSpacing={4} mt={-4}>
            <Grid item xs={5}>
              <InfoField label='Display Name'>{user?.displayName}</InfoField>
            </Grid>
            <Grid item xs={5}>
              <InfoField label='Phone Number'>{address?.mobile}</InfoField>
            </Grid>
            <Grid item xs={5}>
              <InfoField label='Email'>{user?.email}</InfoField>
            </Grid>
            {/* <Grid item xs={10}>
              <InfoField typeFieldProps={{ multiline: true, rows: 3 }} label='Bio'>{user?.bio}</InfoField>
            </Grid> */}
          </Grid>
          <Grid item xs={12} mt={2}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant='title.colored'>Address</Typography>
              <Button {...actionBtnStyle} variant="outlined" onClick={() => setOpen('address')}>Edit</Button>
            </Box>
          </Grid>
          <Grid container item xs={12} rowSpacing={2} columnSpacing={4} mt={-4}>
            <Grid item xs={5}>
              <InfoField label='House Name/ Flat No'>{user?.displayName}</InfoField>
            </Grid>
            <Grid item xs={5}>
              <InfoField label='City'>{address?.mobile}</InfoField>
            </Grid>
            <Grid item xs={5}>
              <InfoField label='State'>{address?.mobile}</InfoField>
            </Grid>
            <Grid item xs={5}>
              <InfoField label='Pincode/Zipcode'>{address?.mobile}</InfoField>
            </Grid>
          </Grid>
          {/* <Grid item xs={12} >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant='title.colored'>Social Media Links</Typography>
              <Button {...actionBtnStyle} variant="outlined" onClick={() => setOpen('socialMediaLinks')}>Edit</Button>
            </Box>
          </Grid>
          <Grid container item xs={12} rowSpacing={2} columnSpacing={4} mt={-4}>
            <Grid item xs={5}>
              <Box display='flex' gap={1}>
                {
                  Object.values(user?.social || '').map(({ id, name, url }) =>
                    <IconButton
                      key={id}
                      onClick={() => window.open(url, '_blank')}
                      variant='contained'
                      size='small'
                      color={name}
                    >
                      {
                        name === 'facebook' ? <FacebookIcon /> :
                          name === 'instagram' ? <InstagramIcon /> :
                            name === 'twitter' ? <TwitterIcon />
                              : <LinkedInIcon />
                      }
                    </IconButton>)
                }
              </Box>
            </Grid>
          </Grid> */}
          {
            user?.role === 'user' &&
            <Grid item xs={12} >
              <Box
                sx={{
                  width: '100%',
                  // height: 150,
                  // bgcolor: 'var(--brandLight)',
                  border: '2px solid var(--brandLight)',
                  borderRadius: '20px',
                  display: 'grid',
                  justifyItems: 'left',
                  p: 4,
                  boxSizing: 'border-box',
                  gap: 1
                }}
              >
                <Typography variant="title.colored" display='flex' mb={1}>Register as a seller</Typography>
                <Typography variant="h10" >Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, voluptatum aliquid distinctio esse, nam facilis voluptas commodi illo similique repellendus earum omnis natus molestias culpa eum veniam dolores voluptatibus minus.</Typography>
                <Button onClick={() => navigate("/seller")} variant='contained' sx={{ px: 2, ml: 'auto' }}>Register</Button>
              </Box>
            </Grid>
          }
          <Grid item xs={10} >
            <Typography sx={{ display: 'block' }} variant='title.colored'>Log out</Typography>
            <Typography variant='h10'><br />
              Log out of your account.
            </Typography>
          </Grid>
          <Grid item xs={2} >
            <LoadingButton loading={logout.isLoading} onClick={handleLogout} variant="outlined">Log out</LoadingButton>
          </Grid>
        </Grid>
      </Box >
    </>
  );
}

export default ProfileDetails

function InfoField({ label, children }) {

  let
    title = {
      sx: { transformOrigin: 'left' },
      fontSize: 14,
      fontWeight: 500,
      color: 'gray',
      width: 'max-content'
    },
    box = {
      display: 'grid',
      gap: 0.5
    }


  return (
    <>
      <Box {...box}>
        <Typography {...title} >{label}</Typography>
        <Typography variant='h10'>{children}</Typography>
      </Box>
    </>
  );
}

function ProfilePicture({ user }) {
  const { updateUser } = useCurrentUser();

  const inputRef = useRef()
  const [model, setModel] = useState(null)
  const [isUploading, setIsUploading] = useState(false)

  const handleInput = (e) => {
    const file = e.target.files[0]
    let tempId = crypto.randomUUID()

    const img = {
      url: URL.createObjectURL(file),
      name: file.name,
      uid: tempId,
      size: file.size,
      fileType: file.type
    }
    setModel(img)
  };

  function handleUpdation(file) {
    setIsUploading(true)
    uploadImages([file])
      .then((image) => {
        setIsUploading(false)
        updateUser.mutateAsync({ photo: image[0]?.url });
      })
      .catch((err) => {
        console.log(err);
        setIsUploading(false)
      })
    setModel(null)
  }

  return (
    <>
      {
        model &&
        <Editor options={{ aspectRatio: 1 }} open={Boolean(model)} file={model} onClose={() => setModel(null)} onSuccess={handleUpdation} />
      }
      <div id="avatar">
        <Avatar
          sx={{ width: 70, height: 70 }}
          displayName={user?.displayName}
          profilePicture={user?.photo}
        />
        <div className="imageUpdateBtn_wrapper">
          {
            isUploading ?
              <CircularProgress sx={{ color: 'white' }} size={25} value={100} /> :
              <button
                onClick={() =>
                  inputRef.current.click()
                }
                component='label'
                className="imageUpdateBtn"
              >
                <CameraAltRoundedIcon fontSize="30px" color="secondary" />
                <input onChange={handleInput} ref={inputRef} hidden type="file" />
              </button>
          }
        </div>
      </div>
    </>
  )
}
