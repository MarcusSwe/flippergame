import React, { useEffect, useRef } from 'react'
const math = require('canvas-sketch-util/math')
const random = require('canvas-sketch-util/random')

const Canvas = props => {

    const canvasRef = useRef(null)    

    useEffect(() =>{
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
       
        const points = []

        for(let i = 0; i < 40; i++){
           points.push(new Point(random.range(0,600), random.range(0,600), random.range(0,35)))
        }

        points.forEach(p => {p.draw(context)})
        
                
       
        
        

    },[])


    return <canvas width="600" height="600" ref={canvasRef} />

}

class Point {
    constructor(x,y,radius){
        this.x = x
        this.y = y
        this.radius = radius
    }

    draw(context) {
        context.save()
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI *2)
        context.fillStyle = 'black'
        context.fill()
        context.restore()
    }
}

export default Canvas