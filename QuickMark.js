// ==UserScript==
// @name         QuickMark
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  一键为楼层的用户添加备注。请谨慎检查使用。
// @grant none
// @run-at document-end
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

function forEach(obj, i, func) {
    var len = obj.length;
    for (i=0; i<len; i++) {
        //for (var i=0; i<1; i++) {
        func(obj[i]);
    }
}

function getButtons(post_info) {
    //return post_info.getElementsByTagName('a');
    return post_info;
}

var post_infos = document.getElementsByClassName('postInfo');
var i = 0;

function generate_Mark(pid, uid, score) {
    var template = getButtons(post_infos[0]).getElementsByClassName('small_colored_text_btn block_txt_c0 stxt')[0].cloneNode(true);
    template/*.firstElementChild.firstElementChild*/.innerHTML = score;
    var opt = {
        Mark: 'FF14招募事件闹事者' // 自定义备注内容
    };
    template.href = "javascript:__NUKE.doRequest({u:__API.remarkAdd("+uid+",'"+opt[score]+"',0),b:this});";
    template.title = "添加备注";
    template.style.marginLeft=buttons_gap+"em";
    return template;
}
forEach(post_infos, i, function(o) {
    var buttons = getButtons(o);
    var users = getButtons(o);
    var pid = buttons.parentElement/*.parentElement*/.firstElementChild.id;
    var fp = buttons.parentElement.id;
    //var uid = document.getElementsByName('uid');
    pid = pid.substr(3, pid.length - 9);
    fp = fp.substr(13);
    var uid = document.getElementsByName('uid')[fp%20].text;
    console.log(uid);
    buttons.appendChild(generate_Mark(pid, uid, 'Mark'));
});
