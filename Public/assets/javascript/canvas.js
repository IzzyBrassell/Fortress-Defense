const canvas = document.querySelector(`canvas`)
const context = canvas.getContext(`2d`)

// Indicates the dimensions of the play field
canvas.width = 1280
canvas.height = 768

// Applies the dimension
context.fillRect(0, 0, canvas.width, canvas.height)

const map1 = new Image()
// what to do when the image loads
map1.onload = () =>{
    context.drawImage(map1 , 0 , 0)
}
map1.src = `assets/Img/Gamemap.png`

class Enemy {
    //let x and y be the start point of the enemy
    constructor({position = {x: 0, y: 0} }){
        this.position = position
        this.width = 50
        this.height = 50
    }
    // draws the enemy
    draw() {
        
        context.fillStyle = `red`
        context.fillRect(this.position.x, this.position.y , this.width, this.height)
    }
    //calls on a new drawing function then updates position value
    update() {
        this.draw()
        
        const waypoint = waypoints[0]
        const xDistance = waypoint.x - this.position.x
        const yDistance = waypoint.y - this.position.y
        const angle = Math.atan2(yDistance, xDistance)
        this.position.x += Math.cos(angle)
        this.position.y += Math.sin(angle)
    }
}
// creates an enemy on a specific start point by x and y
const enemy = new Enemy ({position: {x: 0, y: 450 } })
const enemy2 = new Enemy ({position: {x: 100, y: 450 } })

// infinite loop that keeps repeating to update the enemy position
function animate() {
    requestAnimationFrame(animate)
// draws new image on loop
    context.drawImage(map1, 0 , 0)
// updates the position of new drawing
    enemy.update()
    enemy2.update()
}
animate()
