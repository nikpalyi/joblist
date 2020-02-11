import React from 'react';
import './App.css';
import Jobs from './Jobs';

const JOB_API_URL = 'http://localhost:3002/jobs';

// const mockJobs = [
//   { title: 'SWE 1', company: 'Google' },
//   { title: 'SWE 2', company: 'Amazon' },
//   { title: 'SWE 3', company: 'Facebook' },
//   { title: 'SWE 4', company: 'Paypal' }
// ];

async function fetchJobs(updateCb) {
  const res = await fetch(JOB_API_URL);
  const json = await res.json();

  updateCb(json);

  console.log({ json });
}

function App() {
  //store jobs
  const [jobList, updateJobs] = React.useState([]);

  //useEffect like the componentDidMount()
  React.useEffect(() => {
    fetchJobs(updateJobs);
  }, []);

  return (
    <div className='App'>
      <Jobs jobs={jobList}></Jobs>
    </div>
  );
}

export default App;
