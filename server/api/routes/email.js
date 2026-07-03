const express = require('express')
const sgMail = require('@sendgrid/mail')
const { contactFormTemplate } = require('../templates/emailTemplates')

const router = express.Router()

// Validate required fields
const validateContactForm = (body) => {
  const requiredFields = ['name', 'mail', 'phone', 'address', 'city', 'state', 'zip', 'msg']
  const missing = []
  
  for (const field of requiredFields) {
    if (!body[field] || body[field].toString().trim() === '') {
      missing.push(field)
    }
  }
  
  return {
    valid: missing.length === 0,
    missing
  }
}

// Initialize SendGrid
const initializeSendGrid = () => {
  const apiKey = process.env.SENDGRID_API_KEY
  
  if (!apiKey || apiKey === 'SG.your-api-key-here') {
    throw new Error('SendGrid API key not configured. Check your .env file and get your key from https://app.sendgrid.com/settings/api_keys')
  }
  
  sgMail.setApiKey(apiKey)
  return true
}

// Send Contact Email
router.post('/send', async (req, res) => {
  try {
    // Initialize SendGrid
    initializeSendGrid()
    
    // Validate form data
    const validation = validateContactForm(req.body)
    
    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields',
        missing: validation.missing
      })
    }
    
    // Sanitize and prepare email data
    const emailData = {
      name: req.body.name.toString().trim(),
      mail: req.body.mail.toString().trim(),
      phone: req.body.phone.toString().trim(),
      address: req.body.address.toString().trim(),
      city: req.body.city.toString().trim(),
      state: req.body.state.toString().trim(),
      zip: req.body.zip.toString().trim(),
      msg: req.body.msg.toString().trim()
    }
    
    // Email message with custom template
    const msg = {
      to: process.env.EMAIL_TO || 'dbsanitation@hotmail.com',
      from: process.env.EMAIL_FROM || 'noreply@dirtyboyzsanitation.com',
      subject: `New Contact Form: ${emailData.name}`,
      html: contactFormTemplate(emailData),
      // Fallback plain text
      text: `
New Contact Form Submission

Message: ${emailData.msg}

Contact Information:
Name: ${emailData.name}
Email: ${emailData.mail}
Phone: ${emailData.phone}
Address: ${emailData.address}
City: ${emailData.city}
State: ${emailData.state}
ZIP: ${emailData.zip}
      `
    }
    
    // Send email via SendGrid
    const [response] = await sgMail.send(msg)
    
    console.log('✓ Email sent successfully via SendGrid')
    console.log('  Status:', response.statusCode)
    console.log('  To:', msg.to)
    
    res.status(200).json({
      success: true,
      message: 'Your message has been sent successfully!'
    })
    
  } catch (error) {
    console.error('✗ Email send error:', error)
    
    // SendGrid specific error handling
    let errorMessage = 'Failed to send email'
    let statusCode = 500
    
    if (error.code === 401 || error.code === 403) {
      errorMessage = 'Email service authentication failed'
      statusCode = 503
    } else if (error.response) {
      console.error('  SendGrid Error:', error.response.body)
    }
    
    res.status(statusCode).json({
      success: false,
      error: errorMessage,
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    })
  }
})

module.exports = router
