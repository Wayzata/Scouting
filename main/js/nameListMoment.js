
var teamArray; //Array with all the teams in the event
var teamNumArray; //Array with all the team numbers (DEPRACATED)
var tKeyArray; //Array with all the team keys

var currentTeam; //The current team being sent to get a score
var currentEvent; //The current event being processed

var index; //The current index in the array that is being handled
var finalArray = [];
var finalArray2 = [];
var finalArray3 = [];
var finalArray4 = [];
var finalArray5 = [];
var finalArray6 = [];
var finalArray7 = [];
// window["teamTotal" + u]; //The total score of a team at an event, gets reset at the same time as window["teamAvg" + u]
// window["teamAvg" + u]; //The Avg of a team, gets reset every time a new team is sent to getTeamScores

var teamScoreRequestObj; //The parsed JSON file of getTeamScores
var keyk; //A Variable that cycles from 0-2 to cycle througha and check which team contains the key of the target team
var autoScore;
var TOPScore;
var blueKeyArray = []; //Array with all the blue team keys

var bigbig;

//Reset stuff
var i;
var reps = 0;
// var u;
var mainTable = document.getElementById('table');
var tr2;

var avg; //Average value for a given team

var table = document.getElementById('table-items');
var p;
// var u = 0;

$(document).ready(function() {
    $('.js-example-basic-single').select2();
});

function reset() {
    reps = 0;
    index = 0;
    var finalArray = [];
    var finalArray2 = [];
    var finalArray3 = [];
    var finalArray4 = [];
    var finalArray5 = [];
    var finalArray6 = [];
    var finalArray7 = [];

    p = 0;
    u = 0;
}

//Get the new Team Key to work with
function getKeys() {

    for(index = 0; index < teamArray.length; index++) {
      currentTeam = tKeyArray[index];

      getTeamScores(currentTeam, currentEvent, index);

    }


// }
}

var items;
var l = 2;
function showInfo() {

    if (l%2 == 0) {
    var items = document.getElementsByClassName("inline-collapsable");
    l++;
  } else {
    var items = document.getElementsByClassName("benis");
    l++;
  }
    var size = items.length;

    for (var i=0; i < size; i++) {
      var bc = size - 1 - i;

      if (l%2 == 0) {
      items[bc].classList.toggle("inline-collapsable");
      items[bc].classList.toggle("benis");
    } else {
      items[bc].classList.toggle("benis");
      items[bc].classList.toggle("inline-collapsable");
    }



    }
}


