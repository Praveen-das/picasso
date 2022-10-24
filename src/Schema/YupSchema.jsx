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
    name: yup.string().required('This field is required'),
    description: yup.string().required('This field is required'),
    category_id: yup.number().required('Product must have a category'),
    material_id: yup.number().required('This field is required'),
    width: yup.number().required('This field is required'),
    height: yup.number().required('This field is required'),
    quantity: yup.number().required('This field is required'),
    price: yup.number().required('This field is required'),
    discount: yup.number()
});