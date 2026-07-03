/**
 * Email templates for Dirty Boyz Sanitation
 */

const contactFormTemplate = (data) => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Contact Form Submission</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f5f5f5; padding: 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background-color: #34221a; padding: 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px;">Dirty Boyz Sanitation</h1>
              <p style="margin: 10px 0 0 0; color: #e0e0e0; font-size: 16px;">New Contact Form Submission</p>
            </td>
          </tr>
          
          <!-- Message Section -->
          <tr>
            <td style="padding: 30px; background-color: #fafafa; border-bottom: 3px solid #34221a;">
              <h2 style="margin: 0 0 15px 0; color: #34221a; font-size: 20px;">Customer Message:</h2>
              <div style="background-color: #ffffff; padding: 20px; border-left: 4px solid #34221a; border-radius: 4px; margin-top: 15px;">
                <p style="margin: 0; font-size: 16px; line-height: 1.6; color: #333333;">${data.msg}</p>
              </div>
            </td>
          </tr>
          
          <!-- Contact Information -->
          <tr>
            <td style="padding: 30px;">
              <h2 style="margin: 0 0 20px 0; color: #d32f2f; font-size: 20px; border-bottom: 2px solid #d32f2f; padding-bottom: 10px;">Customer Information:</h2>
              <table width="100%" cellpadding="8" cellspacing="0" border="0">
                <tr>
                  <td width="120" style="font-weight: bold; color: #555555; vertical-align: top;">Name:</td>
                  <td style="color: #333333;">${data.name}</td>
                </tr>
                <tr style="background-color: #f9f9f9;">
                  <td style="font-weight: bold; color: #555555; vertical-align: top;">Email:</td>
                  <td style="color: #333333;"><a href="mailto:${data.mail}" style="color: #1976d2; text-decoration: none;">${data.mail}</a></td>
                </tr>
                <tr>
                  <td style="font-weight: bold; color: #555555; vertical-align: top;">Phone:</td>
                  <td style="color: #333333;"><a href="tel:${data.phone}" style="color: #1976d2; text-decoration: none;">${data.phone}</a></td>
                </tr>
                <tr style="background-color: #f9f9f9;">
                  <td style="font-weight: bold; color: #555555; vertical-align: top;">Address:</td>
                  <td style="color: #333333;">${data.address}</td>
                </tr>
                <tr>
                  <td style="font-weight: bold; color: #555555; vertical-align: top;">City:</td>
                  <td style="color: #333333;">${data.city}</td>
                </tr>
                <tr style="background-color: #f9f9f9;">
                  <td style="font-weight: bold; color: #555555; vertical-align: top;">State:</td>
                  <td style="color: #333333;">${data.state}</td>
                </tr>
                <tr>
                  <td style="font-weight: bold; color: #555555; vertical-align: top;">ZIP Code:</td>
                  <td style="color: #333333;">${data.zip}</td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f5f5f5; padding: 20px; text-align: center;">
              <p style="margin: 0; color: #777777; font-size: 14px;">
                This email was sent from the Dirty Boyz Sanitation contact form<br>
                <span style="color: #999999; font-size: 12px;">Received on ${new Date().toLocaleString('en-US', { timeZone: 'America/Denver' })}</span>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `
}

module.exports = {
  contactFormTemplate
}
