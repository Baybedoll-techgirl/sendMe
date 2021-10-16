// import Header from './Header/Header'
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
import React, { useState } from 'react';
import SignUp from "./signUp"
import ReactDOM from 'react-dom';
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import { Formik, Form, Field, ErrorMessage } from 'formik';
// import Calendar from '' 

function HighPoint () {
  
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  
  return (
  <div>
   
   <button type='button' className='button'onClick={() => setOpen(o => !o)} >
      Sign up here
    </button>
     
    <Popup open={open} closeOnDocumentClick onClose={closeModal}>
    
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
          <button onClick={closeModal}>Close</button>
        </Form>
      )}
    </Formik>
         
     
      </Popup>
   
    </div>
  )}

// const HighPoint = () => {
//     return (
      
//       <div>

//   <sidebar>
// <h2>
//     This is the HighPoint 
// </h2>
// </sidebar>
//       </div>  
//     )
// }

export default HighPoint;