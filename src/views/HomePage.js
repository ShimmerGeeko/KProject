import { Button, Container, Grid, Typography } from '@material-ui/core';
import React from 'react';

// const useStyles = makeStyles((theme) => ({

//   container: {
//     // padding: theme.spacing(0.8, 0),
//     backgroundImage: `url(${process.env.PUBLIC_URL + '/images/kycBackgroundImage.jpg'} )`,
//     // backgroundImage:URL("")
//   },

// }));

const HomePage = (props) => {
  // const classes = useStyles();
  const handleClick = () => {
    props.history.push("/SelectCountry",{info:{pageMode:""}})
  }

  return (
    <Container className="noPadding">
      <Grid container>
        <Grid item xs={12} className="center-margin" >
          <Grid item lg={4} md={8} sm={12} xs={12} className="center-margin "  >
            <Grid item lg={12} className="border back_image">
              <Typography variant="h4" className="title-color" style={{fontWeight:"bold"}}>  Video KYC </Typography>
              <Typography variant="h6" className="title-color" style={{ fontSize: "0.8rem" }}> One Step KYC Solution</Typography>

              {/* <Button  variant="outlined" color="secondary"  >Select Your Country</Button> */}


              <Grid item lg={12} md={12} sm={12} xs={12} className="bottom-center" >
                <Button variant="contained" color="secondary" onClick={handleClick} >Select Your Country</Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

    </Container>
  );
}

export default HomePage;
