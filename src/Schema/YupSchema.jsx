import * as yup from 'yup'

export const productValidation = yup.object({
    // email: yup
    //     .string('Enter your email')
    //     .email('Enter a valid email')
    //     .required('Email is required'),
    // password: yup
    //     .string('Enter your password')
    //     .min(8, 'Password should be of minimum 8 characters length')
    //     .required('Password is required'),
    name: yup
        .string()
        .required(),
    desc: yup
        .string()
        .required(),
    category_id: yup
        .number(),
    material_id: yup
        .number(),
    width: yup
        .number(),
    height: yup
        .number(),
    quantity: yup
        .number()
        .required(),
    price: yup
        .number()
        .required(),
    discount: yup
        .number(

    )
});