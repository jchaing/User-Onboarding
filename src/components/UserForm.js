import React, { useState, useEffect } from 'react';
import { withFormik, Form, Field } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';

const UserForm = ({ values, errors, touched, status }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    console.log(status);
    if (status) {
      setUsers([...users, status]);
    }
  }, [users, status]);

  return (
    <div className="user-form">
      <Form>
        <Field type="text" name="fname" placeholder="Full Name" />
        {touched.fname && errors.fname && (
          <p className="error">{errors.fname}</p>
        )}

        <Field type="email" name="email" placeholder="Email" />
        {touched.email && errors.email && (
          <p className="error">{errors.email}</p>
        )}

        <Field type="password" name="password" placeholder="Password" />
        {touched.password && errors.password && (
          <p className="error">{errors.password}</p>
        )}

        <Field component="select" name="role" className="role-select">
          <option value="">Role is required</option>
          <option value="UX">UX</option>
          <option value="Frontend">Frontend</option>
          <option value="Backend">Backend</option>
          <option value="Full Stack">Full Stack</option>
        </Field>
        {touched.role && errors.role && <p className="error">{errors.role}</p>}

        <div className="tos">
          <label>
            <Field type="checkbox" name="tos" checked={values.tos} />
            <span>Accept Terms of Service</span>
          </label>
          {touched.tos && errors.tos && <p className="error">{errors.tos}</p>}
        </div>

        <button type="submit">Submit</button>
      </Form>
      <h2>User Lists</h2>
      {users.map(user => (
        <ul key={user.id}>
          <li>Id: {user.id}</li>
          <li>User: {user.fname}</li>
          <li>Email: {user.email}</li>
          <li>Role: {user.role}</li>
        </ul>
      ))}
    </div>
  );
};

const FormikUserForm = withFormik({
  mapPropsToValues({ fname, email, password, role, tos }) {
    return {
      fname: fname || '',
      email: email || '',
      password: password || '',
      role: role || '',
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
    role: Yup.string().required('Please choose a role'),
    tos: Yup.boolean().oneOf([true], 'Must Accept TOS')
  }),

  handleSubmit(values, { resetForm, setErrors, setSubmitting, setStatus }) {
    if (values.email === 'waffle@syrup.com') {
      setErrors({ email: 'That email is already taken' });
    } else {
      axios
        .post('https://reqres.in/api/users', values)
        .then(res => {
          console.log(res.data);
          setStatus(res.data);
          resetForm();
          setSubmitting(false);
        })
        .catch(err => {
          console.log(err);
          setSubmitting(false);
        });
    }
  }
})(UserForm);

export default FormikUserForm;
