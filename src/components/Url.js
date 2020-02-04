import React, { useState } from "react";

const Url = ({ url, hashid }) => {
    let textArea;
    const [clicked, setClicked] = useState(false);

    let fixedUrl = url.split("");

    if(fixedUrl.length > 30) {
        let newArr = fixedUrl.slice(0,30);
        newArr.push("...");
        fixedUrl = newArr;
    }

    const copyText = () => {
        const el = textArea
        el.select()
        document.execCommand("copy")
        window.getSelection().removeAllRanges();

        setClicked(true);
        console.log("show");
        setTimeout(() => {
            setClicked(false);
            console.log("hide");
        }, 2000);
    }

    const copiedText = {
        "display" : "block"
    }

    const done = {
        "display" : "none"
    }
    
    return(
        <div className="url">
            <p className="oldUrl">{fixedUrl}</p>
            <textarea wrap="off" spellCheck="false" cols="auto" ref={(textarea) => textArea = textarea} value={"https://www.rel.ink/" + hashid} onClick={copyText} className="newUrl" />
            <div style={clicked ? copiedText : done} className="balloon">
                Url copied!
                <div className="arrow"></div>
            </div>
        </div>
    )
}

export default Url;