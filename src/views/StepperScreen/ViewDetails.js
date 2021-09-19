import { Box, Button, Container, Grid, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import HeaderSection from './HeaderSection';

const ViewDetails = (props) => {
    const handleBack = () => {
        props.history.push("/CustomizedSteppers", { info: { pageMode: "" } })
    }
    return (
        <Grid container>
            <Grid item lg={4} md={8} sm={12} xs={12} className="middle proof-page-title" style={{ height: "88vh" }}>
                <Grid item xs={12} style={{ position: 'relative', padding: "0 1rem" }}>

                    <Grid item xs={12} style={{ backgroundColor: 'black', height: '50vh', margin: '1rem 0', position: "relative" }}>
                        <Grid className="proof-type">
                            {/* <center className="middle">Capture Image</center> */}

                        </Grid>
                        <Button className="middle" style={{ color: '#fff', }} onClick={handleBack}>Detail pages</Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default ViewDetails;
