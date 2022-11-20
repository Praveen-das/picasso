import Avatar from "../../Avatar/Avatar";
import CameraAltRoundedIcon from "@mui/icons-material/CameraAltRounded";
import ChangePassword from "../../ChangePassword/ChangePassword";
import { IKUpload, IKContext } from "imagekitio-react";
import "../styles.css";

import { Grid, Divider } from "@mui/material";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";

import { useAuth } from "../../../Hooks/useAuth";
import ProfileCredentialForm from "../Components/ProfileCredentialForm";
import { handleExceptions } from "../../../Hooks/useExceptionHandler";
import useAuthentication from "../../../Hooks/useAuthentication";
import { sendEmailVerification } from "../../../lib/user.api";

function ProfileDetails() {
  const { currentUser, updateUser, isLoading } = useAuthentication();

  const handleInput = () => {
    document.getElementById("IKUploader").click();
  };

  const style = {
    title: { fontSize: 14, fontWeight: 600, color: "primary" },
    summery: { variant: "subtitle2", lineHeight: "30px", color: "#111" },
  };

  const handleEmailVerification = () => {
    sendEmailVerification();
    // verifyEmail().catch((error) => {
    //   handleExceptions(error);
    // });
  };

  console.log(currentUser);

  return (
    <>
      <Grid item xs={6} gap={2} mb="2rem" display="flex" alignItems="center">
        <ChangePassword />
        <div id="avatar">
          <Avatar
            sx={{ width: 80, height: 80 }}
            displayName={currentUser?.displayName}
            profilePicture={currentUser?.photo}
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
        <div>
          <Typography
            whiteSpace="nowrap"
            variant="h5"
            fontSize={26}
            fontWeight={700}
            mb={0.5}
          >
            {currentUser?.displayName}
          </Typography>
          <Typography variant="body2" color="var(--brand)">
            {currentUser?.emailVerified
              ? "Varified"
              : "Account is not varified"}
          </Typography>
        </div>
      </Grid>
      <Divider sx={{ width: "100%" }} />
      <Grid container columnSpacing={8} rowSpacing={4} p={2}>
        <ProfileCredentialForm user={currentUser} />
        {!currentUser?.emailVerified && (
          <>
            <Grid item xs={12}>
              <Divider sx={{ width: "100%" }} />
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="space-between">
              <div>
                <Typography {...style.title}>Verify Account</Typography>
                <Typography {...style.summery}>
                  We use this to let you sign in and populate your profile
                  information.
                </Typography>
              </div>
              <LoadingButton
                loading={isLoading}
                variant="text"
                onClick={handleEmailVerification}
              >
                Verify Now
              </LoadingButton>
            </Grid>
          </>
        )}
        <Grid item xs={12} display="flex" justifyContent="space-between">
          <div>
            <Typography {...style.title}>Delete Account</Typography>
            <Typography {...style.summery}>
              By deleting account, you will lose all your data.
            </Typography>
          </div>
          <LoadingButton variant="text">Delete account</LoadingButton>
        </Grid>
      </Grid>
    </>
  );
}

export default ProfileDetails;
