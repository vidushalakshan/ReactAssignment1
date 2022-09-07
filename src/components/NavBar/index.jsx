import React, {Component, Fragment} from "react";
import {Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
class NavBar extends Component{
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <Fragment>
                <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm p-3 mb-5 bg-body rounded" >

                    <button className={"navbar-brand mb-0 h1"}><Link className={"nav-link"} to={"/"}>Dashboard</Link></button>
                    <ul className={"navbar-nav"}>
                        <button className={"nav-item"} style={{marginLeft:20}}><Link className={"nav-link"} to={"/product"}>Product</Link></button>
                        <button className={"nav-item"} style={{marginLeft:20}}><Link className={"nav-link"} to={"/cart"}>Cart</Link></button>

                    </ul>
                    <span className={"navbar-brand mb-0 h1"}  style={{marginLeft:1000}}>Kavindu</span>

                </nav>
            </Fragment>



        )
    }
}

export default NavBar