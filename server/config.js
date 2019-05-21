const config = {
  transporter: {
    service: 'SERVICE',
    port: 000,
    secure: 'SECURE_BOOL',
    auth: {
      user: 'SENDER_EMAIL',
      pass: 'SENDER_PASSWORD'
    },
    tls: {
      rejectUnauthorized: false
    }
  },
  sendTo: 'RECEIVER_EMAIL',
  subject: 'SUBJECT'
}

module.exports = config
