import React  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import AddInfoContainer from '../../containers/completeProfile/addInfo';
import Pictures from '../../containers/completeProfile/pictures';
import Localistaion from '../../containers/completeProfile/localisation'
import CircularProgress from '@material-ui/core/CircularProgress';
import { Grid, Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  layout: {
    width: 'auto',
    minWidth: 350,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(8),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    minWidth: 0,
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  loading: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  submit: {
    margin: theme.spacing(2, 0, 2),
    backgroundColor: theme.palette.secondary.main,
  },
  back: {
    margin: theme.spacing(2, 0, 2),
    backgroundColor: theme.palette.grey,
  },
}));

const steps = ['Additional infos', 'Pictures', 'Localisation'];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <AddInfoContainer />;
    case 1:
      return <Pictures />;
    case 2:
      return <Localistaion/>;
    default:
      throw new Error('Unknown step');
  }
}


const Checkout = (props) => {

  const {handleBack,handleNext,user,images} = props;
  const activeStep = user.complete;
    const classes = useStyles();

    return (
    <React.Fragment>
      <CssBaseline />
      {activeStep !== 'loading' &&
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center" color='secondary'>
            Complete profile
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>      
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Success
                </Typography>
                <Typography variant="subtitle1">
                  You completed your profile successfully.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
              </React.Fragment>
            )}
          </React.Fragment>
        
        {(activeStep === 1 || activeStep === 2) && 
           <Grid container direction="row" item xs={12}>
              <Grid item xs={3}>
              <Button className={classes.back} fullWidth onClick={handleBack} variant="contained" type="submit" color="default" >Back</Button>
              </Grid>
              <Grid item xs={6}/>

              <Grid item container alignItems="flex-end" xs={3}>
                {
                  images.isImages === true && 
                <Button  className={classes.submit} onClick={handleNext} fullWidth variant="contained" type="submit" color="primary">Next</Button>
              }
                </Grid>
            </Grid>
        }
        </Paper>
      </main>}
      {activeStep === "loading" && <div className={classes.loading}><CircularProgress color="secondary" /></div>}
    </React.Fragment>
  );
}

export default Checkout;