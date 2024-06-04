class HorizontalSplitPanel extends HTMLElement {
    constructor() {
        super();
        this.fixedPane = 'left';
        this.splitterLocation = 50;
        this.allowResizing = true;
        this._init();
    }

    static get observedAttributes() {
        return ['fixed-pane', 'splitter-location', 'show-splitter'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'fixed-pane') {
            this.fixedPane = newValue;
        } else if (name === 'splitter-location') {
            const location = Math.min(Math.max(parseInt(newValue, 10), 0), 100);
            if (!isNaN(location)) {
                this.splitterLocation = location;
                this.applySplitterLocation();
            }
        } else if (name === 'show-splitter') {
            this.allowResizing = newValue !== 'false';
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
            }

            #split-container {
                display: flex;

                
            }

            .panel {
                flex-grow: 1;
                overflow: auto;
                display: flex;
                align-items: stretch;
            }

            #divider {
                flex-grow: 0;
                flex-shrink: 0;
                background: rgba(255, 255, 255, 0.25);
				backdrop-filter: blur(12px);
                cursor: ew-resize;
                width: 5px;
                border-radius: 20px;
            }
        `;
        shadow.appendChild(style);

        const splitContainer = document.createElement("div");
        splitContainer.id = "split-container";

        const leftPanel = document.createElement("div");
        leftPanel.id = "pane1";
        leftPanel.className = "panel";
        leftPanel.innerHTML = '<slot name="pane1"></slot>';

        const divider = document.createElement("div");
        divider.id = "divider";
        divider.addEventListener('mousedown', this.startResizing.bind(this));

        const rightPanel = document.createElement("div");
        rightPanel.id = "pane2";
        rightPanel.className = "panel";
        rightPanel.innerHTML = '<slot name="pane2"></slot>';

        splitContainer.appendChild(leftPanel);
        splitContainer.appendChild(divider);
        splitContainer.appendChild(rightPanel);
        this.applySplitterLocation();
        shadow.appendChild(splitContainer);
        this.updateSplitterVisibility();
    }

    applySplitterLocation() {
        if (!this.shadowRoot || this.splitterLocation === undefined) return;

        const splitContainer = this.shadowRoot.getElementById('split-container');
        if (!splitContainer) return;

        window.requestAnimationFrame(() => {
            const width = splitContainer.clientWidth;
            const splitterPos = (this.splitterLocation / 100) * width;

            if (this.fixedPane === 'left') {
                const leftPanel = this.shadowRoot.getElementById('pane1');
                leftPanel.style.flexGrow = '0';
                leftPanel.style.flexBasis = `${splitterPos}px`;
                this.shadowRoot.getElementById('pane2').style.flexGrow = '1';
            } else {
                const rightPanel = this.shadowRoot.getElementById('pane2');
                const offsetRight = width - splitterPos;
                rightPanel.style.flexGrow = '0';
                rightPanel.style.flexBasis = `${offsetRight}px`;
                this.shadowRoot.getElementById('pane1').style.flexGrow = '1';
            }
        });
    }

    updateSplitterVisibility() {
        if (!this.shadowRoot) return;
        const divider = this.shadowRoot.getElementById('divider');
        if (!divider) return;

        divider.style.display = this.allowResizing ? 'block' : 'none';
        if (this.allowResizing) {
            divider.addEventListener('mousedown', this.startResizing.bind(this));
        } else {
            divider.removeEventListener('mousedown', this.startResizing.bind(this));
        }
    }

    startResizing(e) {
        this.isResizing = true;
        this.lastDownX = e.clientX;
        document.addEventListener('mousemove', this.moveDivider.bind(this));
        document.addEventListener('mouseup', () => {
            document.removeEventListener('mousemove', this.moveDivider.bind(this));
            this.isResizing = false;
        });
    }

    moveDivider(e) {
        if (!this.isResizing) return;

        const splitContainer = this.shadowRoot.getElementById('split-container');
        const offset = e.clientX - splitContainer.getBoundingClientRect().left;
        const offsetRight = splitContainer.clientWidth - offset;
        const minWidth = 100;
        const maxWidth = splitContainer.clientWidth - minWidth;

        if (this.fixedPane === 'left') {
            const leftPanel = this.shadowRoot.getElementById('pane1');
            if (offset > minWidth && offset < maxWidth) {
                leftPanel.style.flexGrow = '0';
                leftPanel.style.flexBasis = `${offset}px`;
                this.shadowRoot.getElementById('pane2').style.flexGrow = '1';
            }
        } else {
            const rightPanel = this.shadowRoot.getElementById('pane2');
            if (offsetRight > minWidth && offsetRight < maxWidth) {
                rightPanel.style.flexGrow = '0';
                rightPanel.style.flexBasis = `${offsetRight}px`;
                this.shadowRoot.getElementById('pane1').style.flexGrow = '1';
            }
        }
    }
}

customElements.define("horizontalsplitpannel", HorizontalSplitPanel);
