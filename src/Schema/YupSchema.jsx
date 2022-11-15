import * as yup from "yup";

export const productValidation = yup.object({
  name: yup.string().required("required"),
  desc: yup.string().required("required"),
  category_id: yup.number(),
  material_id: yup.number(),
  width: yup.mixed().required("required"),
  height: yup.mixed().required("required"),
  quantity: yup.mixed().required("required"),
  price: yup.mixed().required("required"),
  discount: yup.mixed(),
  images: yup.mixed().required("required"),
  defaultImage: yup.mixed(),
});

export const productUpdateValidation = yup.object({
  name: yup.string(),
  desc: yup.string(),
  category_id: yup.number(),
  material_id: yup.number(),
  width: yup.mixed(),
  height: yup.mixed(),
  quantity: yup.mixed(),
  price: yup.mixed(),
  discount: yup.mixed(),
  images: yup.mixed(),
});
export const loginValidation = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .required("Password is required"),
});

export const signupValidation = yup.object({
  displayName: yup.string("Enter your name").required("This field is required"),
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

export const profileCredentialFormSchema = yup.object({
  displayName: yup.string(),
  email: yup.string("Enter your email").email("Enter a valid email"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length"),
  c_password: yup
    .string("Enter your password")
    .oneOf([yup.ref("password"), null], "Passwords doesn't match"),
});
