// import Header from './Header/Header'
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
import React, { useEffect, useState } from "react";
import SignUp from "./signUp";
import ReactDOM from "react-dom";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import moment from "moment";
import Location from "./Locations";
// import Calendar from ''

function HighPoint() {
  return (
    <div>
      <Location location_url="HighPoint Road" />
    </div>
  );
}

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
