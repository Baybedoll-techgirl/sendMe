require("dotenv").config();
const stripe = require('stripe')(process.env.STRIPE_KEY)
const express = require ('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')


const app = express();
app.use(express.json());

//Database Connection
mongoose.connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
mongoose.connection.on('connected', () =>{
    console.log('Mongoose is connected')
})


app.use('/api/calendar', require('./Controllers/CalendarController'));

app.post("/payment",  (req, res) => {
    const body ={
        source: req.body.token.id,
        amount: req.body.amount,
        currency: "usd"
    }

    stripe.charges.create(body, (stripeErr, stripeRes) => {
        if (stripeErr) {
          console.log("THERE WAS AN ERROR:::", stripeErr)
          res.status(500).send({ error: stripeErr });
        } else {
          res.status(200).send({ success: stripeRes });
        }
      });
})

app.listen(5000, () => console.log('Server started'))
