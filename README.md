# GoalMail

## 🛠 Project Overview
GoalMail is a premium web app that lets users submit short-term goals with a deadline. On the selected deadline date, users automatically receive a reminder email at exactly 2:00 PM (local time). The app features a modern, glassy, gold-accented dark UI for a luxurious experience.

**Features:**
- Simple form for submitting goals (name, email, goal, deadline)
- Data stored securely in Firebase Firestore
- Automated email reminders sent at 2 PM on the deadline day
- Scheduled backend using GitHub Actions (or Firebase Cloud Functions)
- Responsive, gold-themed, glassmorphic UI with 3D/tilt effects

---

## 🔧 Backend

### Firestore Schema
- **Collection:** `goals`
- **Fields:**
  - `name` (string): User's name
  - `email` (string): User's email address
  - `goal` (string): The goal description
  - `deadline` (timestamp): Deadline date
  - `submittedAt` (timestamp): Submission time
  - `emailed` (boolean): Whether the reminder email was sent

### Scheduled Email Reminders
- **Script:** `sendReminders.js` (Node.js)
- **Scheduling:**
  - Uses GitHub Actions (free tier) to run the script daily at 2 PM (or Firebase Cloud Functions with scheduler if preferred)
- **Logic:**
  - Queries Firestore for goals with today's deadline and `emailed: false`
  - Sends reminder emails via SendGrid (or SMTP)
  - Marks `emailed: true` to prevent duplicate emails
  - Handles timezones to ensure reminders are sent at 2 PM local time

### Email Delivery
- **Provider:** SendGrid (API key required)
- **Template:** Simple, customizable reminder email
- **Spam Handling:** Uses verified sender domains and proper headers

---

## 🎨 Frontend

- **Tech:** HTML, CSS, JavaScript (with Tailwind CSS, vanilla-tilt.js, AOS.js, flatpickr)
- **Form Layout:**
  - Name, Email, Goal, Deadline (animated date picker)
  - Strong input validation (email regex, required fields)
- **UI:**
  - Dark mode, glassmorphic, gold-accented, 3D/tilt effects
  - Responsive and accessible
- **Libraries:**
  - [Tailwind CSS](https://tailwindcss.com/)
  - [vanilla-tilt.js](https://micku7zu.github.io/vanilla-tilt.js/)
  - [AOS.js](https://michalsnik.github.io/aos/)
  - [flatpickr](https://flatpickr.js.org/)

---

## ☁️ Firebase Integration

- **Hosting:**
  - Static site deployed via Firebase Hosting
- **Firestore:**
  - NoSQL database for storing goals
- **Cloud Functions / GitHub Actions:**
  - Scheduled backend for email reminders
- **Setup & Deployment:**
  1. Create a Firebase project, enable Firestore & Hosting
  2. Add your Firebase config to `app.js`
  3. Set up SendGrid and add your API key
  4. Deploy with:
     ```powershell
     firebase deploy --only hosting
     ```
  5. Schedule the reminder script with GitHub Actions or Firebase Scheduler

---

## 🧪 Problems Faced & Solutions

- **Timezone Alignment:**
  - Used server-side logic to ensure reminders are sent at 2 PM in the user's local timezone
- **Email Deliverability:**
  - Verified sender domains, used SendGrid best practices
- **Styling Consistency:**
  - Used Tailwind and custom CSS for cross-browser consistency
  ### Libraries Used

  - [Tailwind CSS](https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css)
  - [flatpickr](https://cdn.jsdelivr.net/npm/flatpickr)
  - [vanilla-tilt.js](https://cdn.jsdelivr.net/npm/vanilla-tilt)
  - [AOS.js](https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.js)
  - **Deployment Sync:**
   - used `firebase deploy --only hosting` for updates

---

## 🔗 GitHub Usage

- **Version Control:**
  - All code managed in GitHub
- **Branching:**
  - Use feature branches for new features/fixes
- **Commits:**
  - Write clear, descriptive commit messages
- **Deployment Triggers:**
  - GitHub Actions for scheduled backend tasks
- **Collaboration:**
  - Use issues and pull requests for team collaboration

---

## 🚀 How to Run This Project

1. **Clone the repository:**
   ```powershell
   git clone https://github.com/Nish909chay/GoalMail.git
   cd GoalMail
   ```
2. **Install dependencies for backend (if using functions):**
   ```powershell
   cd functions
   npm install
   ```
3. **Firebase setup:**
   - Create a Firebase project
   - Enable Firestore & Hosting
   - Add your Firebase config to `app.js`
4. **SendGrid setup:**
   - Create a SendGrid account
   - Get your API key and set it in your environment/config
5. **Deploy:**
   ```powershell
   firebase deploy --only hosting
   ```
6. **Schedule reminders:**
   - Use GitHub Actions (see `.github/workflows/goal-reminder.yml`) or Firebase Scheduler
7. **Local testing:**
   - Open `index.html` in your browser for frontend testing
   - Use `firebase emulators:start` for local backend testing (optional)

---

## 📬 Future Improvements

- User dashboard to view/manage goals
- Mark goals as completed
- Multi-language support
- Advanced, branded email templates
- Admin panel for analytics

---