//Get the team scores
function getTeamScores (tKey, eKey, u) {
    // window["WLTRec" + u] = 0;
    var eee = "https://www.thebluealliance.com/api/v3/team/"+ tKey + "/events/2020/statuses?X-TBA-Auth-Key=lrqZK0XAvSpeHXuWi9vhbmnAbF4ueBRQB3OevJC1pOWIWQdwX1WKRJ4oQceP0ox5";
    let ok2 =  new URL(eee);
    fetch(ok2)
      .then((response) => {
        return response.json();
      })
      .then((myJson) => {
        gTSInner(tKey, eKey, u);
        window["teamWLRequestObj" + u] = myJson;
        window["wltRec" + u] = window["teamWLRequestObj" + u][String(eKey)];
        window["WLTRec" + u] = window["wltRec" + u].playoff.record.wins + window["wltRec" + u].qual.ranking.record.wins;
      });




    function gTSInner(tKey, eKey, u) {

        var fff = "https://www.thebluealliance.com/api/v3/team/"+ tKey + "/event/" + eKey + "/matches?X-TBA-Auth-Key=lrqZK0XAvSpeHXuWi9vhbmnAbF4ueBRQB3OevJC1pOWIWQdwX1WKRJ4oQceP0ox5";
        let ok = new URL(fff);

        fetch(ok)
          .then((response) => {
            return response.json();
          })
          .then((myJson) => {
            window["teamScoreRequestObj" + u] = myJson;   // create counter1, counter2,...)

        //Reset the Team Totals and Averages
        window["nOM" + u] = window["teamScoreRequestObj" + u].length;

        window["autoAvg" + u] = 0;
        window["autoTotal" + u] = 0;
        window["autoArray" + u] = [];
        window["tOPAvg" + u] = 0;
        window["tOPTotal" + u] = 0;
        window["tOPArray" + u] = [];
        window["eventScoreArray" + u] = [];
        window["outerArray" + u] = [];
        window["innerArray" + u] = [];
        window["bottomArray" + u] = [];
        window["bottomAvg" + u] = 0;
        window["bottomVar" + u] = 0;
        window["innerAvg" + u] = 0;
        window["innerVar" + u] = 0;
        window["outerAvg" + u] = 0;
        window["outerVar" + u] = 0;
        window["winRate" + u] = window["WLTRec" + u]/window["nOM" + u];
        window["winRate" + u] = window["winRate" + u].toFixed(2);



            window["teamAlliance" + u] = "";
            for(matchNum = 0; matchNum < window["teamScoreRequestObj" + u].length; matchNum++) {
                blueKeyArray = window["teamScoreRequestObj" + u][matchNum].alliances.blue.team_keys;
                window["keyk" + u + "00" + String(matchNum)] = 0;
                for(window["keyk" + u + "00" + String(matchNum)] = 0; window["keyk" + u + "00" + String(matchNum)] < 3;) {
                    if(tKey == blueKeyArray[window["keyk" + u + "00" + String(matchNum)]]) {
                        // console.log(window["keyk" + u + "00" + String(matchNum)]);
                        window["keykey" + u + "00" + String(matchNum)] = window["keyk" + u + "00" + String(matchNum)] + 1;
                        window["keyk" + u + "00" + String(matchNum)] = 3;
                        window["teamAlliance" + u] = "blue";

                        window["teamTotal" + u] += window["teamScoreRequestObj" + u][matchNum].alliances.blue.score
                        window["outerVar" + u] += window["teamScoreRequestObj" + u][matchNum].score_breakdown.blue.autoCellsOuter + window["teamScoreRequestObj" + u][matchNum].score_breakdown.red.teleopCellsOuter;
                        window["innerVar" + u] += window["teamScoreRequestObj" + u][matchNum].score_breakdown.blue.autoCellsInner + window["teamScoreRequestObj" + u][matchNum].score_breakdown.red.teleopCellsInner;
                        window["bottomVar" + u] += window["teamScoreRequestObj" + u][matchNum].score_breakdown.blue.autoCellsBottom + window["teamScoreRequestObj" + u][matchNum].score_breakdown.red.teleopCellsBottom;
                        window["autoTotal" + u] += window["teamScoreRequestObj" + u][matchNum].score_breakdown.blue.autoPoints;
                        window["tOPTotal" + u] += window["teamScoreRequestObj" + u][matchNum].score_breakdown.blue.teleopPoints;
                        // if(window["teamScoreRequestObj" + u][matchNum].winningAlliance = "blue") {
                        //     window["nOW" + u]++;
                        //     console.log("running blue");
                        // }
                        // console.log(window["keyk" + u + "00" + String(matchNum)]);
                    } else {
                        window["keyk" + u + "00" + String(matchNum)]++;
                    }
                }
                //FIX LINE UNDERNEATH!!!!
                if(window["teamAlliance" + u] == "blue") {

                } else {
                    window["teamTotal" + u] += window["teamScoreRequestObj" + u][matchNum].alliances.red.score
                    window["outerVar" + u] += window["teamScoreRequestObj" + u][matchNum].score_breakdown.red.autoCellsOuter + window["teamScoreRequestObj" + u][matchNum].score_breakdown.red.teleopCellsOuter;
                    window["innerVar" + u] += window["teamScoreRequestObj" + u][matchNum].score_breakdown.red.autoCellsInner + window["teamScoreRequestObj" + u][matchNum].score_breakdown.red.teleopCellsInner;
                    window["bottomVar" + u] += window["teamScoreRequestObj" + u][matchNum].score_breakdown.red.autoCellsBottom + window["teamScoreRequestObj" + u][matchNum].score_breakdown.red.teleopCellsBottom;
                    window["autoTotal" + u] += window["teamScoreRequestObj" + u][matchNum].score_breakdown.red.autoPoints;
                    window["tOPTotal" + u] += window["teamScoreRequestObj" + u][matchNum].score_breakdown.red.teleopPoints;
                    // if(window["teamScoreRequestObj" + u][matchNum].winningAlliance = "red") {
                    //     window["nOW" + u]++;
                    //     console.log("running red");
                    // }
                }
                window["teamAlliance" + u] = "";

              }

              window["avg" + u] = (window["teamTotal" + u]/window["teamScoreRequestObj" + u].length).toFixed(2);


              window["autoAvg" + u] = (window["autoTotal" + u]/window["teamScoreRequestObj" + u].length).toFixed(2);


              window["tOPAvg" + u] = (window["tOPTotal" + u]/window["teamScoreRequestObj" + u].length).toFixed(2);


              window["innerAvg" + u] = (window["innerVar" + u]/window["teamScoreRequestObj" + u].length).toFixed(2);


              window["outerAvg" + u] = (window["outerVar" + u]/window["teamScoreRequestObj" + u].length).toFixed(2);


              window["bottomAvg" + u] = (window["bottomVar" + u]/window["teamScoreRequestObj" + u].length).toFixed(2);


              // window["eventScoreArray" + u] = [];
              //
              //
              // window["autoArray" + u] = [];
              p++;
              reps++;
              if(reps == teamArray.length) {
                // setTimeout(function() {
                  console.log("running");
                  for(v = 0; v < teamArray.length; v++) {
                    // console.log(window["avg" + v]);
                    finalArray.push(window["avg" + v]);
                    finalArray2.push(window["autoAvg" + v]);
                    finalArray3.push(window["tOPAvg" + v]);
                    finalArray4.push(window["innerAvg" + v]);
                    finalArray5.push(window["outerAvg" + v]);
                    finalArray6.push(window["bottomAvg" + v]);
                    finalArray7.push(window["winRate" + v]);

                }
                putItems();
              // }, 1000);
              }
              // getKeys();

        // }
          });
    }

}



