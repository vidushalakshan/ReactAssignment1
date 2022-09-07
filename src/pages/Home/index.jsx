import React, {Component, Fragment} from "react";
import { styleSheet } from "./style";
import { withStyles } from "@mui/styles";
import GDSESnackBar from "../../components/SnackBar";
import GDSEButton from "../../components/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import {Link} from "react-router-dom";
import Admin from "../Admin";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: 'admin',
            pw: 'admin',
            formData: {
                user_name: '',
                password: ''
            },

            //for snackbar props
            open: false,
            message: '',
            severity: ''
        }
    }
    checkValidity() {
        console.log("Login button clicked!")

        console.log(this.state.formData)

        let formData = this.state.formData

        if (formData.user_name === this.state.userName && formData.password === this.state.pw) {
            console.log('credential matched!')
            this.setState({
                open: true,
                message: 'User credential matching sucess!',
                severity: 'success',


            })

        } else {
            console.log('credential didn\'t matche!')
            this.setState({
                open: true,
                message: 'User credential not matching!',
                severity: 'error'
            })
        }
    }

    render() {
        const {classes} = this.props;
        return (
            <Fragment>
                <div className={classes.container}>
                    <div className={classes.login__cover}>
                        <div className={classes.title__container}>
                            <Typography variant="h4">Login</Typography>
                        </div>
                        <div className={classes.form__container}>
                            <TextField
                                id="outlined-basic"
                                label="User name"
                                variant="outlined"
                                onChange={(e) => {
                                    console.log(e.target.value)
                                    let formData = this.state.formData
                                    formData.user_name = e.target.value
                                    this.setState({ formData })
                                }}
                                style={{backgroundColor:"white"}}
                            />
                            <TextField
                                id="outlined-basic"
                                type="password"
                                label="Password"
                                variant="outlined"
                                onChange={(e) => {
                                    console.log(e.target.value)
                                    let formData = this.state.formData
                                    formData.password = e.target.value
                                    this.setState({ formData })
                                }}
                                style={{backgroundColor:"white"}}
                            />
                        </div>
                        <div className={classes.btn__container}>


                            <Link to={"/admin"}>
                                <GDSEButton
                                    variant="contained"
                                    label="Login"
                                    onClick={() => {
                                        this.checkValidity()
                                    }}
                                />

                            </Link>


                        </div>
                        <div>
                           <Typography>
                               Create new user account?
                               <Link to={"/users"}>

                               <button>  click here</button>

                               </Link>


                           </Typography>
                        </div>
                    </div>
                    <GDSESnackBar
                        open={this.state.open}
                        onClose={() => {
                            this.setState({ open: false })
                        }}
                        message={this.state.message}
                        autoHideDuration={3000}
                        severity={this.state.severity}
                        variant="filled"
                    />
                </div>
            </Fragment>
        )
    }
}

export default withStyles(styleSheet)(Home)