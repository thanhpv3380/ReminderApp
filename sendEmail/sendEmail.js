const nodemailer = require('nodemailer');

const Debtor = require('../models/debtors.model');
const sendEmail = async () => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_NAME,
            pass: process.env.EMAIL_PASSWORD
        }
    });
    const debtors = await Debtor.find({});
    for (let i in debtors) {
        //console.log(debtors[i]);
        if (debtors[i].status) {
            let date = new Date(debtors[i].date);
            let currentDate = new Date();
            console.log(date);
            let diffTime = (currentDate.getTime() - date.getTime()) / (1000 * 60 * 60);
            if (diffTime >= 2) {
                console.log(diffTime);
                //Get Variables from query string in the search bar
                const recipient = debtors[i].email;
                const topic = 'Tiền nợ';
                const text = 'Trả ' + debtors[i].money + ' đi bạn ơi';
                //Sendgrid Data Requirements
                const msg = {
                    to: recipient,
                    from: 'thanhvuaduongpho@gmail.com',
                    subject: topic,
                    text: text,
                }
                transporter.sendMail(msg, function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });
                console.log(msg);
            }
        }
    }
}
module.exports = sendEmail;