import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  IconButton,
  Grid,
  Typography,
} from "@mui/material";
import NButton from "@mui/material/Button/Button";
import { useState } from "react";
import { useStore } from "../../../Context/Store";
import { useHelper } from "../../../Hooks/useHelper";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import AlertBox from "../../MUIComponents/AlertBox/AlertBox";
import { TextField } from "../../MUIComponents/TextField";
import { Button } from "../../MUIComponents/Button";
import useAuth from "../../../Hooks/useAuth";
import { useFormik } from "formik";
import { profileCredentialFormSchema } from "../../../Schema/YupSchema";

export default function ProfileCredentialForm({ user }) {
  const { updateUser } = useAuth();
  const { copyToClipboard } = useHelper();
  const set = useStore((state) => state.set);

  const [expanded, setExpanded] = useState(false);

  const handleToggle = (panel) => {
    resetForm();
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
    setFieldError,
  } = useFormik({
    initialValues: {},
    validationSchema: profileCredentialFormSchema,
    onSubmit: (values, { setSubmitting }) => {
      delete values.c_password;
      // console.log(values);
      updateUser(values)
        .then(() => {
          set(({ alert }) => {
            alert.message = `${Object.keys(values)[0]} changed successfully`;
            alert.toggled = true;
          });
          resetForm();
          setSubmitting(false);
          setExpanded(false);
        })
        .catch((err) => {
          const { field, message } = err.response?.data;
          setFieldError(field.toLowerCase(), message);
          setSubmitting(false);
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
                      {user?.displayName}
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
                      onChange={handleChange}
                      onBlur={handleBlur}
                      {...style.textField}
                    />
                  </Grid>
                  <Grid item {...MQ.rows_4}>
                    <Button
                      disabled={
                        values.displayName === "" ||
                        values.displayName === undefined
                      }
                      sx={{ float: "right" }}
                      fullWidth
                      loading={isSubmitting}
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
                    {user?.id}
                    <IconButton
                      onClick={() => copyToClipboard("User Id", user?.uid)}
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
                      {user?.email && (
                        <>
                          {user?.email}
                          <IconButton
                            onClick={() =>
                              copyToClipboard("Email", user?.email)
                            }
                          >
                            <ContentCopyIcon sx={{ fontSize: 18 }} />
                          </IconButton>
                        </>
                      )}
                    </Typography>
                    <NButton
                      onClick={() => handleToggle("panel2")}
                      {...style.button}
                    >
                      {user?.email ? "Edit" : "Update"}
                    </NButton>
                  </>
                )}
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <form onSubmit={handleSubmit}>
                {touched.email && Boolean(errors.email) && (
                  <AlertBox message={errors.email} />
                )}
                <Grid container spacing={4} sx={{ mt: -5 }}>
                  <Grid item {...MQ.rows_2} md={8}>
                    <TextField
                      id="email"
                      name="email"
                      label={user?.email ? "New Email" : "Your Email"}
                      type="email"
                      placeholder={user?.email}
                      error={touched.email && Boolean(errors.email)}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      {...style.textField}
                    />
                  </Grid>
                  <Grid item {...MQ.rows_2} md={4}>
                    <Button
                      disabled={
                        values.email === "" || values.email === undefined
                      }
                      sx={{ float: "right" }}
                      fullWidth
                      loading={isSubmitting}
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
              {((touched.password && Boolean(errors.password)) ||
                (touched.c_password && Boolean(errors.c_password))) && (
                <AlertBox message={errors.password || errors.c_password} />
              )}
              <form onSubmit={handleSubmit}>
                <Grid container spacing={4}>
                  <Grid item {...MQ.rows_3}>
                    <TextField
                      id="old_password"
                      name="old_password"
                      type="password"
                      label="Old Password"
                      error={
                        touched.old_password && Boolean(errors.old_password)
                      }
                      {...style.textField}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Grid>
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
                  <Grid item ml='auto'>
                    <Button
                      disabled={
                        values.password === "" || values.password === undefined
                      }
                      sx={{ float: "right" }}
                      fullWidth
                      loading={isSubmitting}
                      type="submit"
                    >
                      UPDATE
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </AccordionDetails>
          </Accordion>
        </div>
      </Grid>
    </>
  );
}
