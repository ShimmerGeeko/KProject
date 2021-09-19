import { createMuiTheme } from "@material-ui/core";
// import { blueGrey, blue, red, yellow, grey, orange } from "@material-ui/core/colors";
// import { BorderAllOutlined } from "@material-ui/icons";

export const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#0C56A6"
        },
        secondary: {
            main: "#ff770B",

        }
    },
    overrides: {
        MuiInputLabel: {
            root: {

            }
        },
        MuiStepper: {
            horizontal: {
                backgroundColor: "#8c4bce",
            }
        },
     
        MuiButton: {
            containedSecondary: {
                color: "#fff"
            }
        },
        MuiOutlinedInput: {
            input: {
                padding: "14px 14px !important",
            },
        },
        MuiOutlinedInput: {
            root: {


            }
        },
        MuiContainer: {
            root: {

            }
        },
        MuiStepIcon: {
            root: {
                color: "#fff",
            },
            text: {
                color: "#000",
                fill: "#000"
            }
        },


        MuiDrawer: {
            paper: {
                top: "13%",
                width: "25%"
            }
        },

        MuiDialog: {
            root: {
                // width: "50%" 
            },
            paper: {
                // width: "25%"
            }
        }
    },
    props: {
        MuiButton: {

        },
        MuiTextField: {

        },
        MuiInputLabel: {

        }
    }
});

