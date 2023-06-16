import { NavLink } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import { Navbar, Col, Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { getUser } from '../../../redux/userRedux';

const NavBar = () => {

    const user = useSelector(getUser);

    return (
        <Navbar 
            bg="primary"
            variant="dark" 
            collapseOnSelect
            expand="lg"
            className="mt-4 mb-4 rounded">

            <Container xs={12}>
                <Col><Nav.Link as={NavLink} to={"/"} className="text-white text-decoration-none h6 m-0">
                    Ads Board
                </Nav.Link>
                </Col>

                <Nav className="me-auto justify-content-end">
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                    {!user && (<Nav.Link as={NavLink} to="/login">Sign In</Nav.Link>)}
                    {user && (<Nav.Link as={NavLink} to="/logout">Sign Out</Nav.Link>)}
                    {!user && (<Nav.Link as={NavLink} to="/register">Sign Up</Nav.Link>)}
                    </Navbar.Collapse>
                </Nav>
                
            </Container>  
        </Navbar>
    )
}

export default NavBar;