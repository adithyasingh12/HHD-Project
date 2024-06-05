class Card extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		let shadow = this.attachShadow({ mode: "open" });

		let style = document.createElement("style");
		style.textContent = `
			:host {
				border-radius: 12px;
				background: rgba(255, 255, 255, 0.075);
				backdrop-filter: blur(12px);
				box-shadow: rgba(0, 0, 0, 0.2) 0px 7px 7px -5px, rgba(0, 0, 0, 0.14) 0px 10px 12px 3px, rgba(0, 0, 0, 0.12) 0px 5px 16px 4px;
			}

			section {
				padding: 22px 22px 18px 22px;
			}
		`;
		shadow.appendChild(style);

		const template = document.createElement("template");
		template.innerHTML = `
			<link rel="stylesheet" href="genesis2/genesis.css">
			<section>
				<slot></slot>
			</section>
		`;
		shadow.appendChild(template.content.cloneNode(true));
	}
}

customElements.define("card", Card);
