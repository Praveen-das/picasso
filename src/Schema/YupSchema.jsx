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
  password: yup.string("Enter your password").required("Password is required"),
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

export const displayNameSchema = yup.object(
  {
    displayName: yup
      .string()
      .min(5, "displayName should be in between 5 to 20 characters in length")
      .max(20, "displayName should be in between 5 to 20 characters in length")
  })
export const emailSchema = yup.object({ email: yup.string("Enter your email").email("Enter a valid email") })

export const passwordSchema = yup.object({
  old_password: yup
    .string("Enter your old password")
    .required('This field is required'),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be a minimum of 8 characters in length")
    .required('This field is required'),
  c_password: yup
    .string("Confirm your password")
    .oneOf([yup.ref("password"), null], "Passwords doesn't match")
    .required('This field is required'),
})

export const socialSchema = yup.object({
  social: yup.array()
    .of(yup.object({
      name: yup.string(),
      url: yup.string().url('must me a valid URL.')
    }))
})

export const userAddressSchema = yup.object({
  name: yup.string().required("Enter your name"),
  address: yup.string().required("Enter your address"),
  city: yup.string().required("Select your city"),
  state: yup.string().required("Select your state"),
  pincode: yup.mixed().required("Enter your pincode"),
  mobile: yup.string().required("Enter your phone number"),
  alternate_phone: yup.mixed(),
  email: yup.string().email("Enter a valid email"),
  isDefault: yup.boolean()
});
