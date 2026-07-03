/**
 * One-time Admin User Setup Script
 * -----------------------------------
 * Run this once to create the Firebase admin user.
 * Reads credentials from .env — credentials are NEVER exposed to the browser.
 *
 * Usage:
 *   node scripts/create-admin.js
 *
 * Required .env vars:
 *   ADMIN_EMAIL           — e.g. admin@dirtyboyz.com
 *   ADMIN_PASSWORD        — strong password (remove from .env after running)
 *   FIREBASE_SERVICE_ACCOUNT — path to your service account JSON file
 *                              e.g. ./firebase-service-account.json
 *
 * How to get a service account key:
 *   Firebase Console → Project Settings → Service accounts → Generate new private key
 *   Save the downloaded JSON as firebase-service-account.json in the project root
 *   (it's already in .gitignore — do NOT commit it)
 */

'use strict'

const path = require('path')
require('dotenv').config()

const { ADMIN_EMAIL, ADMIN_PASSWORD, FIREBASE_SERVICE_ACCOUNT } = process.env

// Validate env vars
if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
  console.error('\n❌  ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env\n')
  process.exit(1)
}

if (!FIREBASE_SERVICE_ACCOUNT) {
  console.error('\n❌  FIREBASE_SERVICE_ACCOUNT path must be set in .env\n')
  console.error('    e.g. FIREBASE_SERVICE_ACCOUNT=./firebase-service-account.json\n')
  process.exit(1)
}

let serviceAccount
try {
  serviceAccount = require(path.resolve(FIREBASE_SERVICE_ACCOUNT))
} catch (e) {
  console.error(`\n❌  Could not load service account from: ${FIREBASE_SERVICE_ACCOUNT}`)
  console.error('    Make sure the file exists and the path in .env is correct.\n')
  process.exit(1)
}

let initializeApp, cert, getAuth
try {
  ;({ initializeApp, cert } = require('firebase-admin/app'))
  ;({ getAuth } = require('firebase-admin/auth'))
} catch (e) {
  console.error('\n❌  firebase-admin is not installed.')
  console.error('    Run: npm install --save-dev firebase-admin\n')
  process.exit(1)
}

initializeApp({ credential: cert(serviceAccount) })

async function run() {
  try {
    const user = await getAuth().createUser({
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      displayName: 'Admin'
    })

    console.log('\n✅  Admin user created successfully!')
    console.log(`    UID:   ${user.uid}`)
    console.log(`    Email: ${user.email}`)
    console.log('\n👉  You can now log in at /admin with these credentials.')
    console.log('⚠️   Remove ADMIN_PASSWORD from your .env file now — it is no longer needed.\n')
  } catch (error) {
    if (error.code === 'auth/email-already-exists') {
      console.log('\nℹ️   A user with that email already exists in Firebase.')
      console.log('    If you need to reset the password, use the Firebase Console.\n')
    } else {
      console.error('\n❌  Error creating admin user:', error.message, '\n')
    }
  }

  process.exit(0)
}

run()
