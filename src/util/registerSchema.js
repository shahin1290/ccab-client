import * as Yup from 'yup'


export const registerSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('First Name is required')
    .min(2, 'First must be at least 2 characters')
    .max(15, 'First must not exceed 15 characters'),
  lastName: Yup.string()
    .required('Last Name is required')
    .min(2, 'Last Name must be at least 2 characters')
    .max(15, 'Last Name must not exceed 15 characters'),

  email: Yup.string().required('Email is required').email('Email is invalid'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .max(40, 'Password must not exceed 40 characters'),
  confirmPassword: Yup.string()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('password'), null], 'Password does not match'),
  acceptTerms: Yup.bool().oneOf([true], 'Accept Terms is required'),
  gender: Yup.string().required("Must provide a gender").nullable(),
  language: Yup.string().required("Must provide a language").nullable(),
  code: Yup.string().required("Country code is missing"),
  phone: Yup.string().required("Phone number is missing")
})
