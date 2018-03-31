import React from 'react';
import { Navbar, FormControl, FormGroup, Nav, NavDropdown, MenuItem, Button, Glyphicon, DropdownButton, InputGroup } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import ShoppingCart from '../components/ShoppingCart';
import { connect } from 'react-redux';
import Popover, {PopoverAnimationVertical} from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItemMUI from 'material-ui/MenuItem';


class Header extends React.Component{

    state = {
        isOpenElectronics: false,
        isOpenBook: false,
        isOpenHome: false,
        placeholder: "Search All",
        searchMenuItems: ["Electronics", "Books", "Home"],
        dropDownSelected: "All",
        searchBoxText: "",
        shoppingCartOpen: false,
        menuItemMUI: ["Log In", "Register"],
        open: false
    };

    categoryStateChangeHelper = (t) => {
        switch(t.toLowerCase()){
            case 'electronics':
                this.setState((prevState) => {
                    return {
                        placeholder: "Search Electronics",
                        searchMenuItems:
                            prevState.searchMenuItems.concat(prevState.dropDownSelected).filter((menuItem) => (
                                menuItem !== "Electronics"
                            )),
                        dropDownSelected: "Electronics"
                    }
                });
                break;
            case 'books':
                this.setState((prevState) => {
                    return {
                        placeholder: "Search Books",
                        searchMenuItems: prevState.searchMenuItems.concat(prevState.dropDownSelected).filter((menuItem) => (
                            menuItem !== "Books"
                        )),
                        dropDownSelected: "Books"
                    }
                });
                break;
            case 'homerequirements':
                this.setState((prevState) => {
                    return {
                        placeholder: "Search Home Requirements",
                        searchMenuItems: prevState.searchMenuItems.concat(prevState.dropDownSelected).filter((menuItem) => (
                            menuItem !== "Home"
                        )),
                        dropDownSelected: "Home"
                    }
                });
                break;
            case 'home':
                this.setState((prevState) => {
                    return {
                        placeholder: "Search Home Requirements",
                        searchMenuItems: prevState.searchMenuItems.concat(prevState.dropDownSelected).filter((menuItem) => (
                            menuItem !== "Home"
                        )),
                        dropDownSelected: "Home"
                    }
                });
                break;
            default:
                this.setState((prevState) => {
                    return {
                        placeholder: "Search All",
                        searchMenuItems: prevState.searchMenuItems.concat(prevState.dropDownSelected).filter((menuItem) => (
                            menuItem !== "All"
                        )),
                        dropDownSelected: "All"
                    }
                });
                break;
        }
    };

    changeMenuMUIOptionsAuthenticated = () => {
        this.setState(() => ({menuItemMUI: ["My account", "Log out"]}));
    };

    changeMenuMUIOptionsUnauthenticated = () => {
        this.setState(() => ({menuItemMUI: ["Log In", "Register"]}));
    };

    componentWillReceiveProps(nextProps){
        let currentPath = this.props.location.pathname;
        let nextPath = nextProps.location.pathname;
        if(currentPath !== nextPath || this.props.authentication.isAuthenticated !== nextProps.authentication.isAuthenticated){
            // path is been changed
            let t = nextPath.split('/',2)[1];
            this.categoryStateChangeHelper(t);
            if(nextProps.authentication.isAuthenticated){
                this.changeMenuMUIOptionsAuthenticated();
            }
            else{
                this.changeMenuMUIOptionsUnauthenticated();
            }
        }
    }

    componentDidMount(){
        if(this.props.authentication.isAuthenticated){
            this.changeMenuMUIOptionsAuthenticated();
        }
        else{
            this.changeMenuMUIOptionsUnauthenticated();
        }
    }



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

    onSearchFormSubmit = (e) => {
        e.preventDefault();
        let searchCategorySelected = this.state.dropDownSelected;
        let searchQuery = this.state.searchBoxText;
        if(searchQuery.length > 0){
            this.props.history.push("/search/"+searchCategorySelected.toLowerCase()+"/"+searchQuery);
        }
        else{
            this.input.focus();
        }

    };

