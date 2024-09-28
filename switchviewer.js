// ==UserScript==
// @name         Switch Viewer Plugin for ConneXus
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  A Third-Party Mod for ConneXus Lesson Viewer
// @author       kilgorezer
// @match        https://www.connexus.com/content/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=connexus.com
// @grant        none
// ==/UserScript==

// config
var allowedOnIsResponsive = true; // set to false if you do not want to load on responsive viewer
var allowedOnUnResponsive = true; // set to false if you do not want to load on old viewer, it is recommended to set this to false

// ignore this, this is just semi-obfuscated text
var are=location.pathname=='/content/chrome/online/lessonViewer_responsive.aspx'?allowedOnIsResponsive:!allowedOnIsResponsive;var aun=location.pathname=='/content/chrome/online/lessonViewer_responsive.aspx'?!allowedOnUnResponsive:allowedOnUnResponsive;if(are||aun){if(!window.tpitems){window.tpitems=[];} window.tpitems[window.tpitems.length]={

// more config
 name: "Switch viewer to the " + (location.pathname=='/content/chrome/online/lessonViewer_responsive.aspx' ? 'Old' : 'Responsive') + " Viewer" // This is your plugin name.
,onclick: function(studentname, connexus) { // Your plugin code goes in this function.
    location.href = '/content/chrome/online/lessonViewer' + (location.pathname=='/content/chrome/online/lessonViewer_responsive.aspx' ? '' : '_responsive') + '.aspx' + location.href.substring(location.href.indexOf('?'))
 }

// ignore this too, this is closing tags for the semi-obfuscated text
};}