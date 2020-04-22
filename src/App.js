import React from "react";
import { Link } from "react-router-dom";
import { Navbar } from "react-bootstrap";
import { Footer } from "react-bootstrap";
import { NavItem } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./App.css";
import Routes from "./Routes";

function App() {
  return (
    <div className="App container">
      <Navbar fluid collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">4webEvalution</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <LinkContainer to="/dashboard">
              <NavItem>Tableau</NavItem>
            </LinkContainer>
            <LinkContainer to="/login">
              <NavItem>Se connecter</NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <footer>

      </footer>
      <Routes />
    </div>
  );
}

export default App;