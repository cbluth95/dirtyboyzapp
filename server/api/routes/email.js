const express = require('express')
const nodemailer = require('nodemailer')

const router = express.Router()

// Send Contact Email
router.post('/send', (req, res) => {
  console.log(req.body)
  if (req.body.valid) {
    const email = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
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
      from: '"The Movies Contact Form" <contact@themovies3.com>',
      to: 'cjb9252@gmail.com', // `${req.body.dynRecip}`
      subject: 'New message from test contact form!',
      html: `
              <p>${email.name} said: ${email.msg}</p><br><br>
                <p>Sender Info:</p>
                <p>Name: ${email.name}</p>
                <p>Email: ${email.email}</p>
                <p>Phone Number: <a href="tel:${email.phone}">${
        email.phone
      }</a></p>`
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
