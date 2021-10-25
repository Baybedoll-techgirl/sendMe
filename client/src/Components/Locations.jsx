// import Header from './Header/Header'
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
import React, { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import moment from "moment";

function Location({ location_url }) {
  const user_details = JSON.parse(localStorage.getItem("user_details"));
  const [open, setOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const closeModal = () => setOpen(false);

  const fetchData = async () => {
    const result = await axios.get(`/api/calendar/events/${location_url}`);
    console.log(result.data);
    setEvents(result.data.events);
  };

  useEffect(() => {
    fetchData();
  }, []);

  async function logVolunteer(id) {
    if (user_details?._id) {
      const result = await axios.put(`/api/calendar/log-volunteer/${id}`, {
        volunteer_id: user_details?._id,
      });
      console.log(result);
      if (result.data.success) {
        alert("added");
        fetchData();
      } else {
        alert(result.data.msg);
      }
    } else {
      setOpen((o) => !o);
    }
  }

  return (
    <div>
      <Container>
        <Row>
          {events.map((item) => (
            <Col key={item._id}>
              <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" src="../sendmelogo.jpg" />
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Text>{item.location}</Card.Text>
                  <Card.Text>
                    Start:{" "}
                    <strong>
                      {moment(item.start).format(
                        "dddd, MMMM Do YYYY, h:mm:ss a"
                      )}
                    </strong>
                  </Card.Text>
                  <Card.Text>
                    End:{" "}
                    <strong>
                      {moment(item.end).format("dddd, MMMM Do YYYY, h:mm:ss a")}
                    </strong>
                  </Card.Text>
                  <Button
                    variant="primary"
                    disabled={
                      item.volunteers[0] === user_details?._id && user_details?._id ? true : false
                    }
                    onClick={() => logVolunteer(item._id)}
                  >
                    {item.volunteers[0] === user_details?._id && user_details?._id
                      ? "Enrolled"
                      : "Sign up here"}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <Popup open={open} closeOnDocumentClick onClose={closeModal}>
        <h1>Sign up required</h1>
        <Button>Stay on page</Button>
        <Button>Sign up</Button>

        {/* <Formik
          initialValues={{ name: "", email: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = "Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
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
              <label htmlFor="name">Full Name</label>
              <Field type="name" name="name" />
              <ErrorMessage name="name" component="div" />
              <br />
              <label htmlFor="email">Email</label>
              <Field type="email" name="email" />
              <br />
              <ErrorMessage name="email" component="div" />
              <br />
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
              <button onClick={closeModal}>Close</button>
            </Form>
          )}
        </Formik> */}
      </Popup>
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

export default Location;
