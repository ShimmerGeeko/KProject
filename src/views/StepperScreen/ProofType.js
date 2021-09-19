import { Box, Button, Container, Grid, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import HeaderSection from './HeaderSection';

const ProofType = () => {
    
    return (
        <Container className="noPadding">
            <Grid item xs={12} style={{ position: 'relative', padding: "0 1rem" }}>
               <HeaderSection />
                <Grid item xs={12} style={{ backgroundColor: 'black', height: '50vh', margin: '1rem 0', position: "relative" }}>
                <Grid className="proof-type">
                    {/* <center className="middle">Capture Image</center> */}
               
                    </Grid>
                    <Button className="middle" style={{ color: '#fff', }}>Capture Image</Button>
                </Grid>
            </Grid>
        </Container>
    );
}

export default ProofType;
