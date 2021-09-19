import { Box, FormControlLabel, Grid, Radio, RadioGroup } from '@material-ui/core';
import React from 'react';

const VerifyAadhar = () => {
    const [value, setValue] = React.useState('offline');
    return (
        <Grid container>
            <Box style={{ padding: "1rem 0", fontSize: "1rem", fontWeight:"bold" }}>Verify Aadhar </Box>
            <Grid item xs={11} className="display-flex">
                <RadioGroup row aria-label="position" name="position" value={value}>
                    <FormControlLabel value="offline" control={<Radio color="primary" />} label="OFFLINE AADHAR VERFICATION" />
                </RadioGroup>

            </Grid>
        </Grid>
    );
}

export default VerifyAadhar;
