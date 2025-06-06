const functions = require('firebase-functions');
const admin = require('firebase-admin');
const sgMail = require('@sendgrid/mail');
const moment = require('moment-timezone');

admin.initializeApp();
const db = admin.firestore();

sgMail.setApiKey(process.env.SENDGRID_API_KEY || functions.config().sendgrid.key); // Use env var or Firebase config

const TIMEZONE = 'America/New_York'; // Change as needed
const SEND_HOUR = 14; // 2 PM

exports.scheduledGoalReminder = functions.pubsub
  .schedule('every 15 minutes')
  .timeZone(TIMEZONE)
  .onRun(async (context) => {
    const now = moment().tz(TIMEZONE);
    if (now.hour() !== SEND_HOUR) return null; // Only run at 2 PM

    const today = now.startOf('day');
    const tomorrow = moment(today).add(1, 'day');

    const snapshot = await db.collection('goals')
      .where('deadline', '>=', admin.firestore.Timestamp.fromDate(today.toDate()))
      .where('deadline', '<', admin.firestore.Timestamp.fromDate(tomorrow.toDate()))
      .where('emailed', '==', false)
      .get();

    const updates = [];
    for (const doc of snapshot.docs) {
      const data = doc.data();
      const msg = {
        to: data.email,
        from: 'noreply@yourdomain.com', // Use a verified sender
        subject: 'Goal Reminder',
        text: `Hi ${data.name},\n\nThis is a reminder for your goal: "${data.goal}" due on ${data.deadline.toDate().toLocaleDateString()}.\n\nGood luck!\n\n(Do not reply to this email)`,
      };
      await sgMail.send(msg);
      updates.push(doc.ref.update({ emailed: true }));
    }
    await Promise.all(updates);
    return null;
  });
