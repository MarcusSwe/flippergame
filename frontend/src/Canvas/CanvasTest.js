import React, { useEffect, useRef } from 'react'

const Canvas = props => {

    const canvasRef = useRef(null)    

    useEffect(() =>{
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        context.fillStyle = 'black'
        context.fillRect(0, 0, 100, 100)
    },[])


    return <canvas width="600" height="600" ref={canvasRef} />

}

export default Canvas