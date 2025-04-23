// ==UserScript==
// @name         Switch Viewer Plugin for Connexus
// @namespace    http://tampermonkey.net/
// @version      1.5
// @description  A Third-Party Mod for Connexus Lesson Viewer
// @author       kilgorezer
// @match        https://www.connexus.com/content/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=connexus.com
// @downloadURL  https://tpviewer.kilgorezer.com/switchviewer.js
// @updateURL    https://tpviewer.kilgorezer.com/switchviewer.js
// @grant        none
// ==/UserScript==

// /\
// Delete the download and update URLs if you make a plugin based on this one.

// config
var allowedOnIsResponsive = true; // set to false if you do not want to load on responsive viewer
var allowedOnUnResponsive = true; // set to false if you do not want to load on old viewer, it is recommended to set this to false

// ignore this, this is just semi-obfuscated text
var are=location.pathname=='/content/chrome/online/lessonViewer_responsive.aspx'?allowedOnIsResponsive:false;var aun=location.pathname=='/content/chrome/online/lessonViewer_responsive.aspx'?false:allowedOnUnResponsive;if(are||aun){if(!window.tpitems){window.tpitems=[];}window.tpitems[window.tpitems.length]={

// more config
 name: "Switch viewer to the " + (location.pathname=='/content/chrome/online/lessonViewer_responsive.aspx' ? 'Old' : 'Responsive') + " Viewer" // This is your plugin name.
,onclick: function(studentname, connexus) { // Your plugin code goes in this function.
    // By the way, you can use the items in tp_utils and the function parameters to control the lesson viewer in various ways.
    // tp_utils.prevPage : Go back one page. Works in most courses.
    // tp_utils.nextPage : Go forward one page. Works in most courses.
    // tp_utils.enterIntro : Go to the lesson intro regardless of if it has one. If it does not, on most lessons it will show the lesson viewer but with a "Start Lesson" button.
    // tp_utils.exitIntro : Behaves the same way as the "Start Lesson" button
    // tp_utils.legacyNext : Go forward one page. Works in the lessons that tp_utils.nextPage does not work in.
    // tp_utils.legacyPrev : Go back one page. Works in the lessons that tp_utils.prevPage does not work in.
    // tp_utils.logOut : Log out.
    // tp_utils.config : Open the configuration window.
    // {Function Parameter 1} : The student name.
    // {Function Parameter 2} : Lesson information. (A copy of lessonInformation)
    location.href = '/content/chrome/online/lessonViewer' + (location.pathname=='/content/chrome/online/lessonViewer_responsive.aspx' ? '' : '_responsive') + '.aspx' + location.href.substring(location.href.indexOf('?'))
 }

// ignore this too, this is closing tags for the semi-obfuscated text
};}
