import React from 'react';
import { Navbar, FormControl, FormGroup, Nav, NavDropdown, MenuItem } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';

class Header extends React.Component{

    state = {
        isOpenElectronics: false,
        isOpenBook: false,
        isOpenHome: false
    };

    categoryOnHoverIn = (e) => {
        switch(e.target.id){
            case "electronics-nav-dropdown":{
                this.setState({ isOpenElectronics: true });
                break;
            }
            case "books-nav-dropdown":{
                this.setState({ isOpenBook: true });
                break;
            }
            case "home-requirements-nav-dropdown":{
                this.setState({ isOpenHome: true });
                break;
            }
        }

    };

    categoryOnHoverOut = () => {
        this.setState(() => {
           return {
               isOpenElectronics: false,
               isOpenBook: false,
               isOpenHome: false
           }
        });

    };

    categoryClickHandler = (routeName) => {
        this.props.history.push(routeName);
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
                            onMouseEnter = { this.categoryOnHoverIn }
                            onMouseLeave = { this.categoryOnHoverOut }
                            open={ this.state.isOpenElectronics }
                            onClick={() => this.categoryClickHandler("/electronics")}
                            noCaret
                        >
                            <MenuItem onClick={() => this.categoryClickHandler("/electronics/tv")}>TV</MenuItem>
                            <MenuItem onClick={() => this.categoryClickHandler("/electronics/cellphone")}>Cellphone</MenuItem>
                            <MenuItem onClick={() => this.categoryClickHandler("/electronics/camera")}>Camera</MenuItem>
                            <MenuItem onClick={() => this.categoryClickHandler("/electronics/laptops")}>Laptops</MenuItem>
                        </NavDropdown>

                        <NavDropdown
                            title="Books"
                            id="books-nav-dropdown"
                            onMouseEnter = { this.categoryOnHoverIn }
                            onMouseLeave = { this.categoryOnHoverOut }
                            open={ this.state.isOpenBook }
                            onClick={() => this.categoryClickHandler("/books")}
                            noCaret
                        >
                            <MenuItem onClick={() => this.categoryClickHandler("/books/novel")}>Novel</MenuItem>
                            <MenuItem onClick={() => this.categoryClickHandler("/books/magazine")}>Magazine</MenuItem>
                        </NavDropdown>

                        <NavDropdown
                            title="Home Requirements"
                            id="home-requirements-nav-dropdown"
                            onMouseEnter = { this.categoryOnHoverIn }
                            onMouseLeave = { this.categoryOnHoverOut }
                            open={ this.state.isOpenHome }
                            onClick={() => this.categoryClickHandler("/homerequirements")}
                            noCaret
                        >
                            <MenuItem onClick={() => this.categoryClickHandler("/homerequirements/furniture")}>Furniture</MenuItem>
                            <MenuItem onClick={() => this.categoryClickHandler("/homerequirements/lighting")}>Lighting</MenuItem>
                            <MenuItem onClick={() => this.categoryClickHandler("/homerequirements/mattress")}>Mattress</MenuItem>
                        </NavDropdown>

                    </Nav>
                    <Navbar.Form pullRight>
                        <FormGroup>
                            <FormControl type="text" placeholder="Search All Categories" />
                        </FormGroup>
                    </Navbar.Form>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default withRouter(Header);