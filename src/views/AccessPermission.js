import React, { useRef, useState } from 'react';
import { Box, Button, Checkbox, Container, Grid, makeStyles, Typography } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CameraAltOutlinedIcon from '@material-ui/icons/CameraAltOutlined';
import MicNoneOutlinedIcon from '@material-ui/icons/MicNoneOutlined';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import FMessageDialog from '../fincore-ui/components/FMessageDialog';




const useStyles = makeStyles((theme) => ({

    container: {
        // padding: theme.spacing(0.8, 0),
        [theme.breakpoints.down('sm')]: {
            padding: "0px",
        },
    },

}));

const AccessPermission = (props) => {
    const classes = useStyles();
    const [locationRequest, setLocationRequest] = useState(false);
    const [microphoneRequest, setMicrophoneRequest] = useState(false);
    const [cameraRequest, setCameraRequest] = useState(false);
    const [aadharRequest, setAadharRequest] = useState(false);
    const messageDialog = useRef(null);
    const handleBackClick = () => {
        props.history.push('/InstructionPage', { info: { pageMode: "" } });
    }

    const handleClick = () => {
        if ((microphoneRequest === true) && (cameraRequest === true) && (locationRequest === true) && (aadharRequest === true)) {
            props.history.push("/CustomizedSteppers", { info: { pageMode: "" } })
        } else {
            // alert("Please allow all the permission to go ahead");
            debugger
            messageDialog.current.openDialog("Message", "Message", "Please allow all the permission to go ahead", true);
        }
    }
    console.log("microphoneRequest: ", microphoneRequest, " cameraRequest :", cameraRequest, " locationRequest :", locationRequest, " aadharRequest:", aadharRequest)



    function getLocation() {

        // debugger;
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition, showError);
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }
    function showPosition(position) {
        var k;
        k = "Latitude: " + position.coords.latitude +
            "<br>Longitude: " + position.coords.longitude;
        console.log(k, "Latitude and Longitude")
    }

    function showError(error) {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                window.confirm('Please allow location access.');
                break;
            case error.POSITION_UNAVAILABLE:
                window.confirm('Location information is unavailable')
                break;
            case error.TIMEOUT:
                window.confirm('The request to get user location timed out.')
                break;
            case error.UNKNOWN_ERROR:
                window.confirm('An unknown error occurred.')
                break;
            default:
                console.log(error)

        }

    }
    const handleChange = (e) => {
        var m = e.target.checked;
        if (m === true) {
            getLocation();
        }
        setLocationRequest(e.target.checked);
    }

    return (
        <Container className={classes.container}>
            <Grid container >
                {/* <Grid item lg={12} className="center-margin" style={{display:"flex", justifyContent:"center"}}> */}
                <Grid item xs={12} className="center-margin" style={{ position: 'relative' }}>
                    <Grid item lg={4} md={12} sm={12} xs={12} className="center-margin border" >
                        <Grid item sm={12} style={{ textAlign: "left" }} className="appbar">

                            <ArrowBackIcon onClick={handleBackClick} className="back-arrow" />
                            <Typography variant="h6" noWrap style={{ fontSize: "1rem" }}>ACCESS REQUIRED</Typography>
                            {/* <SearchIcon onClick={handleSearch} style={{ marginRight: "0.5rem" }} /> */}

                        </Grid>
                        <Grid item sm={12} xs={12} className="access-permission-header">
                            <Typography variant="h5" className="font-bold permission-title">ALLOW ACCESS</Typography>
                            {/* <Typography variant="h5" className="font-bold">MICROPHONE ACCESS </Typography> */}
                        </Grid>

                        <Grid item lg={12} style={{ textAlign: 'left', padding: '1.4rem' }} >
                            <Grid item lg={12} className="flex">
                                <Checkbox onChange={(e) => setCameraRequest(e.target.checked)} style={{ padding: "0 0 5px 0" }} />
                                <CameraAltOutlinedIcon className="access-Permission-icon" />
                                <Box className="access-permission-box">Enable your camera to take pictures with your mobile </Box>
                            </Grid>

                            <Grid item lg={12} className="flex">
                                <Checkbox onChange={(e) => setMicrophoneRequest(e.target.checked)} style={{ padding: "0px" }} />
                                <MicNoneOutlinedIcon className="access-Permission-icon" />
                                <Box className="access-permission-box">Enable your microphone to take video</Box>
                            </Grid>

                            <Grid item sm={12} className="flex">
                                <Checkbox onChange={(e) => handleChange(e)} style={{ padding: "0px" }} />
                                <LocationOnOutlinedIcon className="access-Permission-icon" />
                                <Box className="access-permission-box">Enable to access your current location</Box>
                            </Grid>

                            <Grid item sm={12} className="flex">
                                <Checkbox onChange={(e) => setAadharRequest(e.target.checked)} style={{ padding: "0px" }} />
                                <img src={process.env.PUBLIC_URL + '/images/adhaarImage.png'} alt="Adhare" style={{ width: "3rem", height: "3rem", margin: "0px" }} />
                                <Box className="access-permission-box">Enable to read aadhar details</Box>
                            </Grid>

                        </Grid>

                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12} className="bottom-button" >
                        <Button variant="contained" color="primary" onClick={handleClick} >  ENABLE ACCESS  </Button>
                    </Grid>
                    {/* <Button  variant="outlined" color="secondary"  >Select Your Country</Button> */}
                </Grid>


                <FMessageDialog ref={messageDialog} />
            </Grid>

        </Container>
    );
}

export default AccessPermission;
