import React from 'react';
import './App.scss';
import Navbar from "./components/navbar/Navbar";

const App = (props:any) => {
    const {children} = props;
    return (
        <div className="App">
            <Navbar/>
            {children}
        </div>
    );
}

export default App;
