const mongoose = require('mongoose');

const debtorSchema = new mongoose.Schema({
    name: String,
    money: Number,
    date: Date,
    email: String,
    status: Boolean
});
var Debtor = mongoose.model('debtors', debtorSchema);
module.exports = Debtor;
