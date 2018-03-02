import React from 'react';
import { Navbar, FormControl, FormGroup, Nav, NavDropdown, MenuItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default class Header extends React.Component{

    state = {
        isOpenElectronics: false,
        isOpenBook: false,
        isOpenHome: false
    };

    handleOpenElectronics = () => {
        this.setState({ isOpenElectronics: true })
    };

    handleCloseElectronics = () => {
        this.setState({ isOpenElectronics: false })
    };

    handleToggleElectronics = () => {
        this.setState((prevState) => ({
            isOpenElectronics: !prevState.isOpenElectronics
        }))
    };

    handleOpenBooks = () => {
        this.setState({ isOpenBook: true })
    };

    handleCloseBooks = () => {
        this.setState({ isOpenBook: false })
    };

    handleToggleBooks = () => {

        this.setState((prevState) => ({
            isOpenBook: !prevState.isOpenBook
        }))
    };

    handleOpenHome = () => {
        this.setState({ isOpenHome: true })
    };

    handleCloseHome = () => {
        this.setState({ isOpenHome: false })
    };

    handleToggleHome = () => {

        this.setState((prevState) => ({
            isOpenHome: !prevState.isOpenHome
        }))
    };

    render(){
        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/">eKart</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavDropdown
                            title="Electronics"
                            id="electronics-nav-dropdown"
                            onMouseEnter = { this.handleOpenElectronics }
                            onMouseLeave = { this.handleCloseElectronics }
                            open={ this.state.isOpenElectronics }
                            onToggle={this.handleToggleElectronics}
                            noCaret
                        >
                            <MenuItem>TV</MenuItem>
                            <MenuItem>Cellphone</MenuItem>
                            <MenuItem>Camera</MenuItem>
                            <MenuItem>Laptops</MenuItem>
                        </NavDropdown>

                        <NavDropdown
                            title="Books"
                            id="books-nav-dropdown"
                            onMouseEnter = { this.handleOpenBooks }
                            onMouseLeave = { this.handleCloseBooks }
                            open={ this.state.isOpenBook }
                            onToggle={this.handleToggleBooks}
                            noCaret
                        >
                            <MenuItem>Novel</MenuItem>
                            <MenuItem>Magazine</MenuItem>
                        </NavDropdown>

                        <NavDropdown
                            title="Home Requirements"
                            id="home-requirements-nav-dropdown"
                            onMouseEnter = { this.handleOpenHome }
                            onMouseLeave = { this.handleCloseHome }
                            open={ this.state.isOpenHome }
                            onToggle={this.handleToggleHome}
                            noCaret
                        >
                            <MenuItem>Furniture</MenuItem>
                            <MenuItem>Lighting</MenuItem>
                            <MenuItem>Mattress</MenuItem>
                        </NavDropdown>

                    </Nav>
                    <Navbar.Form pullRight>
                        <FormGroup>
                            <FormControl type="text" placeholder="Search" />
                        </FormGroup>
                    </Navbar.Form>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}