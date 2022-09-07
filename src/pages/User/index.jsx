import React, {Component, Fragment} from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import Stack from "@mui/material/Stack";
import GDSEButton from "../../components/Button";
import UserServices from "../../service/UserServices";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import GDSESnackBar from "../../components/SnackBar";
class User extends Component {
   constructor(props) {
       super(props);

       this.state = {
           formData: {
               email: "",
               username: "",
               password: "",
               name: {
                   firstname: "",
                   lastname: "",
               },
               address: {
                   city: "",
                   street: "",
                   number: "",
                   zipcode: "",
                   geolocation: {
                       lat: "",
                       long: "",
                   }
               },
               phone: ""
           },
           alert: false,
           message: '',
           severity: '',

           data: [],
           btnLabel: 'Save',
           btnColor: 'primary',

           file: null,
       }

   }
    deleteUser = async (uid) => {
        let params = {
            uid: uid
        }
        let res = await UserServices.deleteUser(params);
        if (res.status === 200) {
            this.setState({
                alert: true,
                message: res.data.message,
                severity: "success"
            })
            this.loadData();
        } else {
            this.setState({
                alert: true,
                message: res.response.data.message,
                severity: "error"
            });
        }
    }
    updateUser = (data) => {
        console.log(data);
        this.setState({
            btnLabel: "update",
            btnColor: "success",
            formData: {
                email: data.email,
                username: data.username,
                password: data.password,
                name: {
                    firstname: data.firstname,
                    lastname: data.lastname,
                },
                address: {
                    city: data.city,
                    street: data.street,
                    number: data.number,
                    zipcode: data.zipcode,
                    geolocation: {
                        lat: data.lat,
                        long: data.long,
                    }
                },
                phone: data.phone
            }
        })
    };

    clearFields = (e) => {
        this.setState({
            formData: {
                email: "",
                username: "",
                password: "",
                name: {
                    firstname: "",
                    lastname: "",
                },
                address: {
                    city: "",
                    street: "",
                    number: "",
                    zipcode: "",
                    geolocation: {
                        lat: "",
                        long: "",
                    }
                },
                phone: ""
            }
        });
    }
    submitUser = async () => {
        let formData = this.state.formData;
        if (this.state.btnLabel==="Save"){
            let res = await UserServices.postUser(formData);
            console.log(res);

            if (res.status === 201) {
                this.setState({
                    alert: true,
                    message: res.data.data.message,
                    severity: "success"
                });
                this.clearFields();
                this.loadData();
            } else {
                this.setState({
                    alert: true,
                    message: res.response.data,
                    severity: "error"
                });
            }

        }else {
            let res=await UserServices.putUser(formData);
            if (res.status===200){
                this.setState({
                    alert: true,
                    message: res.data.message,
                    severity: "success",
                    btnLabel:"Save",
                    btnColor:"primary"
                });
                this.clearFields();
                this.loadData();
            }else {
                this.setState({
                    alert: true,
                    message: res.response.data.message,
                    severity: "error"
                });
            }
        }
    }

