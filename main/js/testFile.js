
var eParticapatedRequestObj;
var awardRequestObj;

function test() {
  cookieNumber = 2264;
  var eParticapatedRequest = new XMLHttpRequest();
  // eParticapatedRequest.open("GET", "​https://www.thebluealliance.com/api/v3/team/frc2264/events", true);
  eParticapatedRequest.open("GET", "https://www.thebluealliance.com/api/v3/team/frc" + cookieNumber + "/events", true);
  eParticapatedRequest.setRequestHeader("X-TBA-Auth-Key", "lrqZK0XAvSpeHXuWi9vhbmnAbF4ueBRQB3OevJC1pOWIWQdwX1WKRJ4oQceP0ox5");
  eParticapatedRequest.send();

  eParticapatedRequest.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200){
        eParticapatedRequestObj = JSON.parse(this.responseText);
        //console.log(eParticapatedRequestObj);
        //works
      var f;

      for(f = 0; f < eParticapatedRequestObj.length; f++) {

        var currEKey = eParticapatedRequestObj[f].key;
        //console.log(currEKey);
        var awardRequest = new XMLHttpRequest();
        awardRequest.open("GET", "​https://www.thebluealliance.com/api/v3/team​/frc2264/event​/" + currEKey +  "​/awards", true);
        awardRequest.setRequestHeader("X-TBA-Auth-Key", "lrqZK0XAvSpeHXuWi9vhbmnAbF4ueBRQB3OevJC1pOWIWQdwX1WKRJ4oQceP0ox5");
        awardRequest.send();

        awardRequest.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200){
            awardRequestObj = JSON.parse(this.responseText);
            var d;
            for(d = 0; d<awardRequestObj.length; d++) {
              //console.log(awardRequestObj[d].name);
            }
          }

          }
            }
        }

      }
}
