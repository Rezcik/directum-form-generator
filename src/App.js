import React, {useState} from 'react';
import {Load} from "./component/load/load";
import {Content} from "./component/content/content";

function App() {
    const [data, setData] = useState(null);
    return (
        <div className="App">
            <Load setData={setData}/>
            {
                data ?
                    <Content data={data}/>
                    :
                    <div/>
            }
        </div>
    );
}

export default App;
