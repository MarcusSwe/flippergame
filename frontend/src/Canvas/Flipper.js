import React, { useEffect, useRef, useState } from 'react'
import App from '../App'
const math = require('canvas-sketch-util/math')
const random = require('canvas-sketch-util/random')
const color = require('canvas-sketch-util/color')

const Flipper = ({ setScore }) => {

   const canvasRef = useRef(null)    
   const canvasSize = { width: 600, height:600 } 

   let intervalID    
   let scoreU = 0

   const moveBallAuto = (ball, collision, context) => {
   let scoreX = ball.movePoint(canvasSize.width,canvasSize.height, collision,
      context)
      if(scoreX !== 0) {   
         scoreU += scoreX
         console.log(scoreU)
           setScore(scoreU)
      }
     
   }

    const movePunkt = (e) => {   
      
        let ball = e.currentTarget.testpunkten
        let collision = e.currentTarget.collision
        let context = e.currentTarget.context
      
        if(e.key == 'ArrowUp'){
          const moveBall = () => {
            moveBallAuto(ball,collision,context)
          }
          intervalID = setInterval(moveBall, 60)
        }
        if(e.key == 'ArrowLeft'){        
          e.currentTarget.leftFlipper.moveFlipperUp(5, e.currentTarget.context)
          e.currentTarget.rightFlipper.moveFlipperUp(5, e.currentTarget.context)
          }
        if(e.key == 'ArrowRight'){        
          e.currentTarget.leftFlipper.moveFlipperDown(5, e.currentTarget.context)
          e.currentTarget.rightFlipper.moveFlipperDown(5, e.currentTarget.context)
          }
        if(e.key == 'ArrowDown'){
            clearInterval(intervalID)
        }
    }
    
    useEffect(() =>{
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
       
        let testpunkten = new Point(260,270,25,15,15)
        let collisionPunk = new Point(400,400, 10,0,0, 15)
        let collisionPunk2 = new Point(100,100,50,0,0,15)
        let collisionPunk3 = new Point(380,120,50,0,0,-10)        

        let leftFlipper = new Flippers(0,599,45, "left")
        let rightFlipper = new Flippers(599,599,45, "right")

        let collisionArray = [collisionPunk,collisionPunk2, collisionPunk3]        

        window.addEventListener('keydown', movePunkt)
        window.testpunkten = testpunkten        
        window.collision = collisionArray
        window.context = context
        window.leftFlipper = leftFlipper
        window.rightFlipper = rightFlipper

        let animationId
          
        const animate = () => {
         context.fillStyle = 'black'
         context.fillRect(0,0,600,600)

         testpunkten.draw(context)
         collisionArray.forEach(p => p.draw(context))
         leftFlipper.draw(context)
         rightFlipper.draw(context)
    
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
    constructor(x,y,radius = 0,dirX = 6, dirY = 6, score = 0){
        this.x = x
        this.y = y
        this.radius = radius
        this.moveDirX = dirX
        this.moveDirY = dirY
        this.score = score
        this.color = `rgb(${random.range(0,254)},${random.range(0,255)},${random.range(0,255)})`
        this.giveScore = false;
        this.giveScoreFromCollisioner = 0;
    }   

    movePoint(x,y, collisionArray, context){
        this.giveScoreFromCollisioner = 0;
        let pixels =  context.getImageData(this.x+this.moveDirX, this.y+this.moveDirY,1,1)

      if((this.x + this.moveDirX) <= 0 || (this.x + this.moveDirX) >= x) {
        this.moveDirX *= -1
        this.x += this.moveDirX
      } else if(pixels.data[0] === 255){
        this.moveDirX *= -1
        this.x += this.moveDirX                
      } else { 

        const checkCollision = collisionArray.find(object => (Math.sqrt(Math.pow(this.x - object.x,2) +
        Math.pow(this.y - object.y,2))) <= 
        object.radius+Math.abs(this.moveDirX))             

        if(checkCollision !== undefined){          
            this.moveDirX *= -1
            this.x += this.moveDirX        
           this.giveScore = true
           this.giveScoreFromCollisioner = checkCollision.score            
        } else {
            this.x += this.moveDirX
        }
        
      }

      if((this.y + this.moveDirY) <= 0 || (this.y + this.moveDirY) >= y) {        
        
        if((this.y + this.moveDirY) >= y){       
          this.y += this.moveDirY+50          
        } else {
          this.moveDirY *= -1
          this.y += this.moveDirY
        } 

      } else if(pixels.data[0] === 255){
        this.moveDirY *= -1
        this.y += this.moveDirY
        
      } else {

        const checkCollision = collisionArray.find(object => (Math.sqrt(Math.pow(this.x - object.x,2) + 
        Math.pow(this.y - object.y,2))) <= 
        object.radius+Math.abs(this.moveDirY))
        
       if(checkCollision !== undefined){
        this.moveDirY *= -1
        this.y += this.moveDirY           
        this.giveScore = true  
        this.giveScoreFromCollisioner = checkCollision.score
       }else {
        this.y += this.moveDirY
       }

        }      

      if(this.giveScore){
        
        this.giveScore = false;        
        return this.giveScoreFromCollisioner
      } else return 0

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

class Flippers {
 
        constructor(x,y, angle = 0, side){
            this.x = x
            this.y = y
            this.angle = angle
            this.side = side            
        }

        moveFlipperUp(angle,context){
          if(this.angle + angle < 91){
             this.angle += angle
             
             const goUp = () =>{
              if(this.angle + 5 < 91){
                 this.angle += 5
              this.draw(context)
            }
             }

            const goDown = () => {
              if(this.angle - 5 > 0){
                this.angle -= 5
             this.draw(context)
           }
            }

             // trycker man in flera g??nger blir det cp
             // s?? m??ste ha att saker l??ggs till en que
             // den ska inte g?? ned??t f??rr??n man sl??pper intryck knappen..
             /*const accelerateFirstStep = setTimeout(go,350)
             const accelerateSecondStep = setTimeout(go,500)
             const deAccerate = setTimeout(goDown,550)
             const deAccerate1 = setTimeout(goDown,550)
             const deAccerate2 = setTimeout(goDown,750)
             const deAccerate3 = setTimeout(goDown,950)
             */

          }
        }

        moveFlipperDown(angle){
          if(this.angle - angle >0){
            this.angle -= angle
          }
          
        }

        draw(context){
        context.save()
        context.beginPath();
        context.moveTo(this.x, this.y)
        if(this.side === "left"){
            context.lineTo(this.getX(this.angle),600-this.getY(this.angle))
        } else context.lineTo(600-this.getX(this.angle),600-this.getY(this.angle))        
        context.lineWidth = 35;
        context.strokeStyle = 'red'
        context.stroke()
        context.restore()
        }

        getX(x){
          let radius = 230;
          let angle = math.degToRad(x)         
          return Math.cos(angle) * radius
        }

        getY(x){
          let radius = 230;
          let angle = math.degToRad(x)          
          return Math.sin(angle) * radius
        }

   
}

export default Flipper