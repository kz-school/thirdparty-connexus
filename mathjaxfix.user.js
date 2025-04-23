// ==UserScript==
// @name         MathJax Fix
// @namespace    http://tpviewer.kilgorezer.com/
// @version      1.4
// @description  Fix MathJax on Connexus on Supermium
// @author       kilgorezer
// @match        https://prodpcx-cdn-vegaviewer.emssvc.connexus.com/index.html?*
// @icon         https://www.connexus.com/favicon.ico
// @downloadURL  https://github.com/kz-school/thirdparty-connexus/raw/refs/heads/main/mathjaxfix.user.js
// @updateURL    https://github.com/kz-school/thirdparty-connexus/raw/refs/heads/main/mathjaxfix.user.js
// @grant        none
// ==/UserScript==

(function() {
    setTimeout(a=>{window.MathJax.Hub.queue.pending=1;}, 1000);
})();
