// ==UserScript==
// @name         崇高的幻象EX
// @version      1.0
// @description  利用论坛的html元素增殖按钮以协助进行版务操作。不建议尚不熟悉版务且没有撤销操作权限的副版主使用。
// @author       InfSein
// @authors      icyblade(原作者), fline放开那只猫
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

function generate_addScore(pid, score) { // 加分，opt的数值会影响加分的数量和其他参数。详见 tid=16070321 的3.1.0部分。
    var template = getButtons(post_infos[0]).getElementsByClassName('small_colored_text_btn block_txt_c0 stxt')[1].cloneNode(true);
    template/*.firstElementChild.firstElementChild*/.innerHTML = '+'+score;

    var opt = {
        15: '21', 30: '37', 45: '69'
    };
    template.href = "javascript:__NUKE.doRequest({ u: { u: __API._base, a: { __lib: 'add_point_v3', __act: 'add', opt: "+opt[score]+", fid: __CURRENT_FID, tid: __CURRENT_TID, pid: "+pid+", info: '', value: ' ', raw: 3 } }, b: undefined, })";
    template.title = "加分";
    template.style.marginLeft=buttons_gap+"em";
    return template;
}

function generate_themeDown(pid, score) { // 提前(Up)或下沉(Down)主题。
    var template = getButtons(post_infos[0]).getElementsByClassName('small_colored_text_btn block_txt_c0 stxt')[1].cloneNode(true);
    template/*.firstElementChild.firstElementChild*/.innerHTML = score;

    var opt = {
        Down: '1', Up: ' '
    };
    template.href = "javascript:__NUKE.doRequest({u: __API.topicPush(__CURRENT_TID, 1), b: undefined, })";
    template.title = "提前(Up)或下沉(Down)主题";
    template.style.marginLeft=buttons_gap+"em";
    return template;
}

function generate_themeLock(pid, score) { // 主题的锁定类操作。
    var template = getButtons(post_infos[0]).getElementsByClassName('small_colored_text_btn block_txt_c0 stxt')[1].cloneNode(true);
    template/*.firstElementChild.firstElementChild*/.innerHTML = score;

    var opt = {
        Lock: '1024', Hide: '2', Delete: '1026', Clear: '0', Block: '16384'
    };
    var oct = (opt[score]=='0')?67126786:0; // AU:512 | 屏蔽:16384 | 审核未通过:67108864

    template.href = "javascript:__NUKE.doRequest({u:__API.setPost(__CURRENT_TID,0,0,"+opt[score]+","+oct+",'','',0,__CURRENT_FID),b: undefined, })";
    template.title = "锁定类操作";
    template.style.marginLeft=buttons_gap+"em";
    return template;
}
function generate_postLock(pid, score) { // 回复的锁定类操作。
    var template = getButtons(post_infos[0]).getElementsByClassName('small_colored_text_btn block_txt_c0 stxt')[1].cloneNode(true);
    template/*.firstElementChild.firstElementChild*/.innerHTML = score;

    var opt = {
        Lock: '1024', Hide: '2', Delete: '1026', Clear: '0', Block: '16384'
    };
    var oct = (opt[score]=='0')?67126786:0; // 副版不能解除屏蔽，故将此数值减去16384才可以使用

    template.href = "javascript:__NUKE.doRequest({u:__API.setPost([__CURRENT_TID,"+pid+"],0,0,"+opt[score]+","+oct+",'','',0,__CURRENT_FID),b: undefined, })";
    template.title = "锁定类操作";
    template.style.marginLeft=buttons_gap+"em";
    return template;
}

function generate_moveForum(pid, score) { // 版面之间的移动。会发送PM。
    var template = getButtons(post_infos[0]).getElementsByClassName('small_colored_text_btn block_txt_c0 stxt')[1].cloneNode(true);
    template/*.firstElementChild.firstElementChild*/.innerHTML = score;

    var opt = {
        互助招募版面: '582' // 范例。当按钮内容是“互助招募版面”时会将主题移动到FID为582的版面中，并发送PM“请发到互助招募版面”。
    };
    template.href = "javascript:__NUKE.doRequest({ u:__API.topicMove2(__CURRENT_TID,  "+opt[score]+",  0,  '',  2048,  '', '' ), b:this })";
    //template.href = "javascript:__NUKE.doRequest({ u:__API.topicMove2(__CURRENT_TID,  "+opt[score]+",  1,  '请发到"+score+"',  2048,  '', '' ), b:this })";
    template.title = "移动";
    template.style.marginLeft=buttons_gap+"em";
    return template;
}

function generate_moveStack(pid, score) { // 移动到同版面内的合集内。会发送PM。
    var template = getButtons(post_infos[0]).getElementsByClassName('small_colored_text_btn block_txt_c0 stxt')[1].cloneNode(true);
    template/*.firstElementChild.firstElementChild*/.innerHTML = score;

    var opt = {
        藏宝阁版面: '17625518' // 范例。当按钮内容是“藏宝阁版面”时会将主题移动到STID为17625518的合集中，并发送PM“请发到藏宝阁版面”。
    };
    template.href = "javascript:__NUKE.doRequest({ u:__API.topicMove2(__CURRENT_TID,  __CURRENT_FID,  1,  '请发到"+score+"',  2048,  '', "+opt[score]+" ), b:this })";
    template.title = "移动";
    template.style.marginLeft=buttons_gap+"em";
    return template;
}

