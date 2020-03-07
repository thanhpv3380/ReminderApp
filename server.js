const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

const Debtor = require('./models/debtors.model');
const cron_job = require('./cron-job/cron_job');

const app = express();

app.use(express.static(path.join(__dirname, 'client/build')));


if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  //
  app.get('*', (req, res) => {
    res.sendfile(path.join(__dirname = 'client/build/index.html'));
  })
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/public/index.html'));
})

const port = process.env.PORT || 9000;

require('dotenv').config();
app.use(cors());

cron_job();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// connection db
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true}).then(db => console.log('DB is Connected'));

// // Welcome page of the express server: 
app.get('/', (req, res) => {
    res.send("Welcome to the Sendgrid Emailing Server"); 
});
app.post('/add', async (req, res) => {
    let response = await Debtor.create(req.body);
    console.log(response);
});
app.get('/getListDebtors', async (req, res) => {
    let debtors = await Debtor.find({});
    res.json(debtors);
});

app.listen(port, () => console.log('server start ' + port));
