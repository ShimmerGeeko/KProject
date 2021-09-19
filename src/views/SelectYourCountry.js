import React, { useState } from 'react';
import { Container, Grid, List, ListItem, ListItemIcon, ListItemText, makeStyles, TextField, Typography } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SearchIcon from '@material-ui/icons/Search';

// import ClearIcon from '@material-ui/icons/Clear';
import data from '../data.js'
import SortItemsAscend from '../utils/SortFunction.js';
// import { FStrField } from '../fincore-ui/components/FStrField';
// import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({

    container: {
        // padding: theme.spacing(0.8, 0),
        [theme.breakpoints.down('sm')]: {
            padding: "0px",
        },
    },

}));

const SelectYourCountry = (props) => {
    const classes = useStyles();
    const [open, setOpen] = useState(true);
    const [search, setSearch] = useState('');
    const handleClick = () => {
        props.history.push("/")
    }
    const handleSearch = () => {
        setOpen(!open);
    }

    const submitData = (i) => {
        console.log(i.countryFlag);
       let data={
        countryId: i.countryId,
        pageMode:""
        }
        props.history.push("/SelectLanguage",{info:data});

    }


    console.log(data.Country.sort(SortItemsAscend("countryName")), "this ")
    console.log(data.Country.countryName)

    return (
        <Container className={classes.container}>
            <Grid container>
                {/* <Grid item lg={12} className="center-margin" style={{display:"flex", justifyContent:"center"}}> */}
                <Grid item xs={12} className="center-margin" >
                    <Grid item lg={4} md={12} sm={12} xs={12} className="center-margin border" >
                        {open ? <Grid item sm={12} className="appbar">

                            <ArrowBackIcon onClick={handleClick} style={{ marginRight: "0.5rem", marginLeft: "0.3rem" }} />
                            <Typography variant="h6" noWrap style={{ fontSize: "1rem" }}>SELECT YOUR COUNTRY</Typography>
                            <SearchIcon onClick={handleSearch} style={{ marginRight: "0.5rem" }} />

                        </Grid> : <Grid item sm={12} xs={12} className="center-margin" style={{ display: "flex", justifyContent: "center" }}>

                            <ArrowBackIcon onClick={handleSearch} style={{ marginTop: "1.1rem" }} />
                            <TextField margin="normal" fullWidth placeholder="Search" type="search" onChange={(e) => setSearch(e.target.value)} />

                        </Grid>
                        }
                        <Grid item sm={12} xs={12}>
                            <List>
                                {/* {console.log(data.Country.SortItemsAscend(), "this ")} */}
                                {data.Country.filter(item => item.countryName.toLowerCase().includes(search.toLowerCase())).map((i, k) => {
                                    return <ListItem key={k} button onClick={() => submitData(i)}>
                                        <ListItemIcon>
                                            <img
                                                src={`https://www.countryflags.io/${i.countryFlag}/flat/64.png`}
                                                alt="..." style={{height: '3rem', width: '3rem'}}
                                            />
                                        </ListItemIcon>
                                        <ListItemText key={k} primary={i.countryName} className="list-bold" />
                                    </ListItem>
                                })}

                            </List>
                        </Grid>
                    </Grid>

                    {/* <Button  variant="outlined" color="secondary"  >Select Your Country</Button> */}
                </Grid>


            </Grid>


        </Container>
    );
}

export default SelectYourCountry;
