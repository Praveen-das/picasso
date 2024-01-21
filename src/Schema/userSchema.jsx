import * as yup from "yup";

yup.addMethod(yup.string, 'stripEmptyString', function () {
  return this.transform((value) => (value === '' ? undefined : value));
});

export const personalInfoSchema = yup.object(
  {
    displayName: yup
      .string()
      .min(5, "displayName should be in between 5 to 20 characters in length")
      .max(20, "displayName should be in between 5 to 20 characters in length"),
    email: yup
      .string("Enter your email")
      .email("Enter a valid email"),
    phoneNumber: yup
      .string()
      .max(10),
    bio: yup
      .string()
      .max(60, "Bio must be less than 60 characters"),
  }
)

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
      url: yup.string().url('Enter a valid URL')
    }))
})

export const userAddressSchema = yup.object({
  name: yup.string().required("Enter your name"),
  address: yup.string().required("Enter your address"),
  city: yup.string().required("Select your city"),
  state: yup.string().required("Select your state"),
  pincode: yup.string().max(6).required("Enter your pincode"),
  mobile: yup.string().max(10, 'Phone Number must be at most 10 characters.').required("Enter your phone number"),
});

export const userAddressUpdateSchema = yup.object({
  name: yup.string(),
  address: yup.string(),
  city: yup.string(),
  state: yup.string(),
  pincode: yup.string().max(6),
  mobile: yup.string().max(10, 'Phone Number must be at most 10 characters.'),
});

export const accountDetailsSchema = yup.object({
  name: yup.string().required("Enter your name"),
  email: yup.string().email().required("Enter a valid email"),
  account_number: yup.string().required("Enter your bank account number"),
  ifsc_code: yup.string().matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, 'Invalid IFSC code').required("Enter your IFSC code"),
  tnc_accepted: yup.boolean().required()
});
