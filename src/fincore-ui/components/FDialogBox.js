import React, { Fragment, useRef } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListSubheader from '@material-ui/core/ListSubheader';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/MessageTwoTone';
import WarningIcon from '@material-ui/icons/WarningOutlined';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import { yellow, red, blue } from '@material-ui/core/colors';
import { ListItemIcon, ListItemSecondaryAction, Switch } from '@material-ui/core';
import { Component } from 'react';

const useStyles = makeStyles((theme) => ({

    dialog: {
        //  minWidth: "300px"
    },
    root: {
        // width: '100%',
        //maxWidth: '36ch',
        // backgroundColor: theme.palette.background.paper,
        backgroundColor: 'none'
    },
    MuiDialogContent:{
        root: {
            padding: '0px',
        },
     },
    //  -root:first-child
    // inline: {
    //     display: 'inline',
    // },
    // yellow: {
    //     color: theme.palette.getContrastText(yellow[500]),
    //     backgroundColor: yellow[500],
    // },
    // red: {
    //     color: theme.palette.getContrastText(red[500]),
    //     backgroundColor: red[500],
    // },
    // blue: {
    //     color: theme.palette.getContrastText(blue[500]),
    //     backgroundColor: blue[500],
    // },

}));



const FDialogBox = React.forwardRef((props, ref) => {

    const [open, setOpen] = React.useState(false);
    const [title, setTitle] = React.useState("");
    const [component, setComponent] = React.useState("");
    
    const [isError, setError] = React.useState(false);
    var recordId = useRef(0);
    var recordName = useRef('')
    var completeCallback= useRef(null);

    React.useImperativeHandle(ref, () => {
        return {
            openDialog: (title, component, id, editName, callback) => {

                // setTitle(title);
                setComponent(component);
                recordId.current = id;
                recordName.current = editName;
                completeCallback.current = callback;
                OpenDialog()
                // onClose.current = onCloseCb;
                // onCancel.current = onCancelCb;
            }
        }

    })
    const classes = useStyles();
    const { okButtonText, cancelButtonText } = props;
    const onClose = useRef(null);
    const onCancel = useRef(null);


    const OpenDialog = () => {
        setOpen(true);
    };

    const CloseDialog = (type) => {
        setOpen(false);
        if(type === 'ok' && onClose.current){
                console.log("result onclose")
                onClose.current();
               
        }
        else if(type === 'cancel' && onCancel.current){
            console.log("result cancel")
            onCancel.current();
               
        }        
    };
   

console.log(recordId,"this is record id");
console.log(recordName,"this is record Name");


    const Component = component;
    return (
        <Dialog 
            open={open}
            overlayStyle={{backgroundColor: 'transparent'}}
            onClose={CloseDialog}
            maxWidth="sm"
            minWidth="sm"
            disableBackdropClick={true}
            className={classes.dialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
           
            <DialogContent style={{padding:'0px'}}>
               <Component onClose={CloseDialog} />
              
            </DialogContent>
        </Dialog>
    );
})

FDialogBox.propTypes = {
    // title: PropTypes.string,
    component: PropTypes.string,
    okButtonText: PropTypes.string,
    cancelButtonText: PropTypes.string,
    hideCancelButton: PropTypes.bool,
    onOpen: PropTypes.func,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
}

FDialogBox.defaultProps = {

    okButtonText: "OK",
    cancelButtonText: "CANCEL",
    hideCancelButton: true
}

export default FDialogBox;