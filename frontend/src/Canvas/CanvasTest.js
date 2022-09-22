import React, { useEffect, useRef } from 'react'
const math = require('canvas-sketch-util/math')
const random = require('canvas-sketch-util/random')
const color = require('canvas-sketch-util/color')

const Canvas = props => {

    const canvasRef = useRef(null)    
    const canvasSize = { width: 600, height:600 } 
 
    useEffect(() =>{
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
       
        let animationId

        const points = []

        for(let i = 0; i < 40; i++){
           points.push(new Point(random.range(0,600), random.range(0,600), random.range(0,35)))
        }

        points.forEach(p => {p.draw(context)})
        
        const animate = () => {
         context.fillStyle = 'white'
         context.fillRect(0,0,600,600)
                points.forEach(p => {
                    p.movePoint()
                    p.draw(context)
                    p.bounce(canvasSize.width,canvasSize.height)
                })
            animationId = window.requestAnimationFrame(animate);
         }

        animate();
       
        return () => {
            window.cancelAnimationFrame(animationId)
        }
    },[])

    return <canvas {...canvasSize} ref={canvasRef} />

}

class Point {
    constructor(x,y,radius){
        this.x = x
        this.y = y
        this.radius = radius
        this.moveDirX = random.range(-0.3,0.3)
        this.moveDirY = random.range(-0.3,0.3)
        this.color = `rgb(${random.range(0,255)},${random.range(0,255)},${random.range(0,255)})`
    }

    movePoint(){
      this.x += this.moveDirX
      this.y += this.moveDirY
    }

    bounce(x,y){
        if (this.x <= 0 || this.x >= x) this.moveDirX *= -1
        if (this.y <= 0 || this.y >= y) this.moveDirY *= -1
    }

    draw(context) {
        context.save()
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI *2)
        context.fillStyle = this.color
        context.fill()
        context.restore()
    }
}

export default Canvas