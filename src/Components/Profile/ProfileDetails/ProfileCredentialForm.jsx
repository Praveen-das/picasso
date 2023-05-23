import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  IconButton,
  Grid,
  Typography,
  styled,
  InputAdornment,
  Box,
  Tooltip as _Tooltip,
  Skeleton,
} from "@mui/material";
import { useState } from "react";
import { useStore } from "../../../Context/Store";
import { useHelper } from "../../../Hooks/useHelper";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import StyledTextField from "../../MUIComponents/TextField";
import useCurrentUser from "../../../Hooks/useCurrentUser";
import { useFormik } from "formik";
import { displayNameSchema, emailSchema, passwordSchema, socialSchema } from "../../../Schema/YupSchema";
import Button from "@mui/lab/LoadingButton/LoadingButton";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LinkOffIcon from '@mui/icons-material/LinkOff';

const Tooltip = styled(({ className, ...props }) => (
  <_Tooltip {...props} classes={{ popper: className }} placement="top-end" />
))(({ theme }) => ({
  '.MuiTooltip-tooltip': {
    backgroundColor: theme.palette.error.main,
  },
}));

const initPass = {
  old_password: '',
  password: '',
  c_password: ''
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

function TextField({ error, data, ...rest }) {
  const { removeSocialMediaLink } = useCurrentUser();
  const set = useStore((state) => state.set);

  return (
    <StyledTextField
      error={!!error}
      placeholder={data?.url}
      InputProps={{
        endAdornment:
          error &&
          <Tooltip title={error} >
            <InputAdornment position="end">
              <ErrorOutlineIcon color="error" />
            </InputAdornment>
          </Tooltip> ||
          data &&
          <IconButton
            onClick={() => removeSocialMediaLink.mutateAsync(data?.id)
              .then(() => {
                set(({ alert }) => {
                  alert.message = `${data?.name} link removed`;
                  alert.type = 'success';
                  alert.toggled = true;
                });
              })}
            size='small'>
            <LinkOffIcon fontSize='small' />
          </IconButton>
      }}
      {...rest}
    />
  )
}

function ProfileCredentialForm({ user }) {
  const { updateUser, addSocialMediaLink, removeSocialMediaLink } = useCurrentUser();

  const { copyToClipboard } = useHelper();
  const set = useStore((state) => state.set);

  const [expanded, setExpanded] = useState(false)

  const displayNameForm = useFormik({ initialValues: { displayName: '' }, validationSchema: displayNameSchema, onSubmit: handleSubmit })
  const email = useFormik({ initialValues: { email: '' }, validationSchema: emailSchema, onSubmit: handleSubmit })
  const pForm = useFormik({ initialValues: initPass, validationSchema: passwordSchema, onSubmit: handleSubmit })
  const socialForm = useFormik({ initialValues: initSocial, validationSchema: socialSchema, onSubmit: handleSubmit })

  const handleToggle = (panel) => {
    setExpanded(expanded !== panel ? panel : false)
    displayNameForm.resetForm()
    email.resetForm()
    pForm.resetForm()
    socialForm.resetForm()
  };

  const MQ = {
    rows_4: { xs: 12, md: 3, lg: 3 },
    rows_3: { xs: 12, md: 4, lg: 4 },
    rows_2: { xs: 12, sm: 12 },
  };

  const style = {
    title: {
      variant: "h6",
      fontSize: 14,
    },
    accordionButton: {
      sx: { justifySelf: "flex-end" },
    },
    button: {
      sx: { m: 'auto 0 0 auto' },
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
    },
  };

  function handleSubmit({ social, ...data }, { setSubmitting, setFieldError, resetForm }) {
    delete data.c_password;

    if (social) {
      const links = social.filter(obj => obj.url)

      return addSocialMediaLink.mutateAsync(links)
        .then(() => {
          set(({ alert }) => {
            alert.message = 'Link added successfully';
            alert.type = 'success';
            alert.toggled = true;
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

    updateUser(data)
      .then(() => {
        set(({ alert }) => {
          alert.message = `${Object.keys(data)[0]} changed successfully`;
          alert.type = 'success';
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
  }

  function findData(data, key) {
    return data?.find(({ name }) => name === key)
  }

  return (
    <>
      <Grid item xs={12}>
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
                  <Button
                    {...style.accordionButton}
                    onClick={() => handleToggle("panel1")}
                  >
                    cancel
                  </Button>
                </>
              ) : (
                <>
                  {user?.displayName ?
                    <Typography {...style.summery}>
                      {user?.displayName}
                    </Typography> :
                    <Skeleton />
                  }
                  <Button
                    {...style.accordionButton}
                    onClick={() => handleToggle("panel1")}
                  >
                    Edit
                  </Button>
                </>
              )}
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <form onSubmit={displayNameForm.handleSubmit} onReset={displayNameForm.handleReset} action="submit">
              <Grid container spacing={4} >
                <Grid item xs>
                  <TextField
                    id="displayName"
                    name="displayName"
                    value={displayNameForm.values.displayName}
                    label="Full name"
                    placeholder={user?.displayName}
                    onChange={displayNameForm.handleChange}
                    error={displayNameForm.touched.displayName && displayNameForm.errors.displayName}
                    {...style.textField}
                  />
                </Grid>
                <Grid item xs={3} display='flex'>
                  <Button
                    variant="contained"
                    disabled={!displayNameForm.values.displayName}
                    fullWidth
                    loading={displayNameForm.isSubmitting}
                    type="submit"
                    {...style.button}
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
                {user?.id ?
                  <Typography whiteSpace="nowrap" {...style.summery}>
                    {user?.id}
                    <IconButton
                      onClick={() => copyToClipboard("User Id", user?.uid)}
                    >
                      <ContentCopyIcon sx={{ fontSize: 18 }} />
                    </IconButton>
                  </Typography> :
                  <Skeleton />
                }
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
                  <Button
                    onClick={() => handleToggle("panel2")}
                    {...style.accordionButton}
                  >
                    cancel
                  </Button>
                </>
              ) : (
                <>
                  <Typography {...style.summery}>
                    {user ?
                      <>
                        {user?.email}
                        <IconButton
                          onClick={() =>
                            copyToClipboard("Email", user?.email)
                          }
                        >
                          <ContentCopyIcon sx={{ fontSize: 18 }} />
                        </IconButton>
                      </> :
                      <Skeleton />
                    }
                  </Typography>
                  <Button
                    onClick={() => handleToggle("panel2")}
                    {...style.accordionButton}
                  >
                    {user?.email ? "Edit" : "Update"}
                  </Button>
                </>
              )}
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <form onSubmit={email.handleSubmit} onReset={email.handleReset} action="submit">
              <Grid container spacing={4} >
                <Grid item xs>
                  <TextField
                    id="email"
                    value={email.values.email}
                    label={user?.email ? "New Email" : "Your Email"}
                    placeholder={user?.email}
                    error={email.touched.email && email.errors.email}
                    {...style.textField}
                    onChange={email.handleChange}
                  />
                </Grid>
                <Grid item xs={3} display='flex'>
                  <Button
                    variant="contained"
                    disabled={
                      email.values.email === "" || email.values.email === undefined
                    }
                    sx={{ float: "right" }}
                    fullWidth
                    loading={email.isSubmitting}
                    type="submit"
                    {...style.button}
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
                  <Button
                    onClick={() => handleToggle("panel3", pForm.resetForm)}
                    {...style.accordionButton}
                  >
                    cancel
                  </Button>
                </>
              ) : (
                <>
                  <span></span>
                  <Button
                    onClick={() => handleToggle("panel3", pForm.resetForm)}
                    {...style.accordionButton}
                  >
                    CHANGE NOW
                  </Button>
                </>
              )}
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <form onSubmit={pForm.handleSubmit} onReset={pForm.handleReset} action="submit">
              <Grid container spacing={4} >
                <Grid item {...MQ.rows_3}>
                  <TextField
                    id="old_password"
                    name="old_password"
                    type="password"
                    label="Old Password"
                    onChange={pForm.handleChange}
                    error={pForm.touched.old_password && pForm.errors.old_password}
                    {...style.textField}
                  />
                </Grid>
                <Grid item {...MQ.rows_3}>
                  <TextField
                    id="password"
                    name="password"
                    type="password"
                    label="New Password"
                    onChange={pForm.handleChange}
                    error={pForm.touched.password && pForm.errors.password}
                    {...style.textField}
                  />
                </Grid>
                <Grid item {...MQ.rows_3}>
                  <TextField
                    id="c_password"
                    name="c_password"
                    type="password"
                    label="Confirm Password"
                    onChange={pForm.handleChange}
                    error={pForm.touched.c_password && pForm.errors.c_password}
                    {...style.textField}
                  />
                </Grid>
                <Grid item ml='auto'>
                  <Button
                    variant="contained"
                    disabled={
                      pForm.values.old_password === "" &&
                      pForm.values.password === "" &&
                      pForm.values.c_password === ""
                    }
                    sx={{ float: "right" }}
                    fullWidth
                    loading={pForm.isSubmitting}
                    type="submit"
                  >
                    UPDATE
                  </Button>
                </Grid>
              </Grid>
            </form>
          </AccordionDetails>
        </Accordion>
        {/* /////Social Media links/// */}
        <Accordion expanded={expanded === "panel4"}>
          <AccordionSummary
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <div id="accordion_style">
              <Typography {...style.title}>Social Media links</Typography>
              {expanded === "panel4" ? (
                <>
                  <span></span>
                  <Button
                    onClick={() => handleToggle("panel4")}
                    {...style.accordionButton}
                  >
                    cancel
                  </Button>
                </>
              ) : (
                <>
                  <Box display='flex' gap={1}>
                    {
                      user?.social?.map(({ id, name, url }) =>
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
                  <Button
                    onClick={() => handleToggle("panel4")}
                    {...style.accordionButton}
                  >
                    {!!user?.social?.length ? 'UPDATE' : 'ADD'}
                  </Button>
                </>
              )}
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <form onSubmit={socialForm.handleSubmit} onReset={socialForm.handleReset} action="submit">
              <Grid container spacing={4} >
                <Grid item xs={12}>
                  <TextField
                    id="social.0.url"
                    value={socialForm.values.social[0].url}
                    label="Facebook URL"
                    onChange={socialForm.handleChange}
                    data={findData(user?.social, 'facebook')}
                    error={socialForm.touched.social?.[0]?.url && socialForm.errors.social?.[0]?.url && `Facebook URL ${socialForm.errors.social?.[0]?.url}`}
                    {...style.textField}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="social.1.url"
                    value={socialForm.values.social[1].url}
                    label="Instagram URL"
                    onChange={socialForm.handleChange}
                    data={findData(user?.social, 'instagram')}
                    error={socialForm.touched.social?.[1]?.url && socialForm.errors.social?.[1]?.url && `Instagram URL ${socialForm.errors.social?.[1]?.url}`}
                    {...style.textField}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="social.2.url"
                    value={socialForm.values.social[2].url}
                    label="Twitter URL"
                    onChange={socialForm.handleChange}
                    data={findData(user?.social, 'twitter')}
                    error={socialForm.touched.social?.[2]?.url && socialForm.errors.social?.[2]?.url && `Twitter URL ${socialForm.errors.social?.[2]?.url}`}
                    {...style.textField}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="social.3.url"
                    value={socialForm.values.social[3].url}
                    label="LinkedIn URL"
                    onChange={socialForm.handleChange}
                    data={findData(user?.social, 'linkedIn')}
                    error={socialForm.touched.social?.[3]?.url && socialForm.errors.social?.[3]?.url && `LinkedIn URL ${socialForm.errors.social?.[3]?.url}`}
                    {...style.textField}
                  />
                </Grid>
                <Grid item ml='auto'>
                  <Button
                    variant="contained"
                    disabled={!socialForm.values.social?.some(value => value.url)}
                    sx={{ float: "right" }}
                    fullWidth
                    loading={socialForm.isSubmitting}
                    type="submit"
                  >
                    UPDATE
                  </Button>
                </Grid>
              </Grid>
            </form>
          </AccordionDetails>
        </Accordion>
      </Grid >
      {/* } */}
      {/* </Formik > */}
    </>
  );
}

export default ProfileCredentialForm
