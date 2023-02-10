class PlacementTile {
    constructor ({ position = {x: 0, y: 0}}){
        this.position = position
        //size of each individual tile
        this.size = 32
        this.color = `rgba(255, 240, 0, 0.1)`
        this.occupied = false
    }
    draw() {
        context.fillStyle = this.color
        context.fillRect(this.position.x, this.position.y, this.size, this.size)
    }
    update(mouse){
        this.draw()
        //indicates if the position of the mouse matches the size of the tile that can be built on then highlight it darker
        if(
            mouse.x > this.position.x &&
            mouse.x < this.position.x + this.size && 
            mouse.y > this.position.y && 
            mouse.y < this.position.y + this.size
            ) {
                this.color = `rgba(255, 252, 127, 0.5)`
        }else this.color = `rgba(255, 240, 0, 0.1)`
    }
}
class Enemy {
    //let x and y be the start point of the enemy
    constructor({position = {x: 0, y: 0} }){
        this.position = position
        this.width = 32
        this.height = 32
        this.waypointIndex = 0
        //ensures that position tracking tracks from the center of the enemy entity instead of the top left corner
        this.center = {
            x: this.position.x + this.width / 2,
            y: this.position.y + this.height / 2
        }
        this.radius = 16
        this.health = 100
        this.velocity = {
            x: 0,
            y: 0
        }
    }
    // draws the enemy
    draw() {
        
        context.fillStyle = `red`
        // context.fillRect(this.position.x, this.position.y , this.width, this.height)
        context.beginPath()
        context.arc(this.center.x, this.center.y, this.radius, 0 , Math.PI * 2)
        context.fill()

        //two bars that show enemy health
        context.fillStyle = `red`
        context.fillRect(this.position.x, this.position.y-15, this.width, 10)

        context.fillStyle = `green`
        context.fillRect(this.position.x, this.position.y-15, this.width * this.health / 100, 10)
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

        //determines the speed
        this.velocity.x = Math.cos(angle) * 10
        this.velocity.y = Math.sin(angle) * 10

        // new position moves towards the angle of the first waypoint
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        this.center = {
            x: this.position.x + this.width / 2,
            y: this.position.y + this.height / 2,
        }
        //if current position of enemy hits the waypoint then increase index value by 1 making a new waypoint target
        //Math.round to ensure no bugs due to the fact that if value has decimal then may not equal
        if (
            Math.abs(Math.round(this.center.x) - Math.round(waypoint.x)) < 
            Math.abs(this.velocity.x) && 
            Math.abs(Math.round(this.center.y) - Math.round(waypoint.y)) <
            Math.abs(this.velocity.y) &&
            //makes sure the Index reference does not go on to infinity
            this.waypointIndex < waypoints.length-1
        ) {
            this.waypointIndex++
        }
    }
}

class Projectile{
    constructor({position = {x: 0 ,y: 0}, enemy}){
        this.position = position
        this.velocity = {
            x: 0,
            y: 0
        }
        this.enemy = enemy
        this.radius = 10
    }
    //draws the range of the towers
    draw() {
        context.beginPath()
        context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        context.fillStyle = `orange`
        context.fill()
    }
    //fire and track towards the center of a enemy
    update() {
        this.draw()

        const angle = Math.atan2(
            this.enemy.center.y - this.position.y,
            this.enemy.center.x - this.position.x
            )

            const projectileSpeed = 5
            this.velocity.x = Math.cos(angle) * projectileSpeed
            this.velocity.y = Math.sin(angle) * projectileSpeed

            this.position.x += this.velocity.x
            this.position.y += this.velocity.y
    }
}

class Building {
    constructor({position = {x:0 , y:0 }}){
        this.position = position
        this.width = 32 * 2
        this.height = 32 * 2
        this.center = {
            x: this.position.x + this.width / 2,
            y: this.position.y + this.height / 2
        }
        this.projectiles = [
            
        ]
        this.radius = 175
        this.target
        this.frames = 0
    }
    draw(){
    context.fillStyle = `blue`
    context.fillRect(this.position.x, this.position.y, this.width, this.height)

    context.beginPath()
    context.arc(this.center.x, this.center.y, this.radius, 0, Math.PI * 2)
    context.fillStyle = `rgba(255, 255, 255 , .05)`
    context.fill()
    }
    update(){
        this.draw()
        this.damage = 100
        if (this.frames % 100 === 0 && this.target){
            this.projectiles.push(
                new Projectile({
                    position: {
                        x: this.center.x,
                        y: this.center.y
                    },
                    enemy: this.target
            }))
        }

        this.frames++
    }
}