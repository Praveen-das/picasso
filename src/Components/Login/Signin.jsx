import { Grid, Typography, TextField, Button, Checkbox } from "@mui/material";
import "./login.css";
import { Form, Formik } from "formik";
import { loginValidation } from "../../Schema/YupSchema";
import { TF_Style } from "../SellerComponents/AddProduct/style";
import { getCurrentUser, signin } from "../../lib/user.api";

function Signin({ setModel }) {
  const handleLogin = (values) => {
    signin(values)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    // setModel(false);
  };

  return (
    <>
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        validationSchema={loginValidation}
        onSubmit={(values, { setSubmitting }) => {
          handleLogin(values);
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
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  inputProps={{ autoComplete: "new-password" }}
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
          </Form>
        )}
      </Formik>
      <button onClick={() => getCurrentUser()}>user</button>
    </>
  );
}

export default Signin;
