const express = require('express')
const nodemailer = require('nodemailer')

const router = express.Router()

// Send Contact Email
router.post('/send', (req, res) => {
  // quick and simple post validation haha
  let reqArr = []
  let valid = false

  Object.keys(req.body).forEach(item => {
    reqArr.push(item)
  })

  if (reqArr.length == 8) {
    valid = true
  }

  if (valid) {
    const email = {
      name: req.body.name,
      mail: req.body.mail,
      phone: req.body.phone,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip,
      msg: req.body.msg
    }
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      secure: false, // use SSL,
      auth: {
        user: 'dboyzsanitation@gmail.com',
        pass: 'qrwganrylcjmvvxf'
      }
    })
    let ContactMailOptions = {
      from: '"Dirty Boyz Contact Form"',
      to: 'dbsanitation@hotmail.com',
      subject: 'Dirty Boyz Contact Form',
      html: `
      <div style="background-color: #F5F5F5;">
      <h2 style="text-align: center;">Sender Message:</h2>
      <h4 style="text-align:center;">${email.name} said:</h4>
      <p style="text-align:center;font-size:20px;">${email.msg}</p>
      <br>
      <h2 style="color: red;">Sender Info:</h2>
        <p>Name: ${email.name}</p>
        <p>Email: ${email.mail}</p>
        <p>Phone: ${email.phone}</p>
        <p>Address: ${email.address}</p>
        <p>City: ${email.city}</p>
        <p>State: ${email.state}</p>
        <p>Zip: ${email.zip}</p>
      </div>
      `
    }
    transporter.sendMail(ContactMailOptions, (error, info) => {
      if (error) {
        return console.log(error)
      }
      console.log('Message sent: %s', info.messageId)
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
    })
    console.log(res.status)
    res.status(201).send('Message has been sent')
  } else {
    let err = 'Cannot Send message. Form is not complete'
    console.log(err)
    res.send(err)
  }
})

module.exports = router
