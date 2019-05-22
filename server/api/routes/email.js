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

  if (reqArr.length == 6) {
    valid = true
  }

  if (valid) {
    const email = {
      name: req.body.name,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip,
      msg: req.body.msg
    }
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'cjb9252@gmail.com',
        pass: 'Midnight1995!'
      }
    })
    let ContactMailOptions = {
      from: '"Dirty Boyz Contact Form"',
      to: 'cjb9252@gmail.com', // `${req.body.dynRecip}`
      subject: 'Dirty Boyz Contact Form',
      html: `
      <div style="background-color: #F5F5F5;">
      <h2 style="text-align: center;">Sender Message:</h2>
      <h4 style="text-align:center;">${email.name} said: ${
        email.msg
      }</h4><br><br>
      <h2 style="color: red;">Sender Info:</h2>
        <p>Name: ${email.name}</p>
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
    res.status(201).send('Message has been sent')
  } else {
    let err = 'Cannot Send message. Form is not complete'
    console.log(err)
    res.send(err)
  }
})

module.exports = router
