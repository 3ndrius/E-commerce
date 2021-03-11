import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

const useStyles = makeStyles({
  root: {
    width: '100%',
    padding: "40px 0"
  },
});

const steps = [
  'Shipping',
  'Confirm',
  'Payment',
];

export default function CheckoutSteps({ stepNo }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Stepper activeStep={stepNo} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}
