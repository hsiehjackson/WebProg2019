let cvsWrapper = null;
var bird;
var background;
var pipes = [];
// assets from: https://github.com/sourabhv/FlapPyBird/tree/master/assets

function preload() {
    bgImg = ["day","night"].map(time => loadImage("./assets/sprites/"+`background-${time}.png`));
    baseImg = loadImage("./assets/sprites/base.png");
    birdImg = ["blue", "red", "yellow"].map(
                color => ["upflap","midflap","downflap"].map(
                flap => loadImage("./assets/sprites/"+`${color}bird-${flap}.png`)));
    allsound = ["wing","swoosh","point","hit","die"].map(
                type => loadSound("./assets/audio/"+`${type}.wav`));
    pipeImg = ["green","red"].map(
                color => ["upper","lower"].map(
                pos => loadImage("./assets/sprites/pipe-"+`${color}-${pos}.png`)));
    gameoverImg = loadImage("./assets/sprites/gameover.png");
    startImg = loadImage("./assets/sprites/message.png");
    scoreImg = [...Array(10).keys()].map(
                number => loadImage("./assets/sprites/"+`${number.toString()}.png`));
    championImg = loadImage("./assets/sprites/champion.png");
}

function setup() {
    // Game basic setup.
    // Mounting canvas onto div for convenient styling.
    cvsWrapper = document.getElementById("canvasWrapper");
    const myCanvas = createCanvas(
        cvsWrapper.offsetWidth,
        cvsWrapper.offsetHeight
    );
    myCanvas.parent("canvasWrapper");
    angleMode(DEGREES);
    // setup code below
    flappybird = new Bird();
    background = new Background();
    base = new Base();
    score = new Scores();
    highscore = new HighScore();
    display = new Display();
    count = 0;
    highcount = 0;
    isGameover = false;
    isStart = true;
}


function draw() {
    background.show();
    background.update(isGameover);
    for (var i=pipes.length-1; i>=0;i--){
        pipes[i].show();
        pipes[i].update(isStart,isGameover);
        if (pipes[i].hit(flappybird)){
            pipes[i].gethit = true;
            isGameover = true;
        }
        if (pipes[i].checkscore(flappybird) && !pipes[i].getscore && !pipes[i].gethit){
            pipes[i].getscore = true;
            count += 1;
            allsound[2].play();
        }
        if (pipes[i].finish()){
            pipes.splice(i,1);
        }
    }
    flappybird.show();
    flappybird.update(isStart, isGameover);
    base.show();
    base.update(isGameover);
    if (flappybird.hit){
        isGameover = true;
    }
    if (frameCount % 80 == 0){
        pipes.push(new Pipe());        
    }
    if (isGameover){
        display.show_gameover();
        display.show_gameover_sound();
        if (count > highcount)
            highcount = count;
    }
    if (isStart){
        display.show_start();
        isGameover = false;
        pipes = [];
        count = 0;
    }
    score.show(count, isStart, isGameover);
    highscore.show(highcount);
}

function keyPressed(){
    if (keyCode===32){
        if (isStart){
            isStart = false;
        }
        else if (isGameover){
            isStart = true;
            flappybird.random();
            background.random();
        }
        else{
            flappybird.fly();
        }
    }
}           

function Display(){
    this.isSound = false;
    this.show_gameover = function(){
        this.x = width/2;
        this.y = height/3;
        this.w = gameoverImg.width;
        image(gameoverImg,this.x-this.w/2,this.y);
    }
    this.show_start = function(){
        let scale = 1.5;
        let w = startImg.width * scale;
        let h = startImg.height * scale;
        image(startImg, (width-w)/2, (height-h)/2, w, h);
        isSound = false;
    }
    this.show_gameover_sound = function(){
        if (isSound == false){
            isSound = true;
            allsound[3].play();
            allsound[4].play();
        }
    }
}

function Pipe(){
    this.space_length = 200;
    this.top_length = random(50,height/2);
    this.bottom_length = height-this.space_length-this.top_length;
    this.random = Math.floor(Math.random() * 2);
    this.x = width;
    this.w = pipeImg[this.random][0].width;
    this.getscore = false;
    this.gethit = false;
    this.speed = 3;
    this.show = function(){
        image(pipeImg[this.random][0], this.x, 0, this.w, this.top_length);
        image(pipeImg[this.random][1], this.x, height-this.bottom_length, this.w, this.bottom_length);
    }
    this.update = function(isStart,isGameover){
        if (isStart || isGameover)
            this.x = this.x;
        else
            this.x += -this.speed;
    }
    this.finish = function(){
        if (this.x < -this.w)
            return true;
        else
            return false;
    }
    this.hit = function(bird){
        if (bird.y < this.top_length || bird.y > height-this.bottom_length){
            if (bird.x > this.x && bird.x < this.x+this.w){
                return true;
            }
            return false;
        }
    }
    this.checkscore = function(bird){
        if (bird.y > this.top_length && bird.y < height-this.bottom_length){
            if (bird.x > this.x+this.w){
                return true;
            }
            return false;
        }
    }
}



