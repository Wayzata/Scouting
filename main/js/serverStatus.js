// //Set up XMLRequest
// var serverStatusRequest = new XMLHttpRequest();
// // var nameRequest = new XMLHttpRequest();
// // var keyRequest = new XMLHttpRequest();


// var serverStatus;

// serverStatusRequest.onreadystatechange = function() {
//   if (this.readyState == 4 && this.status == 200) {
//     // Parse file
//     var serverRequest = JSON.parse(this.responseText);
//     //Check Server Status
//     if(serverRequest.is_datafeed_down == false) {
//         serverStatus = "Active";
//         document.getElementById('server-status').style.backgroundColor = "rgb(50, 168, 82)";
//     } else {
//         serverStatus = "Down"
//         document.getElementById('server-status').style.backgroundColor = "rgb(184, 26, 26)";
//     }
//     document.getElementById("server-status").innerHTML = serverStatus;
//   }
// };

// //Send Request
// serverStatusRequest.open("GET", "https://www.thebluealliance.com/api/v3/status", true);
// serverStatusRequest.setRequestHeader("X-TBA-Auth-Key", "lrqZK0XAvSpeHXuWi9vhbmnAbF4ueBRQB3OevJC1pOWIWQdwX1WKRJ4oQceP0ox5");
// serverStatusRequest.send();
