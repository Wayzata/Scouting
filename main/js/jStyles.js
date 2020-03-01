//ur schemes to work with params
var url = new URL(document.location);
var listID = url.searchParams.get('listID');
// EVERYTHING TO DO WITH STYLING HTML ELEMENTS USING JS


// FADE IN
function main(){
  if(listID == null){
  $('.massive-container').hide();
  $('form').hide();
  $('hr').hide();
  $('.massive-container').fadeIn(2500);
  $('.nameHeading').hide();
  $('.websiteButton').hide();
  $('.location').hide();
  $('.teamCountry').hide();
  $('hr').fadeIn(1000);
  setTimeout(function () {

    $('form').fadeIn(2000);
  }, 300);
  }
  $('.sortable').hide();
  $('.loading').hide();
  $('.teamNumForm').hide();
  $('.twitter').hide();
  $('.facebook').hide();
  $('.instagram').hide();
  $('.youtube').hide();
  $('.github').hide();
  $('.makeEpicAppear').hide();
  $('.yearsParticipated').hide();
  // $('form').show();
  //
  // $('.massive-container').show();
}
$(document).ready(main);
