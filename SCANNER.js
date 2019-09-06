// ==UserScript==
// @name         SCANNER
// @version      1.0
// @author       InfSein
// @run-at document-end
// @grant none
// @match        http*://bbs.nga.cn/read.php*
// @match        http*://bbs.ngacn.cc/read.php*
// @match        http*://nga.178.com/read.php*
// @match        http*://ngabbs.com/read.php*
// ==/UserScript==

var buttons_gap=0.5;//默认0.7 ，最小可设为0 。

function doIfExists(obj, func) {
    if (!(obj === undefined || obj === null)) {
        return func(obj);
    }
}

function forEach(obj, func) {
    var len = obj.length;
    for (var i=0; i<len; i++) {
        //for (var i=0; i<1; i++) {
        func(obj[i]);
    }
}

function getButtons(post_info) {
    //return post_info.getElementsByTagName('a');
    return post_info;
}

var post_infos = document.getElementsByClassName('postInfo');

function generate_Scan(pid, score){
    var template = getButtons(post_infos[0]).getElementsByClassName('small_colored_text_btn block_txt_c0 stxt')[1].cloneNode(true);
    template/*.firstElementChild.firstElementChild*/.innerHTML = score;

    var opt = {
        Scan: ''
    };
    //template.href = "javascript:__NUKE.doRequest({u:{u:__API._base+'__lib=admin_log_search&__act=search&from=&to=&id=',a:{type:'',about:__CURRENT_TID,page:1,raw:3}},b:'o'})";
    template.href = "javascript:adminui.viewLog('','','',__CURRENT_TID)";
    template.title = "调查操作";
    template.style.marginLeft=buttons_gap+"em";
    return template;
}

forEach(post_infos, function(o) {
    var buttons = getButtons(o);
    var pid = buttons.parentElement/*.parentElement*/.firstElementChild.id;
    pid = pid.substr(3, pid.length - 9);
    console.log(pid);
    if(pid==0)
        buttons.appendChild(generate_Scan(pid, 'Scan'));

});