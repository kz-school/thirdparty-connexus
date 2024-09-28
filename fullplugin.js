// ==UserScript==
// @name         Third-Party Viewer
// @namespace    http://tampermonkey.net/
// @version      1.5
// @description  Third-Party Plugins for Connexus Lesson Viewer
// @author       kilgorezer
// @match        https://*.connexus.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=connexus.com
// @downloadURL  https://tpviewer.kilgorezer.com/fullplugin.js
// @updateURL    https://tpviewer.kilgorezer.com/fullplugin.js
// @grant        none
// ==/UserScript==
(function() {

// jQuery is already in the lesson viewer, so I removed the module from here.
// That fixed a bug related to start lesson... Why did it fix it...

// My code
(function(){if(!window.tpitems){window.tpitems=[];}

window.tpconfig = function() {
    var j = open("about:blank", "", "resizable=0,popup");
    window.tpdialog(j, j.document, j.location, j.console);
};

if(location.pathname=="/homepage"){
    //window.tpoldhref = location.href;
    var i = function() {
        if(/*location.href!=window.tpoldhref || !window.tpran*/ true) {
            //console.log('conditional met');
            window.tpran = true;
            //window.tpoldhref = location.href;
            var tmp = document.createElement('li');
            tmp.innerHTML = (`
                <a id="tpconfig" href="javascript:void(0)">Third-Party Viewer Configuration</a>
            `);
            document.getElementsByClassName("home-links")[0].children[0].appendChild(tmp);
            document.getElementById('tpconfig').addEventListener("click", window.tpconfig);
        }
    }
	localStorage.user_name = document.getElementsByTagName("pvs-header-user-greeting")[0].userName;
    setTimeout(function() {
        document.querySelectorAll('a[href="#/student/links"]')[0].addEventListener("click", function(event) {
            setTimeout(i, 750);
            console.log('Opened links');
        });
    }, 2000);
    if(location.href=="https://www.connexus.com/homepage#/student/links") {
        setTimeout(i, 2000);
    }
}

if(location.pathname=='/index.html'&&location.hostname=='prodpcx-cdn-vegaviewer.emssvc.connexus.com') {
    window.addEventListener("message", function(event) {
        if(event.data=="pageBack") {
            document.getElementById('prevPage').children[0].click()
        }
        if(event.data=="pageForward") {
            document.getElementById('nextPage').children[0].click()
        }
    });
}

if(location.pathname=='/webuser/profileDefaults.aspx'&&location.hostname=='www.connexus.com') {
	var tmp = document.createElement('tr')
	document.getElementsByTagName("table")[1].children[0].appendChild(tmp);
	tmp.outerHTML = (`
	    <tr id="thirdPartyConfig">
		    <td class="formLabel">Third Party:</td>
		    <td>
		    	<span id="tpoptions" class=" field">
			    	<a class="caButtonHolder" onclick="localStorage.clear('disabletp');document.getElementById('tpstat').innerText='on'" href="javascript:void(0);"><input type="button" value="On" causesvalidation="false"></a>
			    	<a class="caButtonHolder" onclick="localStorage.disabletp='1';document.getElementById('tpstat').innerText='off'" href="javascript:void(0);"><input type="button" value="Off" causesvalidation="false"></a>
			    </span>
			    <span class="formHelp"> Enable or disable third-party plugins. Currently <span id='tpstat'>error</span>.</span>
		    </td>
	    </tr>
    	<tr id="legacyLogin">
		    <td class="formLabel">Legacy Login:</td>
		    <td>
			    <span id="tpoptions" class=" field">
			    	<a class="caButtonHolder" onclick="localStorage.legacylogin='1';document.getElementById('legacyloginstat').innerText='on'" href="javascript:void(0);"><input type="button" value="On" causesvalidation="false"></a>
			    	<a class="caButtonHolder" onclick="localStorage.clear('legacylogin');document.getElementById('legacyloginstat').innerText='off'" href="javascript:void(0);"><input type="button" value="Off" causesvalidation="false"></a>
			    </span>
			    <span class="formHelp"> Enable or disable 2021-style login screen. Currently <span id='legacyloginstat'>error</span>.</span>
		    </td>
	    </tr>
    `) // legacylogin based on https://web.archive.org/web/20210903173755if_/https://www.connexus.com/login.aspx?sendTo=%2fDefault.aspx&token=826516348
    document.getElementById('tpstat').innerText = localStorage.disabletp ? "off" : "on";
    document.getElementById('legacyloginstat').innerText = localStorage.legacylogin ? "on" : "off";
}

if(location.pathname=='/login.aspx'&&location.hostname=='www.connexus.com'&&localStorage.legacylogin) {setTimeout(function(){
    document.getElementById('bgBranding').children[0].style.backgroundImage = "url('/images/login/defaultBG_metal-min.png')";
    document.getElementsByClassName('copyright')[0].innerHTML = "<img src='/images/connexus_logo_login.png'/>" + document.getElementsByClassName('copyright')[0].innerHTML;
    document.getElementById('loginLogoDiv').remove();
    document.getElementsByClassName('loginMessaging')[0].outerHTML=(`
        <img src='https://tpviewer.kilgorezer.com/oldconnexuslogo.png'  id="skinnedLogo" alt="Connexus Logo"/>
        <div class'loginMessagingNoLogo'>
            <h1 class='welcomeTitle'>Welcome to Connexus®, the Education Management System (EMS)</h1>
        </div>
    `);
    document.querySelectorAll('style, link[rel="stylesheet"]').forEach(e => e.remove());
    tmp = document.createElement('link');
    tmp.rel = 'stylesheet';
    tmp.href = 'https://tpviewer.kilgorezer.com/oldstylesheets.css';
    document.head.appendChild(tmp);
    document.getElementsByTagName("a")[2].outerHTML=(`
        <a onclick="javascript: return cx.login.checkImpersonations();" id="loginFormButton" class="cxBtn cxPrimaryBtn submit" href="javascript:WebForm_DoPostBackWithOptions(new WebForm_PostBackOptions(&quot;loginFormButton&quot;, &quot;&quot;, true, &quot;&quot;, &quot;&quot;, false, true))">
	        <span class="btnContent">Log In</span>
        </a>
    `)
    document.getElementById("tollFreePhoneNumberLiteral4").outerHTML = document.getElementById("tollFreePhoneNumberLiteral4").innerHTML;
    document.getElementsByTagName("title")[0].innerText="Welcome to Connexus | The Education Management System"
}, 1000);}

if(location.pathname=='/login.aspx'&&location.hostname=='www.connexus.com'&&(!localStorage.disabletp)) {
    var tmp2 = document.createElement('tp-popup');
    tmp2.style=(`
        display: block;
        position: absolute;
        top: -1mm;
        left: 5mm;
        text-align: center;
        background: white;
        color: black;
        border: 1px solid #bfb4ae;
        box-shadow: 0 0 2px rgba(0, 0, 0, 0.3);
        padding: 1.5mm;
        padding-top: 2.5mm;
        max-height: 95%;
        overflow: auto;
        border-radius: 1.25mm;
    `);
    document.body.appendChild(tmp2);
    tmp2.innerText=`Contains third-party plugins`;
}

if(location.pathname=="/content/chrome/online/lessonViewer_responsive.aspx"&&(!localStorage.disabletp)&&location.hostname=='www.connexus.com') {
	window.$(`
        <div id="menuThirdParty" class="menu-button menu-1">
		    <button type="button" onclick="document.getElementById('feedbackModal').getElementsByClassName('modal-close-btn')[0].click();executeUserscript(localStorage.user_name);" title="ThirdParty">
			    <i class="material-icons menu-icon">TP</i>
			    <div class="icon-text">Third-Party Plugins</div>
		    </button>
	    </div>
    `).insertAfter("#menuAssessment");
	window.$(`
        <div id="menuThirdParty" class="menu-button menu-1">
		    <button type="button" onclick="document.getElementById('feedbackModal').getElementsByClassName('modal-close-btn')[0].click();executeUserscript(localStorage.user_name);" title="ThirdParty">
			    <i class="material-icons menu-icon">TP</i>
			    <div class="icon-text">Third-Party Plugins</div>
	        </button>
	    </div>
    `).insertAfter("#slideOutMenuAssessment");

	document.getElementsByClassName('header-buttons-left')[0].innerHTML += (`<button type="button" onclick="executeUserscript(localStorage.user_name);" class="header-button">Third-Party<br>Plugins</button>`)
}

if(location.pathname=="/content/chrome/online/lessonViewer.aspx"&&(!localStorage.disabletp)&&location.hostname=='www.connexus.com') {
	document.getElementsByClassName("toolbarList")[0].innerHTML += (`<li><a id="ctl00_helpLink" title="Third-Party" class="lvIcon helpIcon" href="javascript:executeUserscript(localStorage.user_name)" style="background-image: url('https://tpviewer.kilgorezer.com/oldviewericon.png')!important;">Third-Party</a></li>`);
}


window.executeUserscript = function(UserName) {
    if(!window.tpnotran) {
        window.tpnotran = true;
        window.tp_on = true;
        //alert("Hi, "+UserName+"!\nOpening third-party settings page...");
        var thirdpartyw = document.createElement('tp-popup');
        var tmp = document.createElement('span');
        thirdpartyw.style=(`
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
            padding-bottom: 2.75mm;
            max-height: 95%;
            overflow: auto;
            border-radius: 1.25mm;
        `);
        tmp.style = "display:none";
        window.tpitems = window.tpitems.sort((a, b) => a.name.localeCompare(b.name))
        thirdpartyw.innerHTML="Third-Party Plugins<hr/>";
        for(var i = 0; i < window.tpitems.length; i++) {
            tmp.innerText=window.tpitems[i].name;
            thirdpartyw.innerHTML+="<a href='javascript:tpitems["+i+"].onclick(localStorage.user_name, lessonInformation)'>"+tmp.innerHTML+"</a><br/>";
        }
        ( location.pathname=="/content/chrome/online/lessonViewer_responsive.aspx" ? document.getElementById("mainLmuContent") : document.getElementById("lessonContent") ).appendChild(thirdpartyw);
        tmp.remove();
        var icon = document.createElement('img');
        icon.src = "https://tpviewer.kilgorezer.com/settings.png";
        icon.onclick = window.tp_utils.config;
        icon.style=(`
            position: absolute;
            bottom: 0;
            right: 0;
            cursor: pointer;
            width: 5mm;
            height: 5mm;
        `);
        thirdpartyw.appendChild(icon);
    } else {
        if(window.tp_on) {
            window.tp_on = false;
            document.getElementsByTagName('tp-popup')[0].style.display = 'none';
        } else {
            window.tp_on = true;
            document.getElementsByTagName('tp-popup')[0].style.display = 'block';
        }
    }
};

window.tp_utils = {
    prevPage: Function("document.getElementById('lessonContentIFrame').contentWindow.postMessage('pageBack', '*')"),
    nextPage: Function("document.getElementById('lessonContentIFrame').contentWindow.postMessage('pageForward', '*')"),
    enterIntro: window.showLessonIntro,
    exitIntro: window.startLesson,
    legacyNext: window.nextPage,
    legacyPrev: window.previousPage,
    logOut: Function("location.href = 'https://www.connexus.com/logoff.aspx?sendTo=' + encodeURIComponent(location.href)"),
    config: window.tpconfig,
}
})();})();

