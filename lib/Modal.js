window.modalStack = [];

class Modal extends HTMLElement {
	constructor() {
		super();
		this.open = this.open.bind(this);
		this.close = this.close.bind(this);
		this.blurClose = this.blurClose.bind(this);
		this.blurClickClose = true;
		this.handleEscapePress = this.handleEscapePress.bind(this);
	}

	static get observedAttributes() {
		return ["close-on-blur"];
	}

	attributeChangedCallback(name, oldValue, newValue) {
		switch (name) {
			case "close-on-blur":
				if (newValue.toLowerCase() === "false") {
					this.blurClickClose = false;
				} else {
					this.blurClickClose = true;
				}
				break;

			default:
				break;
		}
	}

	connectedCallback() {
		let shadow = this.attachShadow({ mode: "open" });

		let style = document.createElement("style");
		style.textContent = `

		@keyframes zoomBounce {
			0% {
				transform: scale(0.5);
				opacity: 0;
			}
			50% {
				transform: scale(1.05);
				opacity: 1;
			}
			70% {
				transform: scale(0.95);
			}
			100% {
				transform: scale(1);
			}
		}
		

		.overlay-blur {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: rgba(0, 0, 0, 0.5);
			backdrop-filter: blur(12px);
			z-index: 1000;
			display: none; /* This controls the visibility */
			justify-content: center;
			align-items: center; /* Added to center vertically */
		}
	
		#modalParent {
			/* Removed display: none; to rely on the overlay for visibility */
			border-radius: 12px;
			background: rgba(255, 255, 255, 0.075);
			backdrop-filter: blur(12px);
			padding: 16px 22px;
			box-shadow: rgba(0, 0, 0, 0.2) 0px 7px 7px -5px, rgba(0, 0, 0, 0.14) 0px 10px 12px 3px, rgba(0, 0, 0, 0.12) 0px 5px 16px 4px;
			margin: auto; /* Keeps modal centered in the flex container */
			animation: zoomBounce 0.5s ease forwards;
		}

		.icon-label-red {
			background-image: linear-gradient(to right, #ff0000 0%, #bf0000 51%, #ff8080 100%);
			background-size: 200% auto;
			transition: 0.5s;
			border-radius: 30px;
			padding: 0.5em 1em;
			cursor: pointer;
			user-select: none; /* Add this line to disable text selection */
		}
		
		.icon-label-red:hover {
			background-position: right center;
		}
		
		.icon-label-red::after {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			width: 100%;
			height: 100%;
			background: radial-gradient(circle, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.2) 70%, rgba(255, 255, 255, 0) 100%);
			opacity: 0;
			transform: scale(0);
		}

		::slotted(h4) {
			width: calc(100% - 44px);
		}
	`;

		shadow.appendChild(style);

		const closeOnBlurAttr = this.getAttribute("close-on-blur");
		if (closeOnBlurAttr !== null) {
			this.blurClickClose = closeOnBlurAttr.toLowerCase() !== "false";
		}

		const template = document.createElement("template");
		template.innerHTML = `
      <div class="overlay-blur" id="overlay">
				<div style="display: flex; flex-direction: column; justify-content: center;">
					<section id="modalParent">
						<div style="display: flex; flex-direction: row-reverse;">
							<div class="icon-label-red" id="closeBtn" style="margin-top: -2px; margin-right: -10px">
								<svg style="margin: 2px -5px -2px -5px; font-size: 18px" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59L7.11 5.7A.996.996 0 1 0 5.7 7.11L10.59 12L5.7 16.89a.996.996 0 1 0 1.41 1.41L12 13.41l4.89 4.89a.996.996 0 1 0 1.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4"/></svg>
							</div>
						</div>
						<slot></slot>
					</section>
				</div>
			</div>
    `;
		shadow.appendChild(template.content.cloneNode(true));

		const modalParent = shadow.getElementById("modalParent");
		modalParent.addEventListener("click", (event) => {
			event.stopPropagation();
		});

		shadow.querySelector("#closeBtn").addEventListener("click", this.close);

		shadow.getElementById("overlay").addEventListener("click", this.blurClose);

		shadow.getElementById("modalParent").style = this.getAttribute("style");

		shadow.getElementById("overlay").addEventListener("click", (event) => {
			if (event.target === shadow.getElementById("overlay")) {
				this.blurClose(event);
			}
		});
	}

