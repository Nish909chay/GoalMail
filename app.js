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

  // Show acknowledgement with formatted deadline
  const formattedDeadline = flatpickr.formatDate(new Date(data.deadline), 'F j, Y');
  showAcknowledgement(formattedDeadline);
};

// After successful submission, show a gold-themed acknowledgement
function showAcknowledgement(deadline) {
  const ack = document.createElement('div');
  ack.className = 'fixed inset-0 flex items-center justify-center z-50';
  ack.innerHTML = `
    <div class="bg-gradient-to-br from-black/80 to-gray-900/90 border border-yellow-400 rounded-2xl shadow-2xl p-8 max-w-sm mx-auto glassmorphism text-center animate-fade-in">
      <svg class="mx-auto mb-4" width="48" height="48" fill="none" stroke="#FFD700" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M8 12l2.5 2.5L16 9"/></svg>
      <h2 class="text-2xl font-bold text-yellow-400 mb-2">Goal Set!</h2>
      <p class="text-gray-200 mb-2">Your deadline is set for</p>
      <p class="text-lg font-semibold text-yellow-300 mb-4">${deadline}</p>
      <div class="flex flex-col gap-2">
        <button id="ack-close" class="px-6 py-2 rounded-lg bg-yellow-400 text-gray-900 font-bold shadow-lg hover:bg-yellow-300 transition">OK</button>
        <button id="ack-more" class="px-6 py-2 rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-600 text-gray-900 font-bold shadow-lg hover:from-yellow-300 hover:to-yellow-500 transition">Set More Deadlines</button>
      </div>
    </div>
  `;
  document.body.appendChild(ack);
  document.getElementById('ack-close').onclick = () => ack.remove();
  document.getElementById('ack-more').onclick = () => window.location.reload();
}
