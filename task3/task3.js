const wsUri = 'wss://echo-ws-service.herokuapp.com';

const sendButton = document.querySelector('.send-message');
const locationButton = document.querySelector('.send-location');

let socket;

socket = new WebSocket(wsUri);
socket.onopen = function (evt) {};

function outputMessage(message) {
  let pre = document.createElement("p");
  pre.style = "break-word";
  pre.innerHTML = message;
  output.appendChild(pre);
};

sendButton.addEventListener('click', e => {
    const input = document.querySelector('.message').value;
    const message = input;
    outputMessage("Отправитель: " + message);
    socket.send(message);
  
    socket.onmessage = function (evt) {
      outputMessage(
         '<span>Сервер: ' + evt.data + '</span>'
      );
   };
   socket.onerror = function (evt) {
      outputMessage(
         '<span style="color: red;">ERROR:</span> ' + evt.data
      );
   };
  });

locationButton.addEventListener("click", checkGeolocation);
    const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    let link = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    addLink(link);
  };
  
function addLink(link) {
  let linkHTML = `<a href="${link}">Your geo-location</a>`;
  outputMessage(linkHTML);
};

function checkGeolocation() {
	 if ("geolocation" in navigator){  
		navigator.geolocation.getCurrentPosition( (position) => {
			const { coords } = position;
			success(position);
			console.log(coords.latitude, coords.longitude);
		});
}};

  socket.addEventListener('open', () => {
  console.log('Connected to server.');
});