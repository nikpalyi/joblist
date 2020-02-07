var fetch = require('node-fetch');

const baseURL = 'https://jobs.github.com/positions.json';

modeule.exports = async function fetchGithub(baseURL) {
  const jobs = await fetch();
  console.log(jobs.length);
};

fetchGithub();
