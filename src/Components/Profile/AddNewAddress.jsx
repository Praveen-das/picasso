import { Button, Divider, Grid, Typography } from "@mui/material";
import { useEffect, useRef } from "react";
import { useDatabase } from "../../Hooks/useDatabase";
import AlertBox from "../MUIComponents/AlertBox/AlertBox";
import { TextField } from "../MUIComponents/TextField";
import "./styles.css";
import { userAddressSchema } from "../../Schema/YupSchema";
import { useFormik } from "formik";
import useAuthentication from "../../Hooks/useAuthentication";

function AddNewAddress({ open, close }) {
  const isMounted = useRef(false);
  const { addUserAddress } = useAuthentication();

  const style = {
    fullWidth: true,
    size: "small",
    variant: "standard",
    InputLabelProps: { shrink: true },
  };

  const mq_2rows = {
    xs: 12,
    md: 6,
  };

  useEffect(() => {
    const addNewAddress = document.querySelector("#AddNewAddress");
    if (open) {
      addNewAddress.classList.add("expand");
      isMounted.current = true;
      return;
    }
    if (!isMounted.current) return;
    addNewAddress.classList.add("shrink");
    isMounted.current = false;

    return () => {
      addNewAddress.classList.remove("expand");
      addNewAddress.classList.remove("shrink");
    };
  }, [open]);

  const {
    errors,
    touched,
    handleChange,
    handleSubmit,
    handleBlur,
    isSubmitting,
    resetForm,
    setFieldValue,
  } = useFormik({
    initialValues: {
      name: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      mobile: "",
      alternate_phone: null,
      email: "",
      isDefault: true,
    },
    validationSchema: userAddressSchema,
    onSubmit: (values, { setSubmitting }) => {
      addUserAddress(values).then(() => {
        setSubmitting(false);
        resetForm();
        close();
      });
    },
    validateOnChange: false,
  });

  return (
    <div id="AddNewAddress">
      <Grid container pl={{ md: 2 }}>
        <Grid item xs={12} ml={{ md: -2 }}>
          <Typography variant="h5" fontWeight={800} color="#333">
            Add Shipping Address
          </Typography>
        </Grid>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={5} mt={0}>
            <Grid item xs={12}>
              <TextField
                id="name"
                name="name"
                label="NAME"
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
                {...style}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="address"
                name="address"
                label="ADDRESS"
                onChange={handleChange}
                onBlur={handleBlur}
                sx={{ paddingTop: 3.3 }}
                multiline
                error={touched.address && Boolean(errors.address)}
                helperText={touched.address && errors.address}
                {...style}
              />
            </Grid>
            <Grid item {...mq_2rows}>
              <TextField
                id="city"
                name="city"
                label="CITY/DISTRICT/TOWN"
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.city && Boolean(errors.city)}
                helperText={touched.city && errors.city}
                {...style}
              />
            </Grid>
            <Grid item {...mq_2rows}>
              <TextField
                id="state"
                name="state"
                label="STATE"
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.state && Boolean(errors.state)}
                helperText={touched.state && errors.state}
                {...style}
              />
            </Grid>
            <Grid item {...mq_2rows}>
              <TextField
                id="mobile"
                name="mobile"
                label="PHONE NUMBER"
                onChange={handleChange}
                onBlur={handleBlur}
                type="number"
                error={touched.mobile && Boolean(errors.mobile)}
                helperText={touched.mobile && errors.mobile}
                {...style}
              />
            </Grid>
            <Grid item {...mq_2rows}>
              <TextField
                id="alternate_phone"
                name="alternate_phone"
                label="ALTERNATE NUMBER"
                onChange={handleChange}
                onBlur={handleBlur}
                type="number"
                error={
                  touched.alternate_phone && Boolean(errors.alternate_phone)
                }
                helperText={touched.alternate_phone && errors.alternate_phone}
                {...style}
              />
            </Grid>
            <Grid item {...mq_2rows}>
              <TextField
                id="email"
                name="email"
                label="EMAIL ADDRESS"
                onChange={handleChange}
                onBlur={handleBlur}
                type="email"
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                {...style}
              />
            </Grid>
            <Grid item {...mq_2rows}>
              <TextField
                label="PINCODE"
                id="pincode"
                name="pincode"
                onChange={handleChange}
                onBlur={handleBlur}
                type="number"
                error={touched.pincode && Boolean(errors.pincode)}
                helperText={touched.pincode && errors.pincode}
                {...style}
              />
            </Grid>
            <Grid item xs={12}>
              <input
                id="isDefault"
                name="isDefault"
                onChange={(e) => setFieldValue("isDefault", e.target.checked)}
                defaultChecked
                style={{ transform: "translateY(1.5px)", marginRight: 15 }}
                type="checkbox"
              />
              <label style={{ fontSize: "0.9rem" }} htmlFor="isDefault">
                Set as default shipping address.
              </label>
            </Grid>
            <Grid item xs={6}>
              <Button type="submit" size="large" fullWidth variant="contained">
                ADD
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                onClick={close}
                size="large"
                fullWidth
                variant="contained"
              >
                cancel
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
      <Divider sx={{ paddingTop: 5 }} />
    </div>
  );
}

export default AddNewAddress;
