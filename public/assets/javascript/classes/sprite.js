class Sprite{
    constructor({
      position = {x: 0,  y: 0}, 
      imgSrc, 
      frames = {x : 1}
    }) {
        this.position = position
        this.image = new Image()
        this.image.src = imgSrc
        //counts for rows and columns in any of the animation png
        this.frames ={
            x: frames.x,
            current: 0,
            elapsed: 0,
            hold: 20
        }
    }
    draw() {
        const cropWidth = this.image.width/ this.frames.x
        const crop = {
            position: {
                x: cropWidth * this.frames.current,
                y: 0
            },
            width: cropWidth,
            height: this.image.height
        }
        context.drawImage(
            this.image, 
            crop.position.x, 
            crop.position.y, 
            crop.width, 
            crop.height,
            this.position.x,
            this.position.y,
            crop.width,
            crop.height
            )
        }
        update() {
          this.frames.elapsed++
          if (this.frames.elapsed % this.frames.hold === 0){
            this.frames.current++
          if(this.frames.current >= this.frames.x){
            this.frames.current = 0
        }
      }
    }
}