window.tpdialog = function(window, document, location, console) {
    console.log('button clicked');
    window.moveTo(10, 10);
    window.resizeTo(600, 300);
    document.head.innerHTML = (`
        <title>Third-Party Viewer Configuration</title>
        <link rel="stylesheet" href="https://www.connexus.com/_stylesheets/main.css?v=2016_i07"/>
        <style>
            .stat {
                background: purple;
                border: 1mm solid purple;
                border-radius: 1mm;
                color: white;
            }
        </style>
    `);
    document.body.innerHTML = (`
        <div id=container>
            <h2>Third-Party Viewer Configuration</h2>
			<a class="caButtonHolder" onclick="localStorage.clear('disabletp');document.getElementById('tpstat').innerText='Currently on.'" href="javascript:void(0);"><input type="button" value="Turn On Plugins" causesvalidation="false"></a>
            <span id=tpstat class=stat>Currently ${localStorage.disabletp?"off":"on"}.</span>
			<a class="caButtonHolder" onclick="localStorage.disabletp='1';document.getElementById('tpstat').innerText='Currently off.'" href="javascript:void(0);"><input type="button" value="Turn Off Plugins" causesvalidation="false"></a><br/>
			<a class="caButtonHolder" onclick="localStorage.legacylogin='1';document.getElementById('legacyloginstat').innerText='Currently on.'" href="javascript:void(0);"><input type="button" value="Turn On Legacy Login" causesvalidation="false"></a>
            <span id=legacyloginstat class=stat>Currently ${localStorage.legacylogin?"on":"off"}.</span></span>
			<a class="caButtonHolder" onclick="localStorage.clear('legacylogin');document.getElementById('legacyloginstat').innerText='Currently off.'" href="javascript:void(0);"><input type="button" value="Turn Off Legacy Login" causesvalidation="false"></a><br/>
			<a class="caButtonHolder" onclick="window.close()" href="javascript:void(0);"><input type="button" value="Close" causesvalidation="false"></a>
        </div>
    `);
    document.getElementsByTagName("html")[0].style = (`
        border: 2mm solid purple;
        scroll:;
        position: sticky;
        max-height: 100%;
        overflow: hidden;
        padding: none;
    `);
    document.getElementById('container').style = (`
        text-align: center;
        margin: none;
        display: block;
        height: 100%;
        width: 100%;
        overflow-y: scroll;
    `);
    return false;
};