addEventListener('load', function() {



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
        this.image =''

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

class Platform {
    constructor({x, y,}) {
        this.position = {
            x,
            y
        }
        

        this.width = 200
        this.height = 20
        
    }

    draw(){
        
        ctx.fillStyle = 'white'
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)     
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


// const platform = new Platform()
const platforms = [
    new Platform({
        x: 400, 
        y: 400,
    }),
    new Platform ({
        x: 600,
        y: 300
    })
]



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

let distance = 0
let gameOver = false
const resultElement = document.getElementById('result')

function animation(){
    window.requestAnimationFrame(animation)
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    player.update()
    platforms.forEach(platform => {
        platform.draw()
    })
    

    // when the key is pressed player moves when key is not pressed player stops
    //&& player stops moving at certain x value
    if (keys.d.pressed && player.position.x < 500) {
        player.velocity.x = 5
        
      } else if (keys.a.pressed && player.position.x > 50) {
        player.velocity.x = -5
        
      } else {
        player.velocity.x = 0
        //platform moves based on player movement
        if (keys.d.pressed) {
            distance += 5
            platforms.forEach(platform => {
                platform.position.x -= 5
            })     
        } else if (keys.a.pressed){
            distance -= 5
            platforms.forEach(platform => {
                platform.position.x += 5
            })
        }
    }

      //platform collision detection *code not mine*
    platforms.forEach(platform => {
      if (player.position.y + player.height <= platform.position.y && player.position.y + player.height + player.velocity.y >= platform.position.y && player.position.x + player.width >= platform.position.x && player.position.x <= platform.position.x + platform.width) {
        player.velocity.y = 0
      }
    })

    if (distance >= 1500){
        console.log('won')
    }

}


// jumping will stop after 4 when on platforms

addEventListener('keydown', ({code}) => {
    switch (code){
        case 'KeyW':
            player.jumpCount++
            if(player.jumpCount < 4){
                console.log('up')
                player.velocity.y = -15
            } 
            break;
        case 'KeyS':
            keys.s.pressed = true
            break;
        case 'KeyA':
            keys.a.pressed = true
            break; 
        case 'KeyD':
            keys.d.pressed = true
            break;           
    }
})

addEventListener('keyup', ({code}) => {
    switch (code){
        case 'KeyW':    
            keys.w.pressed = false
            break;
        case 'KeyS':        
            keys.s.pressed = false
            break;
        case 'KeyA':
            keys.a.pressed = false
            break; 
        case 'KeyD':
            keys.d.pressed = false
            break;           
    }
})

animation()

})
