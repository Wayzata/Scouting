
var b;
var teamERequestObj = [];
var teamERequest;
var eKeysRequestObj;
var eventScoreArray;
var teamTotal = 0;
var teamAvg = 0;
var teamAllianceArray = [];
var autoAvg = 0;
var autoTotal = 0;
var autoArray = [];
var tOPAvg = 0;
var tOPTotal = 0;
var tOPArray = [];
var eventScoreArray = [];
var p;
var b = 0;
var subID;
var wins;
var losses;
var ties;
var winloss;
var winlossobj;

var url = new URL(window.location.href);
var teamparams = new URLSearchParams(url.search.slice(1));

function getMyTeamInfoVar(teamID){
  teamparams.set('teamID', teamID);
  window.location.href = 'team.html'+'?teamID=' + teamID;
  //console.log(teamparams.get('teamID'));



}


function getTeamInfoVar(teamID){
    // setTimeout(function() {
//  teamID = "2264";
  yearsFunc(teamID);
  var subID = teamID;
  var infoRequest = new XMLHttpRequest();

  infoRequest.open("GET", "https://www.thebluealliance.com/api/v3/team/frc" + teamID, true);
  infoRequest.setRequestHeader("X-TBA-Auth-Key", "lrqZK0XAvSpeHXuWi9vhbmnAbF4ueBRQB3OevJC1pOWIWQdwX1WKRJ4oQceP0ox5");
  infoRequest.send();
  //console.log("");

  infoRequest.onreadystatechange = function() {

      if (this.readyState == 4 && this.status == 200){

          infoRequestObj = JSON.parse(this.responseText);
          if(infoRequestObj != undefined){
          var a;
          var titleNameHeading = document.getElementById('nameHeading');
          var teamLocation = document.getElementById('location');
          var teamCountry = document.getElementById('teamCountry');
          var teamNameTitle = document.getElementById('myTeamTitle');
//          var websiteButton = document.getElementById('button');
//          websiteButton.textContent = "Visit team Website";
          teamNameTitle.innerHTML = "Team: " + infoRequestObj.nickname;
          titleNameHeading.innerHTML = infoRequestObj.nickname;
          teamLocation.innerHTML = infoRequestObj.city + ', ' + infoRequestObj.state_prov;
          teamCountry.innerHTML = infoRequestObj.country;
          //console.log(infoRequestObj);
          $('.websiteButton').fadeIn(3000);
          $('.nameHeading').fadeIn(1500);
          $('.location').fadeIn(1500);
          $('.teamCountry').fadeIn(1600);
          smallsmall(teamID);
          }
          }


      }
    // } 100);
}

function smallsmall(ID) {
    var teamERequest = new XMLHttpRequest();
    teamERequest.open("GET", "https://www.thebluealliance.com/api/v3/team/frc" + ID + "/events", true);
    teamERequest.setRequestHeader("X-TBA-Auth-Key", "lrqZK0XAvSpeHXuWi9vhbmnAbF4ueBRQB3OevJC1pOWIWQdwX1WKRJ4oQceP0ox5");
    teamERequest.send();
    teamERequest.onload = function() {
    teamERequestObj = JSON.parse(this.responseText);
        if (b < teamERequestObj.length) {
            //console.log(teamERequestObj[b].key);
            //console.log(ID);
            getTeamScorez(ID, teamERequestObj[b].key);
        } else {
            //console.log("done");
            $('.tableItems').show();
            $('.myItemTable').show();
            $('.sortable').show();
            var myTH = document.getElementsByTagName("th")[0];
            sorttable.innerSortFunction.apply(myTH, []);
        }
}
}

var infoRequest;
var yearsRequest;
var infoRequestObj;
var cookieNumber;
var date = new Date();
var eParticapatedRequestObj;
var awardRequestObj;
var yearsRequestObj;
var socialMediaRequest;
var socialMediaRequestObj;

var z;

var socialMediaRequestTypeObj;
var facebookIdentifier;
var instagramIdentifier;
var githubIdentifier;
var twitterIdentifier;
var youtubeIdentifier;

