import React from 'react';
import { RotatingTriangles, Triangle } from 'react-loader-spinner';

export default function Spinner({ message, isActive }) {
    if (!isActive) return <></>;
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '80vh',
            backgroundColor: 'rgba(255, 255, 255, 0.8)', // Set the background color with transparency
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9999,
        }}>
            <Triangle
                height="80"
                width="80"
                color="#01c0c8"
                ariaLabel="triangle-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
            {message && <h4 className='mt-3' style={{ color: '#01c0c8' }}>{message}</h4>}
        </div>
    );

}


