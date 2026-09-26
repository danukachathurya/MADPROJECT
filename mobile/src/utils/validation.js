import * as yup from 'yup';

export const loginSchema = yup.object({
  email: yup.string().email('Enter a valid email address').required('Email is required'),
  password: yup.string().required('Password is required')
});

export const registerSchema = yup.object({
  firstName: yup.string().trim().required('First name is required'),
  lastName: yup.string().trim().required('Last name is required'),
  email: yup.string().email('Enter a valid email address').required('Email is required'),
  password: yup.string().min(8, 'Use at least 8 characters').required('Password is required'),
  confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required('Please confirm your password')
});

export const studentSchema = yup.object({
  fullName: yup.string().trim().required('Full name is required'),
  phoneNumber: yup.string().trim().required('Phone number is required'),
  birthday: yup.string().required('Birthday is required'),
  school: yup.string().trim().required('School or university is required'),
  profileImage: yup.string().url('Enter a valid image URL').nullable().transform((value) => value || null),
  linkedin: yup.string().url('Enter a valid LinkedIn URL').nullable().transform((value) => value || null),
  github: yup.string().url('Enter a valid GitHub URL').nullable().transform((value) => value || null)
});