var teamTotal;
var teamAvg;
var teamAllianceArray;
var autoAvg;
var autoArray;
var tOPAvg;
var tOPTotal;
var tOPArray;


date.setTime(date.getTime() + (1000 * 60 * 60 * 24 * 30));
//date.setTime(date.getTime() + (2592000000));
function createCookie(value) {
    var cookie = "teamID=" + value + ";expires=" + date.toGMTString() + ";";
    document.cookie = cookie;
    //console.log(cookie);
    //console.log("Creating new cookie with key: teamID value: " + value);
    window.location.reload();
}

function checkCookie(){
    var key = "teamID=";
            let cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                let cookie = cookies[i];
                //console.log(cookie);
                cookieNumber = cookie.toString().slice(7);
                while (cookie.charAt(0) === ' ') {
                    cookie = cookie.substring(1, cookie.length);
                }
                if (cookie.indexOf(key) === 0) {
                    return cookie.substring(key.length, cookie.length);
                }
            }


}

function workCookie(){

   setTimeout(function(){
    if(cookieNumber.length >= 1){
        $('.teamNumForm').hide();
        // document.getElementById('numHeading').innerHTML = 'Your Team Number: <a href=my-team.html>' + cookieNumber + "</a> (<a onclick='deleteCookie()' href=''>change/remove team number</a>)";
        $('.showNum').show();
    } else {
        $('.teamNumForm').show();
        $('.showNum').hide();
    }
  }, 1000)
}



function getTeamScorez(tKey, eKey) {

    //Open the Request
    // //console.log("running");
    var teamScoreRequest = new XMLHttpRequest();
    teamScoreRequest.open("GET", "https://www.thebluealliance.com/api/v3/team/frc" + tKey + "/event/" + eKey + "/matches" , true);
    teamScoreRequest.setRequestHeader("X-TBA-Auth-Key", "lrqZK0XAvSpeHXuWi9vhbmnAbF4ueBRQB3OevJC1pOWIWQdwX1WKRJ4oQceP0ox5");
    teamScoreRequest.send();
    //Reset the Team Totals and Averages
    wins = 0;
    losses = 0
    ties = 0;
    teamTotal = 0;
    teamAvg = 0;
    teamAllianceArray = [];
    autoAvg = 0;
    autoTotal = 0;
    autoArray = [];
    tOPAvg = 0;
    tOPTotal = 0;
    tOPArray = [];

    teamScoreRequest.onload = function() {
        teamScoreRequestObj = JSON.parse(this.responseText);
        // //console.log(teamScoreRequestObj);
        teamAlliance = "";
        for(matchNum = 0; matchNum < teamScoreRequestObj.length; matchNum++) {
            blueKeyArray = teamScoreRequestObj[matchNum].alliances.blue.team_keys;
            for(keyk = 0; keyk < 2; keyk++) {
                if(tKey == blueKeyArray[keyk]) {
                    teamAlliance = "blue";
                    teamAllianceArray.push("blue");
                    eventScoreArray.push(teamScoreRequestObj[matchNum].alliances.blue.score);
                    // autoArray.push(teamScoreRequestObj[matchNum].score_breakdown.blue.autoPoints);
                    // tOPArray.push(teamScoreRequestObj[matchNum].score_breakdown.blue.teleopPoints);
                }
            }
            //FIX LINE UNDERNEATH!!!!
            if(teamAlliance == "blue") {

            } else {
                teamAllianceArray.push("red");
                eventScoreArray.push(teamScoreRequestObj[matchNum].alliances.red.score);
                // autoArray.push(teamScoreRequestObj[matchNum].score_breakdown.red.autoPoints);
                // tOPArray.push(teamScoreRequestObj[matchNum].score_breakdown.red.teleopPoints);
            }
            teamAlliance = "";

          }


          for(var i = 0; i < eventScoreArray.length; i++ ){
              teamTotal += parseInt(eventScoreArray[i], 10 ); //don't forget to add the base
          }
          var avg = (teamTotal/eventScoreArray.length).toFixed(2);

          //console.log(avg);

          var tr = document.createElement('tr');
          var teamNames = document.createElement('td');
          var teamScores = document.createElement('td');
          // var record = document.createElement('td');


          tr.classList.toggle('inline-centering');

          var table = document.getElementById('table-items');

          table.appendChild(tr);
          tr.appendChild(teamNames);
          tr.appendChild(teamScores);
          // tr.appendChild(record);


          teamNames.innerHTML = eKey;
          teamScores.innerHTML = avg;
          // record.innerHTML = wins + " - " + losses + " - " + ties;

          avg = 0;
          autoAvg = 0;
          tOPAvg = 0;
          var elmnt = document.getElementById("table");
          elmnt.scrollIntoView();
          eventScoreArray = [];
          teamAllianceArray = [];
          autoArray = [];

          b++;
          smallsmall(tKey);

    }

}

