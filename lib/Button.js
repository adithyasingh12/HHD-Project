class Button extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		let shadow = this.attachShadow({ mode: "open" });

		let style = document.createElement("style");
		style.textContent = `
		button {
			background-image: linear-gradient(to right, #1fa2ff 0%, #12d8fa 51%, #1fa2ff 100%);
			padding: 10px 20px;
			text-align: center;
			text-transform: uppercase;
			background-size: 200% auto;
			color: white;
			border-radius: 20px;
			cursor: pointer;
			outline: none;
			border: none;
			transition: 0.125s;
		}
		
		button:hover {
		background-position: right center;
			text-decoration: none;
		}
		
		button:active {
			box-shadow: 0 0 12px #1d4ed8;
		}
		
		button::after {
			content: "";
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			width: 100%;
			height: 100%;
			background: radial-gradient(circle, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.2) 70%, rgba(255, 255, 255, 0) 100%);
			opacity: 0;
			transform: scale(0);
		}`;
		shadow.appendChild(style);

		const template = document.createElement("template");
		template.innerHTML = `
			<link rel="stylesheet" href="genesis2/genesis.css">
			<button><slot></slot></button>
		`;
		shadow.appendChild(template.content.cloneNode(true));
	}
}

customElements.define("button", Button);
