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
        this.waypointIndex = 0
        //ensures that position tracking tracks from the center of the enemy entity instead of the top left corner
        this.center = {
            x: this.position.x + this.width / 2,
            y: this.position.y + this.height / 2,
        }
    }
    // draws the enemy
    draw() {
        
        context.fillStyle = `red`
        context.fillRect(this.position.x, this.position.y , this.width, this.height)
    }
    //calls on a new drawing function then updates position value
    update() {
        this.draw()
        
        //create a const referencing the array in waypoint.js
        const waypoint = waypoints[this.waypointIndex]
        //checks the distance of x and y to each waypoint in the array and outputs a value of that distance
        const xDistance = waypoint.x - this.center.x
        const yDistance = waypoint.y - this.center.y
        //returns the distance in radians
        const angle = Math.atan2(yDistance, xDistance)
        // new position moves towards the angle of the first waypoint
        this.position.x += Math.cos(angle)
        this.position.y += Math.sin(angle)
        this.center = {
            x: this.position.x + this.width / 2,
            y: this.position.y + this.height / 2,
        }
        //if current position of enemy hits the waypoint then increase index value by 1 making a new waypoint target
        //Math.round to ensure no bugs due to the fact that if value has decimal then may not equal
        if (
            Math.round(this.center.x) === Math.round(waypoint.x) && 
            Math.round(this.center.y) === Math.round(waypoint.y) &&
            //makes sure the Index reference does not go on to infinity
            this.waypointIndex < waypoints.length-1
        ) {
            this.waypointIndex++
        }
    }
}
// creates an enemy on a specific start point by x and y
//pushes a new enemy in the enemy array
const enemies = []
for (let i = 0; i < 10; i++) {
    //offsets the position of the enemy behind older enemy
    const xOffset = i * 200
    enemies.push(new Enemy({
        position: {x: waypoints[0].x - xOffset, y: waypoints[0].y }
    }))
}

// infinite loop that keeps repeating to update the enemy position
function animate() {
    requestAnimationFrame(animate)
// draws new image on loop
    context.drawImage(map1, 0 , 0)
// updates the position of new drawing
    enemies.forEach(enemy =>{
        enemy.update()
    })
}
animate()
//ISSUE : first 2 array are closer than the rest