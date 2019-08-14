// ==UserScript==
// @name 崇高的幻象Ex
// @version 1.0
// @author Icyblade,fline放开那只猫,InfSein
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
    //return post_info.getElementsByTagName('a')[1];
    return post_info;
}


var post_infos = document.getElementsByClassName('postInfo');

function generate_addScore(pid, score) {
    var template = getButtons(post_infos[0]).children[2].cloneNode(true);
    template/*.firstElementChild.firstElementChild*/.innerHTML = '+'+score;

    var opt = {
        15: '21', 30: '37', 45: '69'
    };
    template.href = "javascript:__NUKE.doRequest({ u: { u: __API._base, a: { __lib: 'add_point_v3', __act: 'add', opt: "+opt[score]+", fid: __CURRENT_FID, tid: __CURRENT_TID, pid: "+pid+", info: '', value: ' ', raw: 3 } }, b: undefined, })";
    template.title = "评分操作";
    template.style.marginLeft=buttons_gap+"em";
    return template;
}

function generate_themeDown(pid, score) {
    var template = getButtons(post_infos[0]).children[2].cloneNode(true);
    template/*.firstElementChild.firstElementChild*/.innerHTML = score;

    var opt = {
        Down: '1', Up: ' '
    };
    template.href = "javascript:__NUKE.doRequest({u: __API.topicPush(__CURRENT_TID, 1), b: undefined, })";
    template.title = "将主题下沉";
    template.style.marginLeft=buttons_gap+"em";
    return template;
}

function generate_themeLock(pid, score) {
    var template = getButtons(post_infos[0]).children[2].cloneNode(true);
    template/*.firstElementChild.firstElementChild*/.innerHTML = score;

    var opt = {
        Lock: '1024', Hide: '2', Delete: '1026', Clear: '0'
    };
    var oct = (opt[score]=='0')?1538:0; // AU:512

    template.href = "javascript:__NUKE.doRequest({u:__API.setPost(__CURRENT_TID,0,0,"+opt[score]+","+oct+",'','',0,__CURRENT_FID),b: undefined, })";
    template.title = "锁定类操作";
    template.style.marginLeft=buttons_gap+"em";
    return template;
}
function generate_postLock(pid, score) {
    var template = getButtons(post_infos[0]).children[2].cloneNode(true);
    template/*.firstElementChild.firstElementChild*/.innerHTML = score;

    var opt = {
        Lock: '1024', Hide: '2', Delete: '1026', Clear: '0'
    };
    var oct = (opt[score]=='0')?1026:0;

    template.href = "javascript:__NUKE.doRequest({u:__API.setPost([__CURRENT_TID,"+pid+"],0,0,"+opt[score]+","+oct+",'','',0,__CURRENT_FID),b: undefined, })";
    template.title = "(回复的)锁定类操作";
    template.style.marginLeft=buttons_gap+"em";
    return template;
}

function generate_moveForum(pid, score) {
    var template = getButtons(post_infos[0]).children[2].cloneNode(true);
    template/*.firstElementChild.firstElementChild*/.innerHTML = score;

    var opt = {
        范例: '538', 范例II: '582'
    };
    template.href = "javascript:__NUKE.doRequest({ u:__API.topicMove2(__CURRENT_TID,  "+opt[score]+",  0,  '',  2048,  '', '' ), b:this })";
    //template.href = "javascript:__NUKE.doRequest({ u:__API.topicMove2(__CURRENT_TID,  "+opt[score]+",  1,  '请发到"+score+"',  2048,  '', '' ), b:this })";
    template.title = "移动";
    template.style.marginLeft=buttons_gap+"em";
    return template;
}

function generate_moveStack(pid, score) {
    var template = getButtons(post_infos[0]).children[2].cloneNode(true);
    template/*.firstElementChild.firstElementChild*/.innerHTML = score;

    var opt = {
        范例: '13837564', 范例II: '15813886'
    };
    template.href = "javascript:__NUKE.doRequest({ u:__API.topicMove2(__CURRENT_TID,  __CURRENT_FID,  0,  '',  2048,  '', "+opt[score]+" ), b:this })";
    //template.href = "javascript:__NUKE.doRequest({ u:__API.topicMove2(__CURRENT_TID,  __CURRENT_FID,  1,  '请发到"+score+"',  2048,  '', "+opt[score]+" ), b:this })";
    template.title = "移动(合集)";
    template.style.marginLeft=buttons_gap+"em";
    return template;
}

function generate_moveDel(pid, score) {
    var template = getButtons(post_infos[0]).children[2].cloneNode(true);
    template/*.firstElementChild.firstElementChild*/.innerHTML = score;

    var opt = {
        删除: ''
    };
    template.href = "javascript:__NUKE.doRequest({ u:__API.topicMove2(__CURRENT_TID,  '',  '',  'default(违规/无意义/不合适内容/多开)',  1,  '', '' ), b:this })";
    template.title = "删除主题";
    template.style.marginLeft=buttons_gap+"em";
    return template;
}

function generate_stackOut(pid, score) {
    var template = getButtons(post_infos[0]).children[2].cloneNode(true);
    template/*.firstElementChild.firstElementChild*/.innerHTML = score;

    var opt = {
        移出合集: '1'
    };
    template.href = "javascript:__NUKE.doRequest({ u:__API.topicMove2(__CURRENT_TID,  '',  0,  '',  2,  '', '' ), b:this })";
    //template.href = "javascript:__NUKE.doRequest({ u:__API.topicMove2(__CURRENT_TID,  '',  1,  '发错版面',  2,  '', '' ), b:this })";
    template.title = "移出合集";
    template.style.marginLeft=buttons_gap+"em";
    return template;
}

function generate_Mute(pid, score) {
    var template = getButtons(post_infos[0]).children[2].cloneNode(true);
    template/*.firstElementChild.firstElementChild*/.innerHTML = score;

    var opt = {
        队形: '2192', 发错版面: '2208', 海豹: '2240' // 都是全版面禁言 禁言2天: '2192', 禁言4天: '2208', 禁言6天: '2240',
    };
    template.href = "javascript:__NUKE.doRequest({u:__API.lesserNuke2(__CURRENT_TID, "+pid+", "+opt[score]+", '' , '"+score+"',''),b:this,inline:true})";
    template.title = "禁言";
    template.style.marginLeft=buttons_gap+"em";
    return template;
}

forEach(post_infos, function(o) { // 主框架
    var buttons = getButtons(o);
    var pid = buttons.parentElement/*.parentElement*/.firstElementChild.id;
    pid = pid.substr(3, pid.length - 9);
    console.log(pid);

    if(pid!=0){ // pid不为0，生效对象为回复
        buttons.appendChild(generate_Mute(pid, '队形'));
        buttons.appendChild(generate_postLock(pid, 'Delete'));
        buttons.appendChild(generate_postLock(pid, 'Clear'));
        buttons.appendChild(generate_addScore(pid, '15'));
        buttons.appendChild(generate_addScore(pid, '30'));
    }
    else{ // 生效对象为主题
        buttons.appendChild(generate_themeLock(pid, 'Lock'));
            buttons.appendChild(generate_themeLock(pid, 'Hide'));
            buttons.appendChild(generate_themeLock(pid, 'Delete'));
            buttons.appendChild(generate_themeLock(pid, 'Clear'));
            buttons.appendChild(generate_themeDown(pid, 'Down')); // Theme.controller
            post_infos[0].insertAdjacentHTML('beforeend', '<br>'); // 换行
        buttons.appendChild(generate_Mute(pid, '发错版面'));
            buttons.appendChild(generate_moveDel(pid, '删除'));
    }
});