import React from 'react';
import { withFormik, Form, Field } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';

const UserForm = ({ values }) => {
  console.log(values)
  return (
    <Form>
      <div>
        <Field type="text" name="fname" placeholder="Full Name" />
      </div>
      <div>
        <Field type="email" name="email" placeholder="Email" />
      </div>
      <div>
        <Field type="password" name="password" placeholder="Password" />
      </div>
      <div>
        <label>
          <Field type="checkbox" name="tos" />
          Accept Terms of Service
        </label>
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </Form>
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

  handleSubmit(values) {
    console.log(values);
  }

})(UserForm);

export default FormikUserForm;
