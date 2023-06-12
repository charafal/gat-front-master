import * as React from 'react';

import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';

import Typography from '@mui/material/Typography';
import { TextField, Button, Box, MenuItem, Paper } from '@mui/material';

const steps = ['Création du bénéficiaire', 'Affecter une ligne', 'Affecter un forfait'];

export default function HorizontalNonLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  const renderForm = (step) => {
    switch (step) {
      case 0:
        return (
          <form>
            <Box sx={{ display: 'flex', gap: '20px', margin: '10px' }}>
              <TextField label="Nom" variant="outlined" fullWidth />
              <TextField label="Prénom" variant="outlined" fullWidth />
            </Box>
            <Box sx={{ display: 'flex', gap: '20px', margin: '10px' }}>
              <TextField label="Matricule" variant="outlined" fullWidth />
              <TextField
                label="Centre de coût"
                variant="outlined"
                fullWidth
                select
              ></TextField>
            </Box>
            
            <Box sx={{ display: 'flex', gap: '20px', margin: '10px' }}>
              <TextField
                label="RfDirection"
                variant="outlined"
                fullWidth
                select
              ></TextField>
              <TextField
                label="RfBénéficiaire"
                variant="outlined"
                fullWidth
                select
              ></TextField>
            </Box>
          </form>
        );
      case 1:
        return (
          <form>
            {/* Votre formulaire pour la deuxième étape */}
          </form>
        );
      case 2:
        return (
          <form>
            {/* Votre formulaire pour la troisième étape */}
          </form>
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper  sx={{ width: "100%", mb: 2, padding: "1%" }}>
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div>
        {renderForm(activeStep)}
        {allStepsCompleted() ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
              Step {activeStep + 1}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                pt: 2,
                marginTop: '20px',
              }}
            >
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleNext} sx={{ mr: 1 }}>
                Next
              </Button>
              {activeStep !== steps.length &&
                (completed[activeStep] ? (
                  <Typography variant="caption" sx={{ display: 'inline-block' }}>
                    Step {activeStep + 1} already completed
                  </Typography>
                ) : (
                  <Button onClick={handleComplete}>
                    {completedSteps() === totalSteps() - 1 ? 'Finish' : 'Complete Step'}
                  </Button>
                ))}
            </Box>
          </React.Fragment>
        )}
      </div>
      </Paper>
    </Box>
  );
}
