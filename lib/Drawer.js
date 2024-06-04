class Drawer extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		let shadow = this.attachShadow({ mode: "open" });

		let style = document.createElement("style");
		style.textContent = `
		:host {
			position: sticky;
			left: 0px;
			top: 0px;
		}
		
		@media (min-width: 700px) {
			section {
				width: 250px !important;
				margin: 16px 16px 0px 16px;
				border-radius: 12px;
				/* background: rgb(31,4,52, 0.65); */
				background: rgba(255, 255, 255, 0.075);
				backdrop-filter: blur(12px);
				padding: 10px;
				box-shadow: rgba(0, 0, 0, 0.2) 0px 7px 7px -5px, rgba(0, 0, 0, 0.14) 0px 10px 12px 3px, rgba(0, 0, 0, 0.12) 0px 5px 16px 4px;
				display: flex;
  			flex-direction: column;
				height: calc(100% - 64px);
			}
		}

		@media (max-width: 700px) {
			:host {
				height: calc(100% - 64px) !important;
			}

			section {
				width: calc(100% - 52px) !important;
				margin: 16px 16px 0px 16px;
				border-radius: 12px;
				background: rgba(255, 255, 255, 0.075);
				backdrop-filter: blur(12px);
				padding: 10px;
				box-shadow: rgba(0, 0, 0, 0.2) 0px 7px 7px -5px, rgba(0, 0, 0, 0.14) 0px 10px 12px 3px, rgba(0, 0, 0, 0.12) 0px 5px 16px 4px;
				display: flex;
  			flex-direction: column;
				height: calc(100% - 64px);
			}
		}

			::slotted(ul) {
				list-style: none;
			}
			
			::slotted(a) {
				padding: 6px 10px;
				border-radius: 8px;
				transition: 0.3s;
			}
			
			::slotted(a:hover) {
				box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 3px -2px, rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 1px 8px 0px;
				background: rgba(49,46,129, 0.4);
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
		shadow.querySelector("section").style = this.getAttribute("style");
	}
}

customElements.define("drawer", Drawer);
