import React, { useState, useEffect } from "react";
import Axios from "axios";

// Components
import Url from "../components/Url";

const Main = () => {
    const [list, setList] = useState([]);
    const [currentUrl, setCurrentUrl] = useState("");
    const [copy, setCopy] = useState(false);

    useEffect(() => {
        let linkList = JSON.parse(localStorage.getItem("links"));
        if(linkList != null){
            if(linkList.length > -1) {
                setList(linkList);
            }
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("links", JSON.stringify(list));
    }, [list])
   
    async function getUrl(e) {
        Axios.post("https://rel.ink/api/links/", {
            "url":currentUrl
        })
        .then((response) => {
            if(list.length >= 3) {
                let newArr = list.splice(0,3);
                setList([response.data, ...newArr]);
            } else {
                setList([response.data, ...list]);
            }

            setCurrentUrl("https://www.rel.ink/" + response.data.hashid);
            setCopy(true);
        })
        .catch((err) => {
            console.log(err);
        })

        console.log(list);
        e.preventDefault();
    }

    const copying = (e) => {
        e.preventDefault();

        let link = document.querySelector('#bar');

        link.select();
        link.setSelectionRange(0, 99999);
        document.execCommand("copy");
        
    }

    const setUrl = (e) => {
        setCurrentUrl(e.target.value);
    }

    const reset = (e) => {
        setCopy(false);
        setCurrentUrl(e.target.value);
    }

    return(
        <div className="urlBar">
            <p id="logo">URL Shortener</p>
            <form id="form" onSubmit={copy ? copying : getUrl} autoComplete="off">
                <input value={currentUrl} id="bar" type="search" onChange={copy ? reset : setUrl} placeholder="enter url" />
                <input id="btn"  type="submit" value={copy ? "Copy" : "Shorten"} />
            </form>

            <div className="prevUrls">
                {
                    list ? 
                        list.map(item => {
                            return <Url url={item.url} hashid={item.hashid} key={item.created_at} />
                        }) : console.log("no")
                }
            </div>
        </div>
    )
}

export default Main;