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
import WarningIcon from '@material-ui/icons/WarningOutlined';
import InfoIcon from '@material-ui/icons/InfoTwoTone';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import { yellow, red, blue } from '@material-ui/core/colors';
import { ListItemIcon, ListItemSecondaryAction, Switch } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({

    dialog: {
        // minWidth: "300px"
    },
    root: {
        width: '100%',
        //maxWidth: '36ch',
        backgroundColor: 'none'
    },
    inline: {
        display: 'inline',
    },
    yellow: {
        color: theme.palette.getContrastText(yellow[500]),
        backgroundColor: yellow[500],
    },
    red: {
        color: theme.palette.getContrastText(red[500]),
        backgroundColor: red[500],
    },
    blue: {
        color: theme.palette.getContrastText(blue[500]),
        backgroundColor: blue[500],
    },

}));



const FMessageDialog = React.forwardRef((props, ref) => {

    const [open, setOpen] = React.useState(false);
    const [title, setTitle] = React.useState("");
    const [message, setMessage] = React.useState("");
    const [extMessage, setExtMessage] = React.useState("");
    const [warnings, setWarnings] = React.useState([]);
    const [questions, setQuestions] = React.useState([]);
    const [infoMessages, setInfoMessages] = React.useState([]);
    const [isError, setError] = React.useState(false);

    React.useImperativeHandle(ref, () => {
        return {
            openDialog: (title, message, extMessage, isError, onCloseCb, onCancelCb) => {

                setTitle(title);
                setMessage(message);
                setExtMessage(extMessage);
                setError(isError);
                // setWarnings(warnings);
                // setQuestions(questions);
                // setInfoMessages(infoMessages);
                OpenDialog()
                onClose.current = onCloseCb;
                onCancel.current = onCancelCb;
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
        if (type === 'ok' && onClose.current) {
            console.log("result onclose")
            onClose.current(questions);
        }
        else if (type === 'cancel' && onCancel.current) {
            console.log("result cancel")
            onCancel.current(questions);
        }
        // else if(type === 'ok' && this.pageMode === 'Add' && mgsId === -1){

        // }

    };
    const handleToggle = (evt, index) => {
        const _questions = [...questions];
        _questions[index].userAnswer = evt.target.checked;
        setQuestions(_questions);
    }



    return (
        <Dialog
            open={open}
            onClose={CloseDialog}
            maxWidth="lg"
            minWidth="lg"
            disableBackdropClick={true}
            className={classes.dialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <List className={classes.root}>
                        {/* <ListSubheader>
                            <Typography color="error" variant="subtitle1">Error</Typography>
                        </ListSubheader> */}
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar className={isError ? classes.red : classes.blue}>
                                    {isError ? <ErrorIcon /> : <InfoIcon />}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={
                                    <Typography color="primary" variant="body1">{message}</Typography>
                                }
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            className={classes.inline}
                                            color="secondary"
                                        >
                                            {extMessage}
                                        </Typography>

                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                    </List>
                </DialogContentText>
            </DialogContent>



            <DialogActions>
                <Button onClick={() => { CloseDialog('ok') }} color="primary">
                    {okButtonText}
                </Button>

                <Button onClick={() => { CloseDialog('cancel') }} color="primary" autoFocus>
                    {cancelButtonText}
                </Button>
            </DialogActions>
        </Dialog>
    );
})

FMessageDialog.propTypes = {
    title: PropTypes.string,
    message: PropTypes.string,
    okButtonText: PropTypes.string,
    cancelButtonText: PropTypes.string,
    hideCancelButton: PropTypes.bool,
    onOpen: PropTypes.func,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
}

FMessageDialog.defaultProps = {

    okButtonText: "OK",
    cancelButtonText: "CANCEL",
    hideCancelButton: true
}

export default FMessageDialog;