// ==UserScript==
// @name         QuickReuse
// @version      1.0
// @description  可以便捷的把帖子打捞回原有版面的插件。说明书见224.
// @author       InfSein
// @grant        none
// @run-at       document-end
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
        func(obj[i]);
    }
}

function getButtons(post_info) {
    return post_info;
}

var post_infos = document.getElementsByClassName('postInfo');

function generate_moveBack(pid, score, orifid) { // 打捞器
    var template = getButtons(post_infos[0]).getElementsByTagName('a')[0].cloneNode(true);
    template/*.firstElementChild.firstElementChild*/.innerHTML = score;

    var opt = orifid;
    template.href = "javascript:__NUKE.doRequest({ u:__API.topicMove2(__CURRENT_TID,  "+opt+",  0,  '',  2048,  '', '' ), b:this })";
    template.title = "移动回原有版面";
    template.style.marginLeft=buttons_gap+"em";
    return template;
}

forEach(post_infos, function(o) {
    var buttons = getButtons(o);
    var orifid = buttons.firstElementChild.href;
    orifid = orifid.substr(34, orifid.length);
    var oriornot = (orifid==0)?0:1;
    var pid = buttons.parentElement/*.parentElement*/.firstElementChild.id;
    pid = pid.substr(3, pid.length - 9);
    console.log(orifid);

    var fp = buttons.parentElement.id;
    //var uid = document.getElementsByName('uid');
    fp = fp.substr(13);console.log(fp);
    var uid = document.getElementsByName('uid')[fp%20].text;
    if(pid==0) // 'target: Theme'
    {
        if(__GP.admincheck) {
            if(oriornot==1)
                buttons.appendChild(generate_moveBack(pid, '[<b>&#8634;</b>]', orifid));
        }
    }
});