	blurClose(event) {
		if (this.blurClickClose) {
			this.close();
		} else {
			event.stopPropagation();
		}
	}

	handleEscapePress(event) {
		if (event.key === "Escape" && this.blurClickClose) {
			this.close();
		}
	}

	open() {
		this.shadowRoot.querySelector(".overlay-blur").style.display = "flex";
		window.modalStack.push(this);
		this.style.zIndex = 1050 + window.modalStack.length * 10;
		document.addEventListener("keydown", this.handleEscapePress);
	}

	close() {
		this.shadowRoot.getElementById("overlay").style.display = "none";
		const index = window.modalStack.indexOf(this);
		if (index > -1) {
			window.modalStack.splice(index, 1);
		}
		window.modalStack.forEach((modal, i) => {
			modal.style.zIndex = 1000 + i + 1;
		});

		this.dispatchEvent(
			new CustomEvent("modalclosed", {
				detail: { message: "Modal has been closed" },
				bubbles: true,
				composed: true,
			})
		);
	}
}

customElements.define("modal", Modal);

const DialogBoxResult = Object.freeze({
	OK: "ok",
	CANCEL: "cancel",
	YES: "yes",
	NO: "no",
	RETRY: "retry",
	IGNORE: "ignore",
	ABORT: "abort",
	CONTINUE: "continue",
});

const DialogBoxType = Object.freeze({
	INFO: "info",
	WARNING: "warning",
	ERROR: "error",
	QUESTION: "question",
	SUCCESS: "success",
});

const DialogBoxButtonOptions = Object.freeze({
	OK: "ok",
	OK_CANCEL: "okcancel",
	YES_NO: "yesno",
	YES_NO_CANCEL: "yesnocancel",
	RETRY_CANCEL: "retrycancel",
	ABORT_RETRY_IGNORE: "abortretryignore",
	CONTINUE_ABORT_CANCEL: "continueabortcancel",
});

class DialogBox extends Modal {
	constructor() {
		super();
	}

	static _getDialogButtonOptions(buttonType) {
		const buttonTemplates = {
			ok: `<button data-result="ok">OK</button>`,
			okcancel: `<button data-result="ok">OK</button><button data-result="cancel">Cancel</button>`,
			yesno: `<button data-result="yes">Yes</button><button data-result="no">No</button>`,
			yesnocancel: `<button data-result="yes">Yes</button><button data-result="no">No</button><button data-result="cancel">Cancel</button>`,
			retrycancel: `<button data-result="retry">Retry</button><button data-result="cancel">Cancel</button>`,
			abortretryignore: `<button data-result="abort">Abort</button><button data-result="retry">Retry</button><button data-result="ignore">Ignore</button>`,
			continueabortcancel: `<button data-result="continue">Continue</button><button data-result="abort">Abort</button><button data-result="cancel">Cancel</button>`,
		};
		return buttonTemplates[buttonType] || "";
	}

