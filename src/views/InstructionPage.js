import React from 'react';
import { Box, Button, Container, Grid, Typography } from '@material-ui/core';


const InstructionPage = (props) => {

    // const classes = useStyles();
    const handleClick = () => {
        props.history.push("/AccessPermission",{info:{pageMode:""}});
    }

    return (
        <Container className="noPadding">
            <Grid container>
                {/* <Grid item lg={12} className="center-margin" style={{display:"flex", justifyContent:"center"}}> */}
                <Grid item xs={12} className="center-margin" >
                    <Grid item xs ={12}>
                    <Grid item lg={4} md={12} sm={12} xs={12} className="center-margin border instruction-background" >
                        <Grid item lg={9} sm={11} xs={11} className="instruction middle">
                            <Grid item lg={12}>
                                <Typography variant='h4' className="instruction-title">INSTRUCTION</Typography>
                                <Box>
                                    We need to verify that you are a real person. In only two fast steps, you will take a picture of your  ID and take a Video selfie holding your ID.
                            </Box>
                            </Grid>
                            <Grid item lg={12} md={12} sm={12} xs={12} className="bottom-button" >
                                <Button variant="contained" color="secondary" onClick={handleClick} style={{width:"50%"}}>  LET'S DO IT!  </Button>
                            </Grid>
                        </Grid>

                        {/* <Typography variant='h5'>Introduction</Typography> */}
                        </Grid>

                    </Grid>

                    {/* <Button  variant="outlined" color="secondary"  >Select Your Country</Button> */}
                </Grid>


            </Grid>


        </Container>
    );
}

export default InstructionPage;
