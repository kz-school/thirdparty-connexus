// ==UserScript==
// @name         Third-Party Viewer
// @namespace    https://tpviewer.kilgorezer.com/
// @version      1.8
// @description  Third-Party Plugins for Connexus Lesson Viewer
// @author       kilgorezer
// @match        *://*.connexus.com/*
// @match        *://*.pearson.com/*
// @match        *://*.connectionsacademy.com/*
// @match        *://edynamiclearningcdn.com/*
// @match        *://*.edynamiclearningcdn.com/*
// @match        *://tpviewer.kilgorezer.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=connexus.com
// @downloadURL  https://tpviewer.kilgorezer.com/fullplugin.js
// @updateURL    https://tpviewer.kilgorezer.com/fullplugin.js
// @grant        none
// ==/UserScript==
// Keypress Update
(function() {

// jQuery is already in the lesson viewer, so I removed the module from here.
// That fixed a bug related to start lesson... Why did it fix it...

// My code
(function(){if(!window.tpitems){window.tpitems=[];}

window.tp_version = 1.8;

window.tpconfig = function() {
    var j = open("about:blank", "", "resizable=0,popup");
    window.tpdialog(j, j.document, j.location, j.console);
};

window.tpinstructions = function() {
    var j = open("about:blank", "", "resizable=0,popup");
    window.tpidialog(j, j.document, j.location, j.console);
}

if(true) {
    addEventListener("keyup", (event) => {
        if(event.key.toUpperCase() == "F4") {
            setTimeout(window.tp_utils.config(),0);
        }
        const properties = {
            type: event.type,
            key: event.key,
            keyCode: event.keyCode,
            shiftKey: event.shiftKey,
            ctrlKey: event.ctrlKey,
            altKey: event.altKey,
            metaKey: event.metaKey,
            repeat: event.repeat,
            // removed due to errors with sending messages, you will have to work around it
            /*getModifierState: function(x) {
                    return event.getModifierState(x);
            },*/
        };
        //console.log(properties);
        window.postMessage({
            thirdparty: true,
            eventtype: 'keyup',
            event: properties
        });
    });
    addEventListener("keydown", (event) => {
        const properties = {
            type: event.type,
            key: event.key,
            keyCode: event.keyCode,
            shiftKey: event.shiftKey,
            ctrlKey: event.ctrlKey,
            altKey: event.altKey,
            metaKey: event.metaKey,
            repeat: event.repeat,
        };
        window.postMessage({
            thirdparty: true,
            eventtype: 'keydown',
            event: properties
        });
    });
}

if(location.href=="https://tpviewer.kilgorezer.com/fullplugin.js") {setTimeout(function(){
    window.i = document.body.innerText;
    document.body.innerHTML = '';
    document.head.innerHTML = (`
        <title>Third-Party Viewer</title>
        <link rel="stylesheet" href="https://www.connexus.com/_stylesheets/main.css?v=2016_i07"/>
        <style>
            a {text-decoration: none!important;}
            .stat {
                background: purple;
                border: 1mm solid purple;
                border-radius: 1mm;
                color: white;
            }
            tp-dialog {
                display: block;
                text-align: center;
                width: fit-content;
                position: relative;
                margin-left: auto;
                margin-right: auto;
                background: white;
                color: black;
                border: 2mm solid purple;
                padding: 0.75mm;
                padding-bottom: 2.75mm;
                border-radius: 1.25mm;
            }
            .icon {
                position: absolute;
                bottom: 0;
                right: 0;
                cursor: pointer;
                width: 5mm;
                height: 5mm;
            }
            tp-plugin {
                display: block;
                margin-bottom: 3px;
                text-decoration: none!important;
            }
            tp-text {
                text-decoration: underline!important;
            }
        </style>
    `);
    document.body.innerHTML = (`
        <div id=container>
            <h2>Website</h2>
            <hr/>
            <p>You can download additional plugins here.</p>
            <p>Here are the avalible plugins made by kilgorezer:</p>
            <h6><span class=stat>Responsive</span> means it supports the default viewer.<br/><br/>
            <span class=stat>Old</span> means it supports the legacy viewer.<br/><br/>
            <span class=stat>Loader</span> means it is a plugin loader</h6>
            <tp-dialog>
                Kilgorezer's Third-Party Plugins
                <hr/>
                <tp-plugin><a href="javascript:void(0)" onclick="open('#raw', '', 'popup')"><tp-text>Third-Party Viewer</tp-text> <h6 style=display:inline> <span class=stat>Loader</span> <span class=stat>Responsive</span> <span class=stat>Old</span></h6></a><br/></tp-plugin>
                <tp-plugin><a href="javascript:void(0)" onclick="open('/switchviewer.js', '', 'popup')"><tp-text>Switch Lesson Viewer</tp-text> <h6 style=display:inline> <span class=stat>Responsive</span> <span class=stat>Old</span></h6></a><br/></tp-plugin>
                <tp-plugin><a href="javascript:void(0)" onclick="open('/ainotes.js', '', 'popup')"><tp-text>AI-Generated Note Taker</tp-text> <h6 style=display:inline> <span class=stat>Responsive</span> <span class=stat>Old</span></h6></a><br/></tp-plugin>
                <tp-plugin><hr/>More plugins coming soon!<br/></tp-plugin>
                <!-- <img src="https://tpviewer.kilgorezer.com/settings.png" class="icon"/> -->
            </tp-dialog>
        </div>
    `);
    document.getElementById('container').style = (`
        text-align: center;
        margin: none;
        display: block;
        height: 100%;
        width: 100%;
        overflow-x: none;
        overflow-y: auto;
    `);
},0);}


/*if (location.pathname === "/homepage") {
    //window.tpoldhref = location.href;
    var i = function() {try{
        if (/ *location.href !== window.tpoldhref || !window.tpran* / true) {
            //console.log('conditional met');
            window.tpran = true;
            //window.tpoldhref = location.href;
            var tmp = document.createElement('span');
            document.getElementsByClassName("home-links")[0].children[0].appendChild(tmp);
            tmp.outerHTML = (`
                    <li>
                        <a id="tpconfig" href="javascript:void(0)">Third-Party Viewer Configuration</a>
                    </li>
                    <li>
                        <a id="tpinstructions" href="javascript:void(0)">How to use Third-party Viewer</a>
                    </li>
            `);
            document.getElementById('tpconfig').addEventListener("click", window.tpconfig);
            document.getElementById('tpinstructions').addEventListener("click", window.tpinstructions);
            clearInterval(window.tpint); // Clear the interval
            window.tpint = undefined;
        }
    }catch(e){}};

    localStorage.user_name = document.getElementsByTagName("pvs-header-user-greeting")[0].userName;
    window.tpint2 = setInterval(function() {
        if (document.querySelectorAll('a[href="#/student/links"]').length === 0) {
            return;
        }
        clearInterval(window.tpint2);
        document.querySelectorAll('a[href="#/student/links"]')[0].addEventListener("click", function(event) {
            if (!window.tpran) {
                if(window.tpint==undefined) {window.tpint = setInterval(i, 1)};
                console.log('Opened links');
            }
        });
        clearInterval(window.tpint2);
    }, 2000);

    if (location.href === "https://www.connexus.com/homepage#/student/links") {
        if(window.tpint==undefined) {window.tpint = setInterval(i, 1)};
    }

    if (!localStorage.tpran) {
        localStorage.tpran = "1";
        setTimeout(window.tpinstructions, 250);
    }
}*/

if (location.pathname === "/homepage") {
    if (!localStorage.tpran) {
        localStorage.tpran = "1";
        setTimeout(window.tpinstructions, 250);
    }
}

// Additional logic to handle hash changes
var previousHash = location.hash;
window.addEventListener('hashchange', function() {if (previousHash !== location.hash && location.hash === '#/student/links') {/*
    if (previousHash !== location.hash && location.hash === '#/student/links') {
        window.tpran = false; // Reset the flag
        setTimeout(i, 750); // Run the function again
    }
    previousHash = location.hash;*/
    var i = function() {try{
        if (/*location.href !== window.tpoldhref || !window.tpran*/ true) {
            //console.log('conditional met');
            window.tpran = true;
            //window.tpoldhref = location.href;
            var tmp = document.createElement('span');
            document.getElementsByClassName("home-links")[0].children[0].appendChild(tmp);
            tmp.outerHTML = (`
                    <li>
                        <a id="tpconfig" href="javascript:void(0)">Third-Party Viewer Configuration</a>
                    </li>
                    <li>
                        <a id="tpinstructions" href="javascript:void(0)">How to use Third-party Viewer</a>
                    </li>
            `);
            document.getElementById('tpconfig').addEventListener("click", window.tpconfig);
            document.getElementById('tpinstructions').addEventListener("click", window.tpinstructions);
            clearInterval(window.tpint); // Clear the interval
        }
    }catch(e){}};
    window.tpint = setInterval(i, 1);
    var previousHash = location.hash;
}});

(function(){
    var i = function() {try{
        if (/*location.href !== window.tpoldhref || !window.tpran*/ true) {
            //console.log('conditional met');
            window.tpran = true;
            //window.tpoldhref = location.href;
            var tmp = document.createElement('span');
            document.getElementsByClassName("home-links")[0].children[0].appendChild(tmp);
            tmp.outerHTML = (`
                    <li>
                        <a id="tpconfig" href="javascript:void(0)">Third-Party Viewer Configuration</a>
                    </li>
                    <li>
                        <a id="tpinstructions" href="javascript:void(0)">How to use Third-party Viewer</a>
                    </li>
            `);
            document.getElementById('tpconfig').addEventListener("click", window.tpconfig);
            document.getElementById('tpinstructions').addEventListener("click", window.tpinstructions);
            clearInterval(window.tpint); // Clear the interval
        }
    }catch(e){}};
    if (location.href === "https://www.connexus.com/homepage#/student/links") {
        if(window.tpint==undefined) {window.tpint = setInterval(i, 1)};
    }
})();


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
    tmp2.innerText=`Contains third-party plugins
Press F4 to configure`;
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
    var tmp3 = document.createElement('link');
    document.head.appendChild(tmp3);
    tmp3.outerHTML = (`
        <style>
            [third-party-utils] {
                background-image: url('https://tpviewer.kilgorezer.com/oldviewericon.png');
            }
            .lmuRightWindowSmall [third-party-utils] {
                background-image: url('https://tpviewer.kilgorezer.com/oldviewericonsmall.png');
            }
        </style>
    `);
	document.getElementsByClassName("toolbarList")[0].innerHTML += (`<li><a id="ctl00_thirdparty" third-party-utils title="Third-Party" class="lvIcon helpIcon" href="javascript:executeUserscript(localStorage.user_name)">Third-Party</a></li>`);
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
    /*event: {
        keyUp: function(reciever) {
            window.addEventListener('message', (event) => {
                if(event.data.thirdparty && event.data.eventtype=='keyup') {
                    reciever(event.data.event);
                }
            });
        },
        keyDown: function(reciever) {
            window.addEventListener('message', (event) => {
                if(event.data.thirdparty && event.data.eventtype=='keydown') {
                    reciever(event.data.event);
                }
            });
        },
    },*/// i will find a way to impliment this properly in a future version
}

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
        overflow-x: none;
        overflow-y: auto;
    `);
    return false;
};

window.tpidialog = function(window, document, location, console) {
    window.moveTo(10, 10);
    window.resizeTo(800, 600);
    document.head.innerHTML = (`
        <title>Third-Party Viewer Instructions</title>
        <link rel="stylesheet" href="https://www.connexus.com/_stylesheets/main.css?v=2016_i07"/>
        <style>
            .stat {
                background: purple;
                border: 1mm solid purple;
                border-radius: 1mm;
                color: white;
            }
            tp-dialog {
                display: block;
                text-align: center;
                width: fit-content;
                position: relative;
                margin-left: auto;
                margin-right: auto;
                background: white;
                color: black;
                border: 2mm solid purple;
                padding: 0.75mm;
                padding-bottom: 2.75mm;
                border-radius: 1.25mm;
            }
            .icon {
                position: absolute;
                bottom: 0;
                right: 0;
                cursor: pointer;
                width: 5mm;
                height: 5mm;
            }
            li {
                display: block;
                border-radius: 2mm;
                background: gray
                padding: 0.75mm;
                margin-top: 3mm;
                margin-bottom: 3mm;
            }
        </style>
    `);
    document.body.innerHTML = (`
        <div id=container>
            <h2>How To Use</h2>
            <hr/>
            <p>When you are in a lesson, click on the "Third-Party Plugins" button to show or hide the dialog.</p>
            <p>The dialog should look like this:</p>
            <tp-dialog>
                Third-Party Plugins
                <hr/>
                <a href="javascript:void(0)">Plugin 1</a><br/>
                <a href="javascript:void(0)">Plugin 2</a><br/>
                <a href="javascript:void(0)">Plugin 3</a><br/>
                ...<br/>
                <a href="javascript:void(0)">Plugin N</a><br/>
                <img src="https://tpviewer.kilgorezer.com/settings.png" class="icon"/>
            </tp-dialog><br/>
            <p>You can press <span class=stat>F4</span> to open the configuration anywhere, OR you can access it on any of the following pages:</p>
            <li><span class=stat>Lesson Viewer</span> <b>&gt;</b> <span class=stat>Third-Party Plugins</span> <b>&gt;</b> <span class=stat><img src="https://tpviewer.kilgorezer.com/settings.png" width=16 style="position:relative;top:3px;filter:invert(1)" alt="gear icon"/></span></li>
            <li><span class=stat>Homepage</span> <b>&gt;</b> <span class=stat>Links</span></li>
            <li><span class=stat>Account Settings</span> <b>&gt;</b> <span class=stat>My Defaults</span></li>
            <p>If you need a download link to download plugins that existed when this version came out, click on<a class="caButtonHolder" alt="this button" href="https://tpviewer.kilgorezer.com/fullplugin.js"><input type="button" value="this button" causesvalidation="false"></a>.</p>
            <p>Plugins are automatically installed by userscripts, meaning to disable them you have to disable the userscript that installs the plugin.</p>
            <p>To open a plugin, just click on its link in the <span class=stat>Third-Party Plugins</span> menu.</p>
            <hr/>
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
        overflow-x: none;
        overflow-y: auto;
    `);
    return false;
};
})();})();