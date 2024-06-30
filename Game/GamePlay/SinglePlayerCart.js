

const singlePlayerTemplate = document.createElement('template')


singlePlayerTemplate.innerHTML = /*html*/ `
    <link rel="stylesheet" href="../Game/GamePlay/Game-player.css">
    <img class="GreenCartImg" src="../images/img-singleplayer.svg" alt="">
    <img class="GreenCart" src="../../images/Single.svg" alt="">
    <div class="style-0">
        <div class="style-1">
            <div class="style-2">
                <div class="style-2_1">
                    <h1>SINGLE PLAYER</h1>
                </div>
                <div class="box-container">
                    <div class="top-box">
                        <div class="middle-box">
                        </div>
                    </div>
                </div>
                <div class="buttonC">
                    <p>
                    Lorem ipsum dolor sit amet. Ut facere consequatur est dolore placeat rem accusamus quae est odit dolore. Id impedit molestiae vel voluptates repellendus ut perferendis libero et blanditiis dolor est dolorum molestiae. 
                    </p>
                    <div class="buttons">
                        <div class="buttons-content">
                            <h1>START</h1>
                        </div>
                    </div>
                </div>
        
            </div>
        </div>
    </div>
    `
/*
    </div>
</div>
            */
                        // <div class="mask1"></div>

export class SinglePlayer extends HTMLElement{

    constructor (){
        super();
        this.appendChild(singlePlayerTemplate.content.cloneNode(true))
    }

}