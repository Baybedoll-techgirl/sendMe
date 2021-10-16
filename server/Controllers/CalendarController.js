const router = require('express').Router();
const Event = require('../Models/Event');
const moment = require('moment')

//Routes
router.post("/create-event", async (req, res) => {
    const event = Event(req.body);
    await event.save()
    res.sendStatus(201);
})

router.get("/get-events", async (req, res) => {
    const event = await Event.find({
        start:{$gte: moment(req.query.start).toDate() }, 
        end: {$lte: moment(req.query.end).toDate() },
     })
    
    res.send(event);
})
router.get('/locations/:id', (req, res) => {
    console.log(req.params.id)
})

module.exports = router;
