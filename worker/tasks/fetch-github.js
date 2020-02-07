var fetch = require('node-fetch');
var redis = require('redis'),
  client = redis.createClient();

const { promisify } = require('util');
//const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

const baseURL = 'https://jobs.github.com/positions.json';

async function fetchGithub() {
  let resultCount = 1;
  let onPage = 0;
  const allJobs = [];

  //fetch all pages
  while (resultCount > 0) {
    const res = await fetch(`${baseURL}?page=${onPage}`);
    const jobs = await res.json();
    allJobs.push(...jobs);
    resultCount = jobs.length;
    console.log('got', resultCount, 'jobs');
    onPage++;
  }

  console.log('got', allJobs.length, 'all jobs');

  //filter algorythm for filtering the postion titles
  const jrJobs = allJobs.filter(job => {
    const jobTitle = job.title.toLowerCase();

    //algorythm logic
    if (
      jobTitle.includes('senior') ||
      jobTitle.includes('manager') ||
      jobTitle.includes('sr.') ||
      jobTitle.includes('architect')
    ) {
      return false;
    }

    return true;
  });

  console.log('filtered down to', jrJob.length);

  //set in redis
  const success = await setAsync('github', JSON.stringify(allJobs));
  console.log({ success });
}

//fetchGithub();

module.exports = fetchGithub;
