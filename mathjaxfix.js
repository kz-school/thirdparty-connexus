// ==UserScript==
// @name         MathJax Fix
// @namespace    http://tpviewer.kilgorezer.com/
// @version      1.1
// @description  Fix MathJax on Connexus on Supermium
// @author       kilgorezer
// @match        https://prodpcx-cdn-vegaviewer.emssvc.connexus.com/index.html
// @icon         https://www.connexus.com/favicon.ico
// @downloadURL  https://github.com/kz-school/thirdparty-connexus/raw/refs/heads/main/mathjaxfix.js
// @updateURL    https://github.com/kz-school/thirdparty-connexus/raw/refs/heads/main/mathjaxfix.js
// @grant        none
// ==/UserScript==

(function() {
    window.MathJax = undefined;
})();
