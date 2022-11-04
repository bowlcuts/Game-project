addEventListener('load', function(){

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

ctx.fillRect (0, 0, canvas.width, canvas.height,)

const gravity = 0.7

let mobs = []
let score = 0
let gameOver = false

class Player {
    constructor({
        position,
        velocity,


    }){
        // these are the players properties
        this.position = position
        this.velocity = velocity
        this.height = 62
        this.width = 45
        this.jumpCount = 0
        this.image = document.getElementById('playerImage')
        this.frameX = 0
        this.frameY = 0
        this.maxFrame = 1
        this.fps = 20
        this.frameTimer = 0
        this.frameInterval = 1000/this.fps
       

    }
    //the draw function is what creates the player
    draw(){
        // ctx.fillStyle = 'red'
        // ctx.fillRect(this.position.x, this.position.y, this.width, this.height)   
        // ctx.strokeRect(this.position.x, this.position.y, this.width, this.height)
        // ctx.beginPath()
        // ctx.arc(this.position.x, this.position.y, this.width/2, 0, Math.PI * 2)
        // ctx.stroke()
        ctx.drawImage(this.image, this.frameX, this.frameY, this.width, this.height, this.position.x, this.position.y, this.width, this.height)     
    }


    //this method loops through the player class and calls it (doesnt animate it just loops)
    update(changeTime, mobs) {
        mobs.forEach(enemy => {
            const dx = enemy.x - this.x
            const dy = enemy.y - this.y
            const distance = Math.sqrt(dx * dx + dy * dy)
            if(distance < enemy.width/2 + this.width/2){
                gameOver = true
            }
        })
        //animations
        if(this.frameTimer > this.frameInterval){
            if (this.frameX >= this.maxFrame) this.frameX = 0
            else this.frameX++
            this.frameTimer = 0
        }else {
            this.frameTimer += changeTime
        }

        //everything else
        this.draw()
        this.position.y += this.velocity.y  
        this.position.x += this.velocity.x
        
        //this.position.y + this.height = to the size of the rect | this.velocity is the speed at which the rect is falling
        if(this.position.y + this.height + this.velocity.y >= canvas.height - 96){
            this.velocity.y = 0
            this.jumpCount = 0
        } else this.velocity.y += gravity
        

    }
}

class Background {
    constructor(position){
        this.position = position
        this.image = document.getElementById('backgroundImage')
        this.width = 1024
        this.height = 576
        this.x =  0
        this.y = 0
        this.speed = 5

    }
    draw(){
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
        ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height)

    }
    update(){
        this.x -= this.speed
        if (this.x < 0 - this.width) this.x = 0
    }
}

class Enemy {
    constructor (){
        this.width = 140
        this.height = 140
        this.image = document.getElementById('enemyImage')
        this.x = canvas.width
        this.y = canvas.height - this.height - 55
        this.frameX = 0
        this.speed = 10
        this.maxFrame = 1
        this.fps = 20
        this.frameTimer = 0
        this.frameInterval = 1000/this.fps
        this.delete = false
        
    }
    draw(){
        // ctx.strokeRect(this.x, this.y, this.width, this.height)
        // ctx.beginPath()
        // ctx.arc(this.x, this.y, this.width/2, 0, Math.PI * 2)
        // ctx.stroke()
        ctx.drawImage(this.image, this.frameX * this.width, 0, this.width, this.height, this.x, this.y, this.width, this.height)
    }
    update(changeTime){
        if(this.frameTimer > this.frameInterval){
            if (this.frameX >= this.maxFrame) this.frameX = 0
            else this.frameX++
            this.frameTimer = 0
        } else {
            this.frameTimer += changeTime
        }
        this.x -= this.speed;
        if (this.x < 0 - this.width) {
            this.delete = true;
            score++
    }}
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

const background = new Background(canvas.width, canvas.height)

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

// const enemy1 = new Enemy(canvas.width, canvas.height)

// const platform = new Platform()
const platforms = [

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

let lastTime = 0
let timer = 0
let interval = 1000
let randomInterval = Math.random() * 1000 + 500

//spawning new mobs
function enemy(changeTime) {
    if (timer > interval + randomInterval) {
        mobs.push(new Enemy(canvas.width, canvas.height))
        randomInterval = Math.random() * 1000 + 500
        timer = 0
    } else {
        timer += changeTime
    }
    mobs.forEach(enemy => {
        enemy.draw(ctx)
        enemy.update(changeTime)
    })
    mobs = mobs.filter(enemy => !enemy.delete)
}

function status(){
    ctx.font = '30px sans-serif'
    ctx.fillStyle = 'black'
    ctx.fillText('Score: ' + score, 20, 50)
    ctx.fillStyle = 'white'
    ctx.fillText('Score: ' + score, 22, 52)
    // if(gameOver){
    //     ctx.textAlign = 'center'
    //     ctx.fillStyle = 'black'
    //     ctx.fillText('Game Over', canvas.width/2, 200)
    //     ctx.fillStyle = 'white'
    //     ctx.fillText('Game Over', canvas.width/2, 202)
    // }
    if (gameOver || distance === 2000){
        ctx.textAlign = 'center'
        ctx.fillStyle = 'black'
        ctx.fillText('Game Over', canvas.width/2, 200)
        ctx.fillStyle = 'white'
        ctx.fillText('Game Over', canvas.width/2, 202)
    }
}



// const resultElement = document.getElementById('result')

function animation(timeStamp){
    const changeTime = timeStamp - lastTime
    lastTime = timeStamp
    if (!gameOver) requestAnimationFrame(animation)
    // ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    // ctx.clearRect(0, 0, canvas.width, canvas.height)
    background.draw()
    background.update()
    player.update(changeTime, mobs)
    enemy(changeTime)
    status(ctx)
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

    // if (distance >= 1500){
    //     console.log('won')
    // }

}

// jumping will stop after 4 when on platforms

addEventListener('keydown', ({code}) => {
    switch (code){
        case 'KeyW':
            player.jumpCount++
            if(player.jumpCount < 4){
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

animation(0)

})
