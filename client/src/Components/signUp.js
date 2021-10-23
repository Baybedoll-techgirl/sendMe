// Render Prop
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const SignUp = () => {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
return (
  <div>
    
    <Popup open={open} closeOnDocumentClick onClose={closeModal}>
    <div className='modal'>
    <h1>Any place in your app!</h1>
    <Formik
      initialValues={{ name: '', email: ''}}
      validate={values => {
        const errors = {};
        if (!values.email) {
          errors.email = 'Required';
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = 'Invalid email address';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field type="name" name="name" />
          <ErrorMessage name="name" component="div" />
          <Field type="email" name="email" />
          <ErrorMessage name="email" component="div" />
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
      
      
      </div>   
      </Popup>
         
    </div>
)
 };

export default SignUp;