function generate_moveDel(pid, score) { // 删除主题。不会发送PM。
    var template = getButtons(post_infos[0]).getElementsByClassName('small_colored_text_btn block_txt_c0 stxt')[1].cloneNode(true);
    template/*.firstElementChild.firstElementChild*/.innerHTML = score;

    var opt = {
        删除: '538'
    };
    template.href = "javascript:__NUKE.doRequest({ u:__API.topicMove2(__CURRENT_TID,  '',  '',  'default(崇高的幻象)',  1,  '', '' ), b:this })";
    template.title = "删除主题";
    template.style.marginLeft=buttons_gap+"em";
    return template;
}

function generate_stackOut(pid, score) { // 移出合集。
    var template = getButtons(post_infos[0]).getElementsByClassName('small_colored_text_btn block_txt_c0 stxt')[1].cloneNode(true);
    template/*.firstElementChild.firstElementChild*/.innerHTML = score;

    var opt = {
        移出合集: '1'
    };
    template.href = "javascript:__NUKE.doRequest({ u:__API.topicMove2(__CURRENT_TID,  '',  1,  '发错版面',  2,  '', '' ), b:this })";
    template.title = "移出合集";
    template.style.marginLeft=buttons_gap+"em";
    return template;
}

function generate_Mute(pid, score) { // 禁言操作。
    var template = getButtons(post_infos[0]).getElementsByClassName('small_colored_text_btn block_txt_c0 stxt')[1].cloneNode(true);
    template/*.firstElementChild.firstElementChild*/.innerHTML = score;

    var opt = {
        发错版面: '2208', 海豹: '2240', 队形: '2192', RMT: '2240' // 都是全版面禁言 禁言2天: '2192', 禁言4天: '2208', 禁言6天: '2240',
    };
    template.href = "javascript:__NUKE.doRequest({u:__API.lesserNuke2(__CURRENT_TID, "+pid+", "+opt[score]+", '' , '"+score+"',''),b:this,inline:true})";
    template.title = "禁言";
    template.style.marginLeft=buttons_gap+"em";
    return template;
}

function generate_Scan(pid, score){ // 调查当前主题内的操作记录。
    var template = getButtons(post_infos[0]).getElementsByClassName('small_colored_text_btn block_txt_c0 stxt')[1].cloneNode(true);
    template/*.firstElementChild.firstElementChild*/.innerHTML = score;

    var opt = {
        Scan: ''
    };
    template.href = "javascript:adminui.viewLog('','','',__CURRENT_TID)";
    template.title = "调查当前主题内的操作记录\n公开任何操作记录的后果自负";
    template.style.marginLeft=buttons_gap+"em";
    return template;
}

function generate_analysisStat(pid, score){ // 调查当前主题内的访问统计。需要同时拥有正式版主权限和Moderator权限。
    var template = getButtons(post_infos[0]).getElementsByClassName('small_colored_text_btn block_txt_c0 stxt')[1].cloneNode(true);
    template/*.firstElementChild.firstElementChild*/.innerHTML = score;

    var opt = {
        AnaStat: ''
    };
    template.href = "javascript:adminui.forumStat(true,'',__CURRENT_TID,'',7);";
    template.title = "调查当前主题内的访问统计\n需要同时拥有正式版主权限和Moderator权限\n公开运营数据之前请务必询问工作人员";
    template.style.marginLeft=buttons_gap+"em";
    return template;
}

forEach(post_infos, function(o) {
    var buttons = getButtons(o);
    var pid = buttons.parentElement/*.parentElement*/.firstElementChild.id;
    pid = pid.substr(3, pid.length - 9);
    console.log(pid);
    //console.log("=================");
    //console.log("__GP.admincheck="+__GP.admincheck);
    //console.log("__GP.superlesser="+__GP.superlesser);
    //console.log("__GP.greater="+__GP.greater);
    //console.log("=================");
    if(pid==0) // 'target: Theme'
    {
        if(__GP.admincheck) {
            buttons.appendChild(generate_themeLock(pid, 'Lock'));
            if(__GP.superlesser)  { buttons.appendChild(generate_themeLock(pid, 'Block')); }
            else                  { buttons.appendChild(generate_themeLock(pid, 'Hide'));  }
            buttons.appendChild(generate_themeLock(pid, 'Delete'));
            buttons.appendChild(generate_themeLock(pid, 'Clear'));
            buttons.appendChild(generate_themeDown(pid, 'Down'));
            if(__GP.greater) {
                post_infos[0].insertAdjacentHTML('beforeend', '<br>'); // 换行
                buttons.appendChild(generate_Mute(pid, '发错版面'));
                buttons.appendChild(generate_moveDel(pid, '删除'));
                buttons.appendChild(generate_analysisStat(pid, 'AnaStat'));
            }
        }
        else if(__GP.greater) {
            buttons.appendChild(generate_Scan(pid, 'Scan'));
        }
    }
    else // 'target: Post'
    {
        if(__GP.admincheck) {
            buttons.appendChild(generate_addScore(pid,'15'));
            buttons.appendChild(generate_addScore(pid,'30'));
            buttons.appendChild(generate_postLock(pid, 'Clear'));
        }
        else if(__GP.greater) {
            buttons.appendChild(generate_Scan(pid, 'Scan'));
        }
    }
});
