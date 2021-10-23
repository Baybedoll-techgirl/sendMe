const mongoose = require('mongoose');

const VolunteerSchema = mongoose.Schema({
    email: String,
    name: String
})

const Volunteer = mongoose.model('Volunteer', VolunteerSchema);

module.exports = Volunteer;