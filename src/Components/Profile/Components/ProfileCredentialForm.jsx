import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  IconButton,
  Grid,
  Typography,
} from "@mui/material";
import NButton from "@mui/material/Button/Button";
import { useRef, useState } from "react";
import { useStore } from "../../../Context/Store";
import { useHelper } from "../../../Hooks/useHelper";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import AlertBox from "../../MUIComponents/AlertBox/AlertBox";
import { TextField } from "../../MUIComponents/TextField";
import { Button } from "../../MUIComponents/Button";
import useAuthentication from "../../../Hooks/useAuthentication";
import { joinStrings } from "../../../Utils/joinStrings";
import { useFormik } from "formik";
import * as yup from "yup";

export default function ProfileCredentialForm({ user }) {
  const { update, isUpdating } = useAuthentication();
  const { copyToClipboard } = useHelper();
  const { currentUser } = useAuthentication();
  const set = useStore((state) => state.set);

  const [error, setError] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleToggle = (panel) => {
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

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    resetForm,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
      c_password: "",
    },
    validationSchema: yup.object({
      displayName: yup.string(),
      email: yup.string("Enter your email").email("Enter a valid email"),
      password: yup
        .string("Enter your password")
        .min(8, "Password should be of minimum 8 characters length"),
      c_password: yup
        .string("Enter your password")
        .oneOf([yup.ref("password"), null], "Passwords doesn't match"),
    }),
    onSubmit: (values, { setSubmitting }) => {
      update(values).then(() => {
        set(({ alert }) => {
          alert.toggled = true;
          alert.message = `${Object.keys(values)[0]} changed successfully`;
        });
        resetForm();
        setSubmitting(false);
        setExpanded(false);
      });
    },
    validateOnChange: false,
  });

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
            <AccordionDetails>
              {touched.displayName && Boolean(errors.displayName) && (
                <AlertBox
                  message={touched.displayName && Boolean(errors.displayName)}
                />
              )}
              <form onSubmit={handleSubmit}>
                <Grid container spacing={4} sx={{ mt: -5 }}>
                  <Grid item {...MQ.rows_4}>
                    <TextField
                      id="displayName"
                      name="displayName"
                      label="Full name"
                      placeholder={user?.displayName}
                      error={(error?.fName || error?.textField) !== undefined}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      {...style.textField}
                    />
                  </Grid>
                  <Grid item {...MQ.rows_4}>
                    <Button
                      sx={{ float: "right" }}
                      fullWidth
                      loading={isUpdating}
                      type="submit"
                    >
                      UPDATE
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </AccordionDetails>
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
              {/* <div claslName='accordion_warning normal'>
                                    <Typography {...style.details}>Your email must be a valid one. </Typography>
                                </div> */}
              <form onSubmit={handleSubmit}>
                {touched.email && Boolean(errors.email) && (
                  <AlertBox message={touched.email && errors.email} />
                )}
                <Grid container spacing={4} sx={{ mt: -5 }}>
                  <Grid item {...MQ.rows_2} md={8}>
                    <TextField
                      id="email"
                      name="email"
                      label="New Email"
                      type="email"
                      placeholder={user?.email}
                      value={values.email}
                      error={touched.email && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      {...style.textField}
                    />
                  </Grid>
                  <Grid item {...MQ.rows_2} md={4}>
                    <Button
                      sx={{ float: "right" }}
                      fullWidth
                      loading={isUpdating}
                      type="submit"
                    >
                      UPDATE
                    </Button>
                  </Grid>
                </Grid>
              </form>
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
              {(touched.password && Boolean(errors.password)) ||
                (touched.c_password && Boolean(errors.c_password) && (
                  <AlertBox
                    message={
                      (touched.password && Boolean(errors.password)) ||
                      (touched.c_password && Boolean(errors.c_password))
                    }
                  />
                ))}
              <Grid container spacing={4}>
                <Grid item {...MQ.rows_3}>
                  <TextField
                    id="password"
                    name="password"
                    type="password"
                    label="New Password"
                    error={touched.password && Boolean(errors.password)}
                    {...style.textField}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item {...MQ.rows_3}>
                  <TextField
                    id="c_password"
                    name="c_password"
                    type="password"
                    label="Confirm Password"
                    error={touched.c_password && Boolean(errors.c_password)}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    {...style.textField}
                  />
                </Grid>
                <Grid item {...MQ.rows_3}>
                  <Button
                    sx={{ float: "right" }}
                    fullWidth
                    loading={isUpdating}
                    type="submit"
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