function Background(){
    this.y = 0;
    this.x = 0;
    this.velocity = 3;
    this.time = Math.floor(Math.random() * 2);
    this.random = function(){
        this.time = Math.floor(Math.random() * 2)
    }
    this.show = function(){
        image(bgImg[this.time], this.x, this.y, width, height);
        image(bgImg[this.time], this.x+width, this.y, width, height);
        image(baseImg, this.x, this.y+height-baseImg.height, width, baseImg.height);
        image(baseImg, this.x+width, this.y+height-baseImg.height, width, baseImg.height);
    }
    this.update = function(isGameover){
        if (isGameover){
            this.x = this.x;
        }
        else{
            this.x += -this.velocity;
            if (this.x < -width){
                this.x = 0;
            }
        }
    }
}

function Base(){
    this.y = 0;
    this.x = 0;
    this.velocity = 3;
    this.show = function(){
        image(baseImg, this.x, this.y+height-baseImg.height, width, baseImg.height);
        image(baseImg, this.x+width, this.y+height-baseImg.height, width, baseImg.height);
    }
    this.update = function(isGameover){
        if (isGameover){
            this.x = this.x;
        }
        else{
            this.x += -this.velocity;
            if (this.x < -width){
                this.x = 0;
            }
        }
    }

}

function Bird(){
    this.x = width/2;
    this.y = height/2+80;
    this.gravity = 0.3;
    this.velocity = 0;
    this.wing = 0;
    this.wingchange = 1;
    this.winghold = 0;
    this.angle = -30;
    this.anglevelocity = 0;
    this.anglegravity = 0.4;
    this.color = Math.floor(Math.random() * 3);
    this.hit = false;

    this.random = function(){
        this.color = Math.floor(Math.random() * 3);
    }

    this.show = function(){
        push();
        translate(this.x,this.y);
        rotate(this.angle);
        imageMode(CENTER);
        image(birdImg[this.color][this.wing],0,0);
        pop();
    }

    this.update = function(isStart, isGameover){
        if (isGameover){
            this.y = this.y;
            this.angle = this.angle;
            this.wing = this.wing;
        }
        else{
            this.y += this.velocity;
            this.velocity += this.gravity;
            this.winghold += 1;
            this.anglevelocity += this.anglegravity;
            this.angle += this.anglevelocity;
            if (this.angle > 30){
                this.angle = 30;
                this.anglevelocity = 0;
            }
            if (this.angle < -30){
                this.angle = -30;
                this.anglevelocity = 0;
            }
            if (this.y > height-baseImg.height){
                this.y = height-baseImg.height;
                this.velocity = 0;
                this.hit = true;
            }
            if (this.y < 0){
                this.y = 0;
                this.velocity = 0;
                this.hit = true;
            }
            if (this.winghold == 10){
                this.wing += this.wingchange;
                this.winghold = 0;
                if(this.wing==2)
                    allsound[1].play();
            }
            if (this.wing == 0){
                this.wingchange = 1;
            }
            if (this.wing == 2){
                this.wingchange = -1;
            }
        }
        if (isStart){
            this.y = height/2+80;
            this.velocity = 0;
            this.angle = 0;
            this.anglevelocity = 0;
            this.hit = false;
        }
    }

    this.fly = function(){
        this.velocity += -30*this.gravity;
        this.anglevelocity += -40*this.anglegravity;
        allsound[0].play();
    }
}

function HighScore(){
    this.ch_w = championImg.width;
    this.ch_h = championImg.height;
    this.ch_y = height - this.ch_h*0.2-10;
    this.show = function(highcount){
        if (Math.floor((highcount/10))!=0){
            let ten_width = scoreImg[Math.floor(highcount / 10)].width;
            let ten_height = scoreImg[Math.floor(highcount / 10)].height;
            let one_width = scoreImg[highcount % 10].width;
            let one_height = scoreImg[highcount % 10].height;
            let first_pos = width/2-(this.ch_w*0.2+ten_width+one_width)/2;
            image(championImg, first_pos, this.ch_y, this.ch_w*0.2, this.ch_h*0.2);
            image(scoreImg[Math.floor(highcount / 10)], first_pos+this.ch_w*0.2, this.ch_y+this.ch_h*0.1-ten_height/2);
            image(scoreImg[highcount%10], first_pos+this.ch_w*0.2+ten_width, this.ch_y+this.ch_h*0.1-one_height/2);
        }
        else{
            let one_width = scoreImg[highcount % 10].width;
            let one_height = scoreImg[highcount % 10].height;
            let first_pos = width/2-(this.ch_w*0.2+one_width)/2;
            image(championImg, first_pos, this.ch_y, this.ch_w*0.2, this.ch_h*0.2);
            image(scoreImg[highcount%10], first_pos+this.ch_w*0.2, this.ch_y+this.ch_h*0.1-one_height/2);   
        }

    }
}

function Scores(){    
    this.x = width/2;
    this.y = height/4;
    this.margin = 12;
    this.show = function(count, isStart, isGameover){
        if (!isStart){
            if (isGameover){
                this.y = height/2;
            }
            else{
                this.y = height/4;
            }
             if (Math.floor((count/10))!=0){
                let ten_width = scoreImg[Math.floor(count / 10)].width;
                let one_width = scoreImg[count % 10].width;
                image(scoreImg[Math.floor(count / 10)], this.x-(ten_width+one_width)/2, this.y);
                image(scoreImg[count % 10], this.x-(ten_width+one_width)/2+ten_width, this.y);
            }
            else{
                image(scoreImg[count % 10], this.x-scoreImg[count % 10].width/2, this.y);
            }
        }
    }
}
