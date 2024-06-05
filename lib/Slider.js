class Slider extends HTMLElement {
    static get observedAttributes() {
        return ['value', 'display-value', 'name'];
    }

    constructor() {
        super();

        this.attachShadow({ mode: 'open' });
        const style = document.createElement('style');
        const template = document.createElement('template');

        style.textContent = `
            .slider-container {
                position: relative;
                height: 50px;
            }

            .slider {
                width: 100%;
                -webkit-appearance: none;
                appearance: none;
                height: 5px;
                background: #ddd;
                outline: none;
                opacity: 0.7;
                -webkit-transition: .2s;
                transition: opacity .2s;
            }

            .slider:hover {
                opacity: 1;
            }

            input[type=range]::-webkit-slider-thumb {
                -webkit-appearance: none;
                appearance: none;
                width: 25px;
                height: 25px;
                background: #7E7D7EBF; 
                cursor: pointer;
				border-bottom-left-radius: 30px;
                border-bottom-right-radius: 30px;
            }

            .slider::-moz-range-thumb {
                width: 25px;
                height: 25px; 
                background: #7E7D7EBF; 
                cursor: pointer;
                border-radius: 10px;
                border-bottom-left-radius: 30px;
                border-bottom-right-radius: 30px;
            }

            .value {
                position: absolute;
                top: 30px;
                left: 50%;
                transform: translateX(-50%);
                font-size: 16px;
            }

            input[type="hidden"] {
                display: none; /* Ensure the hidden input is not visible */
            }
        `;

        template.innerHTML = `
            <div class="slider-container">
                <input type="range" min="0" max="100" value="0" class="slider" id="myRange">
                <input type="hidden" class="slider-value" value="0"> <!-- Hidden input for form submission -->
                <div class="value">0%</div>
            </div>
        `;

        this.shadowRoot.appendChild(style);
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.slider = this.shadowRoot.querySelector('.slider');
        this.valueDisplay = this.shadowRoot.querySelector('.value');
        this.hiddenInput = this.shadowRoot.querySelector('.slider-value');
    }

    connectedCallback() {
        this.updateValue(this.getAttribute('value'));
        this.updateDisplayValue(this.getAttribute('display-value'));
        this.updateName(this.getAttribute('name'));

        this.slider.addEventListener('input', () => {
            this.valueDisplay.textContent = `${this.slider.value}%`;
            this.setAttribute('value', this.slider.value);
            this.hiddenInput.value = this.slider.value;
        });
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'value':
                this.updateValue(newValue);
                break;
            case 'display-value':
                this.updateDisplayValue(newValue);
                break;
            case 'name':
                this.updateName(newValue);
                break;
        }
    }

    updateValue(value) {
        const numericValue = parseInt(value, 10);
        if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 100) {
            this.slider.value = numericValue;
            this.valueDisplay.textContent = `${numericValue}%`;
            this.hiddenInput.value = numericValue;
        }
    }

    updateDisplayValue(display) {
        this.valueDisplay.style.display = display === 'false' ? 'none' : '';
    }

    updateName(name) {
        this.hiddenInput.name = name;
    }
}

customElements.define('slider', Slider);
