import React from 'react';

function Contents(props) {
    let createInnerHTML = (str) => {
        return { __html: str.replace(/---/g, '<hr>') };
    }
    let ReplaceTags = (str) => {
        let tmp = str.replace(/(<br>){1,}/g, "$n$");
        console.log(tmp)
        let esc = tmp.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, '');
        console.log(esc)
        return esc.replace(/\$n\$/g, "<br>");
    }

    let cls = props.class + "";
    let caption = props.text.split(/---/)[0] + "...";
    console.log(caption)
    let body = cls.indexOf("articleList") ?
        createInnerHTML(props.text + "<hr/>") :
        createInnerHTML("<img src='" + props.img + "'>" + ReplaceTags(caption) + "<hr/>");

    return (
        <div className={"content " + props.class} id={props.id}>
            <h2 className="entry_header">{props.title}</h2>
            <div className="entry_body"
                dangerouslySetInnerHTML={body}>
            </div>
            <div className="entry_footer">
                <div className="pagetop">
                    <p>{props.date}</p>
                    <a href="#header" title="ページのトップへ">ページのトップへ</a>
                </div>
            </div>
        </div>);
}

export default Contents;