class Tank extends Sprite{
    //let x and y be the start point of the enemy
    constructor({position = {x: 0, y: 0} }){
        super({
            position, 
            imgSrc: `assets/img/tank.png`,
            frames: {
                x: 4
            }
        })
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
        this.health = 200
        this.velocity = {
            x: 0,
            y: 0
        }
    }
    // draws the enemy
    draw() {
        // takes the draw method from the extended class 
        super.draw()

        //two bars that show enemy health
        context.fillStyle = `red`
        context.fillRect(this.position.x, this.position.y-15, this.width, 10)

        context.fillStyle = `green`
        context.fillRect(this.position.x, this.position.y-15, this.width * this.health / 100, 10)
    }
    //calls on a new drawing function then updates position value
    update() {
        this.draw()
        super.update()
        
        //create a const referencing the array in waypoint.js
        const waypoint = waypoints[this.waypointIndex]
        //checks the distance of x and y to each waypoint in the array and outputs a value of that distance
        const xDistance = waypoint.x - this.center.x
        const yDistance = waypoint.y - this.center.y
        //returns the distance in radians
        const angle = Math.atan2(yDistance, xDistance)

        //determines the speed
        this.velocity.x = Math.cos(angle) * 1.5
        this.velocity.y = Math.sin(angle) * 1.5

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