class VerticalSplitPanel extends HTMLElement {
	constructor() {
		super();
		this.fixedPane = "top"; // Default to 'top' for vertical orientation
		this.splitterLocation = 50; // Split location as a percentage
		this.allowResizing = true; // Allow resizing by default
		this._init();
	}

	static get observedAttributes() {
		return ["fixed-pane", "splitter-location", "show-splitter"];
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (name === "fixed-pane") {
			this.fixedPane = newValue;
		} else if (name === "splitter-location") {
			const location = Math.min(Math.max(parseInt(newValue, 10), 0), 100);
			if (!isNaN(location)) {
				this.splitterLocation = location;
				this.applySplitterLocation();
			}
		} else if (name === "show-splitter") {
			this.allowResizing = newValue !== "false";
			this.updateSplitterVisibility();
		}
	}

	_init() {
		const shadow = this.attachShadow({ mode: "open" });

		const style = document.createElement("style");
		style.textContent = `
            :host {
                display: block;
                overflow: hidden;
                height: 100%;
                user-select: none;
            }

            #split-container {
                display: flex;
                flex-direction: column; /* Change the direction to column */
                height: 100%;
            }

            .panel {
                flex-grow: 1;
                overflow: auto;
            }

            #divider {
                flex-grow: 0;
                flex-shrink: 0;
                background: rgba(255, 255, 255, 0.25);
                backdrop-filter: blur(12px);
                cursor: ns-resize; /* Change cursor to ns-resize */
                height: 5px; /* Adjust for horizontal divider */
                width: 100%;
            }
        `;
		shadow.appendChild(style);

		const splitContainer = document.createElement("div");
		splitContainer.id = "split-container";

		const topPanel = document.createElement("div");
		topPanel.id = "pane1";
		topPanel.className = "panel";
		topPanel.innerHTML = '<slot name="pane1"></slot>';

		const divider = document.createElement("div");
		divider.id = "divider";
		divider.addEventListener("mousedown", this.startResizing.bind(this));

		const bottomPanel = document.createElement("div");
		bottomPanel.id = "pane2";
		bottomPanel.className = "panel";
		bottomPanel.innerHTML = '<slot name="pane2"></slot>';

		splitContainer.appendChild(topPanel);
		splitContainer.appendChild(divider);
		splitContainer.appendChild(bottomPanel);
		this.applySplitterLocation();
		shadow.appendChild(splitContainer);
		this.updateSplitterVisibility();
	}

	applySplitterLocation() {
		if (!this.shadowRoot || this.splitterLocation === undefined) return;

		const splitContainer = this.shadowRoot.getElementById("split-container");
		if (!splitContainer) return;

		window.requestAnimationFrame(() => {
			const height = splitContainer.clientHeight;
			const splitterPos = (this.splitterLocation / 100) * height;

			if (this.fixedPane === "top") {
				const topPanel = this.shadowRoot.getElementById("pane1");
				topPanel.style.flexGrow = "0";
				topPanel.style.flexBasis = `${splitterPos}px`;
				this.shadowRoot.getElementById("pane2").style.flexGrow = "1";
			} else {
				const bottomPanel = this.shadowRoot.getElementById("pane2");
				const offsetBottom = height - splitterPos;
				bottomPanel.style.flexGrow = "0";
				bottomPanel.style.flexBasis = `${offsetBottom}px`;
				this.shadowRoot.getElementById("pane1").style.flexGrow = "1";
			}
		});
	}

	updateSplitterVisibility() {
		if (!this.shadowRoot) return;
		const divider = this.shadowRoot.getElementById("divider");
		if (!divider) return;

		divider.style.display = this.allowResizing ? "block" : "none";
		if (this.allowResizing) {
			divider.addEventListener("mousedown", this.startResizing.bind(this));
		} else {
			divider.removeEventListener("mousedown", this.startResizing.bind(this));
		}
	}

	startResizing(e) {
		this.isResizing = true;
		this.lastDownY = e.clientY; // Use clientY for vertical position
		document.addEventListener("mousemove", this.moveDivider.bind(this));
		document.addEventListener("mouseup", () => {
			document.removeEventListener("mousemove", this.moveDivider.bind(this));
			this.isResizing = false;
		});
	}

	moveDivider(e) {
		if (!this.isResizing) return;

		const splitContainer = this.shadowRoot.getElementById("split-container");
		const offsetTop = e.clientY - splitContainer.getBoundingClientRect().top; // Calculate vertical offset
		const minHeight = 100; // Minimum height in pixels
		const maxHeight = splitContainer.clientHeight - minHeight; // Maximum height

		if (this.fixedPane === "top") {
			const topPanel = this.shadowRoot.getElementById("pane1");
			if (offsetTop > minHeight && offsetTop < maxHeight) {
				topPanel.style.flexGrow = "0";
				topPanel.style.flexBasis = `${offsetTop}px`; // Set flex-basis to offsetTop for the top panel
				this.shadowRoot.getElementById("pane2").style.flexGrow = "1";
			}
		} else {
			const bottomPanel = this.shadowRoot.getElementById("pane2");
			const offsetBottom = splitContainer.clientHeight - offsetTop; // Calculate offset for the bottom panel
			if (offsetBottom > minHeight && offsetBottom < maxHeight) {
				bottomPanel.style.flexGrow = "0";
				bottomPanel.style.flexBasis = `${offsetBottom}px`; // Set flex-basis to offsetBottom for the bottom panel
				this.shadowRoot.getElementById("pane1").style.flexGrow = "1";
			}
		}
	}
}

customElements.define("verticalsplitpanel", VerticalSplitPanel);
