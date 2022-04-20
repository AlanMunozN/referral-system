import React from 'react';
import Navbar from "./components/navbar/Navbar";

const App = (props:any) => {
    const {children} = props;
    return (
        <div>
            <Navbar/>
            {children}
        </div>
    );
}

export default App;
