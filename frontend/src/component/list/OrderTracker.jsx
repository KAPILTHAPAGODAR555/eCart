import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

// Define the steps for your tracker
const steps = [
  'Order Placed',
  'Shipped',
  'Out for Delivery',
  'Delivered',
];

export default function OrderTracker({val}) {
  // This state would come from your application's data (e.g., API response)
  // 0 = Order Placed, 1 = Shipped, etc.
  const [activeStep, setActiveStep] = React.useState(val); // Set to 'Shipped'

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