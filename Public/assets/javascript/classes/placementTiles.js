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