    menuOptionsClick = (menuItemName) => {
        this.setState(() => ({open: false}));
        const url = menuItemName.split(" ").join("").toLowerCase();
        this.props.history.push(url);
    };

    searchBoxChange = (e) => {
        let searchBoxText = e.target.value;
        if(searchBoxText.length < 25){
            this.setState(() => ({searchBoxText}));
        }
    };

    searchCategoryChange = (selectedCategory) => {
        this.categoryStateChangeHelper(selectedCategory);
    };

    shoppingCartModalShow = () => {
        this.setState(() => ({shoppingCartOpen: true}));
    };

    shoppingCartModalHide = () => {
        this.setState(() => ({shoppingCartOpen: false}));
    };

    handleUserAccountClick = (event) => {
        // This prevents ghost click.
        event.preventDefault();

        this.setState({
            open: true,
            anchorEl: event.currentTarget,
        });
    };

    handleUserAccountClose = () => {
        this.setState({
            open: false,
        });
    };

    render(){
        let shoppingCartTotal = this.props.shoppingCart ? this.props.shoppingCart.reduce((accumulator, item) => {
            return accumulator + item.quantity;
        }, 0) : 0;
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
                            <MenuItem onClick={() => this.categoryClickHandler("/books/book")}>Book</MenuItem>
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
                    <div className={"pull-right display-header-right"}>
                    <Navbar.Form>
                        <form onSubmit={this.onSearchFormSubmit}>
                        <FormGroup>
                            <InputGroup>
                            <FormControl type="text"
                                         placeholder={this.state.placeholder}
                                         value={this.state.searchBoxText}
                                         onChange={this.searchBoxChange}
                                         inputRef={ref => { this.input = ref; }}
                            />
                            <DropdownButton
                                componentClass={InputGroup.Button}
                                id="input-dropdown-addon"
                                title={this.state.dropDownSelected}
                            >
                                {
                                    this.state.searchMenuItems.map((menuItem) => (
                                        <MenuItem key={menuItem} onSelect={() => this.searchCategoryChange(menuItem)}>{menuItem}</MenuItem>
                                    ))
                                }
                            </DropdownButton>
                            </InputGroup>
                            <Button type="submit"><Glyphicon glyph={"search"}/></Button>
                            <Button onClick={this.shoppingCartModalShow} bsStyle={"link"}>
                                <Glyphicon glyph={"shopping-cart"} className={"cart-symbol-size"}/>
                                {shoppingCartTotal > 0 &&
                                    <span className="badge custom-cart-badge">
                                        {shoppingCartTotal}
                                    </span>
                                }
                            </Button>
                            <div className={"inline-div-display"}>
                                <Button
                                    onClick={this.handleUserAccountClick}
                                    bsStyle={"link"}
                                ><Glyphicon glyph={"user"} className={"cart-symbol-size"}/></Button>
                                <Popover
                                    open={this.state.open}
                                    anchorEl={this.state.anchorEl}
                                    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                                    targetOrigin={{horizontal: 'left', vertical: 'top'}}
                                    onRequestClose={this.handleUserAccountClose}
                                    animation={PopoverAnimationVertical}
                                >
                                    <Menu>
                                        {this.state.menuItemMUI.map((item, key) => (
                                            <MenuItemMUI primaryText={item} key={key} onClick={() => this.menuOptionsClick(item)}/>
                                        ))}
                                    </Menu>
                                </Popover>
                            </div>
                        </FormGroup>
                        </form>
                    </Navbar.Form>
                    <ShoppingCart handleClose={this.shoppingCartModalHide} show={this.state.shoppingCartOpen}/>
                    </div>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        shoppingCart: state.shoppingCart,
        authentication: state.authentication
    };
};

export default connect(mapStateToProps)(withRouter(Header));