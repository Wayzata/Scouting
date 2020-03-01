// Declaring requests
var eteamRequest = new XMLHttpRequest();
let eNameRequest = new XMLHttpRequest();

// Global Variables
var eKeyArray = [];
var eNameArray = [];
var na = [];
var p;
var c;
var eNameRequestObj
var currentEventKey;
var currentEventNum;
var b;
var teamNumArray = [];
var dummyEventArray = [];
// var Table = document.getElementById("list-items");

// To work on IOS
$("#prospects_form").submit(function(e) {
    e.preventDefault();
});


// Gets Event Names, adds them to the HTML form
function geteName() {

eNameRequest.open('GET', "https://www.thebluealliance.com/api/v3/events/2020", true);
eNameRequest.setRequestHeader("X-TBA-Auth-Key", "lrqZK0XAvSpeHXuWi9vhbmnAbF4ueBRQB3OevJC1pOWIWQdwX1WKRJ4oQceP0ox5");
eNameRequest.send();

eNameRequest.onreadystatechange = function() {
    // Gets the form from HTML
    var form = document.getElementById('event-chosen');

        if (this.readyState == 4 && this.status == 200) {
              // Parses the JSON file
              var eNameRequestObj = JSON.parse(this.responseText);

              // Adds all the eventKeys to the eKeyArray and all the eventNames to eNameArray
              for(c = 0; c < eNameRequestObj.length; c++) {
              eNameArray.push(eNameRequestObj[c].name);
              eKeyArray.push(eNameRequestObj[c].key);
              dummyEventArray.push(eNameRequestObj[c].name);
              dummyEventArray.sort();
              // teamNumArray.push(eNameRequestObj[c].team_number);
          }

          // Takes all the elements from the array and adds them to the form (drop-down)
          for(c = 0; c < eNameRequestObj.length; c++) {
              var option = document.createElement('option');
              option.textContent = dummyEventArray[c];
              option.value = dummyEventArray[c];
              form.appendChild(option);
          }

      }
}
}

var strUser;
// Gets the event the user chose and forwards it to another function
function sendEvent(){
    $('.makeEpicAppear').fadeOut(400);
    $('.sortable').fadeOut(400);
    $('.loading').fadeIn(100);
    params.delete('listID');
    // Gets the form from HTML, saves input
    var e = document.getElementById("event-chosen");

    strUser = e.options[e.selectedIndex].text;


    // $("#table-items tr").remove();
    $("#table-items tr").remove();
    // document.getElementById("table-items").delete();

    // Finds the associated Event Key with the Event Num
    var currentEventNum = eNameArray.indexOf(strUser);
    var currentEventKey = eKeyArray[currentEventNum];

    // Makes the request for teams at the event, forwarding the the eKey
    makeRequest(currentEventKey);

}


// // // // // // //
//   CODE DUMPS   //
// // // // // // //

function nameList(){
    // //console.log(nameArray);
    // nameArray.forEach(function (name) {
    // form = document.getElementById('event-chosen');
    //
    //   let option = document.createElement('option');
    //   form.appendChild(option);
    //
    //   option.innerHTML += name;
    //   //console.log(nameArray);
}

var url = new URL(window.location.href);
  let params = new URLSearchParams(url.search.slice(1));
function makeRequest(x){
  params.delete('listID');
  params.set('listID', x);
  params.set('eventName', strUser);
  window.history.replaceState({}, '', 'index.html'+'?' + params);
  //console.log(params.get('listID'))

  checkParams();
  // var teamRequest = new XMLHttpRequest();
  // teamRequest.open("GET", "https://www.thebluealliance.com/api/v3/event/" + x , true);
  // teamRequest.setRequestHeader("X-TBA-Auth-Key", "lrqZK0XAvSpeHXuWi9vhbmnAbF4ueBRQB3OevJC1pOWIWQdwX1WKRJ4oQceP0ox5");
  // teamRequest.send();
  // teamRequest.onreadystatechange = function() {
  //     if (this.readyState == 4 && this.status == 200){
  //
  //
  //         var teamRequestObj = JSON.parse(this.responseText);
  //         var a;
  //
  //         for (a = 0; a < teamRequestObj.length; a++) {
  //             teamArray.push(teamRequestObj[a].first_event_id)
  //       }
  //
  //     //console.log(teamArray);
  //     }
  }

function geteNameDelay(){
    setTimeout(function(){
        geteName();
    }, 200);
}



// XML-HTTP-REQUESTS


eteamRequest.open("GET", "https://www.thebluealliance.com/api/v3/events/2020/keys", true);
eteamRequest.setRequestHeader("X-TBA-Auth-Key", "lrqZK0XAvSpeHXuWi9vhbmnAbF4ueBRQB3OevJC1pOWIWQdwX1WKRJ4oQceP0ox5");
eteamRequest.send();

$(document).ready(geteNameDelay());