    loadData = async () => {
        let res = await UserServices.fetchUser();
        if (res.status === 200) {
            console.log("hooooooooooooooooooooooo"+this.res.data.message)
            this.setState({
                // data: res.data.data

            })
        }
        console.log(this.state.data)

    }
    componentDidMount() {
        this.loadData();

        console.log(this.state.data)
    }
    render() {
        const {classes} = this.props;
       return(
           <Fragment>
               < Grid style={{backgroundColor: "gray"}}>
                   <Grid container className="pt-7" spacing={2}>
                       <Grid item xs={11} sm={11} md={11} lg={11}>
                           <Typography variant="h2" sx={{mb: 5}}>
                               User Registration
                           </Typography>
                       </Grid>

                   </Grid>

                   <ValidatorForm
                       ref="form"
                       className="pt-2"
                       onSubmit={this.submitUser()}

                   >
                   <Grid container className="pt-2" spacing={3}>
                       <Grid item xs={12} sm={12} md={6} lg={6}>
                           <TextValidator
                               id="outlinedbasic"
                               placeholder="First Name"
                               variant="outlined"
                               size="small"
                               value={this.state.formData.name.firstname}
                               onChange={(e) => {
                                   let formData = this.state.formData
                                   formData.name.firstname = e.target.value
                                   this.setState({formData})
                               }}
                               style={{width: '100%', backgroundColor: "white"}}
                               // validators={['required', 'matchRegexp:^(P00_)[0-9]{3,4}$']}

                           />
                       </Grid>
                       <Grid item xs={12} sm={12} md={6} lg={6}>
                           <TextValidator
                               id="outlinedbasic"
                               placeholder="Last Name"
                               variant="outlined"
                               size="small"
                               value={this.state.formData.name.lastname}
                               onChange={(e) => {
                                   let formData = this.state.formData
                                   formData.name.lastname = e.target.value
                                   this.setState({formData})
                               }}
                               style={{width: '100%', backgroundColor: "white"}}
                               // validators={['required', 'isString']}

                           />
                       </Grid>
                       <Grid item xs={12} sm={12} md={6} lg={6}>
                           <TextValidator
                               id="outlinedbasic"
                               placeholder="Email"
                               variant="outlined"
                               size="small"
                               value={this.state.formData.email}
                               onChange={(e) => {
                                   let formData = this.state.formData
                                   formData.email = e.target.value
                                   this.setState({formData})
                               }}
                               style={{width: '100%', backgroundColor: "white"}}
                               // validators={['required', 'isString']}

                           />
                       </Grid>
                       <Grid item xs={12} sm={12} md={6} lg={6}>
                           <TextValidator
                               id="outlinedbasic"
                               placeholder="User Name"
                               variant="outlined"
                               size="small"
                               value={this.state.formData.username}
                               onChange={(e) => {
                                   let formData = this.state.formData
                                   formData.username = e.target.value
                                   this.setState({formData})
                               }}
                               style={{width: '100%', backgroundColor: "white"}}
                               // validators={['required', 'matchRegexp:^(C00_)[0-9]{3,4}$']}

                           />
                       </Grid>
                       <Grid item xs={12} sm={12} md={6} lg={6}>
                           <TextValidator
                               id="outlinedbasic"
                               placeholder="Password"
                               variant="outlined"
                               size="small"
                               value={this.state.formData.password}
                               onChange={(e) => {
                                   let formData = this.state.formData
                                   formData.password = e.target.value
                                   this.setState({formData})
                               }}
                               style={{width: '100%', backgroundColor: "white"}}
                               // validators={['required', 'matchRegexp:^(U00_)[0-9]{3,4}$']}

                           />
                       </Grid>
                       <Grid item xs={12} sm={12} md={6} lg={6}>
                           <TextValidator
                               id="outlinedbasic"
                               placeholder="City"
                               variant="outlined"
                               size="small"
                               value={this.state.formData.address.city}
                               onChange={(e) => {
                                   let formData = this.state.formData
                                   formData.address.city = e.target.value
                                   this.setState({formData})
                               }}
                               style={{width: '100%', backgroundColor: "white"}}
                               // validators={['required', 'matchRegexp:^(D00_)[0-9]{3,4}$']}

                           />
                       </Grid>
                       <Grid item xs={12} sm={12} md={6} lg={6}>
                           <TextValidator
                               id="Street"
                               placeholder="20000"
                               variant="outlined"
                               size="small"
                               value={this.state.formData.address.street}
                               onChange={(e) => {
                                   let formData = this.state.formData
                                   formData.address.street = e.target.value
                                   this.setState({formData})
                               }}
                               style={{width: '100%', backgroundColor: "white"}}
                               // validators={['required', 'isPositive']}

                           />
                       </Grid>

                       <Grid item xs={12} sm={12} md={6} lg={6}>
                           <TextValidator
                               id="outlinedbasic"
                               placeholder="Street Number"
                               variant="outlined"
                               size="small"
                               value={this.state.formData.address.number}
                               onChange={(e) => {
                                   let formData = this.state.formData
                                   formData.address.number = e.target.value
                                   this.setState({formData})
                               }}
                               style={{width: '100%', backgroundColor: "white"}}
                               // validators={['required', 'isPositive']}

                           />
                       </Grid>
                       <Grid item xs={12} sm={12} md={6} lg={6}>
                           <TextValidator
                               id="outlinedbasic"
                               placeholder="Zip Code"
                               variant="outlined"
                               size="small"
                               value={this.state.formData.address.zipcode}
                               onChange={(e) => {
                                   let formData = this.state.formData
                                   formData.address.zipcode = e.target.value
                                   this.setState({formData})
                               }}
                               style={{width: '100%', backgroundColor: "white"}}
                               // validators={['required', 'isPositive']}

                           />
                       </Grid>
                       <Grid item xs={12} sm={12} md={6} lg={6}>
                           <TextValidator
                               id="outlinedbasic"
                               placeholder="Last Value"
                               variant="outlined"
                               size="small"
                               value={this.state.formData.address.geolocation.lat}
                               onChange={(e) => {
                                   let formData = this.state.formData
                                   formData.address.geolocation.lat = e.target.value
                                   this.setState({formData})
                               }}
                               style={{width: '100%', backgroundColor: "white"}}
                               // validators={['required', 'isPositive']}

                           />
                       </Grid>
                       <Grid item xs={12} sm={12} md={6} lg={6}>
                           <TextValidator
                               id="outlinedbasic"
                               placeholder="Long Value"
                               variant="outlined"
                               size="small"
                               value={this.state.formData.address.long}
                               onChange={(e) => {
                                   let formData = this.state.formData
                                   formData.address.long = e.target.value
                                   this.setState({formData})
                               }}
                               style={{width: '100%', backgroundColor: "white"}}
                               // validators={['required', 'isPositive']}

                           />
                       </Grid>

                       <Grid item xs={12} sm={12} md={6} lg={6}>
                           <TextValidator
                               id="outlinedbasic"
                               placeholder="Mobile No"
                               variant="outlined"
                               size="small"
                               value={this.state.formData.phone}
                               onChange={(e) => {
                                   let formData = this.state.formData
                                   formData.phone = e.target.value
                                   this.setState({formData})
                               }}
                               style={{width: '100%', backgroundColor: "white"}}
                               // validators={['required', 'isPositive']}

                           />
                       </Grid>
                       <Grid container style={{marginTop: '10px',marginRight:10}} direction="row" justifyContent="flex-end"
                             alignItems="center">

                           <Stack direction="row" spacing={2}>
                               <GDSEButton  size="big" label={"Cancel"}
                                           variant="contained" onClick={this.clearFields}/>
                               <GDSEButton  size="big" label={"Save"}
                                            variant="contained"
                                            onClick={this.submitUser}
                               />
                           </Stack>

                       </Grid>


                   </Grid>


               </ValidatorForm>

                   <Grid container style={{marginTop: '10px'}}>
                       <TableContainer component={Paper}>
                           <Table sx={{minWidth: 650}} aria-label="user table">
                               <TableHead>
                                   <TableRow>
                                       <TableCell align="right">First Name</TableCell>
                                       <TableCell align="right">Last Name</TableCell>
                                       <TableCell align="right">Email</TableCell>
                                       <TableCell align="right">User Name</TableCell>
                                       <TableCell align="right">Password</TableCell>
                                       <TableCell align="right">City</TableCell>
                                       <TableCell align="right">Street</TableCell>
                                       <TableCell align="right">Street No</TableCell>
                                       <TableCell align="right">Zip Code</TableCell>
                                       <TableCell align="right">Last Value</TableCell>
                                       <TableCell align="right">Long Value</TableCell>
                                       <TableCell align="right">Mobile No</TableCell>
                                       <TableCell align="right">Action</TableCell>
                                   </TableRow>
                               </TableHead>
                               <TableBody>
                                   {this.state.data.map((row)=>(
                                   <TableRow>
                                       <TableCell align="right">{row.name.firstname}</TableCell>
                                       <TableCell align="right">{row.name.lastname}</TableCell>
                                       <TableCell align="right">{row.email}</TableCell>
                                       <TableCell align="right">{row.username}</TableCell>
                                       <TableCell align="right">{row.password}</TableCell>
                                       <TableCell align="right">{row.address.city}</TableCell>
                                       <TableCell align="right">{row.address.street}</TableCell>
                                       <TableCell align="right">{row.address.number}</TableCell>
                                       <TableCell align="right">{row.address.zipcode}</TableCell>
                                       <TableCell align="right">{row.address.geolocation.lat}</TableCell>
                                       <TableCell align="right">{row.address.geolocation.long}</TableCell>
                                       <TableCell align="right">{row.phone}</TableCell>

                                       <TableCell align="right">
                                           <Tooltip title="Edit">
                                               <IconButton
                                                   onClick={() => {
                                                       console.log("edit icon clicked!")
                                                       this.updateUser();
                                                   }}
                                               >
                                                   <EditIcon color={"primary"}/>
                                               </IconButton>
                                           </Tooltip>
                                       </TableCell>
                                       <TableCell align="right">
                                           <Tooltip title="Delete">
                                               <IconButton
                                                   onClick={() => {
                                                       console.log("delete icon clicked!")
                                                       this.deleteUser();
                                                   }}
                                               >
                                                   <DeleteIcon color={"error"}/>
                                               </IconButton>
                                           </Tooltip>
                                       </TableCell>

                                   </TableRow>
                                       ))
                                    }
                               </TableBody>
                           </Table>
                       </TableContainer>
                   </Grid>

                   <GDSESnackBar
                       open={this.state.alert}
                       onClose={() => {
                           this.setState({alert: false})
                       }}
                       message={this.state.message}
                       autoHideDuration={3000}
                       severity={this.state.severity}
                       variant="filled"

                   />

               </Grid>
           </Fragment>
       )
   }

}

export default User