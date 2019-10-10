import React from 'react';
import { withFormik, Form, Field } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';

const UserForm = ({ values, errors, touched }) => {
  console.log(values.tos);
  console.log(touched.fname);
  return (
    <div>
      <Form>
        <div>
          <Field type="text" name="fname" placeholder="Full Name" />
          {touched.fname && errors.fname && (
            <p className="error">{errors.fname}</p>
          )}
        </div>
        <div>
          <Field type="email" name="email" placeholder="Email" />
          {touched.email && errors.email && (
            <p className="error">{errors.email}</p>
          )}
        </div>
        <div>
          <Field type="password" name="password" placeholder="Password" />
          {touched.password && errors.password && (
            <p className="error">{errors.password}</p>
          )}
        </div>
        <div>
          <label>
            <Field type="checkbox" name="tos" checked={values.tos}/>
            Accept Terms of Service
          </label>
          {touched.tos && errors.tos && <p className="error">{errors.tos}</p>}
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </Form>
    </div>
  );
};

const FormikUserForm = withFormik({
  mapPropsToValues({ fname, email, password, tos }) {
    return {
      fname: fname || '',
      email: email || '',
      password: password || '',
      tos: tos || false
    };
  },

  validationSchema: Yup.object().shape({
    fname: Yup.string().required('Name is required'),
    email: Yup.string()
      .email('Email not valid')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be 6 characters or longer')
      .required('Password is required'),
    tos: Yup.boolean().oneOf([true], "Must Accept TOS")
  }),

  handleSubmit(values) {
    console.log(values);
  }
})(UserForm);

export default FormikUserForm;
