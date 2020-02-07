var CronJob = require('cron').CronJob;

const fetchGithub = require('./tasks/fetch-github.js');

// fetch Github jobs
//cron schedule expression

new CronJob('*/1 * * * *', fetchGithub, null, true, 'America/Los_Angeles');

//from https://crontab.guru/
