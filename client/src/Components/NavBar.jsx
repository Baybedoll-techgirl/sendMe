import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import { Nav, Navbar, NavDropdown} from 'react-bootstrap'
import "../NavBar.css"
import logo from '../SendMeLogo.gif'
import { Stripe } from "./Stripe";
import NavbarToggle from 'react-bootstrap/esm/NavbarToggle';
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';
import { Link } from 'react-router-dom';
export function NavBar() {
    return (
        <div className="NavBar">
            <Navbar bg='myColor' variant="dark"
                sticky="top:" expand="sm">
                <Navbar.Brand as={Link}to="/">
                    <img className="logo" src={logo} width="100px" height="relative"/>{" "}

            </Navbar.Brand> 
            <Navbar.Toggle /> 
            <Navbar.Collapse>
            <Nav className="nav">
            <Nav.Link as={Link}to="/">Home</Nav.Link>
                <NavDropdown title="Locations">
                    <NavDropdown.Item as={Link}to="/locations/HighPoint_Rd">HighPoint Road</NavDropdown.Item>
                    <NavDropdown.Item as={Link}to="/locations/Stn_Mtn_Park_and_Ride">Stone Mountain Park and Ride</NavDropdown.Item>
                    <NavDropdown.Item as={Link}to="/locations/Hewatt_Park_and_Ride">Hewatt Road Park and Ride</NavDropdown.Item>
                </NavDropdown>
                <Nav.Link as={Link}to="/calendar">Schedule</Nav.Link>
                <Nav.Link href="myEvents">My Events</Nav.Link>
            </Nav>
            </Navbar.Collapse>
            <div className="stripe">
        <Stripe price={5} />
            </div>
        </Navbar>
        {/* <div className="content">
                This is a content. 
            </div> */}
        </div>
    )
}

