import React from 'react'
import { ThreeCircles } from 'react-loader-spinner'

const My_Loader = () => {
    return (
        <div style={{height:'70vh', display:'flex',justifyContent:'center',alignItems:'center'}}>
            <ThreeCircles
                visible={true}
                height="100"
                width="100"
                color="#2672C8"
                ariaLabel="three-circles-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>
    )
}

export default My_Loader