// Extension for MoviePilot to display the remainin time until movie release
// 2015-12-14
//
// "THE MOVIE-WARE LICENSE" (Revision 42):
// <rockschlumpf@googlemail.com> wrote this file. As long as you retain this notice you
// can do whatever your want with the content.  If you think it is worth it, feel free to
// send me a movie in return. Kevin Gaarmann
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select the script, and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name        MoviePilot ReleaseDate-Extension
// @description Script, mit dem die verbleibende Zeit bis zum offiziellen Kinostart angezeigt wird.
// @author      kevgaar, leinzi
// @include     /^(https?):\/\/(www\.)?(moviepilot\.de\/movies\/)([^\/]*)$/
// @version     1.1.3
// @grant       none
// ==/UserScript==

var releaseDate = getReleaseDate();
var today = new Date();
var diffDays = getDateDiffInDays(releaseDate, today);
displayRemainingDays(diffDays);

function getReleaseDate() {
  var releaseDateElement = getReleaseDateElement();
  if (releaseDateElement === null) {
    throw new Error('getReleaseData(): general Data not found');
  }

  var releaseDate = releaseDateElement.innerHTML;
  if (releaseDate === null) {
    throw new Error('getReleaseData(): no proper date found');
  }

  var dateSplits = releaseDate.split(".");
  return new Date(parseInt(dateSplits[2]), parseInt(dateSplits[1])-1, parseInt(dateSplits[0]),0,0,0,0);
}

function getDateDiffInDays(dateA, dateB) {
  var _MS_PER_DAY = 1000 * 60 * 60 * 24;

  var utc1 = Date.UTC(dateA.getFullYear(), dateA.getMonth(), dateA.getDate());
  var utc2 = Date.UTC(dateB.getFullYear(), dateB.getMonth(), dateB.getDate());

  return Math.floor((utc1 - utc2) / _MS_PER_DAY);
}

function displayRemainingDays(days) {
  if(days >= 0) {
    var remainingDaysSpan = document.createElement('STRONG');
    if (days == 0) {
      remainingDaysSpan.innerHTML = "  (Endlich!!!)";
    } else {
      remainingDaysSpan.innerHTML = "  (Noch "+days+" Tage!)";
    }
    getReleaseDateElement().appendChild(remainingDaysSpan);
  }
}

function getReleaseDateElement() {
  return document.querySelectorAll('[itemprop="datePublished"]')[0];
}
