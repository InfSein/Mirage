// ==UserScript==
// @name         AutoDawn
// @version      1.1
// @description  一键完成常用回复及其他主题操作。详见224.
// @author       InfSein
// @match        http*://bbs.nga.cn/read.php*
// @match        http*://bbs.ngacn.cc/read.php*
// @match        http*://nga.178.com/read.php*
// @match        http*://ngabbs.com/read.php*
// @grant        none
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

function generate_themeColor(pid, score) { // 改变主题颜色。
    var template = getButtons(post_infos[0]).getElementsByClassName('small_colored_text_btn block_txt_c0 stxt')[1].cloneNode(true);
    template/*.firstElementChild.firstElementChild*/.innerHTML = score;

    var opt = {
        Done: ''
    };
    template.href = "javascript:__NUKE.doRequest({ u:{u:__API._base, a:{__lib:'topic_color',__act:'set',tid:__CURRENT_TID,font:',U',opt:48,raw:3}}, b:this });"
    template.title = "改变主题颜色";
    template.style.marginLeft=buttons_gap+"em";
    return template;
}

function generate_themeLock(pid, score) { // 主题的锁定类操作。
    var template = getButtons(post_infos[0]).getElementsByClassName('small_colored_text_btn block_txt_c0 stxt')[1].cloneNode(true);
    template/*.firstElementChild.firstElementChild*/.innerHTML = score;

    var opt = {
        Lock: '1024', Hide: '2', Delete: '1026', Clear: '0', Block: '16384'
    };
    var oct = (opt[score]=='0')?67126786:0; // RAU:512 | 屏蔽:16384 | BAU:67108864

    template.href = "javascript:__NUKE.doRequest({u:__API.setPost(__CURRENT_TID,0,0,"+opt[score]+","+oct+",'','',0,__CURRENT_FID),b: undefined, })";
    template.title = "锁定类操作";
    template.style.marginLeft=buttons_gap+"em";
    return template;
}
function generate_ReplyText(pid, score) {
    var template = getButtons(post_infos[0]).children[2].cloneNode(true);
    template/*.firstElementChild.firstElementChild*/.innerHTML = score;
    var opt = {
        //已处理: "已处理。", 已有处理: "已有处理。"
    };
    //template.href = "https://bbs.nga.cn/post.php?action=reply&fid=" + __CURRENT_FID + "&tid="+__CURRENT_TID+"&post_content="+score+"&nojump=1&lite=htmljs&step=2";
    template.href = "javascript:commonui.newPost('',postfunc.__REPLY_BLANK,__CURRENT_F_BIT,__CURRENT_FID,__CURRENT_TID,0,'','', '"+score+"');";
    template.title = "回复此内容";
    template.style.marginLeft=buttons_gap+"em";
    return template;
}

function generate_ReplyMixed(pid, score){
    var template = getButtons(post_infos[0]).children[2].cloneNode(true);
    template/*.firstElementChild.firstElementChild*/.innerHTML = score;
    var opt = {
        Q1: '[tid=9725162]银色黎明常见问题汇总[/tid]：Q1.'
    };
    //template.href = "https://bbs.nga.cn/post.php?action=reply&fid=" + __CURRENT_FID + "&tid="+__CURRENT_TID+"&post_content="+score+"&nojump=1&lite=htmljs&step=2";
    template.href = "javascript:commonui.newPost('',postfunc.__REPLY_BLANK,__CURRENT_F_BIT,__CURRENT_FID,__CURRENT_TID,0,'','', '"+opt[score]+"');";
    template.title = "回复此内容";
    template.style.marginLeft=buttons_gap+"em";
    return template;
}
forEach(post_infos, function(o) { // 主框架
    var buttons = getButtons(o);
    var pid = buttons.parentElement/*.parentElement*/.firstElementChild.id;
    pid = pid.substr(3, pid.length - 9);
    console.log(pid);
    if(__CURRENT_FID==10 && pid==0)
    {
        buttons.appendChild(generate_themeLock(pid, 'Clear'));
        buttons.appendChild(generate_themeColor(pid, 'Done'));
        post_infos[0].insertAdjacentHTML('beforeend', '<br>'); // 换行
        buttons.appendChild(generate_ReplyText(pid, '已处理'));
        buttons.appendChild(generate_ReplyText(pid, '已有处理'));
        //buttons.appendChild(generate_ReplyMixed(pid, 'Q1')); // 实验性
    }
    });
