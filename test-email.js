/**
 * Test script for SendGrid email functionality
 * Run with: node test-email.js
 */

require('dotenv').config()
const sgMail = require('@sendgrid/mail')

// Initialize SendGrid
const apiKey = process.env.SENDGRID_API_KEY

if (!apiKey || apiKey.includes('your-api-key-here')) {
  console.error('❌ SendGrid API key not configured in .env file')
  process.exit(1)
}

sgMail.setApiKey(apiKey)

// Test email data
const testData = {
  name: 'Test User',
  mail: 'test@example.com',
  phone: '(307) 555-1234',
  address: '123 Test St',
  city: 'Rawlins',
  state: 'WY',
  zip: '82301',
  msg: 'This is a test message from the Dirty Boyz contact form. If you receive this, the email system is working correctly!'
}

// Simple HTML template for test
const testTemplate = (data) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Test Email</title>
</head>
<body style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
  <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 20px; border-radius: 8px;">
    <h1 style="color: #34221a; border-bottom: 2px solid #34221a; padding-bottom: 10px;">
      🧪 Test Email - Dirty Boyz Sanitation
    </h1>
    
    <div style="background-color: #e8f5e9; padding: 15px; border-radius: 4px; margin: 20px 0;">
      <h2 style="color: #2e7d32; margin-top: 0;">✓ Email System Working!</h2>
      <p style="margin: 0;">If you're reading this, your SendGrid integration is configured correctly.</p>
    </div>
    
    <h3 style="color: #d32f2f;">Test Message:</h3>
    <p style="background-color: #fafafa; padding: 15px; border-left: 4px solid #34221a;">${data.msg}</p>
    
    <h3 style="color: #555;">Test Contact Info:</h3>
    <table style="width: 100%; border-collapse: collapse;">
      <tr><td style="padding: 8px; font-weight: bold;">Name:</td><td style="padding: 8px;">${data.name}</td></tr>
      <tr style="background-color: #f9f9f9;"><td style="padding: 8px; font-weight: bold;">Email:</td><td style="padding: 8px;">${data.mail}</td></tr>
      <tr><td style="padding: 8px; font-weight: bold;">Phone:</td><td style="padding: 8px;">${data.phone}</td></tr>
      <tr style="background-color: #f9f9f9;"><td style="padding: 8px; font-weight: bold;">Address:</td><td style="padding: 8px;">${data.address}</td></tr>
      <tr><td style="padding: 8px; font-weight: bold;">City:</td><td style="padding: 8px;">${data.city}</td></tr>
      <tr style="background-color: #f9f9f9;"><td style="padding: 8px; font-weight: bold;">State:</td><td style="padding: 8px;">${data.state}</td></tr>
      <tr><td style="padding: 8px; font-weight: bold;">ZIP:</td><td style="padding: 8px;">${data.zip}</td></tr>
    </table>
    
    <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
    
    <p style="color: #777; font-size: 14px; text-align: center;">
      Test sent at ${new Date().toLocaleString('en-US', { timeZone: 'America/Denver' })}
    </p>
  </div>
</body>
</html>
`

// Send test email
async function sendTestEmail() {
  console.log('🚀 Sending test email...\n')
  console.log(`📧 From: ${process.env.EMAIL_FROM}`)
  console.log(`📬 To: ${process.env.EMAIL_TO}\n`)
  
  const msg = {
    to: process.env.EMAIL_TO,
    from: process.env.EMAIL_FROM,
    subject: '🧪 Test Email - Dirty Boyz Contact Form',
    html: testTemplate(testData),
    text: `
TEST EMAIL - Dirty Boyz Sanitation

If you receive this email, your SendGrid integration is working correctly!

Test Message: ${testData.msg}

Test Contact Info:
Name: ${testData.name}
Email: ${testData.mail}
Phone: ${testData.phone}
Address: ${testData.address}
City: ${testData.city}
State: ${testData.state}
ZIP: ${testData.zip}

Test sent at ${new Date().toLocaleString()}
    `
  }
  
  try {
    const [response] = await sgMail.send(msg)
    console.log('✅ SUCCESS! Email sent successfully!\n')
    console.log(`   Status: ${response.statusCode}`)
    console.log(`   To: ${msg.to}`)
    console.log('\n📨 Check your inbox at:', msg.to)
    console.log('   (Check spam folder if you don\'t see it)\n')
  } catch (error) {
    console.error('❌ FAILED to send email\n')
    
    if (error.response) {
      console.error('Error details:', error.response.body)
      
      if (error.code === 401 || error.code === 403) {
        console.error('\n🔑 Authentication Error:')
        console.error('   - Check your API key in .env file')
        console.error('   - Make sure it has Mail Send permissions')
        console.error('   - Get a new key at: https://app.sendgrid.com/settings/api_keys')
      }
    } else {
      console.error('Error:', error.message)
    }
    
    process.exit(1)
  }
}

// Run the test
sendTestEmail()
