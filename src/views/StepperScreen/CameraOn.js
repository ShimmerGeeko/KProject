import { Container, Grid } from '@material-ui/core';
import React from 'react';
import HeaderSection from './HeaderSection';
import FlipCameraAndroidIcon from '@material-ui/icons/FlipCameraAndroid';
import CameraIcon from '@material-ui/icons/Camera';
import SettingsIcon from '@material-ui/icons/Settings';

const CameraOn = () => {
debugger;
    return (
        <Container className="noPadding">
            <Grid item xs={12} style={{ position: 'relative', padding: "0 1rem" }}>
                <HeaderSection />
                <Grid item xs={12} style={{ backgroundColor: 'black', height: '50vh', margin: '1rem 0', position: "relative" }}>
                    <Grid style={{ height: '40vh', backgroundColor: "#fff" }}>
                        {/* <center className="middle">Capture Image</center> */}

                    </Grid>
                    <Grid item xs={12} className="display-flex">
                        <Grid item xs={4}>
                            <FlipCameraAndroidIcon className="camera-icon" />
                        </Grid>
                        <Grid item xs={4}>
                            <CameraIcon className="camera-icon" />
                        </Grid>
                        <Grid item xs={4}>
                            <SettingsIcon className="camera-icon" />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
}

export default CameraOn;
