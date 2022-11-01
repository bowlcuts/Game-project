const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

ctx.fillRect (0, 0, canvas.width, canvas.height,)

const gravity = 0.7

class Player {
    constructor({
        position,
        velocity,
        sprites,
        color =  'red'

    }){
        // these are the players properties
        this.position = position
        this.velocity = velocity
        this.color = color
        this.height = 120
        this.width = 40
        this.jumpCount = 0

    }
    //the draw function is what creates the player
    draw(){
        ctx.fillStyle = 'red'
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)        
    }


    //this method loops through the player class and calls it (doesnt animate it just loops)
    update() {
        this.draw()
        this.position.y += this.velocity.y  
        this.position.x += this.velocity.x
        
        //this.position.y + this.height = to the size of the rect | this.velocity is the speed at which the rect is falling
        if(this.position.y + this.height + this.velocity.y >= canvas.height){
            this.velocity.y = 0
            this.jumpCount = 0
        } else this.velocity.y += gravity
        
    }
}

const player = new Player({
    position: {
        x: 300,
        y: 0
    },
    velocity: {
        x: 0,
        y: 1
    }

})

// logs when you either press or hold down a key instead of listening for one key press can listen for key hold as well
const keys = {
    w: {
        pressed: false
    },
    s: {
        pressed: false
    },
    a: {
        pressed: false
    },
    d: {
        pressed: false
    }
}

function animation(){
    window.requestAnimationFrame(animation)
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    player.update()

    // when the key is pressed player moves when key is not pressed player stops
    if (keys.a.pressed) {
        player.velocity.x = -5
        
      } else if (keys.d.pressed) {
        player.velocity.x = 5
        
      } else player.velocity.x = 0
}


addEventListener('keydown', ({code}) => {
    switch (code){
        case 'KeyW':
            player.jumpCount++
            if(player.jumpCount < 3){
                console.log('up')
                player.velocity.y = -15
            }
            
            break;
        case 'KeyS':
            console.log('down')
            keys.s.pressed = true
            break;
        case 'KeyA':
            console.log('left')
            keys.a.pressed = true
            break; 
        case 'KeyD':
            console.log('right')
            keys.d.pressed = true
            break;           
    }
})

addEventListener('keyup', ({code}) => {
    switch (code){
        case 'KeyW':
            console.log('up')
            keys.w.pressed = false
            break;
        case 'KeyS':
            console.log('down')
            keys.s.pressed = false
            break;
        case 'KeyA':
            console.log('left')
            keys.a.pressed = false
            break; 
        case 'KeyD':
            console.log('right')
            keys.d.pressed = false
            break;           
    }
})

animation()