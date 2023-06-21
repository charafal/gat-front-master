import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';

import Typography from '@mui/material/Typography';
import { TextField, Button, Box, Paper } from '@mui/material';
import axios from 'axios';
import {MenuItem } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Forfait from '../Forfait';
import { Await } from 'react-router-dom';




const steps = ['Création du bénéficiaire', 'Affecter une ligne', 'Affecter un forfait'];

export default function HorizontalNonLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const addBeneficiaire = async () => {
  }
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
    setFormData({ ...formData, [steps[activeStep]]: formData });
  };

  const handleBack = () => {
    
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setFormData({ ...formData, [steps[activeStep - 1]]: formData });
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = async () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
  
    if (allStepsCompleted()) {
      try {
        // Récupérez les données du formulaire
        const formData = {
          nom: 'nom', // Valeur du champ nom
          prenom: 'prenom', // Valeur du champ prénom
          matricule: 'matricule', // Valeur du champ matricule
          centreeCout:'centrecout',
          rfBeneficiaires:'statutBeneficiaire',
          rfDirections: 'rfDirection',
          // Autres champs du formulaire
        };
  
        // Envoyez les données au backend en utilisant une requête POST
        const response = await axios.post('http:localhost/8089/beneficiaires/add',formData);
        const newBeneficiaryId = response.data.id; 
        console.log(newBeneficiaryId.id);

  
        // Vérifiez la réponse du backend et effectuez des actions en conséquence
        if (response.status === 200) {
          // L'ajout du bénéficiaire a réussi
          console.log('Bénéficiaire ajouté avec succès !');
          // Effectuez ici d'autres actions ou affichez un message de succès à l'utilisateur
        } else {
          // Il y a eu une erreur lors de l'ajout du bénéficiaire
          console.log("Erreur lors de l'ajout du bénéficiaire");
          // Effectuez ici d'autres actions ou affichez un message d'erreur à l'utilisateur
        }
  
        // Mettez à jour l'état de la ligne affectée
        const ligne_id = formData.ligne_id; // Remplacez "ligneId" par le champ approprié qui contient l'ID de la ligne affectée
        const updatedLigne = await axios.put(
          `http://localhost:8089/lignes/updateLigne`,
          { etat: 'affecté' } // Remplacez "etat" par le champ approprié qui représente l'état de la ligne
        );
        setLigneAffectee(updatedLigne.data);
  
        // Réinitialisez le formulaire et les étapes
        handleReset();
      } catch (error) {
        // Gérez les erreurs de la requête
        console.error("Erreur lors de l'appel de l'API d'ajout du bénéficiaire :", error);
        // Effectuez ici d'autres actions ou affichez un message d'erreur à l'utilisateur
      }
    } else {
      handleNext();
    }
  };
  
  useEffect(() => {
    const fetchCentreCout = async () => {
      try {
        const response = await axios.get('http://localhost:8089/centreCouts');
        setCentreCout(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des centres de coût :', error);
      }
    };
  
    fetchCentreCout();
  }, []);
  useEffect(() => {
    const fetchRfBeneficiaires = async () => {
      try {
        const response = await axios.get('http://localhost:8089/rfbeneficiaires');
        setRfBeneficiaires(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des RfBeneficiaires :', error);
      }
    };

    fetchRfBeneficiaires();
  }, []);

  

  useEffect(() => {
    const fetchRfDirections = async () => {
      try { 
        const response = await axios.get('http://localhost:8089/rfdirections');
        setRfDirections(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des RfDirections :', error);
      }
    };

    fetchRfDirections();
  }, []);
  useEffect(() => {
    const fetchLigne = async () => {
      try { 
        const response = await axios.get('http://localhost:8089/lignes/LignRef');
        setLigne(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des lignes :', error);
      }
    };

    fetchLigne();
  }, []);
  useEffect(() => {
    const fetchForfait = async () => {
      try { 
        const response = await axios.get('http://localhost:8089/forfaits');
        setForfait(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des forfaits :', error);
      }
    };

    fetchForfait();
  }, []);
  const [centreeCout, setCentreCout] = useState([]);
  const [rfDirections, setRfDirections] = useState([]);
  const [rfBeneficiaires, setRfBeneficiaires] = useState([]);
  const [ligne, setLigne]= useState([]);
  const [forfait, setForfait]= useState([]);
  

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };
  const [ligneAffectee, setLigneAffectee] = useState('');
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    matricule: '',
    numLigne: '',
    nomforfait: '',
    rfBeneficiaires:'',
    rfDirections:'',
    centreeCout:'',
    // Autres champs du formulaire
  });


  const renderForm = (step) => {
    switch (step) {
      case 0:
        return (
          <form>
            <Box sx={{ display: 'flex', gap: '20px', margin: '10px' }}>
              <TextField label="Nom" variant="outlined" fullWidth value= {formData.nom}
               onChange={(e) => setFormData({ ...formData, nom: e.target.value })} />
              <TextField label="Prénom" variant="outlined" fullWidth
              value= {formData.prenom}
              onChange={(e) => setFormData({ ...formData, prenom: e.target.value })} />
            </Box>
            <Box sx={{ display: 'flex', gap: '20px', margin: '10px' }}>
              <TextField label="Matricule" variant="outlined" fullWidth />
              <TextField
                label="Centre de coût"
                variant="outlined"
                fullWidth
                select
                value= {formData.centreCout}
               onChange={(e) => setFormData({ ...formData, centreCout: e.target.value })}
              >
                {centreeCout.map((centreCout) => (
                    <MenuItem key={centreCout.id} value={centreCout.id}>
                    {centreCout.centreCout}
                    </MenuItem>
                ))}
              </TextField>
            </Box>
            
            <Box sx={{ display: 'flex', gap: '20px', margin: '10px' }}>
              <TextField
                label="Direction"
                variant="outlined"
                fullWidth
                select
                value= {formData.rfDirection}
               onChange={(e) => setFormData({ ...formData, rfDirection: e.target.value })}
              >
                 {rfDirections.map((rfDirection) => (
                      <MenuItem key={rfDirection.id} value={rfDirection.id}>
                        {rfDirection.nomDirection}
                      </MenuItem>
                  ))}
              </TextField>
              <TextField
                label="Status de Bénéficiaire"
                variant="outlined"
                fullWidth
                select
                value= {formData.rfBeneficiaire}
               onChange={(e) => setFormData({ ...formData, rfBeneficiaire: e.target.value })}
              >
                 {rfBeneficiaires.map((rfBeneficiaire) => (
                  <MenuItem key={rfBeneficiaire.id} value={rfBeneficiaire.id}>
                    {rfBeneficiaire.statutBeneficiaire}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          </form>
        );
      case 1:
        return (
          <form>
            {/* Votre formulaire pour la deuxième étape */}
            <Box sx={{ display: 'flex', gap: '20px', margin: '10px' }}>
            <TextField
                label="Les numéros de lignes disponnibles"
                variant="outlined"
                fullWidth
                select
                sx={{ width: '50%' }}
                justifyContent="center"
                value= {formData.numLigne}
               onChange={(e) => setFormData({ ...formData, numLigne: e.target.value })}
                
              >
                {ligne.map((ligne) => (
                  <MenuItem key={ligne.id} value={ligne.id}>
                    {ligne.numLigne}
                  </MenuItem>
                ))}
              </TextField>
              </Box>
          </form>
        );
      case 2:
        return (
          <form>
            {/* Votre formulaire pour la troisième étape */}
            <Box sx={{ display: 'flex', gap: '20px', margin: '10px' }}>
            <TextField
                label="Le forfait"
                variant="outlined"
                fullWidth
                select
                sx={{ width: '50%' }}
                justifyContent="center"
                value= {formData.nomforfait}
               onChange={(e) => setFormData({ ...formData, nomforfait: e.target.value })}
              >
                {forfait.map((forfait) => (
                  <MenuItem key={forfait.id} value={forfait.id}>
                    {forfait.nomForfait}
                  </MenuItem>
                ))}
              </TextField>
              </Box>
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