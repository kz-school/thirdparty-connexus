// ==UserScript==
// @name         Scrollable Teachers View
// @namespace    http://tpviewer.kilgorezer.com/
// @version      2.3.0
// @description  Let the teachers view scroll
// @author       kz-school
// @match        *://www.connexus.com/homepage
// @icon         https://www.connexus.com/favicon.ico
// @downloadURL  https://tpviewer.kilgorezer.com/teachers.user.js
// @updateURL    https://tpviewer.kilgorezer.com/teachers.user.js
// @grant        none
// ==/UserScript==

if(location.hash=="#/student/today"){(async function() {
    var a = true
    console.log('Loading...')
    while (a) {
        if(document.querySelector('div.st-my-teachers.ng-scope[ng-if$="_UserFriendlyTeachersList"]') !== null) {
            document.querySelector('div.st-my-teachers.ng-scope[ng-if$="_UserFriendlyTeachersList"]').style="height:75vh;overflow:scroll;overflow-x:clip;"
            console.log('teachers view patched')
            a = false
        } else {await new Promise(resolve => setTimeout(resolve, 100));}
    }
})();}
