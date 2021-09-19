import { Box, Button, Container, Grid, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import HeaderSection from './HeaderSection';
import FlipCameraAndroidIcon from '@material-ui/icons/FlipCameraAndroid';
import CameraIcon from '@material-ui/icons/Camera';
import SettingsIcon from '@material-ui/icons/Settings';

const CaptureImage = () => {
    const [message, setMessage] = useState("Just align your ID with the frame and press the button.The ID must be original (no photocopies or prints).");
    setTimeout(function () {
        setMessage('');
    }, 3000);
    return (
        <Container className="noPadding">
            <Grid item xs={12} style={{ position: 'relative', padding: "0 1rem" }}>
                <HeaderSection />
                <Grid item xs={12} style={{ backgroundColor: 'black', height: '50vh', margin: '1rem 0', position: "relative" }}>
                    <Grid style={{ height: '40vh', }}>
                        {/* "i am going to handle this part as conditionally based on the image capture if image is capture i am going to show the preview else camera" */}

                    </Grid>
                    <Button className="middle" style={{ color: '#fff', }} id="alarmmsg">{message}</Button>
                    <Grid item xs={12} className="display-flex">
                        <Grid item xs={4}>
                            <FlipCameraAndroidIcon className="camera-icon" />
                        </Grid>
                        <Grid item xs={4}>
                            <CameraIcon className="camera-icon" />
                        </Grid>
                        <Grid item xs={4}>
                            <img src={process.env.PUBLIC_URL + '/images/adhaarImage.png'} alt="Adhare" className="camera-icon" style={{ height: '1em', width: "70%" }} onClick />
                        </Grid>
                    </Grid>
                    {/* <Grid item xs={12} className="display-flex">
                    <img src={process.env.PUBLIC_URL + '/images/adhaarImage.png'} alt="Adhare" className="camera-icon" style={{ height: '1em', width: "70%" }} onClick />
                    </Grid> */}
                </Grid>
            </Grid>
        </Container>
    );
}

export default CaptureImage;
