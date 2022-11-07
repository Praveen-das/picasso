import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  IconButton,
  Grid,
  Typography,
} from "@mui/material";
import NButton from "@mui/material/Button/Button";
import { useEffect, useRef, useState } from "react";
import { useStore } from "../../../Context/Store";
import { useAuth } from "../../../Hooks/useAuth";
import { useHelper } from "../../../Hooks/useHelper";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import AlertBox from "../../MUIComponents/AlertBox/AlertBox";
import { handleExceptions } from "../../../Hooks/useExceptionHandler";
import { TextField } from "../../MUIComponents/TextField";
import { Button } from "../../MUIComponents/Button";
import useAuthentication from "../../../Hooks/useAuthentication";

export default function ProfileCredentialForm() {
  const { update, isUpdating } = useAuthentication();
  const { copyToClipboard } = useHelper();
  const { currentUser } = useAuthentication();
  const actionExpiryDate = useStore(
    (state) => state.userData?.actionExpiryDate
  );

  const [dateLockExpired, setDateLockExpired] = useState(true);
  const [error, setError] = useState(false);

  const fName = useRef();
  const mName = useRef();
  const sName = useRef();
  const email = useRef();
  const password = useRef();
  const confirmPass = useRef();
  const [expanded, setExpanded] = useState(false);
  const [remainingTime, setRemainingTime] = useState();

  useEffect(() => {
    if (!actionExpiryDate) return;

    let currentTime = new Date().getTime();
    const diffTime = Math.abs(actionExpiryDate - currentTime);
    const diffInSec = diffTime / 1000;
    setRemainingTime(Math.ceil(diffInSec / (60 * 60 * 24)) + "days");

    if (diffInSec <= 86400) {
      setRemainingTime(Math.ceil(diffInSec / (60 * 60)) + "hours");
    }
    if (diffInSec <= 3600) {
      setRemainingTime(Math.ceil(diffInSec / 60) + "minutes");
    }
    if (diffInSec <= 60) {
      setRemainingTime(diffInSec + "seconds");
    }
    if (currentTime > actionExpiryDate) return setDateLockExpired(true);
    return setDateLockExpired(false);
  }, [actionExpiryDate]);

  const resetValues = () => {
    setExpanded(false);
    fName.current.value = "";
    mName.current.value = "";
    sName.current.value = "";
    email.current.value = "";
    password.current.value = "";
    confirmPass.current.value = "";
  };

  const handleProfileUpdation = (type) => {
    setError(false);
    update();
  };

  const handleToggle = (panel) => {
    resetValues();
    setError(false);
    setExpanded(expanded !== panel ? panel : false);
  };

  const MQ = {
    rows_4: { xs: 12, md: 3, lg: 3 },
    rows_3: { xs: 12, md: 4, lg: 4 },
    rows_2: { xs: 12, sm: 12 },
  };

  const style = {
    title: {
      variant: "h6",
      color: "primary",
      fontSize: 14,
      fontWeight: 600,
    },
    button: {
      sx: { justifySelf: "flex-end" },
    },
    summery: {
      variant: "h6",
      fontSize: 15,
      fontWeight: 500,
      color: "#777",
    },
    details: {
      variant: "body1",
      fontSize: 14,
    },
    textField: {
      fullWidth: true,
      variant: "standard",
      InputLabelProps: { shrink: true },
      size: "small",
    },
  };

  return (
    <>
      <Grid item mb={-2} xs={12}>
        <div>
          {/* /////display name/// */}
          <Accordion expanded={expanded === "panel1"}>
            <AccordionSummary
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <div id="accordion_style">
                <Typography {...style.title}>Display Name</Typography>
                {expanded === "panel1" ? (
                  <>
                    <span></span>
                    <NButton
                      {...style.button}
                      onClick={() => handleToggle("panel1")}
                    >
                      cancel
                    </NButton>
                  </>
                ) : (
                  <>
                    <Typography {...style.summery}>
                      {currentUser?.displayName}
                    </Typography>
                    <NButton
                      {...style.button}
                      onClick={() => handleToggle("panel1")}
                    >
                      Edit
                    </NButton>
                  </>
                )}
              </div>
            </AccordionSummary>
            {false ? (
              <AccordionDetails sx={{ mb: -4 }}>
                <div className="accordion_warning warning">
                  <Typography
                    {...style.details}
                  >{`You can not change your name for ${
                    remainingTime && remainingTime
                  }`}</Typography>
                </div>
              </AccordionDetails>
            ) : (
              <AccordionDetails>
                {/* WARNIG: If you change your name, you won't be able to change it again for 60 days.  */}
                {(error?.fName || error?.textField) && (
                  <AlertBox message={error?.fName || error?.textField} />
                )}
                <Grid container spacing={4} sx={{ mt: -5 }}>
                  <Grid item {...MQ.rows_4}>
                    <TextField
                      inputRef={fName}
                      error={(error?.fName || error?.textField) !== undefined}
                      label="First name"
                      {...style.textField}
                    />
                  </Grid>
                  <Grid item {...MQ.rows_4}>
                    <TextField
                      inputRef={mName}
                      label="Middle name"
                      placeholder="optional"
                      {...style.textField}
                    />
                  </Grid>
                  <Grid item {...MQ.rows_4}>
                    <TextField
                      inputRef={sName}
                      label="Surname"
                      {...style.textField}
                    />
                  </Grid>
                  <Grid item {...MQ.rows_4}>
                    <Button
                      sx={{ float: "right" }}
                      fullWidth
                      onClick={() => handleProfileUpdation("displayname")}
                      loading={isUpdating}
                    >
                      UPDATE
                    </Button>
                  </Grid>
                </Grid>
              </AccordionDetails>
            )}
          </Accordion>
          {/* /////uid/// */}
          <Accordion expanded={false}>
            <AccordionSummary
              aria-controls="panel3a-content"
              id="panel3a-header"
            >
              <div id="accordion_style">
                <Typography {...style.title}>User ID</Typography>
                <>
                  <Typography whiteSpace="nowrap" {...style.summery}>
                    {currentUser?.id}
                    <IconButton
                      onClick={() =>
                        copyToClipboard("User Id", currentUser?.uid)
                      }
                    >
                      <ContentCopyIcon sx={{ fontSize: 18 }} />
                    </IconButton>
                  </Typography>
                </>
              </div>
            </AccordionSummary>
          </Accordion>
          {/* /////email/// */}
          <Accordion expanded={expanded === "panel2"}>
            <AccordionSummary
              aria-controls="panel3a-content"
              id="panel3a-header"
            >
              <div id="accordion_style">
                <Typography {...style.title}>Email</Typography>
                {expanded === "panel2" ? (
                  <>
                    <span></span>
                    <NButton
                      onClick={() => handleToggle("panel2")}
                      {...style.button}
                    >
                      cancel
                    </NButton>
                  </>
                ) : (
                  <>
                    <Typography {...style.summery}>
                      {currentUser?.email}
                      <IconButton
                        onClick={() =>
                          copyToClipboard("Email", currentUser?.email)
                        }
                      >
                        <ContentCopyIcon sx={{ fontSize: 18 }} />
                      </IconButton>
                    </Typography>
                    <NButton
                      onClick={() => handleToggle("panel2")}
                      {...style.button}
                    >
                      Edit
                    </NButton>
                  </>
                )}
              </div>
            </AccordionSummary>
            <AccordionDetails>
              {/* <div className='accordion_warning normal'>
                                    <Typography {...style.details}>Your email must be a valid one. </Typography>
                                </div> */}
              {(error?.email || error?.textField) && (
                <AlertBox message={error?.email || error?.textField} />
              )}
              <Grid container spacing={4} sx={{ mt: -5 }}>
                <Grid item {...MQ.rows_2} md={8}>
                  <TextField
                    error={(error?.email || error?.textField) !== undefined}
                    type="email"
                    inputRef={email}
                    label="New Email"
                    {...style.textField}
                  />
                </Grid>
                <Grid item {...MQ.rows_2} md={4}>
                  <Button
                    sx={{ float: "right" }}
                    fullWidth
                    onClick={() => handleProfileUpdation("email")}
                    loading={isUpdating}
                  >
                    UPDATE
                  </Button>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
          {/* /////password/// */}
          <Accordion expanded={expanded === "panel3"}>
            <AccordionSummary
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <div id="accordion_style">
                <Typography {...style.title}>Password</Typography>
                {expanded === "panel3" ? (
                  <>
                    <span></span>
                    <NButton
                      onClick={() => handleToggle("panel3")}
                      {...style.button}
                    >
                      cancel
                    </NButton>
                  </>
                ) : (
                  <>
                    <span></span>
                    <NButton
                      onClick={() => handleToggle("panel3")}
                      {...style.button}
                    >
                      CHANGE NOW
                    </NButton>
                  </>
                )}
              </div>
            </AccordionSummary>
            <AccordionDetails>
              {/* {
                                !error ?
                                    <div className='accordion_warning normal'>
                                        <Typography {...style.details}>It's a good idea to use a strong password that you don't use elsewhere. </Typography>
                                    </div>
                                    :
                                    <div className='accordion_warning warning'>
                                        <Typography {...style.details}>{error?.messaage}</Typography>
                                    </div>
                            } */}
              {(error?.password ||
                error?.newPass ||
                error?.confirmPass ||
                error?.textField) && (
                <AlertBox
                  message={
                    error?.password ||
                    error?.newPass ||
                    error?.confirmPass ||
                    error?.textField
                  }
                />
              )}
              <Grid container spacing={4}>
                <Grid item {...MQ.rows_3}>
                  <TextField
                    type="password"
                    error={
                      (error?.newPass ||
                        error?.password ||
                        error?.textField) !== undefined
                    }
                    inputRef={password}
                    label="New Password"
                    {...style.textField}
                  />
                </Grid>
                <Grid item {...MQ.rows_3}>
                  <TextField
                    type="password"
                    error={
                      (error?.confirmPass ||
                        error?.password ||
                        error?.textField) !== undefined
                    }
                    inputRef={confirmPass}
                    label="Confirm Password"
                    {...style.textField}
                  />
                </Grid>
                <Grid item {...MQ.rows_3}>
                  <Button
                    sx={{ float: "right" }}
                    fullWidth
                    loading={isUpdating}
                    onClick={() => handleProfileUpdation("password")}
                  >
                    UPDATE
                  </Button>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </div>
      </Grid>
    </>
  );
}
