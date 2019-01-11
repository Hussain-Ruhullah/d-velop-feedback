
console.log("Service Worker Loaded...");

self.addEventListener("push", e => {
  const data = e.data.json();
  console.log("Push Recieved...");
  self.registration.showNotification(data.title, {
    body: "Notified by Hussain Ruhullah!",
    icon: "https://www.codia.de/codia/media/escpand-logo.png"
  });
});