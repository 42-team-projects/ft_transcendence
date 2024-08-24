
export default class User extends HTMLElement {
	connectedCallback() {
		this.attachShadow({ mode: "open" });
		this.shadowRoot.innerHTML = `
			<main id="app"></main>
		`;
	}
}