import React from 'react';

export const Switch = ({ checked=false, ...props }) => {
    return (
        <label className="switch">
            <input className="click-element" onChange={() => {}} type="checkbox" checked={checked} />
            <span className="slider round" {...props}></span>
        </label>
    );
};