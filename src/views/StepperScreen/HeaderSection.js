import { Box, Grid } from '@material-ui/core';
import React from 'react';
import data from '../../data';

const HeaderSection = () => {

    return (
        <Grid container>
            <Box style={{ padding: "1rem 0", fontSize: "1rem" }}>Take a Picture of Your ID </Box>
            <Grid item xs={11} className="display-flex">
                {data.proof.map((i, k) => {return <Grid item xs={3} key={k}>
                    <img src={process.env.PUBLIC_URL + i.image} alt="Adhare" className="image-proof-type" />
                    <Box className="box-proof-type">{i.proofName}</Box>
                </Grid>
                })}                 
            </Grid>
        </Grid>
    );
}

export default HeaderSection;
