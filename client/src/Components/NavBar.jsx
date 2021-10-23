import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import "../NavBar.css";
import logo from "../SendMeLogo.gif";
import { Stripe } from "./Stripe";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import axios from "axios";
export function NavBar() {
  const [open, setOpen] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);
  const closeModal = () => setOpen(false);
  const user_details = JSON.parse(localStorage.getItem("user_details"));

  async function signin(body) {
      const url = isSignUp ? "/api/volunteer/create": "/api/volunteer/login"
    const result = await axios.post(url, body);
    console.log(result);
    localStorage.setItem("user_details", JSON.stringify(result.data.volunteer));
  }

  return (
    <div className="NavBar">
      <Navbar bg="myColor" variant="dark" sticky="top:" expand="sm">
        <Navbar.Brand as={Link} to="/">
          <img className="logo" alt="volunteer logo" src={logo} width="100px" height="relative" />{" "}
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="nav">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <NavDropdown title="Locations">
              <NavDropdown.Item as={Link} to="/locations/HighPoint_Rd">
                HighPoint Road
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/locations/Stn_Mtn_Park_and_Ride">
                Stone Mountain Park and Ride
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/locations/Hewatt_Park_and_Ride">
                Hewatt Road Park and Ride
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="myEvents">My Events</Nav.Link>
          </Nav>
        </Navbar.Collapse>

        <Nav>
          {!user_details?.email ? (
            <>
              <Nav.Link
                href="#"
                onClick={() => {
                  setOpen((o) => !o);
                  setIsSignUp(true);
                }}
              >
                Sign Up
              </Nav.Link>
              <Nav.Link
                href="#"
                onClick={() => {
                  setOpen((o) => !o);
                  setIsSignUp(false);
                }}
              >
                Login
              </Nav.Link>{" "}
            </>
          ) : (
            <Nav.Link
              href="#"
              onClick={() => localStorage.clear("user_details")}
            >
              Logout
            </Nav.Link>
          )}
        </Nav>
        <div className="stripe">
          <Stripe price={5} />
        </div>
      </Navbar>
      {/* <div className="content">
                This is a content. 
            </div> */}
      <Popup open={open} closeOnDocumentClick onClose={closeModal}>
        <h1>{isSignUp ? "Sign up" : "Login"}</h1>

        <Formik
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
              signin(values);
              console.log("form submiting", values);
            }, 400);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              {isSignUp && (
                <>
                  <label htmlFor="name">Full Name</label>
                  <Field type="name" name="name" />
                  <ErrorMessage name="name" component="div" />
                  <br />
                </>
              )}

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
        </Formik>
      </Popup>
    </div>
  );
}
