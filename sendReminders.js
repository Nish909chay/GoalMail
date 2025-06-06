const {Firestore} = require('@google-cloud/firestore');
const sgMail = require('@sendgrid/mail');
const moment = require('moment-timezone');

// Load environment variables
require('dotenv').config();

const firestore = new Firestore({
  projectId: process.env.FIREBASE_PROJECT_ID,
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
});

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const TIMEZONE = 'America/New_York'; // Change as needed
const SEND_HOUR = 14; // 2 PM

async function sendReminders() {
  const now = moment().tz(TIMEZONE);
  if (now.hour() !== SEND_HOUR) {
    console.log('Not 2 PM, exiting.');
    return;
  }
  const today = now.startOf('day');
  const tomorrow = moment(today).add(1, 'day');

  const goalsRef = firestore.collection('goals');
  const snapshot = await goalsRef
    .where('deadline', '>=', today.toDate())
    .where('deadline', '<', tomorrow.toDate())
    .where('emailed', '==', false)
    .get();

  if (snapshot.empty) {
    console.log('No reminders to send.');
    return;
  }

  for (const doc of snapshot.docs) {
    const data = doc.data();
    const msg = {
      to: data.email,
      from: 'noreply@yourdomain.com', // Use a verified sender
      subject: 'Goal Reminder',
      text: `Hi ${data.name},\n\nThis is a reminder for your goal: "${data.goal}" due on ${data.deadline.toDate().toLocaleDateString()}.\n\nGood luck!\n\n(Do not reply to this email)`,
    };
    try {
      await sgMail.send(msg);
      await doc.ref.update({ emailed: true });
      console.log(`Reminder sent to ${data.email}`);
    } catch (err) {
      console.error(`Failed to send to ${data.email}:`, err);
    }
  }
}

sendReminders();
