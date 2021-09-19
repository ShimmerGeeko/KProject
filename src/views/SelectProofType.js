import React, { useEffect, useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Box, Grid, Radio, RadioGroup, FormControlLabel, Select, createMuiTheme, ThemeProvider, MenuItem, Container, Badge } from '@material-ui/core';
import FlipCameraAndroidIcon from '@material-ui/icons/FlipCameraAndroid';
import CameraIcon from '@material-ui/icons/Camera';
import VisibilityIcon from '@material-ui/icons/Visibility';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import data from '../data';
import ViewDetails from './StepperScreen/ViewDetails';
import CheckIcon from '@material-ui/icons/Check';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CameraAltOutlinedIcon from '@material-ui/icons/CameraAltOutlined';
import ClearIcon from '@material-ui/icons/Clear';
import FMessageDialog from '../fincore-ui/components/FMessageDialog';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';


const useStyles = makeStyles((theme) => ({

    root: {
        width: '100%',
    },
    button: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    input: {
        display: "none",
    },


}),
);
const theme = createMuiTheme({
    overrides: {
        MuiStepIcon: {
            completed: {
                color: "#fff !important"
            }
        },
    },
});




function getSteps() {
    return ['', '', '', ''];
}












export default function CustomizedSteppers(props) {
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const [proof, setProof] = useState('');
    const [value, setValue] = useState('offline');
    const [selectedFile, setSelectedFile] = useState("");
    const [selfie, setSelfie] = useState("Take a Selfie");
    const steps = getSteps();
    const messageDialog = useRef(null);

    const [message, setMessage] = useState("Capture Image");
    const [videoMessage, setVideoMessage] = useState("Please Make sure that your face inside the frame and read aloud the verfication code display on the screen.")

    const [imageDataURL, setImageDataURL] = useState(null);
    const [changeImage, setChangeImage] = useState("");
    const [selfieDataURL, setSelfieDataURL] = useState(null);
    const [addressDataURL, setAddressDataURL] = useState(null);
    const [changeAddressImage, setChangeAddressImage] = useState("");
    const [front, setFront] = useState(false);
    // const [removeBase64, setRemoveBase64] = useState([]);
    var Base64 = useRef([]);
    var addressBase64 = useRef([]);
    const [multipleImage, setMultipleImage] = useState([]);
    const [addressMultipleImage, setAddressMulitpleImage] = useState([]);



    var player = useRef(null);
    var selfiePlayer = useRef(null);
    var addressPlayer = useRef(null);

    const [videoDataURL, setVideoDataURL] = useState(null);
    const [videoIcon, setVideoIcon] = useState(false);
    const [showVideo, setShowVideo] = useState(false);


    var media = useRef(null);
    var videos = useRef(null);
    let chunks = [];



    const handleNext = () => {
        if (multipleImage.length !== 0) {

            // if (imageDataURL !== null) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            // }
        } else {
            messageDialog.current.openDialog("Warning", "Please take a image of your ID Proof", "", true);
        }
        if (activeStep === 0) {
            if (multipleImage.length > 0) {
                if (imageDataURL === null) {
                    player.srcObject.getVideoTracks().forEach((track) => {
                        track.stop();
                    });
                }
            }
        }
    };


    const NextPage = () => {
        props.history.push("/ReviewDetails", { info: { pageMode: "" } })
    }
    const handleBack = () => {

        if (activeStep === 0) {

            props.history.push("/SelectCountry", { info: { pageMode: "" } })
        } else {


            setActiveStep((prevActiveStep) => prevActiveStep - 1);
        }


    };

    const handleReset = () => {
        setActiveStep(0);
    };
    var stepActive = 0;

    if (activeStep == 3) {
        stepActive = 1;
    } else if (activeStep == 4 || activeStep == 5) {
        stepActive = 2;
    } else if (activeStep == 6 || activeStep == 7 || activeStep == 8) {
        stepActive = 3;
    } else {
        stepActive = 0;
    }

    function getStepContent(step) {

        switch (step) {
            case 0:
                return captureImage();
            case 1:
                return previewPage();
            case 2:
                return verifyAadhar();
            case 3:
                return videoStart(); //i will display a message after uploaded successfully
            case 4:
                return faceVerification();
            case 5:
                return captureSelfie();
            case 6:
                return selfieClickVerification();
            case 7:
                return AddressVerification();
            case 8:
                return AddressVerificationPreview();
            default:
                return 'Unknown step';
        }
    }


    useEffect(() => {

        if (activeStep === 0) {
            if (proof !== "") {
                if (message !== "") {

                    setTimeout(() => {

                        setMessage("Just align your ID with the frame and press the button.The ID must be original (no photocopies or prints).");
                        setTimeout(() => {
                            setMessage("");
                        }, 3000);
                    }, 3000)
                }

                if (imageDataURL === null) {
                    initializeMedia();
                }

            }
        }

        if (activeStep == 3) {
            setTimeout(() => {
                setVideoMessage("")
            }, 3000)
        }

        if (activeStep == 5) {
            setTimeout(() => {
                setSelfie("")
            }, 3000)
        }


        if (activeStep === 3) {
            if (videoDataURL === null) {
                initializeVideoMedia();
            }
        }

        if (activeStep === 5) {
            if (selfieDataURL === null) {
                initializeSelfieMedia();
            }
        }

        if (activeStep === 7) {
            if (addressDataURL === null) {
                initializeAddressMedia()
            }
        }

    }, [activeStep, imageDataURL, proof, videoDataURL, selfieDataURL, addressDataURL])


    function initializeMedia() {
        setImageDataURL(null);

        if (!("mediaDevices" in navigator)) {
            navigator.mediaDevices = {};
        }

        if (!("getUserMedia" in navigator.mediaDevices)) {
            navigator.mediaDevices.getUserMedia = function (constraints) {
                var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

                if (!getUserMedia) {
                    return Promise.reject(new Error("getUserMedia Not Implemented"));
                }

                return new Promise((resolve, reject) => {
                    getUserMedia.call(navigator, constraints, resolve, reject);
                });
            };
        }

        navigator.mediaDevices
            .getUserMedia({ video: { facingMode: (front ? "user" : "environment") } })
            .then((stream) => {
                player.srcObject = stream;
            })
            .catch((error) => {
                console.error(error)
            });
    };

    function initializeVideoMedia() {

        debugger;
        setVideoDataURL(null);
        setShowVideo(false)
        if (!("mediaDevices" in navigator)) {
            navigator.mediaDevices = {};
        }

        if (!("getUserMedia" in navigator.mediaDevices)) {
            navigator.mediaDevices.getUserMedia = function (constraints) {
                var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

                if (!getUserMedia) {
                    return Promise.reject(new Error("getUserMedia Not Implemented"));
                }

                return new Promise((resolve, reject) => {
                    getUserMedia.call(navigator, constraints, resolve, reject);
                });
            };
        }


        navigator.mediaDevices
            .getUserMedia({ video: { facingMode: (front ? "user" : "environment") }, audio: true })
            .then((stream) => {
                //connect the media stream to the first video element


                if ("srcObject" in videos) {
                    videos.srcObject = stream;
                } else {
                    //old version
                    videos.src = window.URL.createObjectURL(stream);
                }

                videos.onloadedmetadata = function (ev) {
                    videos.play();
                };

                const mediaRecorder = new MediaRecorder(stream);
                media.current = mediaRecorder;

                console.log(media.current, "mdm")


            })
            .catch((error) => {
                debugger
                console.error(error)
            });
    };

    function initializeSelfieMedia() {
        setSelfieDataURL(null);

        if (!("mediaDevices" in navigator)) {
            navigator.mediaDevices = {};
        }

        if (!("getUserMedia" in navigator.mediaDevices)) {
            navigator.mediaDevices.getUserMedia = function (constraints) {
                var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

                if (!getUserMedia) {
                    return Promise.reject(new Error("getUserMedia Not Implemented"));
                }

                return new Promise((resolve, reject) => {
                    getUserMedia.call(navigator, constraints, resolve, reject);
                });
            };
        }

        navigator.mediaDevices
            .getUserMedia({ video: { facingMode: (front ? "user" : "environment") } })
            .then((stream) => {
                selfiePlayer.srcObject = stream;
            })
            .catch((error) => {
                console.error(error)
            });
    };

    function initializeAddressMedia() {
        setAddressDataURL(null);

        if (!("mediaDevices" in navigator)) {
            navigator.mediaDevices = {};
        }

        if (!("getUserMedia" in navigator.mediaDevices)) {
            navigator.mediaDevices.getUserMedia = function (constraints) {
                var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

                if (!getUserMedia) {
                    return Promise.reject(new Error("getUserMedia Not Implemented"));
                }

                return new Promise((resolve, reject) => {
                    getUserMedia.call(navigator, constraints, resolve, reject);
                });
            };
        }

        navigator.mediaDevices
            .getUserMedia({ video: { facingMode: (front ? "user" : "environment") } })
            .then((stream) => {
                addressPlayer.srcObject = stream;
            })
            .catch((error) => {
                console.error(error)
            });
    };


    function handleProofValue(e) {
        setProof(e.target.value);
        setImageDataURL(null);
        setActiveStep(0)

    }

    function removeImage() {
        initializeMedia()
        Base64.current.pop();
        console.log(Base64, "remove last array");
    }
    function captureImage() {

        const changeCamera = () => {
            setFront(!front);
        }



        const capturePicture = () => {
            var canvas = document.createElement("canvas");
            canvas.width = player.videoWidth;
            canvas.height = player.videoHeight;
            var contex = canvas.getContext("2d");
            contex.drawImage(player, 0, 0, canvas.width, canvas.height);
            console.log(canvas.toDataURL(), "canvas image");
            // setRemoveBase64(canvas.toDataURL());
            setImageDataURL(canvas.toDataURL());
            Base64.current.push(canvas.toDataURL());
            setMultipleImage(Base64.current);
            console.log(Base64, "mmm")
            player.srcObject.getVideoTracks().forEach((track) => {
                track.stop();
            });

        };

        console.log("multipleImage", multipleImage)
        function saveProofImage() {
            setImageDataURL(null)
            initializeMedia();
        }



        return <Grid item xs={12} className="select-proof-container">
            <Box className="select-proof-title">Take a Picture of Your ID </Box>
            {/* <Box >Select Proof </Box> */}
            <Grid container xs={11} className="display-flex" style={{ marginBottom: "0.3rem" }}>
                <Grid item xs={12}>
                    <Box style={{ textAlign: "left", }}>Select Proof *</Box>
                </Grid>
                <Grid item xs={12}>
                    <Select value={proof} fullWidth variant="outlined" onChange={(e) => handleProofValue(e)}>
                        <MenuItem value="">Please select an ID</MenuItem>
                        {data.proof.map((i, k) => {
                            return <MenuItem key={k} value={i.proofName}>{i.proofName}</MenuItem>
                        })}
                    </Select>
                </Grid>
            </Grid>
            <Grid item xs={12} className="camera-background">

                {proof !== "" ? <Grid item xs={12} className="middle" style={{ position: "relative" }}>
                    {imageDataURL ? (
                        <Grid item xs={12}>
                            <img src={imageDataURL} className="full-h-w" />
                            <Grid item xs={8} className="middle center-margin display-flex">

                                <Grid item xs={6} >
                                    {imageDataURL !== null ? <CheckIcon onClick={saveProofImage} className="camera-icon camera-icon-shadow" /> : ""}
                                </Grid>
                                <Grid item xs={6} >
                                    {imageDataURL !== null ? <ClearIcon onClick={removeImage} className="camera-icon camera-icon-shadow" /> : ""}
                                </Grid>
                            </Grid>
                        </Grid>
                    ) : (
                        <video width="100%" height="100%"
                            ref={(refrence) => {
                                player = refrence;
                            }}
                            autoPlay className="full-h-w"
                        ></video>
                    )}
                    {imageDataURL === null ? <Grid item xs={12} md={11} lg={12} className="display-flex camera-bottom-icon camera-icon-shadow"></Grid> : ""}
                    <Grid item xs={12} md={11} lg={12} className="display-flex camera-bottom-icon" style={{ height: '3rem' }} >
                        <Grid item xs={4}>
                            {imageDataURL === null ? <FlipCameraAndroidIcon onClick={changeCamera} className="camera-icon cancel-icon" /> : ""}
                        </Grid>
                        <Grid item xs={4}>
                            {imageDataURL === null ? <CameraIcon onClick={capturePicture} className="camera-icon cancel-icon" /> : ""}
                        </Grid>
                        <Grid item xs={4}>
                            {imageDataURL === null ? multipleImage.length > 0 ? <Grid item xs={6} className="full-h-w center-margin" >
                                <Badge badgeContent={multipleImage.length} color="primary" style={{ height: "3rem" }}>
                                    <img src={multipleImage[multipleImage.length - 1]} className="full-h-w" />
                                </Badge>
                            </Grid> : "" : ""}
                        </Grid>
                    </Grid>
                </Grid> : ""}

                {proof !== "" ? imageDataURL === null ? <Box className="middle video-camera-text">{message}</Box> : "" : ""}

            </Grid>
        </Grid>

    }





    const handleViewDetails = () => {
        // props.history.push("/ViewDetails", { info: { pageMode: "" } });
        messageDialog.current.openDialog("", ViewDetails, '', '', () => { })
    }


    function changeCurrentImage() {
        var deleteImage = Base64.current.indexOf(changeImage);
        console.log(deleteImage);
        Base64.current.splice(deleteImage, 1);

        console.log(Base64.current, "current base64");
        setImageDataURL(null)
        setActiveStep(0)


        console.log(Base64.current.indexOf(changeImage), "change image");
    }


    function previewPage() {
        if (multipleImage.length == 0) {
            setImageDataURL(null)
            setActiveStep(0)
        }



        function removeSmallImage(item) {
            var deleteSmallImage = Base64.current.indexOf(item);
            Base64.current.splice(deleteSmallImage, 1);
        }

        var previewImage = imageDataURL !== null ? imageDataURL : multipleImage[multipleImage.length - 1];
        console.log(multipleImage[multipleImage.length - 1], "mulitpleImage last")
        const changeAboveImage = (item) => {
            setChangeImage(item);
        }
        return <Grid item xs={12} className="select-proof-container">
            <Box className="select-proof-title">Take a Picture of Your ID </Box>
            {/* <Grid item xs={11} className="display-flex">
                {data.proof.map((i, k) => {
                    return <Grid item xs={3} key={k}>
                        <img src={process.env.PUBLIC_URL + i.image} alt="Adhare" className="image-proof-type" />
                        <Box className="box-proof-type">{i.proofName}</Box>
                    </Grid>
                })}
            </Grid> */}
            <Grid item xs={12} className="display-flex">
                <Select value={proof} fullWidth variant="outlined" onChange={(e) => handleProofValue(e)} style={{ margin: "1rem" }}>
                    <MenuItem value="" >Please select an ID</MenuItem>
                    {data.proof.map((i, k) => {
                        return <MenuItem key={k} value={i.proofName}>{i.proofName}</MenuItem>
                    })}
                </Select>
            </Grid>
            <Grid item xs={12} className="camera-background black-color" style={{ height: "50vh" }}>
                <Grid item xs={12} className="display-flex">

                    <Grid item xs={6} className="display-flex" style={{ width: "100%" }}>
                        <VisibilityIcon className="preview-icon" />

                        <Button style={{ color: "#fff", float: "left" }} onClick={handleViewDetails}>View Details</Button>

                    </Grid>

                    <Grid item xs={6} className="display-flex" style={{ width: "100%" }}>
                        <CameraAltIcon className="preview-icon" />

                        <Button style={{ color: "#fff", float: "right" }} onClick={changeCurrentImage}>Change</Button>

                    </Grid>
                    {/* <Grid item xs={4}>
    
                    </Grid> */}
                </Grid>
                <Grid style={{ height: '37vh', backgroundColor: "#fff" }}>
                    {/* <center className="middle">Capture Image</center> */}
                    <img src={changeImage !== "" ? changeImage : previewImage} className="full-h-w" />
                </Grid>
                <Grid item xs={12} className="display-flex black-color" flex-direction="row" style={{ height: "8vh" }}>

                    {multipleImage.map((item, k) => {
                        return (<Grid key={k} item xs={2} className="full-h-w" style={{ padding: "5px", position: "relative" }} onClick={() => changeAboveImage(item)}>
                            <ClearIcon onClick={() => removeSmallImage(item)} style={{ position: "absolute", top: "0", right: "0", color: "#fff", margin: "-0.3rem" }} />
                            <img src={item} className="full-h-w" />
                        </Grid>)
                    })}

                </Grid>
            </Grid>
        </Grid>
    }



    function verifyAadhar() {
        const handleChange = (event) => {
            setValue(event.target.value);
        };
        return <Grid item xs={12} className="select-proof-container">
            <Box className="select-proof-title">Verify Aadhar </Box>
            <Grid item xs={10} className="display-flex center-margin" >
                <RadioGroup row aria-label="position" name="position" value={value} onChange={handleChange}>
                    <FormControlLabel value="online" control={<Radio color="primary" />} label="ONLINE AADHAR VERFICATION" />
                    <FormControlLabel value="offline" control={<Radio color="primary" />} label="OFFLINE AADHAR VERFICATION" />
                </RadioGroup>

            </Grid>
            <Grid item xs={11} className="center-margin" style={{ height: "40vh", position: "relative", backgroundColor: "#9ddbec" }} onClick={() => document.getElementById("choseFile").click()}>
                <Grid className="middle">
                    <CloudUploadIcon style={{ fontSize: "3.5rem" }} />
                    <Box>{selectedFile !== "" ? selectedFile[0].name : "UPLOAD FROM FILE"}</Box>
                    <input id="choseFile" type="file" className={classes.input} onChange={(e) => setSelectedFile(e.target.files)}></input>
                </Grid>
            </Grid>
        </Grid>
    }





    function videoStart() {


        const changeCamera = () => {
            setFront(!front);
        }


        const startVideo = () => {

            media.current.start();
            media.current.ondataavailable = function (ev) {
                chunks.push(ev.data);
                console.log("chunks", chunks)
            }
            console.log(media.current.state, "starting video");
            setVideoIcon(true);
            setShowVideo(false);

        }

        const endVideo = () => {
            media.current.stop();
            media.current.ondataavailable = function (ev) {
                chunks.push(ev.data);
            }
            media.current.onstop = (ev) => {
                let blob = new Blob(chunks, { 'type': 'video/mp4;' });
                chunks = [];
                let videoURL = window.URL.createObjectURL(blob);
                setVideoDataURL(videoURL);
            }



            setVideoIcon(false);
            setShowVideo(true)
            console.log(media.current.state, "pauseing video");

            videos.srcObject.getVideoTracks().forEach((track) => {
                track.stop();
            });
            videos.srcObject.getAudioTracks().forEach((track) => {
                track.stop();
            });

        }
        var m = showVideo !== true ? true : false;
        return <Grid item xs={12} className="select-proof-container" >

            <Box className="select-proof-title">TAKE A SELFIE VIDEO</Box>

            <Grid item xs={12} className="camera-background middle" style={{ padding: "0.1rem" }}>
                <Grid item xs={4} className="cancel-icon-position">

                    <Grid item xs={12}>
                        {videoDataURL !== null ? <ClearIcon onClick={initializeVideoMedia} className="camera-icon" /> : ""}
                    </Grid>
                </Grid>
                <Grid item xs={12} className="middle" style={{ position: "relative" }}>
                    {showVideo === true ? (<Grid item xs={12} style={{ padding: "0.5rem" }}>
                        <video src={videoDataURL} className="full-h-w" controls>

                        </video> </Grid>) : ""}

                    {showVideo !== true ? (
                        // <Grid item xs={12} style={{ position: "relative" }}>
                        <video ref={(refrence) => {
                            videos = refrence;
                        }} className="full-h-w"
                            autoPlay={m} ></video>

                    ) : ""}
                    {videoDataURL == null ? <Grid item xs={12} md={11} lg={12} className="display-flex camera-bottom-icon camera-icon-shadow"></Grid> : ""}
                    <Grid container xs={12} className="display-flex camera-bottom-icon" flex-direction="row" >
                        <Grid item xs={4}>
                            {videoDataURL == null ? <FlipCameraAndroidIcon onClick={changeCamera} className="camera-icon" /> : ""}
                        </Grid>
                        <Grid item xs={4}>
                            {videoDataURL === null ? videoIcon !== true ? <CameraIcon onClick={startVideo} className="camera-icon" /> :
                                <PauseCircleOutlineIcon onClick={endVideo} className="camera-icon" /> : ''}


                        </Grid>
                        <Grid item xs={4}>
                            {/* {videoDataURL !== null ? <ClearIcon onClick={initializeVideoMedia} className="camera-icon" /> : ""} */}
                        </Grid>
                    </Grid>
                </Grid>
                {videoDataURL === null ? <Grid item xs={12} className="display-flex middle">
                    {/* <VideocamOutlinedIcon style={{ margin: "0rem 0px -1rem", color: "#fff", fontSize: "2.5rem" }} /> */}
                    <Box className="video-camera-text">{videoMessage !== "" ? videoMessage : '1-2-3-4'}</Box>
                </Grid> : ""}


            </Grid>
        </Grid>

    }



    function faceVerification() {
        return <Grid item xs={12} className="select-proof-container">
            <Box className="select-proof-title">FACE VERIFICATION</Box>
            <Grid item xs={11} className="display-flex center-margin middle camera-background">
                <Grid item xs={12} >

                    <Grid item xs={12} className="display-flex" >
                        <Grid item sm={3} md={4} style={{ margin: "10px" }}>
                            <img src={process.env.PUBLIC_URL + "/images/add-photo.png"} alt="imag" onClick={handleNext} className="faceverification-img" />
                        </Grid>
                        <Grid item sm={9} md={8} className="faceverification-text" style={{ textAlign: "left" }}>
                            <Button className="font-bold" onClick={handleNext}>CLICK A SELFIE</Button>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} className="display-flex" >
                        <Grid item sm={3} md={4} style={{ margin: "10px" }}>
                            <img src={process.env.PUBLIC_URL + "/images/pencardImage.png"} alt="imag" className="faceverification-img" />
                        </Grid>
                        <Grid item sm={9} md={8} className="faceverification-text">
                            <Box className="font-bold" style={{ textAlign: "left" }}>PHOTO ID</Box>
                            <Select value="pencard" variant="outlined" fullWidth>
                                <option value="pencard">Pencard</option>

                            </Select>
                        </Grid>
                    </Grid>


                </Grid>
            </Grid>
        </Grid>
    }




    function captureSelfie() {

        console.log("message", message);
        const changeCamera = () => {
            setFront(!front);
        }
        function removeSelfieImage() {
            initializeSelfieMedia()

        }


        const captureSelfiePicture = () => {
            var canvas = document.createElement("canvas");
            canvas.width = selfiePlayer.videoWidth;
            canvas.height = selfiePlayer.videoHeight;
            var contex = canvas.getContext("2d");
            contex.drawImage(selfiePlayer, 0, 0, canvas.width, canvas.height);
            console.log(canvas.toDataURL(), "canvas image");
            // setRemoveBase64(canvas.toDataURL());
            setSelfieDataURL(canvas.toDataURL());

            selfiePlayer.srcObject.getVideoTracks().forEach((track) => {
                track.stop();
            });

        };
        return <Grid item xs={12} className="select-proof-container">
            <Box className="select-proof-title">TAKE A SELFIE </Box>



            <Grid item xs={12} className="camera-background middle" style={{ padding: "0.1rem" }}>
                <Grid item xs={4} style={{ position: "absolute", top: "3px", right: '11px', zIndex: '999' }}>

                    <Grid item xs={12}>
                        {selfieDataURL !== null ? <ClearIcon onClick={removeSelfieImage} className="camera-icon" /> : ""}
                    </Grid>
                </Grid>
                <Grid item xs={12} className="middle" style={{ position: "relative" }}>
                    {selfieDataURL ? (
                        <img src={selfieDataURL} className="full-h-w" />
                    ) : (
                        <video width="100%" height="100%"
                            ref={(refrence) => {
                                selfiePlayer = refrence;
                            }}
                            autoPlay className="full-h-w"
                        ></video>
                    )}
                    {selfieDataURL == null ? <Grid item xs={12} md={11} lg={12} className="display-flex camera-bottom-icon camera-icon-shadow"></Grid> : ""}
                    <Grid item xs={12} className="display-flex camera-bottom-icon">
                        <Grid item xs={4}>
                            {selfieDataURL == null ? <FlipCameraAndroidIcon onClick={changeCamera} className="camera-icon" /> : ""}
                        </Grid>
                        <Grid item xs={4}>
                            {selfieDataURL == null ? <CameraIcon onClick={captureSelfiePicture} className="camera-icon" /> : ""}
                        </Grid>
                        <Grid item xs={4}>
                            {/* {selfieDataURL !== null ? <ClearIcon onClick={removeImage} className="camera-icon" /> : ""} */}
                        </Grid>
                    </Grid>
                </Grid>
                {selfieDataURL === null ? <Grid item xs={12} className="display-flex middle">

                    <Box className="video-camera-text">{selfie}</Box>
                </Grid> : ""}

            </Grid>

        </Grid>


    }

    function selfieClickVerification() {
        return <Grid item xs={12} className="select-proof-container">
            <Box className="select-proof-title">FACE VERIFICATION</Box>
            <Grid item xs={11} className="display-flex center-margin middle camera-background">
                <Grid item xs={12} >

                    <Grid item xs={12} className="display-flex" >
                        <Grid item sm={3} md={4} style={{ margin: "10px" }}>
                            <img src={selfieDataURL} alt="imag" className="faceverification-img" />
                        </Grid>
                        <Grid item sm={9} md={8} onClick={handleBack} className="faceverification-text display-flex" style={{ textAlign: "left", color: "grey", justifyContent: "end" }}>
                            <CameraAltOutlinedIcon style={{ margin: "0px 6px" }} />
                            <Box style={{ margin: "0px" }}>Change Image</Box>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} className="display-flex" >
                        <Grid item sm={3} md={4} style={{ margin: "10px" }}>
                            <img src={process.env.PUBLIC_URL + "/images/pencardImage.png"} alt="imag" className="faceverification-img" />
                        </Grid>
                        <Grid item sm={9} md={8} className="faceverification-text" style={{ textAlign: "left" }}>
                            <Box className="font-bold" style={{ textAlign: "left" }}>PHOTO ID</Box>
                            <Select value="pencard" variant="outlined" fullWidth>
                                <option value="pencard">Pencard</option>

                            </Select>
                        </Grid>
                    </Grid>


                </Grid>
            </Grid>
        </Grid>
    }

    function removeAddressImage() {
        initializeAddressMedia()
        addressBase64.current.pop();
        console.log(addressBase64, "remove last array");
    }

    function AddressVerification() {

        const changeCamera = () => {
            setFront(!front);
        }

        function saveAddressImage() {
            setAddressDataURL(null)
            initializeAddressMedia();
        }

        const captureAddressVerification = () => {
            var canvas = document.createElement("canvas");
            canvas.width = addressPlayer.videoWidth;
            canvas.height = addressPlayer.videoHeight;
            var contex = canvas.getContext("2d");
            contex.drawImage(addressPlayer, 0, 0, canvas.width, canvas.height);
            console.log(canvas.toDataURL(), "canvas image");
            // setRemoveBase64(canvas.toDataURL());
            setAddressDataURL(canvas.toDataURL());
            addressBase64.current.push(canvas.toDataURL());
            setAddressMulitpleImage(addressBase64.current);
            console.log(addressBase64, "addressBase64")
            addressPlayer.srcObject.getVideoTracks().forEach((track) => {
                track.stop();
            });

        };

        console.log("addressMultipleImage", addressMultipleImage)

        return <Grid item xs={12} className="select-proof-container" style={{ height: "79vh" }}>
            <Box className="select-proof-title">ADDRESS VERIFICATION </Box>
            <Grid item xs={12}>
                <img src={process.env.PUBLIC_URL + "/images/aadhar-demo.png"} style={{ height: "144px" }} />
            </Grid>
            <Grid item xs={12} className="camera-address-preview black-color" style={{ height: "45vh" }}>
                <Grid item xs={12} className="middle" style={{ position: "relative" }}>

                    {addressDataURL ? (
                        <Grid item xs={12}>
                            <img src={addressDataURL} className="full-h-w" />
                            <Grid item xs={8} className="middle center-margin display-flex">

                                <Grid item xs={6} >
                                    {addressDataURL !== null ? <CheckIcon onClick={saveAddressImage} className="camera-icon camera-icon-shadow" /> : ""}
                                </Grid>
                                <Grid item xs={6} >
                                    {addressDataURL !== null ? <ClearIcon onClick={removeAddressImage} className="camera-icon camera-icon-shadow" /> : ""}
                                </Grid>
                            </Grid>
                        </Grid>

                    ) : (
                        <video width="100%" height="100%"
                            ref={(refrence) => {
                                addressPlayer = refrence;
                            }}
                            autoPlay className="full-h-w"
                        ></video>
                    )}
                    {addressDataURL === null ? <Grid item xs={12} md={11} lg={12} className="display-flex camera-bottom-icon camera-icon-shadow"></Grid> : ""}

                    <Grid item xs={12} md={11} lg={12} className="display-flex camera-bottom-icon" style={{ height: '3rem', }}>
                        <Grid item xs={4}>
                            {addressDataURL == null ? <FlipCameraAndroidIcon onClick={changeCamera} className="camera-icon" /> : ""}
                        </Grid>
                        <Grid item xs={4}>
                            {addressDataURL == null ? <CameraIcon onClick={captureAddressVerification} className="camera-icon" /> : ""}
                        </Grid>
                        <Grid item xs={4}>
                            {addressDataURL === null ? addressMultipleImage.length > 0 ? <Grid item xs={6} className="full-h-w center-margin" >
                                <Badge badgeContent={addressMultipleImage.length} color="primary" style={{ height: "3rem" }}>
                                    <img src={addressMultipleImage[addressMultipleImage.length - 1]} className="full-h-w" />
                                </Badge>
                            </Grid> : "" : ""}
                        </Grid>
                    </Grid>
                </Grid>


            </Grid>
        </Grid>
    }


    function changeCurrentAddressImage() {
        var deleteAddressImage = addressBase64.current.indexOf(changeImage);
        console.log(deleteAddressImage);
        addressBase64.current.splice(deleteAddressImage, 1);

        console.log(addressBase64.current, "current addressBase64");
        setAddressDataURL(null)
        setActiveStep(7)



    }
    function AddressVerificationPreview() {

        if (addressMultipleImage.length == 0) {
            setAddressDataURL(null)
            setActiveStep(7)
        }

        function removeAddressSmallImage(item) {
            var deleteAddressSmallImage = addressBase64.current.indexOf(item);
            addressBase64.current.splice(deleteAddressSmallImage, 1);
        }

        var previewAddressImage = addressDataURL !== null ? addressDataURL : addressMultipleImage[addressMultipleImage.length - 1];


        const changeAboveImage = (item) => {
            setChangeAddressImage(item);
        }
        return <Grid item xs={12} className="select-proof-container" style={{ height: "79vh" }}>
            <Box style={{ padding: "0.5rem 0", fontSize: "1rem" }}>ADDESS VERIFICATION</Box>
            <Grid item xs={12}>
                <img src={process.env.PUBLIC_URL + "/images/aadhar-demo.png"} style={{ height: "140px" }} />
            </Grid>
            <Grid item xs={12} className="camera-address-preview black-color" >
                <Grid item xs={12} className="display-flex">

                    <Grid item xs={6} className="display-flex" style={{ width: "100%" }}>
                        <VisibilityIcon className="preview-icon" />

                        <Button style={{ color: "#fff", float: "left" }} onClick={handleViewDetails}>View Details</Button>

                    </Grid>

                    <Grid item xs={6} className="display-flex" style={{ width: "100%" }}>
                        <CameraAltIcon className="preview-icon" />

                        <Button style={{ color: "#fff", float: "right" }} onClick={changeCurrentAddressImage}>Change</Button>

                    </Grid>
                    {/* <Grid item xs={4}>
    
                    </Grid> */}
                </Grid>
                <Grid className="address-verification-img">
                    {/* <center className="middle">Capture Image</center> */}
                    <img src={changeAddressImage !== "" ? changeAddressImage : previewAddressImage} className="full-h-w" />
                </Grid>
                <Grid item xs={12} className="display-flex black-color" flex-direction="row" style={{ height: "8vh" }}>

                    {addressMultipleImage.map((item, k) => {
                        return (<Grid key={k} item xs={2} className="full-h-w" style={{ padding: "5px", position: "relative" }} onClick={() => changeAboveImage(item)}>
                            <ClearIcon onClick={() => removeAddressSmallImage(item)} style={{ position: "absolute", top: "0", right: "0", color: "#fff", margin: "-0.3rem" }} />
                            <img src={item} className="full-h-w" />
                        </Grid>)
                    })}

                </Grid>
         
            </Grid>
        </Grid>
    }






    return (<Container className="noPadding">
        <Grid container>

            <Grid item xs={12} className="center-margin" >
                <Grid item lg={4} md={8} sm={12} xs={12} className="center-margin border" style={{ backgroundColor: "#6985e7" }}>
                    <ThemeProvider theme={theme}>

                        <Stepper alternativeLabel activeStep={stepActive} style={{ backgroundColor: "#6985e7" }}>
                            {steps.map((label, i) => (
                                <Step key={i}>
                                    <StepLabel style={{ color: "" }}>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>

                    </ThemeProvider>

                    <Grid item lg={4} md={8} sm={12} xs={12} className="middle proof-page-title" style={{ height: "88vh" }}>
                        {/* {activeStep === steps.length ? ( */}
                        {activeStep === 9 ? (
                            <div className="bottom-button">
                                <Typography className={classes.instructions}>
                                    All steps completed - you&apos;re classic
                            </Typography>
                                <Button onClick={handleReset} className={classes.button}>
                                    Reset
                            </Button>
                            </div>
                        ) : (
                            <div>
                                <Grid container className={classes.instructions}>{getStepContent(activeStep)}</Grid>

                                <div>
                                    <Button onClick={handleBack} className={classes.button}>
                                        {activeStep === 0 ? 'Go Back' : 'Back'}
                                    </Button>
                                    {activeStep === 9 - 1 ? <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={NextPage}
                                        className={classes.button}
                                    >
                                        Confirm Address
                                </Button> : <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleNext}
                                        className={classes.button}
                                    >
                                        Next
                                </Button>}
                                </div>

                            </div>
                        )}
                    </Grid>
                </Grid>
                <FMessageDialog ref={messageDialog} />
            </Grid>
        </Grid>
    </Container>
    );
}
