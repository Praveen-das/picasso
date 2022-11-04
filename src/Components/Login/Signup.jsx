import {
  Grid,
  Typography,
  TextField,
  Button,
  Checkbox,
  Divider,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Google from "@mui/icons-material/Google";
import Facebook from "@mui/icons-material/Facebook";
import Twitter from "@mui/icons-material/Twitter";
import { useState } from "react";
import InputField from "../TextField/InputField";
import { useAuth } from "../../Hooks/useAuth";
import { Formik, Form } from "formik";
import { signupValidation } from "../../Schema/YupSchema";
import { TF_Style } from "../SellerComponents/AddProduct/style";
import { signup } from "../../lib/user.api";

function Signup({ setModel }) {
  const handleSignup = (value) => {
    signup(value);
    // e.preventDefault();
    // await signupUsingEmailPassword(signupCredential)
    //   .then(() => setModel(false))
    //   .catch((error) => {
    //     console.log(error);
    //     switch (error.code) {
    //       case "auth/email-already-in-use":
    //         setError({ email: true, message: "Email already in use" });
    //         break;
    //       case "auth/invalid-email":
    //         setError({ email: true, message: "Invalid email" });
    //         break;
    //       case "auth/weak-password":
    //         setError({
    //           password: true,
    //           message: "Minimum 6 characters required",
    //         });
    //         break;
    //       default:
    //         break;
    //     }
    //   });
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={signupValidation}
      onSubmit={(values, { setSubmitting }) => {
        handleSignup(values);
        setSubmitting(false);
      }}
      validateOnChange={false}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        isSubmitting,
      }) => (
        <Form>
          <Grid
            container
            width={{ xs: "300px", md: "500px" }}
            spacing={3}
            padding="0 4em"
          >
            <Grid item xs={12} mb={1} textAlign="center">
              <Typography
                sx={{ color: "var(--brand)" }}
                variant="h5"
                fontSize="2rem"
              >
                Sign up
              </Typography>
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="space-evenly">
              <IconButton aria-label="delete">
                <Google sx={{ fontSize: 30, color: "#DB4437" }} />
              </IconButton>
              <IconButton aria-label="delete">
                <Facebook sx={{ fontSize: 30, color: "#4267B2" }} />
              </IconButton>
              <IconButton aria-label="delete">
                <Twitter sx={{ fontSize: 30, color: "#1DA1F2" }} />
              </IconButton>
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ fontSize: "16px", color: "hsl(0, 0%, 46%)" }}>
                or
              </Divider>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="username"
                name="username"
                label="Username"
                onBlur={handleBlur}
                onChange={handleChange}
                error={touched.username && Boolean(errors.username)}
                helperText={touched.username && errors.username}
                {...TF_Style}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="email"
                name="email"
                label="Email"
                type="email"
                onBlur={handleBlur}
                onChange={handleChange}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                {...TF_Style}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="password"
                name="password"
                label="Password"
                type="password"
                onBlur={handleBlur}
                onChange={handleChange}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                {...TF_Style}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography sx={{ fontSize: "12px", fontWeight: 500 }}>
                <Checkbox
                  size="small"
                  sx={{
                    transform: "translateY(-1px)",
                    paddingLeft: 0,
                    "&.Mui-checked": {
                      color: "var(--brand)",
                    },
                  }}
                />
                I Agree to the Terms & Conditions
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                size="large"
                sx={{
                  background: "var(--brandGradient)",
                  borderRadius: "50px",
                  fontSize: "12px",
                }}
                variant="contained"
                fullWidth
              >
                Sign up
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}

export default Signup;
