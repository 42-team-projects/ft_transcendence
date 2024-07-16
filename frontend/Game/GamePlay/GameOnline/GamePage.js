
const game_page = document.createElement('template');






game_page.innerHTML = /*html*/ `
<link rel="stylesheet" href="/frontend/Game/GamePlay/GameOnline/GamePage.css">
<div class="c_game">
    <div class="GameShapes">
		<div class="shapes_LT_RT"></div>
		<div class="shapes_LB_RB"></div>
		<div class="shapes_DT"></div>
		<div class="shapes_LR_container">
			<div class="center_shapes_LT_RT"></div>
			<div class="center_shapes_LB_RB"></div>
			<div class="center_shapes_MLR"></div>
		</div>
		<div class="table_container">
            <canvas id="table" class="pingpongTable"></canvas>
            <div class="rackit_of_p1"></div>
            <div class="rackit_of_p2"></div>
		</div>
    </div>
</div>
`


let viewportWidth = window.innerWidth;
let remInPixels = parseFloat(getComputedStyle(document.documentElement).fontSize);
let viewportHeight = window.innerHeight - (14 * remInPixels);

let cGameWidth = 0.9 * viewportWidth;
let cGameHeight = viewportHeight;

let gameShapesWidth = 0.9 * cGameWidth;
let gameShapesHeight = gameShapesWidth / 2.1;

let tableContainerWidth = 0.84 * gameShapesWidth;
let tableContainerHeight = 0.83 * gameShapesHeight;

let CANVAS_WIDTH = tableContainerWidth;
let CANVAS_HEIGHT = tableContainerHeight;

export class GamePage extends HTMLElement{

    constructor()
    {
        super();
        this.appendChild(game_page.content.cloneNode(true))
        this.addEventListener('keydown', (event) => {
            this.setMove(event, keys);
        })
        this.addEventListener('keyup', (event) => {
            this.resetMove(event, keys);
        })
        this.setBoundries(0, 0, 0, 0);
        this.setCoordonates(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, 5, 2);
        this.setKeys(false, false, false, false);
    }

    setCoordonates(x, y, dx, dy){
        this.concoordonate = {
            x: x,
            y: y,
            dx: dx,
            dy: dy,
        };
    }
    getCoordonates(){
        return this.concoordonate;
    }

    setBoundries(top, bottom, left, right){
        this.conBoundries = {
            top: top,
            bottom: bottom,
            left: left,
            right: right,
        }
    }
    getBoundries(){
        return this.conBoundries;
    }

    setKeys(keyS, keyW, keyArrowUp, keyArrowDown){
        this.conKeys = {
            keyS: keyS,
            keyW: keyW,
            keyArrowUp: keyArrowUp,
            keyArrowDown: keyArrowDown,
        }
    }
    getKeys(){
        return this.conKeys;
    }


    renderBall(ctx){
        const coordonate = this.getCoordonates();
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(coordonate.x, coordonate.y, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }
    gameLoop(ctx){
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        requestAnimationFrame(() => this.gameLoop(ctx));
        this.moveBall();
        this.renderBall(ctx);
    }
    connectedCallback(){
        const container = document.querySelector('.table_container');
        const containerRect = container.getBoundingClientRect();
        const canvas = document.querySelector('#table');
        const ctx = canvas.getContext('2d');
        this.setBoundries(containerRect.top, containerRect.bottom, containerRect.left, containerRect.right);
        canvas.width = CANVAS_WIDTH;
        canvas.height = CANVAS_HEIGHT;
        console.log(CANVAS_WIDTH, CANVAS_HEIGHT);
        this.gameLoop(ctx);
    }

    moveBall(){
        const coordonate = this.getCoordonates();
        const containerBoundries = this.getBoundries();
        console.log(coordonate);
        console.log(containerBoundries);
        if(coordonate.y + 10 + coordonate.dy >= CANVAS_HEIGHT || coordonate.y - 10 + coordonate.dy <= 0)
            coordonate.dy = -coordonate.dy;
        if(coordonate.x + 10 + coordonate.dx >= CANVAS_WIDTH || coordonate.x - 10 + coordonate.dx <= 0)
            coordonate.dx = -coordonate.dx;
        coordonate.x += coordonate.dx;
        coordonate.y += coordonate.dy;

        // coordonate.dx = Math.abs(coordonate.dx) + 0.1;
        // coordonate.dy = Math.abs(coordonate.dy) + 0.1;
        this.setCoordonates(coordonate.x, coordonate.y, coordonate.dx, coordonate.dy);
    }

    setMove = (event, keys) =>{
        if(event.key === 'w' || event.key === 'W')
            keys.keyW = true;
        if(event.key === 's' || event.key === 'S')
            keys.keyS = true;
        if(event.key === 'ArrowUp')
            keys.keyArrowUp = true;
        if(event.key === 'ArrowDown')
            keys.keyArrowDown = true;
        this.movePlayer(keys);
    }
    resetMove = (event, keys) =>{
        if(event.key === 'w' || event.key === 'W')
            keys.keyW = false;
        if(event.key === 's' || event.key === 'S')
            keys.keyS = false;
        if(event.key === 'ArrowUp')
            keys.keyArrowUp = false;
        if(event.key === 'ArrowDown')
            keys.keyArrowDown = false;
    }

}
    // moveDown(player){
    // }
    // moveUp(player){
    // }

    // movePlayer(keys){
    //     const player1 = this.querySelector('.rackit_of_p1')
    //     const player2 = this.querySelector('.rackit_of_p2')
    //     if(keys.keyW === true)
    //         this.moveUp(player1);
    //     if(keys.keyS === true)
    //         this.moveDown(player1);
    //     if(keys.keyArrowUp === true)
    //         this.moveUp(player2);
    //     if(keys.keyArrowDown === true)
    //         this.moveDown(player2);
    // }
customElements.define('game-page', GamePage)