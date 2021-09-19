import React, { useState } from 'react';
import { Container, Grid, List, ListItem, ListItemText, makeStyles, TextField, Typography } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SearchIcon from '@material-ui/icons/Search';
import data from '../data.js'
import SortItemsAscend from '../utils/SortFunction.js';


const useStyles = makeStyles((theme) => ({

    container: {
        // padding: theme.spacing(0.8, 0),
        [theme.breakpoints.down('sm')]: {
            padding: "0px",
        },
    },

}));

const SelectLanguage = (props) => {
   
    const [open, setOpen] = useState(true);
    const [search, setSearch] = useState('');
    const handleClick = () => {
        props.history.push("/SelectCountry",{info:{pageMode:""}})
    }
    const handleSearch = () => {
        setOpen(!open);
    }

    const submitData = (item) => {
        console.log(item.countryFlag);
        let data={
            countryId: item.countryId,
            pageMode:"",
            }
        props.history.push('/InstructionPage',{info:data});
        debugger;

    }
    console.log(data.language.sort(SortItemsAscend("languageName")), "this ")
    console.log(props, "this is props");
    return (
        <Container className="noPadding">
            <Grid container>
                {/* <Grid item lg={12} className="center-margin" style={{display:"flex", justifyContent:"center"}}> */}
                <Grid item xs={12} className="center-margin" >
                    <Grid item lg={4} md={12} sm={12} xs={12} className="center-margin border" >
                        {open ? <Grid item sm={12} className="appbar">

                            <ArrowBackIcon onClick={handleClick} style={{ marginRight: "0.5rem", marginLeft: "0.3rem" }} />
                            <Typography variant="h6" noWrap style={{ fontSize: "1rem" }}>SELECT LANGUAGE</Typography>
                            <SearchIcon onClick={handleSearch} style={{ marginRight: "0.5rem" }} />

                        </Grid> : <Grid item sm={12} xs={12} className="center-margin" style={{ display: "flex", justifyContent: "center" }}>

                            <ArrowBackIcon onClick={handleSearch} style={{ marginTop: "1.1rem" }} />
                            <TextField margin="normal" fullWidth placeholder="Search" type="search" onChange={(e) => setSearch(e.target.value)} />

                        </Grid>
                        }
                        <Grid item sm={12} xs={12}>
                            <List>

                                {data.language.filter(item => item.languageName.toLocaleLowerCase().includes(search)).map((item, key) => {
                                    return <ListItem key={key} button onClick={() => submitData(item)}>
                                        <ListItemText key={key} primary={item.languageName} className="list-bold"/>
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

export default SelectLanguage;
