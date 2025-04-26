// ==UserScript==
// @name         Third-Party Viewer
// @namespace    https://tpviewer.kilgorezer.com/
// @version      2.5
// @description  Third-Party Plugins for Connexus Lesson Viewer
// @author       kz-school
// @match        *://*.connexus.com/*
// @match        *://*.pearson.com/*
// @match        *://*.connectionsacademy.com/*
// @match        *://edynamiclearningcdn.com/*
// @match        *://*.edynamiclearningcdn.com/*
// @match        *://tpviewer.kilgorezer.com/*
// @run-at       document-body
// @icon         https://tpviewer.kilgorezer.com/favicon.ico
// @downloadURL  https://tpviewer.kilgorezer.com/fullplugin.user.js
// @updateURL    https://tpviewer.kilgorezer.com/fullplugin.user.js
// @grant        none
// ==/UserScript==
// Ultimate Event Update

// The loader scheme follows this format: majordigit2andaboveplus1.majordigit1[.0.minordigit]
// The official plugin scheme follows this format: majordigit2andaboveplus1.majordigit1.plugindigit[.minordigit]
// So, this is version 15.
(function() {

// jQuery is already in the lesson viewer, so I removed the module from here.
// That fixed a bug related to start lesson... Why did it fix it...

// My code
(function(){if(!window.tpitems){window.tpitems=[];}

window.tp_version = 2.5;

if(location.hostname=='tpviewer.kilgorezer.com' && location.pathname=="/") {
    console.log('I\'m Home!');
    setTimeout(function(){document.getElementsByTagName('a')[0].click()},0);
}

window.tpopendialog = function(onload) {
    var j = open("about:blank", "", "resizable=0,popup");
    onload(j, j.document, j.location, j.console, window); // Chromium
    j.onload = function(){onload(j, j.document, j.location, j.console, window)}; // Firefox
};

window.tpconfig = function() {
    window.tpopendialog(window.tpdialog);
};

window.tpinstructions = function() {
    window.tpopendialog(window.tpidialog);
};

if(true) {
    addEventListener("keyup", (event) => {
        if((event.key.toUpperCase() == "F1" && event.altKey) || (event.key.toUpperCase() == "\\" && event.altKey) || event.key.toUpperCase() == "F13") {
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
        window.top.postMessage({
            thirdparty: true,
            eventtype: 'keyup',
            event: properties,
            origin: location.pathname,
        }, 'https://www.connexus.com');
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
        window.top.postMessage({
            thirdparty: true,
            eventtype: 'keydown',
            event: properties,
            origin: location.pathname,
        }, 'https://www.connexus.com');
    });
}

window.addEventListener('message', function(event) {
    var origin = event.origin;
    let isSafe = false;

    if (origin.endsWith('.connexus.com') && origin.startsWith('https://')) {
        isSafe = true;
    } else if (origin.endsWith('.pearson.com') && origin.startsWith('https://')) {
        isSafe = true;
    } else if (origin.endsWith('.connectionsacademy.com') && origin.startsWith('https://')) {
        isSafe = true;
    } else if (origin.endsWith('.edynamiclearningcdn.com') && origin.startsWith('https://')) {
        isSafe = true;
    } else if (origin === 'https://edynamiclearningcdn.com') {
        isSafe = true;
    } else if (origin === 'https://tpviewer.kilgorezer.com') {
        isSafe = true;
    }

    if (isSafe) {
        var data = event.data;
        try {
            if(data.thirdparty && data.eventtype.startsWith('key')) {
                if(data.origin.startsWith("/login") || data.origin.startsWith("/webuser/")) {throw"";};
                var props = data.event;
                if(props.keyCode === undefined) {throw"";}
                //console.log('Properties:', props);
                const keyboardEvent = new CustomEvent('tpkeyboard', {
                    detail: {
                        data: props,
                        type: data.eventtype
                    }
                });
                setTimeout(()=>{window.dispatchEvent(keyboardEvent)},0);
            }
        } catch(e) {return;}
    } else {
        console.warn('Message from unsafe origin:', origin);
    }
});

if(location.href=="https://tpviewer.kilgorezer.com/fullplugin.js") {/*setTimeout(function(){*/
    window.i = document.body.innerText;
    document.body.innerHTML = '';
    document.head.innerHTML = (`
        <title>Third-Party Viewer</title>
        <link rel="icon" href="https://tpviewer.kilgorezer.com/favicon.ico">
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
            <h2>Plugin Website</h2>
            <hr/>
            <p>You can download additional plugins here.</p>
            <p>Here are the avalible plugins made by kz-school:</p>
            <h6><span class=stat>Responsive</span> means it supports the default viewer.<br/><br/>
            <span class=stat>Old</span> means it supports the legacy viewer.<br/><br/>
            <span class=stat>Loader</span> means it is a plugin loader<br/><br/>
            <span class=stat>Viewer</span> means it applies in the context of the lesson contents.</h6>
            <tp-dialog>
                KZ-School's Third-Party Plugins
                <hr/>
                <tp-plugin><a href="javascript:void(0)" onclick="open('#raw', '', 'popup')"><tp-text>Third-Party Viewer</tp-text> <h6 style=display:inline> <span class=stat>Loader</span> <span class=stat>Responsive</span> <span class=stat>Old</span> <span class=stat>Viewer</span></h6></a><br/></tp-plugin>
                <tp-plugin><a href="javascript:void(0)" onclick="open('/switchviewer.user.js', '', 'popup')"><tp-text>Switch Lesson Viewer</tp-text> <h6 style=display:inline> <span class=stat>Responsive</span> <span class=stat>Old</span></h6></a><br/></tp-plugin>
                <tp-plugin><a href="javascript:void(0)" onclick="open('/ainotes.user.js', '', 'popup')"><tp-text>AI-Generated Note Taker</tp-text> <h6 style=display:inline> <span class=stat>Responsive</span> <span class=stat>Old</span></h6></a><br/></tp-plugin>
                <tp-plugin><a href="javascript:void(0)" onclick="open('/mathjaxfix.user.js', '', 'popup')"><tp-text>Stand-alone MathJax Bugfix for Chromium</tp-text> <h6 style=display:inline> <span class=stat>Viewer</span></h6></a><br/></tp-plugin>
                <tp-plugin><a href="javascript:void(0)" onclick="open('/teachers.user.js', '', 'popup')"><tp-text>Scrollable Teachers View</tp-text></a><br/></tp-plugin>
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
/*},0);*/}


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

var replaceEvent = async function() {
    if (localStorage.tpdisableevent == "1") {return '';}
    var eremoved = true;
    while(eremoved) {
        if (document.getElementsByClassName('st-events-section').length > 0) {
            document.getElementsByClassName('st-events-section')[0].outerHTML = `<iframe id="tpframe" class="ct-user-box" src="/plannerpage" width="100%" style="height: 30vw;"></iframe>`;
            // Please note this error seems to be related to how the content window is used in the content window, this is to prevent the code from modifying the parent.
            document.getElementById('tpframe').contentWindow.onload = ()=>{(function(window, realwindow) {(function(document, location, console, setInterval) {
                window.document.getElementsByClassName('header-skeleton')[0].remove();
                window.document.getElementsByClassName('pvs-footer-wrapper')[0].remove();
                setInterval(()=>{
                    window.document.getElementById('pageTitleHeaderText').innerText = 'Your Events';
                },100);
            })(window.document, window.location, window.console, window.setInterval);})(document.getElementById('tpframe').contentWindow, window);};
            eremoved = false;
        } else {
            await new Promise(resolve => setTimeout(resolve, 100));
        }
    }
}

if (location.pathname === "/homepage") {
    if (!localStorage.tpran) {
        localStorage.tpran = "1";
        setTimeout(window.tpinstructions, 250);
    }
    if (location.hash = "#/student/today") {
        replaceEvent();
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
} else if (previousHash !== location.hash && location.hash === '#/student/today') {
    replaceEvent();
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
			    	<a class="caButtonHolder" onclick="localStorage.legacylogin='1';document.getElementById('legacyloginstat').innerText='2021'" href="javascript:void(0);"><input type="button" value="2021" causesvalidation="false"></a>
			    	<a class="caButtonHolder" onclick="localStorage.legacylogin='2';document.getElementById('legacyloginstat').innerText='Mid 2024'" href="javascript:void(0);"><input type="button" value="Mid 2024" causesvalidation="false"></a>
			    	<a class="caButtonHolder" onclick="localStorage.clear('legacylogin');document.getElementById('legacyloginstat').innerText='off'" href="javascript:void(0);"><input type="button" value="Off" causesvalidation="false"></a>
			    </span>
			    <span class="formHelp"> Enable or disable 2021-style login screen. Currently <span id='legacyloginstat'>error</span>.</span>
		    </td>
	    </tr>
	    <tr id="thirdPartyConfig">
		    <td class="formLabel">Event Style:</td>
		    <td>
		    	<span id="tpoptions" class=" field">
			    	<a class="caButtonHolder" onclick="localStorage.clear('tpdisableevent');document.getElementById('tpevent').innerText='planner-based'" href="javascript:void(0);"><input type="button" value="Planner-Based" causesvalidation="false"></a>
			    	<a class="caButtonHolder" onclick="localStorage.tpdisableevent='1';document.getElementById('tpevent').innerText='legacy'" href="javascript:void(0);"><input type="button" value="Legacy" causesvalidation="false"></a>
			    </span>
			    <span class="formHelp"> Change event type. Currently <span id='tpevent'>error</span>.</span>
		    </td>
	    </tr>
    `) // legacylogin based on https://web.archive.org/web/20210903173755if_/https://www.connexus.com/login.aspx?sendTo=%2fDefault.aspx&token=826516348
    document.getElementById('tpstat').innerText = localStorage.disabletp ? "off" : "on";
    document.getElementById('legacyloginstat').innerText = localStorage.legacylogin=='1'?"2021":(localStorage.legacylogin=='2'?"Mid 2024":"off");
    document.getElementById('tpevent').innerText = localStorage.tpdisableevent ? "legacy" : "planner-based";
}

if(location.pathname=='/login'&&location.hostname=='www.connexus.com'&&localStorage.legacylogin) {
    location.pathname="/loginNative.aspx";
    document.getElementsByTagName('title')[0].innerText="Skipping login stage 1, please wait...";
    document.body.outerHTML = (`
        <body style="display:flex;background-color:#eee;width:100vw;height:100vh;margin:0;justify-content:center;align-items:center;overflow:hidden">
            <img src="https://www.connexus.com/content/chrome/online/_images/lvLoadingIcon.gif" style="width:40vh;aspect-ratio:1/1;image-rendering: crisp-edges"/>
        </body>
    `);
}

if(location.pathname=='/loginNative.aspx'&&location.hostname=='www.connexus.com'&&localStorage.legacylogin=="1") {
    document.getElementById('bgBranding').children[0].style = "background-image: url('/images/login/defaultBG_metal-min.png')!important";
    var i = document.getElementById('bgBranding').children[0].style.animation;
    document.getElementById('bgBranding').children[0].style.animation = 'none';
    document.getElementById('bgBranding').children[0].offsetHeight;
    document.getElementById('bgBranding').children[0].style.animation = '';
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
    document.getElementsByTagName("title")[0].innerText="Welcome to Connexus | The Education Management System";
}

if(location.pathname=='/loginNative.aspx'&&location.hostname=='www.connexus.com'&&localStorage.legacylogin=="2") {
    document.getElementById('loginLogoImage').src = "https://www.connexus.com/_skin/supportFiles/1/572000-762022-104237-PM-209780856.png";
    document.getElementsByClassName('welcomeTitle')[0].innerText = "Welcome to Pearson Online Classroom";
}

if(location.pathname.startsWith('/login')&&location.hostname=='www.connexus.com'&&(!localStorage.disabletp)) {
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
Press Alt+F1 or Alt+\\ to configure`;
    var tmp3 = document.createElement('tp-popup');
    tmp3.style=(`
        display: block;
        position: absolute;
        bottom: 0.1mm;
        right: 0.1mm;
        text-align: center;
        background: #ffffff88;
        color: black;
        border: 1px solid #bfb4ae;
        box-shadow: 0 0 2px rgba(0, 0, 0, 0.3);
        max-height: 95%;
        overflow: auto;
        border-radius: 1.25mm;
    `);
    document.getElementsByClassName('loginFooter')[0].appendChild(tmp3);
    tmp3.innerText=`Third-Party Viewer uses optional popups to improve your experience. Any malfunctions are likely due to site updates or incompatibility.`;
}

if(location.pathname=="/content/chrome/online/lessonViewer_responsive.aspx"&&(!localStorage.disabletp)&&location.hostname=='www.connexus.com') {try{
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
}catch(e){console.log(e)}}

if(location.pathname=="/content/chrome/online/lessonViewer.aspx"&&(!localStorage.disabletp)&&location.hostname=='www.connexus.com') {
    var tmp4 = document.createElement('link');
    document.head.appendChild(tmp4);
    tmp4.outerHTML = (`
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
    },*/// i found a way to impliment this properly but leaving this old piece of code
    event: {
        keyUp: function(reciever) {
            window.addEventListener('tpkeyboard', function({detail}) {
                if (detail.type == 'keyup') {reciever(detail.data)}
            });
        },
        keyDown: function(reciever) {
            window.addEventListener('tpkeyboard', function({detail}) {
                if (detail.type == 'keydown') {reciever(detail.data)}
            });
        }
    },
}

window.tpdialog = function(window, document, location, console, realwindow) {
    console.log('button clicked');
    window.moveTo(10, 10);
    window.resizeTo(600, 300);
    document.head.innerHTML = (`
        <title>Third-Party Viewer Configuration</title>
        <link rel="stylesheet" href="https://www.connexus.com/_stylesheets/main.css?v=2016_i07"/>
        <link rel="icon" type="image/png" href="https://tpviewer.kilgorezer.com/settings.png">
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
			<a class="caButtonHolder" onclick="localStorage.legacylogin='1';document.getElementById('legacyloginstat').innerText='Currently 2021.'" href="javascript:void(0);"><input type="button" value="Set to 2021" causesvalidation="false"></a>
            <a class="caButtonHolder" onclick="localStorage.legacylogin='2';document.getElementById('legacyloginstat').innerText='Currently Mid 2024.'" href="javascript:void(0);"><input type="button" value="Set to Mid 2024" causesvalidation="false"></a>
            <span id=legacyloginstat class=stat>Currently ${localStorage.legacylogin=='1'?"2021":(localStorage.legacylogin=='2'?"Mid 2024":"off")}.</span></span>
			<a class="caButtonHolder" onclick="localStorage.clear('legacylogin');document.getElementById('legacyloginstat').innerText='Currently off.'" href="javascript:void(0);"><input type="button" value="Turn Off Legacy Login" causesvalidation="false"></a><br/>
			<a class="caButtonHolder" onclick="localStorage.clear('tpdisableevent');document.getElementById('tpevent').innerText='Currently planner-based.'" href="javascript:void(0);"><input type="button" value="Planner-Based Events" causesvalidation="false"></a>
            <span id=tpevent class=stat>Currently ${localStorage.tpdisableevent?"legacy":"planner-based"}.</span>
			<a class="caButtonHolder" onclick="localStorage.tpdisableevent='1';document.getElementById('tpevent').innerText='Currently legacy.'" href="javascript:void(0);"><input type="button" value="Legacy Events" causesvalidation="false"></a><br/>
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

window.tpidialog = function(window, document, location, console, realwindow) {
    window.moveTo(10, 10);
    window.resizeTo(600, 437); // The 37 in 437 is intentional and I picked it because of its intresting properties. I kept it because the window ended up looking nice.
    window.tp_utils = realwindow.tp_utils;
    document.head.innerHTML = (`
        <title>Third-Party Viewer Instructions</title>
        <link rel="stylesheet" href="https://www.connexus.com/_stylesheets/main.css?v=2016_i07"/>
        <link rel="icon" type="image/png" href="https://tpviewer.kilgorezer.com/help.png">
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
            <p>You can press <span class=stat>Alt+F1</span> or <span class=stat>Alt+\\</span> to open the configuration anywhere, OR you can access it on any of the following pages:</p>
            <li><span class=stat>Lesson Viewer</span> <b>&gt;</b> <span class=stat>Third-Party Plugins</span> <b>&gt;</b> <span class=stat><img src="https://tpviewer.kilgorezer.com/settings.png" width=16 style="position:relative;top:3px;filter:invert(1)" alt="gear icon"/></span></li>
            <li><span class=stat>Homepage</span> <b>&gt;</b> <span class=stat>Links</span> <b>&gt;</b> <span class=stat>Third-Party Viewer Configuration</span></li>
            <li><span class=stat>Account Settings</span> <b>&gt;</b> <span class=stat>My Defaults</span><br/>
            <a class="caButtonHolder" onclick="tp_utils.config()" href="javascript:void(0);"><input type="button" value="This page, by clicking here!"></a></li>
            <p>If you need a download link to download plugins that existed when this version came out, click on<a class="caButtonHolder" alt="this button" href="https://tpviewer.kilgorezer.com/fullplugin.js"><input type="button" value="this button" causesvalidation="false"></a>.</p>
            <p>Plugins are automatically installed by userscripts, meaning to disable them you have to disable the userscript that installs the plugin.</p>
            <p>To open a plugin, just click on its link in the <span class=stat>Third-Party Plugins</span> menu.</p>
            <hr/>
            <p>You can access this menu at any time by clicking on</p>
            <p><span class=stat>Homepage</span> <b>&gt;</b> <span class=stat>Links</span> <b>&gt;</b> <span class=stat>How to use Third-party Viewer</span></p>
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
