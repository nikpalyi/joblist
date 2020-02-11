import React from 'react';
import Typography from '@material-ui/core/Typography';

import Job from './Job';
import Modal from './Modal';

import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';

function Jobs({ jobs }) {
  //modal
  const [open1, setOpen2] = React.useState(false);
  const [selectedJob1, selectJob2] = React.useState({});
  const handleClickOpen = () => {
    setOpen2(true);
  };
  const handleClose = () => {
    setOpen2(false);
  };

  //pagination
  const numJobs = jobs.length;
  const numPages = Math.ceil(numJobs / 10);
  const [activeStep, setActiveStep] = React.useState(0);
  const jobsOnPage = jobs.slice(activeStep * 10, activeStep * 10 + 10);

  // step == 0, show 0-9
  // step == 1, show 10-19

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  return (
    <div className='jobs'>
      <Modal open={open1} job={selectedJob1} handleClose={handleClose} />
      <Typography variant='h4' component='h1'>
        Entry Level Software Developer Job List
      </Typography>
      <Typography variant='h6' component='h2'>
        Found {numJobs} jobs in total.
      </Typography>
      {jobsOnPage.map((job, i) => (
        <Job
          key={i}
          job={job}
          onClick={() => {
            console.log('clicked');
            handleClickOpen();
            selectJob2(job);
          }}
        ></Job>
      ))}
      <div>
        Page {activeStep + 1} of {numPages}
      </div>
      <MobileStepper
        variant='progress'
        steps={numPages}
        position='static'
        activeStep={activeStep}
        nextButton={
          <Button size='small' onClick={handleNext}>
            Next
            <KeyboardArrowRight />
          </Button>
        }
        backButton={
          <Button size='small' onClick={handleBack}>
            <KeyboardArrowLeft />
            Back
          </Button>
        }
      />
    </div>
  );
}

export default Jobs;
