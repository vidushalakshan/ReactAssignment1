import React, {Component, Fragment} from "react";
import NavBar from "../../components/NavBar";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";

class Admin extends Component{
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Fragment>
                <NavBar/>

                <Grid container className="pt-7" spacing={3}>

                    <Grid item xs={5} sm={5} md={5} lg={5}>

                        <Card sx={{maxWidth: 800}} style={{marginLeft: 50}}>
                            <CardActionArea>
                                <div sx={{maxWidth: 120}} style={{textAlign: "Center", backgroundColor: "gray"}}>

                                    <CardContent sx={{mb: 2}}>

                                        <h5>
                                            Products
                                        </h5>

                                    </CardContent>
                                    <CardContent sx={{mb: 1}}>

                                        <h5>
                                            60
                                        </h5>

                                    </CardContent>
                                </div>

                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid item xs={5} sm={5} md={5} lg={5}>

                        <Card sx={{maxWidth: 800}} style={{marginLeft: 50}}>
                            <CardActionArea>
                                <div sx={{maxWidth: 120}} style={{textAlign: "Center", backgroundColor: "gray"}}>

                                    <CardContent sx={{mb: 2}}>

                                        <h5>
                                            Cart
                                        </h5>

                                    </CardContent>
                                    <CardContent sx={{mb: 1}}>

                                        <h5>
                                            12
                                        </h5>

                                    </CardContent>
                                </div>

                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid item xs={5} sm={5} md={5} lg={5}>

                        <Card sx={{maxWidth: 800}} style={{marginLeft: 50}}>
                            <CardActionArea>
                                <div sx={{maxWidth: 120}} style={{textAlign: "Center", backgroundColor: "gray"}}>

                                    <CardContent sx={{mb: 2}}>

                                        <h5>
                                            Users
                                        </h5>

                                    </CardContent>
                                    <CardContent sx={{mb: 1}}>

                                        <h5>
                                            45
                                        </h5>

                                    </CardContent>
                                </div>

                            </CardActionArea>
                        </Card>
                    </Grid>

                </Grid>
            </Fragment>
        )
    }

}

export default Admin;