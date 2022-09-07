import React, {Component, Fragment} from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import GDSEButton from "../../components/Button";
import CartServices from "../../service/CartServices";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TableBody from "@mui/material/TableBody";
import GDSESnackBar from "../../components/SnackBar";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
class CartManage extends Component{
    constructor(props) {
        super(props);

        this.state={

            users:[

                {
                    address: {
                        geolocation: {
                            lat: "-37.3159",
                            long: "81.1496"
                        },
                        city: "kilcoole",
                        street: "7835 new road"
                    },
                    _id: "62f22e6e3a45000013431f2d",
                    id: 11,
                    email: "John@gmail.com",
                    username: "johnd",
                    password: "m38rmF$",
                    phone: "1-570-236-7033"
                },
                {
                    address: {
                        geolocation: {
                            lat: "-37.3159",
                            long: "81.1496"
                        },
                        city: "kilcoole",
                        street: "Lovers Ln",
                        number: 7267,
                        zipcode: "12926-3874"
                    },
                    id: 2,
                    email: "morrison@gmail.com",
                    username: "mor_2314",
                    password: "83r5^_",
                    name: {
                        firstname: "david",
                        lastname: "morrison"
                    },
                    phone: "1-570-236-7033",
                    __v: 0
                },


            ],


            formData:{
                userId:"",
                date:"",
                product:[
                    {
                        productId:"",
                        quantity:"",
                    },{
                        productId:"",
                        quantity:"",
                    }
                ]

            },

            alert: false,
            message: '',
            severity: '',

            data: [],
            btnLabel: 'Save',
            btnColor: "primary"

        }
    }

    deleteCart = async (productId) => {
        console.log("delete button clicked");

        let params = {
            pid: productId
        }
        let res = await CartServices.deleteCart(params);
        if (res.status === 200) {
            this.setState({
                alert: true,
                message: res.data.message,
                severity: "success"
            })
            // this.loadData();
        } else {
            this.setState({
                alert: true,
                message: res.response.data.message,
                severity: "error"
            });
        }
    }
    updateCart = (data) => {
        console.log("update button clicked");
        console.log(data);
        this.setState({
            btnLabel: "update",
            btnColor: "success",
            formData:{
                userId:data.userId,
                date:data.date,
                product:[
                    {
                        productId:data.productId,
                        quantity:data.quantity,
                    }
                ]

            },
        })
    };

    clearFields = (e) => {
        console.log("clear Field")
        this.setState({
            formData:{
                userId:"",
                date:"",
                product:[
                    {
                        productId:"",
                        quantity:"",
                    },{
                        productId:"",
                        quantity:"",
                    }
                ]

            },
        });
    }

    submitCart = async () => {
        let formData = this.state.formData;
        console.log("Hello"+formData.data)
        if (this.state.btnLabel === "Save") {
            let res = await CartServices.postCart(formData);


            if (res.status === 201) {
                this.setState({
                    alert: true,
                    message: res.data.message,
                    severity: "success"
                });
                this.clearFields();
                // this.loadData();
            } else {
                this.setState({
                    alert: true,
                    message: res.response.data.message,
                    severity: "error"
                });
            }

        } else {
            let res = await CartServices.putCart(formData);
            if (res.status === 200) {
                this.setState({
                    alert: true,
                    message: res.data.message,
                    severity: "success",
                    btnLabel: "Save",
                    btnColor: "primary"
                });
                this.clearFields();
                // this.loadData();
            } else {
                this.setState({
                    alert: true,
                    message: res.response.data.message,
                    severity: "error"
                });
            }
        }
    }

    loadData = async () => {
        let res = await CartServices.fetchCart();
        if (res.status === 200) {
            this.setState({
                data: res.data.data
            })
        }


    }
    //
    // componentDidMount() {
    //     // this.loadData();
    //
    //
    // }


    render() {
        return(
            <Fragment>
                <Grid  container className="pt-7" spacing={3} style={{backgroundColor:"#d9d9d9"}}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <div>
                            <Typography variant="h4">Cart Management</Typography>
                        </div>
                    </Grid>
                </Grid>

                <ValidatorForm
                    ref="form"
                    className="pt-2"
                    onSubmit={this.submitCart()}

                >
                    <Grid container className="pt-2" spacing={3} style={{backgroundColor:"#d9d9d9"}}>
                        <Grid item xs={12} sm={12} md={6} lg={6} >
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={this.state.users}
                                sx={{ width: 300 }}
                                style={{width: '100%',backgroundColor:"white"}}
                                renderInput={(params) => <TextField {...params} label="User name" />}
                                getOptionLabel={
                                    (option)=>option.username
                                }
                                onChange={(e,value)=>{
                                    console.log(value.id)
                                }}
                                size={"small"}
                            />

                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} >
                            <TextValidator
                                id="outlinedbasic"
                                placeholder="Date"
                                variant="outlined"
                                size="small"
                                type={"date"}
                                style={{width: '100%',backgroundColor:"white"}}

                            />

                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} >
                            <TextValidator
                                id="outlinedbasic"
                                placeholder="Product Title"
                                variant="outlined"
                                size="small"
                                style={{width: '100%',backgroundColor:"white"}}

                            />

                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} >
                            <TextValidator
                                id="outlinedbasic"
                                placeholder="Qty"
                                variant="outlined"
                                size="small"
                                style={{width: '100%',backgroundColor:"white"}}

                            />

                        </Grid>
                    </Grid>

                    <Grid container style={{marginTop: 250}} direction="row" justifyContent="flex-end"
                          alignItems="center" style={{backgroundColor:"#d9d9d9"}}>
                        <GDSEButton type="submit" size="bif" label={"Clear"}
                                    variant="contained"
                                    style={{marginTop:50,marginRight: 20,backgroundColor:"#98801C"}}
                                    onClick={this.clearFields}
                        />
                        <GDSEButton type="submit" size="big" label={"Save"}
                                    style={{marginTop:50,marginRight: 20}}
                                    variant="contained"
                                    onClick={this.submitCart}
                        />
                    </Grid>
                </ValidatorForm>

                <Grid container>
                    <TableContainer component={Paper} >
                        <Table sx={{minWidth: 650}} aria-label="user table">
                            <TableHead >
                            <TableRow>
                                <TableCell align="right">User Name</TableCell>
                                <TableCell align="right">Date</TableCell>
                                <TableCell align="right">Product Title</TableCell>
                                <TableCell align="right">Qty</TableCell>
                                <TableCell align="right">Action</TableCell>
                            </TableRow>
                        </TableHead>

                            <TableBody>
                                {/*{*/}
                                {/*    this.state.data.map((row) => (*/}
                                        <TableRow>
                                            <TableCell align="right">row.username}</TableCell>
                                            <TableCell align="right">row.date}</TableCell>
                                            <TableCell align="right">row.productId}</TableCell>
                                            <TableCell align="right">row.quantity}</TableCell>

                                            <TableCell align="right">
                                                <Tooltip title="Edit">
                                                    <IconButton
                                                        onClick={() => {
                                                            console.log("edit icon clicked!")
                                                            this.updateCart();
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
                                                            this.deleteCart();
                                                        }}
                                                    >
                                                        <DeleteIcon color={"error"}/>
                                                    </IconButton>
                                                </Tooltip>
                                            </TableCell>
                                        </TableRow>
                                {/*//     ))*/}
                                {/*// }*/}

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
            </Fragment>
        )
    }
}

export default CartManage