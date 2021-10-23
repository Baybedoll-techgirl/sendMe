const router = require("express").Router();
const Event = require("../Models/Event");
const moment = require("moment");

//Routes
router.post("/create-event", async (req, res) => {
  const event = Event(req.body);
  await event.save();
  res.sendStatus(201);
});

function checkVolunteers(volunteers, volunteer_id) {
  let proceed = true;
  volunteers.forEach((item) => {
    if (item && item == volunteer_id) proceed = false;
  });
  return proceed;
}

router.put("/log-volunteer/:id", async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!checkVolunteers(event.volunteers, req.body.volunteer_id)) {
    return res.json({success: false, msg: "Already assigned to event" });
  }

  event.volunteers.push(req.body.volunteer_id);
  await event.save();
  res.json({ success: true, event });
});

router.put("/remove-volunteer/:id", async (req, res) => {
    const event = await Event.findById(req.params.id);

    const filteredVolunteer = event.volunteers.filter((i => i._id != req.body.volunteer_id))
    event.volunteers = filteredVolunteer
    await event.save()
    res.json({event})
})

router.get("/get-events", async (req, res) => {
  const event = await Event.find({
    start: { $gte: moment(req.query.start).toDate() },
    end: { $lte: moment(req.query.end).toDate() },
  });

  res.send(event);
});

//get all events on a location
router.get("/events/:location", async (req, res) => {
    const events = await Event.find({location: req.params.location})

    res.json({events})
})

//get all events for specific user
router.get("/logged-events/:user_id", async (req, res) => {
  const events = await Event.find({
    volunteers: req.params.user_id,
  })
  res.json({ events });
});

module.exports = router;
