import { Button, Container, Grid } from '@material-ui/core';
import React from 'react';
import HeaderSection from './HeaderSection';
import VisibilityIcon from '@material-ui/icons/Visibility';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
// import SettingsIcon from '@material-ui/icons/Settings';

const PreviewPage = (props) => {

    const handleClick = () => {
        console.log(props,"this o")
        props.history.push("/ViewDetails",{info:{pageMode:""}})
      }


    return (
        <Container className="noPadding">
            <Grid item xs={12} style={{ position: 'relative', padding: "0 1rem" }}>
                <HeaderSection />
                <Grid item xs={12} style={{ backgroundColor: 'black', height: '50vh', margin: '1rem 0', position: "relative" }}>
                    <Grid item xs={12} className="display-flex">

                        <Grid item xs={6} className="display-flex" style={{width:"100%"}}>
                           <VisibilityIcon style={{color:"#fff", margin:"10px"}}/> 

                           <Button style={{color:"#fff",  float:"left"}} onClick={handleClick}>View Details</Button>

                        </Grid>

                        <Grid item xs={6} className="display-flex" style={{width:"100%"}}>
                            <CameraAltIcon style={{color:"#fff", margin:"10px"}}/>

                            <Button style={{color:"#fff",  float:"right"}}>Change</Button>

                        </Grid>
                        {/* <Grid item xs={4}>

                        </Grid> */}
                    </Grid>
                    <Grid style={{ height: '35vh', backgroundColor: "#fff" }}>
                        {/* <center className="middle">Capture Image</center> */}

                    </Grid>
                    <Grid item xs={12} className="display-flex">
                        {/* <Grid item xs={4}>
                            <FlipCameraAndroidIcon className="camera-icon" />
                        </Grid>
                        <Grid item xs={4}>
                            <CameraIcon className="camera-icon" />
                        </Grid>
                        <Grid item xs={4}>
                            <SettingsIcon className="camera-icon" />
                        </Grid> */}
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
}

export default PreviewPage;
