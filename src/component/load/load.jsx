import React, {useEffect, useRef, useState} from 'react';
import styles from "./load.module.css";

export function Load({setData}) {
    const fileRef = useRef(null);

    function getData() {
        let reader = new FileReader();
        reader.readAsText(fileRef.current.files[0]);
        reader.onload = function () {
            let jsonData = JSON.parse(reader.result);
            setData(jsonData);
        }
        reader.onerror = function() {
            console.log(reader.error);
        };
    }

    return (
        <div>
            <input type="file" ref={fileRef} onChange={() => getData()}/>
        </div>
    );
}
