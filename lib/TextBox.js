class TextBox extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		const shadowRoot = this.attachShadow({ mode: "open" });
		const style = document.createElement("style");
		style.textContent = `
      :host {
        display: inline-block;
				position: relative;
				margin: 0.75em 0;
				width: 100%;
      }

			input:focus {
				border-bottom: 2px solid rgba(255, 255, 255, 1);
			}

			input:hover:not(:focus) {
				border-bottom: 2px solid rgba(255, 255, 255, 0.65);
			}

      input {
				background: none;
				color: white;
        width: 100%;
        padding: 18px 8px 12px 8px;
        box-sizing: border-box;
				border: none;
        border-bottom: 2px solid rgba(255, 255, 255, 0.4);
        font-size: 18px;
				outline: none;
				transition: 0.2s;
      }
			
			input::placeholder {
				display: none;
			}

			span.empty {
				top: 3px;
				font-size: 18px;
			}

			span.focused {
				color: rgba(255, 255, 255, 1);
			}

			span.hover:not(.focused) {
				color: rgba(255, 255, 255, 0.75);
			}
			
			span {
				color: rgba(255, 255, 255, 0.5);
				position: absolute;
        font-size: 13px;
				padding: 14px 8px;
				transition: 0.3s;
				top: -18px;
				user-select: none;
				cursor: text;
				pointer-events: none;
			}
    `;

		shadowRoot.appendChild(style);

		const input = document.createElement("input");
		input.setAttribute("type", this.getAttribute("type") || "text");
		input.setAttribute("name", this.getAttribute("name") || "");

		const placeholder = this.getAttribute("placeholder");
		if (placeholder) {
			const span = document.createElement("span");
			span.className = "empty";
			span.innerText = placeholder;
			shadowRoot.appendChild(span);
		}

		input.addEventListener("input", (e) => {
			if (e.target.value != "") shadowRoot.querySelector("span").classList.remove("empty");
		});
		input.addEventListener("focus", (e) => {
			shadowRoot.querySelector("span").classList.remove("empty");
			shadowRoot.querySelector("span").classList.add("focused");
		});
		input.addEventListener("blur", (e) => {
			if (e.target.value === "") shadowRoot.querySelector("span").classList.add("empty");
			shadowRoot.querySelector("span").classList.remove("focused");
		});
		input.addEventListener("mouseenter", (e) => {
			shadowRoot.querySelector("span").classList.add("hover");
		});
		input.addEventListener("mouseleave", (e) => {
			shadowRoot.querySelector("span").classList.remove("hover");
		});

		shadowRoot.appendChild(input);

		this.inputElement = input;

		 // Create a hidden input element
		 const hiddenInput = document.createElement("input");
		 hiddenInput.setAttribute("type", "hidden");
		 hiddenInput.name = this.getAttribute("name");
	   
		 // Append the hidden input to the custom element (outside the shadow DOM)
		 this.appendChild(hiddenInput);
	   
		 // Update the hidden input whenever the shadow DOM input's value changes
		 input.addEventListener("input", () => {
		   hiddenInput.value = input.value;
		 });
	}

	static get observedAttributes() {
		return ["name"];
	}

	// Handle attribute changes, specifically the 'name' attribute
	attributeChangedCallback(name, oldValue, newValue) {
		if (name === "name") {
			this.inputElement.name = newValue; // Set the name of the internal input element
		}
	}
}

customElements.define("textbox", TextBox);
