import { Grid, Typography, TextField, Button, Checkbox } from "@mui/material";
import "./login.css";
import { useFormik } from "formik";
import { loginValidation } from "../../Schema/YupSchema";
import { TF_Style } from "../SellerComponents/AddProduct/style";
import { getCurrentUser, signin } from "../../lib/user.api";
import { useMutation, useQueryClient } from '@tanstack/react-query'
import useAuthentication from "../../Hooks/useAuthentication";
import { useNavigate } from "react-router-dom";

function Signin({ onClose }) {
  const { signin } = useAuthentication()

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    setFieldError
  } = useFormik({
    initialValues: {
      email: "praveendask97@gmail.com",
      password: "asdasdasd",
    },
    validationSchema: loginValidation,
    onSubmit: (values, { setSubmitting }) => {
      handleLogin(values);
      setSubmitting(false);
    },
    validateOnChange: false
  })

  const navigate = useNavigate()

  function handleLogin(values) {
    signin(values)
      .then(() => navigate(-1))
      .catch((err) => {
        const { field, message } = err.response.data
        setFieldError(field, message)
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Grid
          container
          width={{ xs: "300px", md: "500px" }}
          spacing={3}
          padding="0 4em"
        >
          <Grid item xs={12} mb={2} textAlign="center">
            <Typography
              sx={{ color: "var(--brand)" }}
              variant="h5"
              fontSize="2rem"
            >
              Log in
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="email"
              label="Email"
              value={values.email}
              onBlur={handleBlur}
              onChange={handleChange}
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              {...TF_Style}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="password"
              label="Password"
              type="password"
              autoComplete='false'
              value={values.password}
              onBlur={handleBlur}
              onChange={handleChange}
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              {...TF_Style}
            />
          </Grid>
          <Grid
            item
            xs={12}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography sx={{ fontSize: "12px", fontWeight: 500 }}>
              <Checkbox
                size="small"
                sx={{
                  paddingLeft: 0,
                  "&.Mui-checked": {
                    color: "var(--brand)",
                  },
                  transform: "translateY(-1px)",
                }}
              />
              Remember me
            </Typography>
            <Typography sx={{ fontSize: "12px", fontWeight: 500 }}>
              Forgot password ?
            </Typography>
          </Grid>
          <Grid item xs={12} textAlign="center">
            <Button
              disabled={isSubmitting}
              type="submit"
              size="large"
              sx={{
                background: "var(--brandGradient)",
                borderRadius: "50px",
                fontSize: "12px",
                width: "200px",
              }}
              variant="contained"
            >
              Log in
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
}

export default Signin;
