
import React from 'react'
import { ThemeProvider } from '@material-ui/core'
import { theme } from './themes/base';
import { MemoryRouter as Router, Route } from 'react-router-dom';
// import Main from './components/Main';
import { LoadingSpinnerComponent } from './components/LoadingSpinner';
import { SnackbarProvider } from 'notistack';
import HomePage from './views/HomePage';
import SelectYourCountry from './views/SelectYourCountry';
import SelectLanguage from './views/SelectLanguage';
import InstructionPage from './views/InstructionPage';
import AccessPermission from './views/AccessPermission';
import CustomizedSteppers from './views/SelectProofType';
import { routes } from './routes/routes';




const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <SnackbarProvider preventDuplicate anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}>
          <Route path="/" exact component={HomePage} />
          {routes.map((Item, index)=> (
                        <Route key={index} path={Item.path} exact render={(props) => <Item.Component key={props.location.state.info.pageMode} {...props} />} />
                    ))} 
          {/* <Route path="/SelectCountry" exact component={SelectYourCountry} /> */}
          {/* <Route path="/SelectLanguage" exact component={SelectLanguage} />
          <Route path="/Instruction" exact component={InstructionPage} />
          <Route path="/AccessPermission" exact component={AccessPermission} />
          <Route path="/SelectProofType" exact component={CustomizedSteppers} /> */}
          <LoadingSpinnerComponent />
        </SnackbarProvider>
      </Router>
    </ThemeProvider>
  )
}

export default App
