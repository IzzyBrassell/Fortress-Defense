class Building extends Sprite{
    constructor({position = {x:0 , y:0 }}){
        super({
            position, 
            imgSrc: `assets/img/BaseTower.png`,
            frames: {
                x: 4
            }
        })
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
        this.damage = 25
    }
    draw(){
    super.draw()
        //COMMENTED OUT USED FOR LATER: accounts for the radius of the unit
    // context.beginPath()
    // context.arc(this.center.x, this.center.y, this.radius, 0, Math.PI * 2)
    // context.fillStyle = `rgba(255, 255, 255 , .05)`
    // context.fill()
    }
    update() {
        this.draw()
        if (this.target || (!this.target && this.frames.current !== 0))
          super.update()
        if (
          this.target &&
          this.frames.current === 3 &&
          this.frames.elapsed % this.frames.hold === 0
        )
          this.shoot()
      }
    shoot() {
        this.projectiles.push(
            new Projectile({
                position: {
                    x: this.center.x,
                    y: this.center.y
                },
                enemy: this.target
            })
        )
    }
}