var table;
var name;
var score;
var listVar;
function putItems() {
      for (listVar = 0; listVar < teamArray.length; listVar++) {

      var tr = document.createElement('tr');
      var teamNames = document.createElement('td');
      var avgs = document.createElement('td');
      var wlrec = document.createElement('td');
      var autoScores = document.createElement('td');
      var tOPScores = document.createElement('td');
      var outerNums = document.createElement('td');
      var innerNums = document.createElement('td');
      var bottomNums = document.createElement('td');

      outerNums.classList.toggle("inline-collapsable");
      innerNums.classList.toggle("inline-collapsable");
      bottomNums.classList.toggle("inline-collapsable");
      avgs.classList.toggle('inline-collapsable');


      var bigbig = ('getMyTeamInfoVar(\"' + teamNumArray[listVar] + '\")');


      tr.classList.toggle('inline-centering');

      tr.setAttribute("onClick", bigbig);


      var table = document.getElementById('table-items');

      table.appendChild(tr);
      // table.appendChild(empty);
      tr.appendChild(teamNames);
      // tr.appendChild(wlrec);
      tr.appendChild(autoScores);
      tr.appendChild(tOPScores);
      tr.appendChild(wlrec);
      tr.appendChild(bottomNums);
      tr.appendChild(outerNums);
      tr.appendChild(innerNums);

      // //console.log("P is" + p);
      teamNames.innerHTML = teamArray[listVar] + " - " + teamNumArray[listVar];
      // teamScores.innerHTML = finalArray[listVar];
      autoScores.innerHTML = finalArray2[listVar];
      tOPScores.innerHTML = finalArray3[listVar];
      wlrec.innerHTML = finalArray7[listVar];
      innerNums.innerHTML = finalArray4[listVar];
      outerNums.innerHTML = finalArray5[listVar];
      bottomNums.innerHTML = finalArray6[listVar];
      // console.log("making stuff appear");
    }


        $('.loading').fadeOut(600);
        $('.sortable').fadeIn(1000);
        $('.makeEpicAppear').fadeIn(500);
        clear();
}
var pp;
function clear() {
      finalArray = [];
      finalArray2 = [];
      finalArray3 = [];
      finalArray4 = [];
      finalArray5 = [];
      finalArray6 = [];
      finalArray7 = [];
      for (pp = 0; pp < teamArray.length; pp++) {
        // console.log("running");
        // window["teamTotal" + pp] = 0;
        // window["nOW" + pp] = 0;
        // window["nOM" + pp] = 0;
        window["avg" + pp] = 0;
        window["autoAvg" + pp] = 0;
        window["autoTotal" + pp] = 0;
        window["autoArray" + pp] = [];
        window["tOPAvg" + pp] = 0;
        window["tOPTotal" + pp] = 0;
        window["tOPArray" + pp] = [];
        window["eventScoreArray" + pp] = [];
        window["outerArray" + pp] = [];
        window["innerArray" + pp] = [];
        window["bottomArray" + pp] = [];
        window["bottomAvg" + pp] = 0;
        window["bottomVar" + pp] = 0;
        window["innerAvg" + pp] = 0;
        window["innerVar" + pp] = 0;
        window["outerAvg" + pp] = 0;
        window["outerVar" + pp] = 0;
        reps = 0;
      }
}

var urlKey;
var urlName;
function checkParams(){
  var url = new URL(window.location.href);
  var listID = url.searchParams.get('listID');

  if(listID != null){
    $('.loading').fadeIn(600);
    // url.searchParams.get('eventName');
    urlKey = eKeyArray.indexOf(listID);
    urlName = eNameArray[urlKey];
    document.getElementById('event-name').innerHTML = urlName;

    makeList(listID);
  }
}



var eventk;
var eventkey;

function makeList(x){
  currentEvent = x;
  $('ul').empty()
  teamArray = [];
  teamNumArray = [];
  tKeyArray = [];
  eventKey = x;
  var teamRequest = new XMLHttpRequest();
  teamRequest.open("GET", "https://www.thebluealliance.com/api/v3/event/" + x + "/teams" , true);
  teamRequest.setRequestHeader("X-TBA-Auth-Key", "lrqZK0XAvSpeHXuWi9vhbmnAbF4ueBRQB3OevJC1pOWIWQdwX1WKRJ4oQceP0ox5");
  teamRequest.send();
  teamRequest.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200){

          var teamRequestObj = JSON.parse(this.responseText);
          var a;

          for (a = 0; a < teamRequestObj.length; a++) {
            teamArray.push(teamRequestObj[a].nickname);
            tKeyArray.push(teamRequestObj[a].key);
            teamNumArray.push(teamRequestObj[a].team_number);
        }
        // reset();
        getKeys();

      }
    }

}

function waitTillRun(){
  setTimeout(function(){
    checkParams();
  }, 1000)
}

$(document).ready(waitTillRun);
