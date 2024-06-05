class BrandingBar extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		let shadow = this.attachShadow({ mode: "open" });

		let style = document.createElement("style");
		style.textContent = `
			header {
				background-color: rgba(0,0,0, 0.4);
				padding: 8px 18px;
				display: flex;
				align-items: center;
				position: fixed;
				width: 100%;
				top: 0;
				z-index: 1000;
				backdrop-filter: blur(12px);
				box-sizing: border-box;
				box-shadow: 0 0 0.75em rgba(0,0,0,0.6);
			}
			
			::slotted(p) {
				font-size: 1.25rem;
			}

			::slotted(img) {
				height: 3em;
				margin-right: 0.5em;
			}
		`;
		shadow.appendChild(style);

		const template = document.createElement("template");
		template.innerHTML = `
			<link rel="stylesheet" href="genesis2/genesis.css">
			<header>
				<slot></slot>
			</header>
		`;
		shadow.appendChild(template.content.cloneNode(true));
	}
}

customElements.define("branding-bar", BrandingBar);
