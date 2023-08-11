import CameraAltRoundedIcon from "@mui/icons-material/CameraAltRounded";
import "../styles.css";

import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";

import ProfileCredentialForm from "./ProfileCredentialForm";
import useCurrentUser from "../../../Hooks/useCurrentUser";
import useAuth from "../../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Avatar from "../../Avatar/Avatar";
import { Suspense, lazy, useRef, useState } from "react";
import { uploadImages } from "../../../Utils/uploadImages";

const Editor = lazy(() => import("../../ImageEditor/Editor"));

function ProfileDetails() {
  const { currentUser } = useCurrentUser();
  const { logout } = useAuth()
  const navigate = useNavigate()

  const style = {
    title: { fontSize: 14, fontWeight: 600, color: "primary" },
    summery: { variant: "subtitle2", lineHeight: "30px", color: "#111" },
  };

  return (
    <>
      <Grid item xs={12} >
        <Typography variant="tabTitle">
          Personal Details
        </Typography>
      </Grid>
      <Box m="1.5rem">
        <Grid item xs={6} gap={2} display="flex" alignItems="center">
          <ProfilePicture user={currentUser?.data} />
          <div style={{ width: '100%' }}>
            <Typography
              whiteSpace="nowrap"
              variant="h5"
              fontSize={26}
              fontWeight={700}
              mb={0.5}
            >
              {currentUser.data?.displayName || 'loading...'}
            </Typography>
          </div>
        </Grid>
        <Grid container columnSpacing={8} rowSpacing={4} >
          <Grid item xs={12}>
            <ProfileCredentialForm user={currentUser.data} />
          </Grid>
          <Grid item xs={12} display="flex" justifyContent="space-between">
            <div>
              <Typography {...style.title}>Delete Account</Typography>
              <Typography {...style.summery}>
                By deleting account, you will lose all your data.
              </Typography>
            </div>
            <LoadingButton variant="text">Delete account</LoadingButton>
          </Grid>
          <Grid item xs={12} display="flex" alignItems='center' justifyContent="space-between">
            <div>
              <Typography {...style.title}>Log out</Typography>
              <Typography {...style.summery}>
                Log out of your account.
              </Typography>
            </div>
            <LoadingButton loading={logout.isLoading} onClick={() => logout.mutateAsync().then(() => navigate('/'))} variant="contained">Log out</LoadingButton>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default ProfileDetails

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
        updateUser({ photo: image[0]?.url });
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
