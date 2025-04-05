// ==UserScript==
// @name         MathJax Fix
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Fix MathJax on Connexus on Supermium
// @author       kilgorezer
// @match        https://prodpcx-cdn-vegaviewer.emssvc.connexus.com/index.html
// @icon         https://www.connexus.com/favicon.ico
// @grant        none
// ==/UserScript==

(function() {
    window.MathJax = undefined;
})();
