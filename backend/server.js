const mongoose =require('mongoose')
const express = require('express')
const app = express()
const cors = require('cors')

const{ MailerSend, Sender, Recipient, EmailParams } = require("mailersend");


const corsfront={
    origin:["https://trymail.vercel.app"],
    credentials:true
}

app.use(cors(corsfront))



app.use(express.json())

app.listen(9000,()=>{
    console.log("server is running ")
})


require('dotenv').config()

const mailerSend = new MailerSend({
    apiKey: process.env.mailtoken,
});


//mailersend api

app.post('/api/nodemail', async (req, res) => {

    console.log("mailersend api hit")
    const email = req.body.email
    const name = "user"
    console.log(email, "email from api")

    const sentFrom = new Sender(process.env.maileremail || "no-reply@yourdomain.com", "Municipal Services");
    const recipients = [
        new Recipient(email, name)
    ];

    const emailParams = new EmailParams()
        .setFrom(sentFrom)
        .setTo(recipients)
        .setSubject("Regarding your complaint")
        .setText("Thanks for contacting us, we have received your complaint and will get back to you soon")
        .setHtml(`<h1>Hi ${name} </h1>   <h3> Sorry for the problem You are facing.</h3><p>We have received your complaint and will Resolve your problem as soon as possible. </p>`);

    try {
        const result = await mailerSend.email.send(emailParams);
        console.log(result, "result from mailersend")
        res.send({ statuscode: 1, message: "Email sent Succesfully" })
    } catch (error) {
        console.log(error, "error from mailersend")
        res.send({ statuscode: 0, message: "Error ocuured while Sending mail" })
    }

})

