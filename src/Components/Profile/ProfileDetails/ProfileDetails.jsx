import Avatar from "../../Avatar/Avatar";
import CameraAltRoundedIcon from "@mui/icons-material/CameraAltRounded";
import { IKUpload, IKContext } from "imagekitio-react";
import "../styles.css";

import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";

import ProfileCredentialForm from "./ProfileCredentialForm";
import useCurrentUser from "../../../Hooks/useCurrentUser";
import useAuth from "../../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";

function ProfileDetails() {
  const { currentUser, updateUser } = useCurrentUser();
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleInput = () => {
    document.getElementById("IKUploader").click();
  };

  const style = {
    title: { fontSize: 14, fontWeight: 600, color: "primary" },
    summery: { variant: "subtitle2", lineHeight: "30px", color: "#111" },
  };

  return (
    <>
      <Grid item xs={6} gap={2} mb="2rem" display="flex" alignItems="center">
        <div id="avatar">
          <Avatar
            sx={{ width: 70, height: 70 }}
            displayName={currentUser.data?.displayName}
            profilePicture={currentUser.data?.photo}
          />
          <button className="imageUpdateBtn" onClick={() => handleInput()}>
            <CameraAltRoundedIcon fontSize="30px" color="secondary" />
            <IKContext
              publicKey={process.env.REACT_APP_PUBLIC_KEY}
              urlEndpoint={process.env.REACT_APP_URL_ENDPOINT}
              authenticationEndpoint={process.env.REACT_APP_AUTH_ENDPOINT}
            >
              <IKUpload
                id="IKUploader"
                folder={"/products-images"}
                onError={(err) => console.log(err)}
                onSuccess={(res) => {
                  updateUser({ photo: res.thumbnailUrl });
                }}
                hidden
              />
            </IKContext>
          </button>
        </div>
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
        <ProfileCredentialForm user={currentUser.data} />
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
    </>
  );
}

export default ProfileDetails
