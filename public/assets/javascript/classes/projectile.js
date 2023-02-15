class Projectile extends Sprite{
    constructor({position = {x: 0 ,y: 0}, enemy}){
        //calls a constructor in the extended class
        super({
            position, 
            imgSrc: `assets/img/tracer.png`,
            frames: {
                x: 4
            }
        })
        this.velocity = {
            x: 0,
            y: 0
        }
        this.enemy = enemy
        this.radius = 10
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