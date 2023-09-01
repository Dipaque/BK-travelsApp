const express = require("express");
const nodemailer = require("nodemailer");
const app = express();
const port = process.env.PORT || 3000;
app.use(express.static('public'));
app.use(express.json())
// Serve the HTML form
app.get("/", (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});
app.post('/',(req,res)=>{
console.log(req.body);
const transporter = nodemailer.createTransport({
  service:'gmail', // e.g., 'Gmail'
    auth: {
        user: "bktravels759@gmail.com",
        pass: "wocitadohygqzdqo"
    }
});

const mailOptions = {
    from: "bktravels759@gmail.com",
    to: req.body.to,
    subject: "Booking Confirmation",
    text: `Dear ${req.body.name},${req.body.msg}`
};

const bookingMail={
    from : req.body.to,
    to:"bktravels759@gmail.com",
    subject:"New booking placed",
    text:`name:${req.body.name},email:${req.body.to},service:${req.body.service}`
}

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log("Error sending email:", error);
        
    } else {
        console.log("Email sent:", info.response);
    }
});

transporter.sendMail(bookingMail, (error, info) => {
    if (error) {
        console.log("Error sending email:", error);
        
    } else {
        console.log("Email sent:", info.response);
    }
});
})
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});