const countElement = document.querySelector('#count');
const usersElement = document.querySelector('#users');
const statusElement = document.querySelector('#status');

const params = new URLSearchParams(window.location.search);
const channel = params.get('channel') || 'sarimoko';
const client = new tmi.Client({
  connection: {
    secure: true,
    reconnect: true,
  },
  channels: [channel],
});
	//identity: {
	//	username: 'sariboto',
	//	password: 'oauth:480i2mbv7zvfjz1t3wplj5di530p9r'
	//},

client.connect().then(() => {
  statusElement.textContent = `Connection to ${channel} successful, listening for messages...`;
});

let listeningForCount = false;
let users = {};

client.on('message', (wat, tags, message, self) => {
  if (self) return;
  const { username } = tags;
  if (username.toLowerCase() === channel.toLowerCase()) {
    if (message === '!startvote') {
      listeningForCount = true;
    }
	  else if (message === '!endvote') {
      listeningForCount = false;
      // say count out loud.
      const sayCount = new SpeechSynthesisUtterance(Object.keys(users).length);
      window.speechSynthesis.speak(sayCount);
    }
	  else if (message === '!clearvote') {
      countElement.textContent = 'Waiting for votes...';
      usersElement.textContent = '';
      users = {};
    }
  } else if (listeningForCount && message === '!vote') {
    users[tags.username] = true;
    // display current count page.
    countElement.textContent = Object.keys(users).length;
    usersElement.textContent = Object.keys(users).join(', ');
  }
});