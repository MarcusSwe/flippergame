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
       
        let testpunkten = new Point(260,270,50)

        window.addEventListener('keydown', (e) => {
            console.log("--"+e.key)
            if(e.key == 'ArrowUp'){
            testpunkten.movePoint()            
            }
        })

        let animationId

        const points = []

        for(let i = 0; i < 40; i++){
           points.push(new Point(random.range(0,600), random.range(0,600), random.range(0,35)))
        }

        const animate = () => {
         context.fillStyle = 'black'
         context.fillRect(0,0,600,600)         

         for(let i=0; i < points.length; i++){

            const point = points[i]
            
            for(let l = 0; l < points.length; l++){                
                const nextPoint = points[l]              
                
                const distance = Math.sqrt(Math.pow((point.x - nextPoint.x),2)+Math.pow((point.y - nextPoint.y),2))

                if(distance > 150) continue

                context.lineWidth =  math.mapRange(distance, 0, 150, 8, 1)
                
                context.beginPath()
                context.moveTo(point.x, point.y)                
                context.lineTo(nextPoint.x, nextPoint.y);
                context.strokeStyle = 'rgb(62,62,62)'
                context.stroke();
                
            }
         }         

         testpunkten.draw(context)
         testpunkten.bounce(canvasSize.width,canvasSize.height)
         
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
        this.moveDirX = random.range(-0.6,0.6)
        this.moveDirY = random.range(-0.6,0.6)
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