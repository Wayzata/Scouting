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
    let key = "teamID=";
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

var cookieNumberInt = parseInt(cookieNumber);

function workCookie(){

   setTimeout(function(){
    if(cookieNumber.length >= 1){
        if(Number.isInteger(cookieNumberInt) == true){
        $('.teamNumForm').hide();
        document.getElementById('numHeading').innerHTML = 'Your Team Number: <a href=my-team.html>' + cookieNumber + "</a> (<a onclick='deleteCookie()' href=''>change/remove team number</a>)";
        $('.showNum').show();
    } else {
        $('.teamNumForm').show();
        $('.showNum').hide();
    }
   }
  }, 1000)
}


 function deleteCookie() {
        createCookie("", "epic", -1);
    }


function getMyTeamInfo(){
setTimeout(function() {
//  cookieNumber = "2264";

  var infoRequest = new XMLHttpRequest();

  infoRequest.open("GET", "https://www.thebluealliance.com/api/v3/team/frc" + cookieNumber, true);
  infoRequest.setRequestHeader("X-TBA-Auth-Key", "lrqZK0XAvSpeHXuWi9vhbmnAbF4ueBRQB3OevJC1pOWIWQdwX1WKRJ4oQceP0ox5");
  infoRequest.send();


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
          }



      }
    }






}, 100);

}



function yearsFunc(){
setTimeout(function() {
    yearsRequest = new XMLHttpRequest();
    yearsRequest.open("GET", "https://www.thebluealliance.com/api/v3/team/frc" + cookieNumber + "/years_participated", true);
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
    setTimeout(function (){

    socialMediaRequest = new XMLHttpRequest();
    socialMediaRequest.open("GET", "https://www.thebluealliance.com/api/v3/team/frc" + cookieNumber + "/social_media", true);
    socialMediaRequest.setRequestHeader("X-TBA-Auth-Key", "lrqZK0XAvSpeHXuWi9vhbmnAbF4ueBRQB3OevJC1pOWIWQdwX1WKRJ4oQceP0ox5");
    socialMediaRequest.send();

    socialMediaRequest.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200){
        socialMediaRequestObj = JSON.parse(this.responseText);
            for(z = 0; z < socialMediaRequestObj.length; z++){
                //console.log(socialMediaRequestObj[z].foreign_key);
                var type = socialMediaRequestObj[z].type;
                var profile = document.getElementById(type);

                if(type == 'twitter-profile'){
                    $('.twitter').fadeIn(2000);
                    twitterIdentifier = socialMediaRequestObj[z].foreign_key;
                } else if (type == 'facebook-profile'){
                    $('.facebook').fadeIn(2000);
                    facebookIdentifier = socialMediaRequestObj[z].foreign_key;
                } else if(type == 'github-profile'){
                    $('.github').fadeIn(2000);
                    githubIdentifier = socialMediaRequestObj[z].foreign_key;
                }
//                profile.innerHTML = socialMediaRequestObj[z].foreign_key;
            }
    }
    return(socialMediaRequestObj);
}
    }, 1000)
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

$(document).ready(checkCookie());
$(document).ready(workCookie());
$(document).ready(getMyTeamInfo());
$(document).ready(yearsFunc());
$(document).ready(retrieveSocialMedia());