var eventScoresRequest;
var eventScoresRequestObj;
var matchScoreArray;
var winlosetie;

function getMatchScores(tKey, eKey) {
  var eventScoresRequest = new XMLHttpRequest();
  eventScoresRequest.open("GET", "https://www.thebluealliance.com/api/v3/team/frc" + tKey + "/event/" + eKey + "/matches" , true);
  eventScoresRequest.setRequestHeader("X-TBA-Auth-Key", "lrqZK0XAvSpeHXuWi9vhbmnAbF4ueBRQB3OevJC1pOWIWQdwX1WKRJ4oQceP0ox5");
  eventScoresRequest.send();
  var matchScoreArray = [];
  var wi
  eventScoresRequest.onload = function() {
      eventScoresRequestObj = JSON.parse(this.responseText);

      teamAlliance = "";
      for(matchNum = 0; matchNum < eventScoresRequestObj.length; matchNum++) {
          blueKeyArray = eventScoresRequestObj[matchNum].alliances.blue.team_keys;
          for(keyk = 0; keyk < 2; keyk++) {
              if(tKey == blueKeyArray[keyk]) {
                  matchScoreArray.push(eventScoresRequestObj[matchNum].alliances.blue.score);
                  // autoArray.push(teamScoreRequestObj[matchNum].score_breakdown.blue.autoPoints);
                  // tOPArray.push(teamScoreRequestObj[matchNum].score_breakdown.blue.teleopPoints);
              }
          }
          //FIX LINE UNDERNEATH!!!!
          if(teamAlliance == "blue") {

          } else {

              matchScoreArray.push(eventScoresRequestObj[matchNum].alliances.red.score);
              // autoArray.push(teamScoreRequestObj[matchNum].score_breakdown.red.autoPoints);
              // tOPArray.push(teamScoreRequestObj[matchNum].score_breakdown.red.teleopPoints);
          }

        }

  }


}


// function getMyTeamInfo(){
// setTimeout(function() {
// //  cookieNumber = "2264";
//   var infoRequest = new XMLHttpRequest();
//
//   infoRequest.open("GET", "https://www.thebluealliance.com/api/v3/team/frc" + cookieNumber, true);
//   infoRequest.setRequestHeader("X-TBA-Auth-Key", "lrqZK0XAvSpeHXuWi9vhbmnAbF4ueBRQB3OevJC1pOWIWQdwX1WKRJ4oQceP0ox5");
//   infoRequest.send();
//
//
//   infoRequest.onreadystatechange = function() {
//
//       if (this.readyState == 4 && this.status == 200){
//
//           infoRequestObj = JSON.parse(this.responseText);
//           if(infoRequestObj != undefined){
//           var a;
//           var titleNameHeading = document.getElementById('nameHeading');
//           var teamLocation = document.getElementById('location');
//           var teamCountry = document.getElementById('teamCountry');
//           var teamNameTitle = document.getElementById('myTeamTitle');
// //          var websiteButton = document.getElementById('button');
// //          websiteButton.textContent = "Visit team Website";
//           teamNameTitle.innerHTML = "Team: " + infoRequestObj.nickname;
//           titleNameHeading.innerHTML = infoRequestObj.nickname;
//           teamLocation.innerHTML = infoRequestObj.city + ', ' + infoRequestObj.state_prov;
//           teamCountry.innerHTML = infoRequestObj.country;
//           //console.log(infoRequestObj);
//           $('.websiteButton').fadeIn(3000);
//           $('.nameHeading').fadeIn(1500);
//           $('.location').fadeIn(1500);
//           $('.teamCountry').fadeIn(1600);
//           }
//
//
//
//       }
//     }
//
//
//
//
//
//
// }, 100);
//
// }



