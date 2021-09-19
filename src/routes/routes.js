import AccessPermission from '../views/AccessPermission';
import InstructionPage from '../views/InstructionPage';
import ReviewDetails from '../views/ReviewDetails';
import SelectLanguage from '../views/SelectLanguage';
import CustomizedSteppers from '../views/SelectProofType';
import SelectYourCountry from '../views/SelectYourCountry';
import PreviewPage from '../views/StepperScreen/PreviewPage';
import ViewDetails from '../views/StepperScreen/ViewDetails';

export const routes = [
    {
        path:"/SelectCountry",
        Component:SelectYourCountry
    },
    {
        path:"/SelectLanguage",
        Component:SelectLanguage 
    },
    {
        path:"/InstructionPage",
        Component:InstructionPage
    },
    {
        path:"/AccessPermission",
        Component:AccessPermission
    },
    {
        path:"/CustomizedSteppers",
        Component:CustomizedSteppers
    },
    {
        path:"/ViewDetails",
        Component:ViewDetails,
    },
    {
        path:"/PreviewPage",
        Component:PreviewPage
    },
    {
        path:"/ReviewDetails",
        Component:ReviewDetails
    }

];

    
    
    