import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

import { Box, Button, Container, Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));

function getSteps() {
  return ['PICTURE OF YOUR ID', 'SELFIE VIDEO', 'FACE VERIFICATION', 'ADDRESS VERIFICATION'];
}



export default function ReviewDetails() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Container className="noPadding">
      <Grid container>
        {/* <Grid item lg={12} className="center-margin" style={{display:"flex", justifyContent:"center"}}> */}
        <Grid item xs={12} className="center-margin" >
          <Grid item xs={12}>
            <Grid item lg={4} md={12} sm={12} xs={12} className="center-margin border instruction-background" >

              <Grid item lg={9} sm={11} xs={11} className="instruction middle">
                <Grid item sm={12} xs={12} className="access-permission-header">
                  <Typography variant="h5" className="font-bold review-title">REVIEW DETAILS</Typography>
                  {/* <Typography variant="h5" className="font-bold">MICROPHONE ACCESS </Typography> */}
                </Grid>
                <Stepper activeStep={4} orientation="vertical" style={{ margin: "0px" }}>
                  {steps.map((label, index) => (
                    <Step key={label} style={{ margin: "0px", textAlign: "left" }}>
                      <StepLabel style={{ margin: "0px" }}>{label}</StepLabel>

                    </Step>
                  ))}
                </Stepper>
                <Grid item lg={12} md={12} sm={12} xs={12} className="bottom-button" >
                  <Button variant="contained" color="secondary" >  SUBMIT FOR VERIFICATION  </Button>
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


