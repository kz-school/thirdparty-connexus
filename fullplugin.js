// ==UserScript==
// @name         Third-Party Viewer
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Third-Party Mods for ConneXus Lesson Viewer
// @author       kilgorezer
// @match        https://www.connexus.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=connexus.com
// @grant        none
// ==/UserScript==
(function() {

// jQuery is already in the lesson viewer, so I removed the module from here.
// That fixed a bug related to start lesson... Why did it fix it...

// My code
(function(){if(!window.tpitems){window.tpitems=[];}

if(location.pathname=="/homepage"){
	localStorage.user_name = document.getElementsByTagName("pvs-header-user-greeting")[0].userName;
}

if(location.pathname=="/content/chrome/online/lessonViewer_responsive.aspx") {
	$(`<div id="menuThirdParty" class="menu-button menu-1">
		<button type="button" onclick="document.getElementById('feedbackModal').getElementsByClassName('modal-close-btn')[0].click();executeUserscript(localStorage.user_name);" title="ThirdParty">
			<i class="material-icons menu-icon">TP</i>
			<div class="icon-text">Third-Party Plugins</div>
		</button>
	</div>`).insertAfter("#menuAssessment");
	$(`<div id="menuThirdParty" class="menu-button menu-1">
		<button type="button" onclick="document.getElementById('feedbackModal').getElementsByClassName('modal-close-btn')[0].click();executeUserscript(localStorage.user_name);" title="ThirdParty">
			<i class="material-icons menu-icon">TP</i>
			<div class="icon-text">Third-Party Plugins</div>
	    </button>
	</div>`).insertAfter("#slideOutMenuAssessment");

	document.getElementsByClassName('header-buttons-left')[0].innerHTML += `<button type="button" onclick="executeUserscript(localStorage.user_name);" class="header-button">Third-Party<br>Plugins</button>`
}

if(location.pathname=="/content/chrome/online/lessonViewer.aspx") {
	document.getElementsByClassName("toolbarList")[0].innerHTML += `<li><a id="ctl00_helpLink" title="Third-Party" class="lvIcon helpIcon" href="javascript:executeUserscript(localStorage.user_name)" style="background-image: url('https://tpviewer.kilgorezer.com/oldviewericon.png')!important;">Third-Party</a></li>`;
}


window.executeUserscript = function(UserName) {
    if(!window.tpnotran) {
        window.tpnotran = true;
        window.tp_on = true;
        //alert("Hi, "+UserName+"!\nOpening third-party settings page...");
        var thirdpartyw = document.createElement('tp-popup');
        var tmp = document.createElement('span');
        thirdpartyw.style=`
            display: block;
            position: absolute;
            top: 3px;
            left: 50%;
            transform: translate(-50%, 0%);
            text-align: center;
            background: white;
            color: black;
            border: 2mm solid purple;
            padding: 0.75mm;
            max-height: 95%;
            overflow: auto;
            border-radius: 1.25mm;
        `;
        tmp.style = "display:none";
        tpitems = tpitems.sort((a, b) => a.name.localeCompare(b.name))
        thirdpartyw.innerHTML="Third Party Plugins<hr/>";
        for(var i = 0; i < tpitems.length; i++) {
            tmp.innerText=tpitems[i].name;
            thirdpartyw.innerHTML+="<a href='javascript:tpitems["+i+"].onclick(localStorage.user_name)'>"+tmp.innerHTML+"</a><br/>";
        }
        ( location.pathname=="/content/chrome/online/lessonViewer_responsive.aspx" ? document.getElementById("mainLmuContent") : document.getElementById("lessonContent") ).appendChild(thirdpartyw);
    } else {
        if(tp_on) {
            tp_on = false;
            document.getElementsByTagName('tp-popup')[0].style.display = 'none';
        } else {
            tp_on = true;
            document.getElementsByTagName('tp-popup')[0].style.display = 'block';
        }
    }
};

})();})();