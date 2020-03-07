const cron = require('cron');
const sendEmail = require('../sendEmail/sendEmail');

const cron_job  = () => {
    const job = new cron.CronJob({
    cronTime: '00 00 6 * * 0-6', // Chạy Jobs vào 1h30 am hằng đêm
    onTick: function() {
        sendEmail();
        console.log('Cron jub runing...');
    },
    start: true, 
    timeZone: 'Asia/Ho_Chi_Minh' // Lưu ý set lại time zone cho đúng 
    });
    job.start();
}
module.exports = cron_job;