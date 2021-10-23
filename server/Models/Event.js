const mongoose = require('mongoose');
const Volunteer = require('./Volunteers');

const EventSchema = mongoose.Schema({
    start: Date,
    end: Date,
    title: String,
    location: String,
    volunteers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: Volunteer
        }
    ]
})

const Event = mongoose.model('Event', EventSchema);

module.exports = Event;