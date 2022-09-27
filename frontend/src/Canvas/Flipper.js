import React, { useEffect, useRef } from 'react'
const math = require('canvas-sketch-util/math')
const random = require('canvas-sketch-util/random')
const color = require('canvas-sketch-util/color')

const Flipper = props => {

    const canvasRef = useRef(null)    
    const canvasSize = { width: 600, height:600 } 
  
    const movePunkt = (e) => {        
        if(e.key == 'ArrowUp'){        
        e.currentTarget.testpunkten.movePoint(canvasSize.width,canvasSize.height, e.currentTarget.collision)            
        }
    }
    
    useEffect(() =>{
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
       
        let testpunkten = new Point(260,270,50,20,20)
        let collisionPunk = new Point(400,400, 10,0,0)
        let collisionPunk2 = new Point(100,100,50,0,0)
        let collisionPunk3 = new Point(400,100,50,0,0)
        let collisionPunk4 = new Point(120,500,20,0,0)

        let collisionArray = [collisionPunk,collisionPunk2, collisionPunk3, collisionPunk4]        

        window.addEventListener('keydown', movePunkt)
        window.testpunkten = testpunkten        
        window.collision = collisionArray

        let animationId
          
        const animate = () => {
         context.fillStyle = 'black'
         context.fillRect(0,0,600,600)

         testpunkten.draw(context)
         collisionArray.forEach(p => p.draw(context))
    
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
    constructor(x,y,radius = 0,dirX = 6, dirY = 6){
        this.x = x
        this.y = y
        this.radius = radius
        this.moveDirX = dirX
        this.moveDirY = dirY
        this.color = `rgb(${random.range(0,255)},${random.range(0,255)},${random.range(0,255)})`
    }

    movePoint(x,y, collisionArray){        
        //console.log(this.x + "       " + this.y)        
        //console.log("AVSTÅND: " +Math.sqrt(Math.pow(this.x - 100,2) +Math.pow(this.y - 100,2)))
        
      if((this.x + this.moveDirX) <= 0 || (this.x + this.moveDirX) >= x) {        
        this.moveDirX *= -1
        this.x += this.moveDirX        
      } else { 

        const checkCollision = collisionArray.find(object => (Math.sqrt(Math.pow(this.x - object.reportPositionAndDirection().x,2) +
        Math.pow(this.y - object.reportPositionAndDirection().y,2))) <= 
        object.reportPositionAndDirection().radius+Math.abs(this.moveDirX))     

        if(checkCollision !== undefined){
            this.moveDirX *= -1
            this.x += this.moveDirX        
        } else {
            this.x += this.moveDirX
        }
        
      }      
      if((this.y + this.moveDirY) <= 0 || (this.y + this.moveDirY) >= y) {        
        this.moveDirY *= -1
        this.y += this.moveDirY
      } else {

        const checkCollision = collisionArray.find(object => (Math.sqrt(Math.pow(this.x - object.reportPositionAndDirection().x,2) + 
        Math.pow(this.y - object.reportPositionAndDirection().y,2))) <= 
        object.radius+Math.abs(this.moveDirY))
        
       if(checkCollision !== undefined){
        this.moveDirY *= -1
        this.y += this.moveDirY             
       }else {
        this.y += this.moveDirY
       }

      }      
    }


    draw(context) {      
        context.save()
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI *2)
        context.fillStyle = this.color
        context.fill()
        context.restore()
    }

    reportPositionAndDirection(){
        return {x:this.x,
        y:this.y,
        moveX:this.moveDirX,
        moveY:this.moveDirY,
        radius:this.radius}
    }
}

export default Flipper