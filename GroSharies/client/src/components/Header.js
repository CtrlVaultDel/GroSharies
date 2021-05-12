import React, { useState, useContext } from "react";
import { NavLink as RRNavLink } from "react-router-dom";
import {
Collapse,
Navbar,
NavbarToggler,
NavbarBrand,
Nav,
NavItem,
NavLink,
} from "reactstrap";

// Styling
import "../styles/navbar.css";

// Context
import { UserContext } from "../providers/UserProvider";
// =========================== IMPORTS END ===========================


export default function Header() {
    const { isLoggedIn, logout } = useContext(UserContext);
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const currentEmail = JSON.parse(sessionStorage.getItem("user")).email;

    return (
        <Navbar light expand="md" id="navbar-header">
            <NavbarBrand tag={RRNavLink} to="/household">
                GroSharies
            </NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
                <Nav className="mr-auto" navbar>
                
            {/* If logged in, render the Households link*/}
                <Nav className="mr-auto" navbar>
                {isLoggedIn && (
                    <NavItem>
                        <NavLink tag={RRNavLink} to="/household">
                            Households
                        </NavLink>
                    </NavItem>
                )}
                </Nav>

                <Nav className="mr-auto" navbar>
                {/* If logged in, render the My Profile link */}
                {isLoggedIn && (
                    <NavItem>
                        <NavLink tag={RRNavLink} to="/user">
                            My Profile
                        </NavLink>
                    </NavItem>
                )}
                </Nav>

                {/* If logged in, render the Logout link */}
                <Nav navbar>
                {isLoggedIn && (
                    <NavItem>
                        <a
                        href="/login"
                        aria-current="page"
                        className="nav-link"
                        style={{ cursor: "pointer" }}
                        onClick={logout}
                        >
                            Logout ({currentEmail})
                        </a>
                    </NavItem>
                )}
                </Nav>

                {/* If not logged in, only show the Login & Registration links */}
                {!isLoggedIn && (
                    <>
                        <NavItem>
                            <NavLink tag={RRNavLink} to="/login">
                            Login
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={RRNavLink} to="/register">
                            Register
                            </NavLink>
                        </NavItem>
                    </>
                )}
                </Nav>
            </Collapse>
        </Navbar >
    );
}