	static _getDialogIcon(dialogType) {
		const iconTemplates = {
			info: `<svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 24 24"><path fill="currentColor" d="M11 17h2v-6h-2zm1-8q.425 0 .713-.288T13 8q0-.425-.288-.712T12 7q-.425 0-.712.288T11 8q0 .425.288.713T12 9m0 13q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12q0-3.35-2.325-5.675T12 4Q8.65 4 6.325 6.325T4 12q0 3.35 2.325 5.675T12 20m0-8"/></svg>`,
			warning: `<svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M85.57 446.25h340.86a32 32 0 0 0 28.17-47.17L284.18 82.58c-12.09-22.44-44.27-22.44-56.36 0L57.4 399.08a32 32 0 0 0 28.17 47.17"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="m250.26 195.39l5.74 122l5.73-121.95a5.74 5.74 0 0 0-5.79-6h0a5.74 5.74 0 0 0-5.68 5.95"/><path fill="currentColor" d="M256 397.25a20 20 0 1 1 20-20a20 20 0 0 1-20 20"/></svg>`,
			error: `<svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M8.6 1c1.6.1 3.1.9 4.2 2c1.3 1.4 2 3.1 2 5.1c0 1.6-.6 3.1-1.6 4.4c-1 1.2-2.4 2.1-4 2.4c-1.6.3-3.2.1-4.6-.7c-1.4-.8-2.5-2-3.1-3.5C.9 9.2.8 7.5 1.3 6c.5-1.6 1.4-2.9 2.8-3.8C5.4 1.3 7 .9 8.6 1m.5 12.9c1.3-.3 2.5-1 3.4-2.1c.8-1.1 1.3-2.4 1.2-3.8c0-1.6-.6-3.2-1.7-4.3c-1-1-2.2-1.6-3.6-1.7c-1.3-.1-2.7.2-3.8 1c-1.1.8-1.9 1.9-2.3 3.3c-.4 1.3-.4 2.7.2 4c.6 1.3 1.5 2.3 2.7 3c1.2.7 2.6.9 3.9.6M7.9 7.5L10.3 5l.7.7l-2.4 2.5l2.4 2.5l-.7.7l-2.4-2.5l-2.4 2.5l-.7-.7l2.4-2.5l-2.4-2.5l.7-.7z" clip-rule="evenodd"/></svg>`,
			question: `<svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 24 24"><g fill="none"><path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2m0 2a8 8 0 1 0 0 16a8 8 0 0 0 0-16m0 12a1 1 0 1 1 0 2a1 1 0 0 1 0-2m0-9.5a3.625 3.625 0 0 1 1.348 6.99a.837.837 0 0 0-.305.201c-.044.05-.051.114-.05.18L13 14a1 1 0 0 1-1.993.117L11 14v-.25c0-1.153.93-1.845 1.604-2.116a1.626 1.626 0 1 0-2.229-1.509a1 1 0 1 1-2 0A3.625 3.625 0 0 1 12 6.5"/></g></svg>`,
			success: `<svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 24 24"><path fill="currentColor" d="m9 20.42l-6.21-6.21l2.83-2.83L9 14.77l9.88-9.89l2.83 2.83z"/></svg>`,
		};
		const iconColor = {
			info: "var(--brightblue)",
			warning: "var(--gold)",
			error: "var(--deepred)",
			question: "var(--teal)",
			success: "var(--brightgreen)",
		};

		const iconHTML = iconTemplates[dialogType] || "";
		return iconHTML
			? `
			<div style="display: flex; background-color: ${iconColor[dialogType]}; border-radius: 100px; padding: .5em;">
				${iconHTML}
			</div>
		`
			: "";
		return iconHTML;
	}

	close() {
		super.close();
		this.dispatchEvent(new CustomEvent("dialog-closed", { detail: { result: DialogBoxResult.CANCEL }, bubbles: true, composed: true }));
	}

	static openDialogBox(text, title = "Dialog", dialogType = "info", dialogButtons = "ok") {
		const dialog = document.createElement("dialog-box");
		dialog.setAttribute("title", title);
		dialog.setAttribute("dialog-type", dialogType);
		dialog.setAttribute("dialog-buttons", dialogButtons);
		dialog.setAttribute("close-on-blur", "false");

		const buttonsHTML = this._getDialogButtonOptions(dialogButtons);
		const iconHTML = this._getDialogIcon(dialogType);
		dialog.innerHTML = `
			<h4 style="margin-top: -1.4em; margin-right: -1.4em;">${title}</h4>
			<div style="display: flex; margin: 2em;">${iconHTML}<div style="margin: auto; margin-left: 1em;">${text}</div></div>
			<div style="display: flex; justify-content: flex-end; margin-top: 1em;" class="dialog-buttons">${buttonsHTML}</div>
		`;

		document.body.appendChild(dialog);
		dialog.open();

		return new Promise((resolve) => {
			const buttonsContainer = dialog.querySelector(".dialog-buttons");
			buttonsContainer.addEventListener("click", (event) => {
				if (event.target.tagName.toLowerCase() === "button") {
					const buttonResult = event.target.dataset.result;
					resolve(DialogBoxResult[buttonResult.toUpperCase()]);
					dialog.remove();
				}
			});

			dialog.addEventListener("dialog-closed", (event) => {
				resolve(event.detail.result);
				dialog.remove();
			});
		});
	}

	connectedCallback() {
		super.connectedCallback();
	}
}

customElements.define("dialog-box", DialogBox);

document.addEventListener("DOMContentLoaded", () => {
	document.body.addEventListener("click", (event) => {
		const target = event.target.getAttribute("open-modal-target");
		if (target) {
			const modal = document.getElementById(target);
			if (modal && typeof modal.open === "function") {
				modal.open();
			} else {
				console.error("Modal not found or does not have an open method:", target);
			}
		}
	});
});
