import React from 'react';
import '../NumberBtn/NumberBtn.css';

const enterBtn = (props) => (
    <button className="NumberBtn" onClick={props.clicked} >
        <h1>ENTER</h1>
    </button>
);

export default enterBtn;