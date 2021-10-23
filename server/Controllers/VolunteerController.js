const Volunteer = require("../Models/Volunteers")

const router = require("express").Router()

router.post("/create", async (req, res) => {
    try {
        const volunteer = await Volunteer.create(req.body)
        res.status(200).json({volunteer})
    } catch (error) {
        res.status(500).json({error})
    }
})

router.post("/login", async (req, res) => {
    try {
        const foundVolunteer = await Volunteer.findOne({ email: req.body.email})
        if(!foundVolunteer) res.json({msg: "User does not exist"})
        res.status(200).json({volunteer: foundVolunteer})
    } catch (error) {
        res.status(500).json({error})
    }
})

module.exports = router