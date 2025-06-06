// Replace with your Firebase config
const firebaseConfig = {
  // apiKey: "...",
  // authDomain: "...",
  // projectId: "...",
  // ...
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

document.getElementById('goalForm').onsubmit = async (e) => {
  e.preventDefault();
  const form = e.target;
  const data = {
    name: form.name.value,
    email: form.email.value,
    goal: form.goal.value,
    deadline: firebase.firestore.Timestamp.fromDate(new Date(form.deadline.value)),
    submittedAt: firebase.firestore.Timestamp.now(),
    emailed: false
  };
  await db.collection('goals').add(data);
  document.getElementById('msg').innerText = 'Goal submitted!';
  form.reset();
};