function yearsFunc(hmm){
setTimeout(function() {
    yearsRequest = new XMLHttpRequest();
    yearsRequest.open("GET", "https://www.thebluealliance.com/api/v3/team/frc" + hmm + "/years_participated", true);
  yearsRequest.setRequestHeader("X-TBA-Auth-Key", "lrqZK0XAvSpeHXuWi9vhbmnAbF4ueBRQB3OevJC1pOWIWQdwX1WKRJ4oQceP0ox5");
  yearsRequest.send();

    yearsRequest.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200){
        yearsRequestObj = JSON.parse(this.responseText);

        var yearsParticipated = document.getElementById('yearsParticipated');
        var firstYear = yearsRequestObj[0];
        var yearLength = yearsRequestObj.length;
        var lastYear = yearsRequestObj[yearLength-1];
        yearsParticipated.innerHTML = "Competing from " + firstYear + ' - ' + lastYear;
        $('.yearsParticipated').fadeIn(2000);
        //console.log(yearsRequestObj);

    }
}

}, 100);

}


function retrieveSocialMedia(){
//     setTimeout(function (){
//
//     socialMediaRequest = new XMLHttpRequest();
//     socialMediaRequest.open("GET", "https://www.thebluealliance.com/api/v3/team/frc" + teamID + "/social_media", true);
//     socialMediaRequest.setRequestHeader("X-TBA-Auth-Key", "lrqZK0XAvSpeHXuWi9vhbmnAbF4ueBRQB3OevJC1pOWIWQdwX1WKRJ4oQceP0ox5");
//     socialMediaRequest.send();
//
//     socialMediaRequest.onreadystatechange = function() {
//     if (this.readyState == 4 && this.status == 200){
//         socialMediaRequestObj = JSON.parse(this.responseText);
//             for(z = 0; z < socialMediaRequestObj.length; z++){
//                 //console.log(socialMediaRequestObj[z].foreign_key);
//                 var type = socialMediaRequestObj[z].type;
//                 var profile = document.getElementById(type);
//
//                 if(type == 'twitter-profile'){
//                     $('.twitter').fadeIn(2000);
//                     twitterIdentifier = socialMediaRequestObj[z].foreign_key;
//                 } else if (type == 'facebook-profile'){
//                     $('.facebook').fadeIn(2000);
//                     facebookIdentifier = socialMediaRequestObj[z].foreign_key;
//                 } else if(type == 'github-profile'){
//                     $('.github').fadeIn(2000);
//                     githubIdentifier = socialMediaRequestObj[z].foreign_key;
//                 }
// //                profile.innerHTML = socialMediaRequestObj[z].foreign_key;
//             }
//     }
//     return(socialMediaRequestObj);
// }
//     }, 1000)
}

function redirToWebsite(){
    //console.log('this is the redirect code')
    window.open(infoRequestObj.website, 'blank');
}

function facebookRedirect(){
    window.open('https://facebook.com/' + facebookIdentifier);
}

function githubRedirect(){
    window.open('https://github.com/' + githubIdentifier);
}

function twitterRedirect(){
    window.open('https://twitter.com/' + twitterIdentifier);
}

function checkParams2(){
  var url = new URL(window.location.href);
  var teamIDEpic = url.searchParams.get('teamID');

  if(teamIDEpic != null){
    $('.loading').fadeIn(600);
    // url.searchParams.get('eventName');
    getTeamInfoVar(teamIDEpic);
}
}



$(document).ready(checkCookie());
$(document).ready(workCookie());
$(document).ready(checkParams2());
// $(document).ready(yearsFunc());
$(document).ready(retrieveSocialMedia());
