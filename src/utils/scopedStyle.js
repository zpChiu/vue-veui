import scopedCss from "scopedcss";
import global from "./global";

// 页面预览的css > 组件的css
/**
 * 
 * @param {*} elem css插入元素
 * @param {*} css css内容
 * @param {*} sid 是否指定style的ID
 */
var scopedStyle = function (elem, css, sid) {
    if ( !css || css == "" ) return;

    elem = sid? elem : elem.parentNode;
    sid = sid || global.guid();

    // 添加编辑的css效果到预览视图
    let style = document.getElementById(sid);

    if ( !style ) {
        style = document.createElement("style");
        style.id = sid;
        style.setAttribute("scoped", "");
        style.type = "text/css";

        elem.appendChild(style);
    }
    let cssText = document.createTextNode(css);
    style.innerHTML = "";
    style.appendChild(cssText);

    // 动态添加scoped style
    scopedCss.applyTo(elem);
};

export default scopedStyle;
