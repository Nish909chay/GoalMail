# GoalMail

A simple web app to collect user goals and deadlines, and send reminder emails at 2 PM on the deadline day.

## Setup

1. **Firebase Project:**
   - Create a Firebase project.
   - Enable Firestore.
   - Set up Firebase Hosting.
   - Set up Cloud Functions.

2. **SendGrid:**
   - Create a SendGrid account and get an API key.
   - Add and verify your sender email/domain.

3. **Configure Functions:**
   - In the `functions` directory, run:
     ```powershell
     npm install
     ```
   - Set your SendGrid API key:
     ```powershell
     firebase functions:config:set sendgrid.key="YOUR_SENDGRID_API_KEY"
     ```

4. **Deploy:**
   - Deploy functions:
     ```powershell
     firebase deploy --only functions
     ```
   - Deploy hosting:
     ```powershell
     firebase deploy --only hosting
     ```

5. **Frontend:**
   - Add your Firebase config to `app.js`.

## Firestore Structure
- Collection: `goals`
  - Fields: `name`, `email`, `goal`, `deadline` (Timestamp), `submittedAt` (Timestamp), `emailed` (bool)

## Cloud Function
- Runs every 15 minutes, sends reminder at 2 PM local time for goals due today.

---
