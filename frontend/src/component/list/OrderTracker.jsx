
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { useState } from 'react';


const steps = [
  'Order Placed',
  'Shipped',
  'Out for Delivery',
  'Delivered',
];

export default function OrderTracker({val}) {
  const [activeStep, setActiveStep] = useState(val); 

  return (
    <Box sx={{ width: '100%', padding: '24px' }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}