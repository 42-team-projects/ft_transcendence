export class ChatRoomComponent extends HTMLElement {
    constructor () {
        super();
        this.attachShadow({mode: "open"});
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    font-family: 'Sansation bold';
                    height: 1000px;
                    display: flex;
                    flex: 2.5;
                    flex-direction: column;
                }

                .body {
                    flex: 10;
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                    overflow-y: scroll;
                }

                .body::-webkit-scrollbar {
                    opacity: 0.7;
                    background-color: transparent;
                    width: 1px;
                }
                
                .body::-webkit-scrollbar-track {
                    opacity: 0.7;
                    border-radius: 100px;
                }
                
                .body::-webkit-scrollbar-thumb {
                    opacity: 0.7;
                    background-color: #d9d9d9;
                    border-radius: 100px;
                }

                .timer p {
                    margin: 0;
                    font-size: 10px;
                    color: #C5C4C490;
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-top: 10px;
                }

            </style>
            <chat-header></chat-header>
            <div class="body">
                <receiver-component>
                    <receiver-message-container corner>
                        HELLO DOKOKO 👋👋👋
                    </receiver-message-container>
                    <receiver-message-container>    
                        Lorem ipsum dolor sit amet. Aut illo quia sit dolore perferendis At voluptate repudiandae sit culpa galisum et voluptas animi qui doloribus fuga. Cum praesentium galisum et laborum consequatur qui accusantium iusto ea similique dolore et odio quia. Aut omnis quia eum commodi deleniti eum corporis velit non recusandae reprehenderit.
                    </receiver-message-container>
                </receiver-component>
                
                
                <sender-component>
                    <sender-message-container corner>
                        Lorem ipsum dolor sit amet. Aut illo quia sit dolore perferendis At voluptate repudiandae sit culpa galisum et voluptas animi qui doloribus fuga. Cum praesentium galisum et laborum consequatur qui accusantium iusto ea similique dolore et odio quia. Aut omnis quia eum commodi deleniti eum 
                        </sender-message-container>
                        </sender-component>
                        
                <div class="timer">
                    <p>12:05 PM</p>
                </div>        
                        
                <receiver-component>
                    <receiver-message-container corner>
                    The different background images are test Lorem ipsum dolor sit amet. Aut illo quia sit dolore perferendis At voluptate repudiandae sit culpa galisum et voluptas animi qui doloribus fuga. Cum praesentium galisum et laborum consequatur qui accusantium iusto ea similique dolore et odio quia. Aut omnis quia eum commodi deleniti eum 
                        hello world tet ads send, diff 😀 where.
                        Lorem ipsum dolor sit amet. Aut illo quia sit dolore perferendis At voluptate repudiandae sit culpa galisum et voluptas animi qui doloribus fuga. Cum praesentium galisum et laborum consequatur qui accusantium iusto ea similique dolore et odio quia. Aut omnis quia eum commodi deleniti eum 
                        hello world tet ads send, diff 😀 where.
                        Lorem ipsum dolor sit amet. Aut illo quia sit dolore perferendis At voluptate repudiandae sit culpa galisum et voluptas animi qui doloribus fuga. Cum praesentium galisum et laborum consequatur qui accusantium iusto ea similique dolore et odio quia. Aut omnis quia eum commodi deleniti eum 
                        hello world tet ads send, diff 😀 where.
                        Lorem ipsum dolor sit amet. Aut illo quia sit dolore perferendis At voluptate repudiandae sit culpa galisum et voluptas animi qui doloribus fuga. Cum praesentium galisum et laborum consequatur qui accusantium iusto ea similique dolore et odio quia. Aut omnis quia eum commodi deleniti eum 
                        hello world tet ads send, diff 😀 where.
                    </receiver-message-container>
                </receiver-component>
                <receiver-component>
                    <receiver-message-container>
                    The different background images are test Lorem ipsum dolor sit amet. Aut illo quia sit dolore perferendis At voluptate repudiandae sit culpa galisum et voluptas animi qui doloribus fuga. Cum praesentium galisum et laborum consequatur qui accusantium iusto ea similique dolore et odio quia. Aut omnis quia eum commodi deleniti eum 
                        hello world tet ads send, diff 😀 where.
                        Lorem ipsum dolor sit amet. Aut illo quia sit dolore perferendis At voluptate repudiandae sit culpa galisum et voluptas animi qui doloribus fuga. Cum praesentium galisum et laborum consequatur qui accusantium iusto ea similique dolore et odio quia. Aut omnis quia eum commodi deleniti eum 
                        hello world tet ads send, diff 😀 where.
                        Lorem ipsum dolor sit amet. Aut illo quia sit dolore perferendis At voluptate repudiandae sit culpa galisum et voluptas animi qui doloribus fuga. Cum praesentium galisum et laborum consequatur qui accusantium iusto ea similique dolore et odio quia. Aut omnis quia eum commodi deleniti eum 
                        hello world tet ads send, diff 😀 where.
                        Lorem ipsum dolor sit amet. Aut illo quia sit dolore perferendis At voluptate repudiandae sit culpa galisum et voluptas animi qui doloribus fuga. Cum praesentium galisum et laborum consequatur qui accusantium iusto ea similique dolore et odio quia. Aut omnis quia eum commodi deleniti eum 
                        hello world tet ads send, diff 😀 where.
                    </receiver-message-container>
                </receiver-component>
                <receiver-component>
                    <receiver-message-container>
                    The different background images are test Lorem ipsum dolor sit amet. Aut illo quia sit dolore perferendis At voluptate repudiandae sit culpa galisum et voluptas animi qui doloribus fuga. Cum praesentium galisum et laborum consequatur qui accusantium iusto ea similique dolore et odio quia. Aut omnis quia eum commodi deleniti eum 
                        hello world tet ads send, diff 😀 where.
                        Lorem ipsum dolor sit amet. Aut illo quia sit dolore perferendis At voluptate repudiandae sit culpa galisum et voluptas animi qui doloribus fuga. Cum praesentium galisum et laborum consequatur qui accusantium iusto ea similique dolore et odio quia. Aut omnis quia eum commodi deleniti eum 
                        hello world tet ads send, diff 😀 where.
                        Lorem ipsum dolor sit amet. Aut illo quia sit dolore perferendis At voluptate repudiandae sit culpa galisum et voluptas animi qui doloribus fuga. Cum praesentium galisum et laborum consequatur qui accusantium iusto ea similique dolore et odio quia. Aut omnis quia eum commodi deleniti eum 
                        hello world tet ads send, diff 😀 where.
                        Lorem ipsum dolor sit amet. Aut illo quia sit dolore perferendis At voluptate repudiandae sit culpa galisum et voluptas animi qui doloribus fuga. Cum praesentium galisum et laborum consequatur qui accusantium iusto ea similique dolore et odio quia. Aut omnis quia eum commodi deleniti eum 
                        hello world tet ads send, diff 😀 where.
                    </receiver-message-container>
                </receiver-component>

            </div>
            <chat-footer></chat-footer>
        `;
    }
}