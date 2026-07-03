# SendGrid Setup Guide

## Quick Setup (5 minutes)

### 1. Create SendGrid Account
1. Go to https://signup.sendgrid.com/
2. Sign up for a **FREE** account (100 emails/day)
3. Verify your email address

### 2. Create API Key
1. Log in to SendGrid dashboard
2. Go to **Settings** → **API Keys** (https://app.sendgrid.com/settings/api_keys)
3. Click **Create API Key**
4. Name it: `Dirty Boyz Contact Form`
5. Choose **Full Access** (or just Mail Send if you prefer restricted)
6. Click **Create & View**
7. **COPY THE KEY** - you won't see it again!

### 3. Configure Your App
1. Open `.env` file in this project
2. Replace `SENDGRID_API_KEY=SG.your-api-key-here` with your actual key:
   ```
   SENDGRID_API_KEY=SG.your_actual_key_here_very_long_string
   ```
3. Update `EMAIL_FROM` if needed (use a domain you own or verify with SendGrid)
4. Update `EMAIL_TO` to the email where you want to receive contact form submissions

### 4. Verify Sender (Important!)
SendGrid requires sender verification:

**Option A: Single Sender Verification (Easiest)**
1. Go to https://app.sendgrid.com/settings/sender_auth/senders
2. Click **Create New Sender**
3. Fill in your details (use the email from `EMAIL_FROM` in .env)
4. Verify the email they send you

**Option B: Domain Authentication (Professional - Recommended)**
1. Go to https://app.sendgrid.com/settings/sender_auth
2. Click **Authenticate Your Domain**
3. Follow instructions to add DNS records to dirtyboyzsanitation.com
4. This makes emails more trustworthy and less likely to go to spam

### 5. Test It!
```bash
npm run dev
```
Go to http://localhost:49000/contact and submit the form!

## Production Setup

When deploying to production:

1. Create a separate `.env.production` file or set environment variables on your server
2. Make sure `NODE_ENV=production` is set
3. Update `EMAIL_FROM` to use your verified domain
4. Test the contact form on production

## Troubleshooting

### "Email service authentication failed"
- Check your API key is correct in `.env`
- Make sure there are no spaces or quotes around the key
- Verify the key has Mail Send permissions

### "Sender address not verified"
- Complete sender verification (see step 4 above)
- Use the same email you verified with SendGrid

### Emails going to spam
- Complete domain authentication (Option B in step 4)
- Make sure your domain has proper SPF/DKIM records
- Check SendGrid deliverability stats

### Still not working?
Check SendGrid Activity Feed:
https://app.sendgrid.com/email_activity

This shows all email attempts with detailed error messages.

## Free Tier Limits
- **100 emails per day**
- **3,000 emails per month**
- Plenty for a contact form!
- Upgrade if you need more

## Security Notes
- ✓ `.env` is in `.gitignore` (API key won't be committed)
- ✓ Never share your API key
- ✓ Use environment variables on production server
- ✓ Rotate key if accidentally exposed
