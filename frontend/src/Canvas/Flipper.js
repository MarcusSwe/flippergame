import React, { useEffect, useRef } from 'react'
const math = require('canvas-sketch-util/math')
const random = require('canvas-sketch-util/random')
const color = require('canvas-sketch-util/color')

const Flipper = props => {

    const canvasRef = useRef(null)    
    const canvasSize = { width: 600, height:600 } 
  
    const movePunkt = (e) => {
        
        if(e.key == 'ArrowUp'){
            
        e.currentTarget.myParam.movePoint(canvasSize.width,canvasSize.height)            
        }
    }

    useEffect(() =>{
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
       
        let testpunkten = new Point(260,270,50)

        window.addEventListener('keydown', movePunkt)
        window.myParam = testpunkten;        

        let animationId
          
        const animate = () => {
         context.fillStyle = 'black'
         context.fillRect(0,0,600,600)         

         //testpunkten.bounce(canvasSize.width,canvasSize.height)                 
         testpunkten.draw(context)
                  
    
            animationId = window.requestAnimationFrame(animate);

         }
       animate();
       
        return () => {
            window.cancelAnimationFrame(animationId)
            window.removeEventListener('keydown', movePunkt)
        }


    },[])

    return <canvas {...canvasSize} ref={canvasRef} />
    

}

class Point {
    constructor(x,y,radius){
        this.x = x
        this.y = y
        this.radius = radius
        this.moveDirX = 6
        this.moveDirY = 6
        this.color = `rgb(${random.range(0,255)},${random.range(0,255)},${random.range(0,255)})`
    }

    movePoint(x,y){        
      if((this.x + this.moveDirX) <= 0 || (this.x + this.moveDirX) >= x) {        
        this.moveDirX *= -1
        this.x += (this.moveDirX)                
      } else {        
        this.x += this.moveDirX        
      }      
      if((this.y + this.moveDirY) <= 0 || (this.y + this.moveDirY) >= y) {        
        this.moveDirY *= -1
        this.y += (this.moveDirY)        
      } else 
      {         
        this.y += this.moveDirY
      }      
    }

   /*  bounce(x,y){
        if (this.x <= 0 || this.x >= x) this.moveDirX *= -1
        if (this.y <= 0 || this.y >= y) this.moveDirY *= -1
    }*/

    draw(context) {      
        context.save()
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI *2)
        context.fillStyle = this.color
        context.fill()
        context.restore()
    }
}

export default Flipper