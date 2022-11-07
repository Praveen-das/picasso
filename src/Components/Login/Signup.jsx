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
import { useFormik } from "formik";
import { signupValidation } from "../../Schema/YupSchema";
import { TF_Style } from "../SellerComponents/AddProduct/style";
import { signup } from "../../lib/user.api";
import { joinStrings } from "../../Utils/joinStrings";

function Signup({ confirmSuccess }) {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    setFieldError,
  } = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: signupValidation,
    onSubmit: (values, { setSubmitting }) => {
      values['displayName'] = values.username
      signup(values)
        .then(() => {
          setSubmitting(false);
          confirmSuccess()
        })
        .catch((err) => {
          const { field, message } = err.response?.data
          setFieldError(field, message)
        });
    },
    validateOnChange: false,
  });

  return (
    <form onSubmit={handleSubmit}>
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
            inputProps={{ autoComplete: "off" }}
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
            disabled={isSubmitting}
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
    </form>
  );
}

export default Signup;
