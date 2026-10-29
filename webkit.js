/* WebKit — a tiny, tokenized design system.
   Zero dependencies, zero build: five framework-agnostic Web Components styled exclusively
   from design tokens (dist/tokens.css). Add yours with the checklist in CONTRIBUTING.md. */

class WkButton extends HTMLElement {
  static observedAttributes = ['variant', 'size', 'disabled'];
  connectedCallback() { this.render(); }
  attributeChangedCallback() { this.render(); }
  render() {
    const v = this.getAttribute('variant') || 'primary';
    const s = this.getAttribute('size') || 'md';
    const dis = this.hasAttribute('disabled');
    this.innerHTML = `<button type="button" class="wk-button ${v} ${s}" ${dis ? 'disabled' : ''}><slot></slot></button>`;
  }
}

class WkBadge extends HTMLElement {
  static observedAttributes = ['tone'];
  connectedCallback() { this.render(); }
  attributeChangedCallback() { this.render(); }
  render() {
    const t = this.getAttribute('tone') || 'neutral';
    this.innerHTML = `<span class="wk-badge ${t}"><slot></slot></span>`;
  }
}

class WkCard extends HTMLElement {
  static observedAttributes = ['title'];
  connectedCallback() { this.render(); }
  attributeChangedCallback() { this.render(); }
  render() {
    const title = this.getAttribute('title');
    this.innerHTML = `<div class="wk-card">${title ? `<h3 class="wk-card-title">${title}</h3>` : ''}<div class="wk-card-body"><slot></slot></div></div>`;
  }
}

class WkField extends HTMLElement {
  static observedAttributes = ['label', 'error', 'hint', 'type', 'placeholder'];
  connectedCallback() { this.render(); }
  attributeChangedCallback() { this.render(); }
  render() {
    const label = this.getAttribute('label') || '';
    const type = this.getAttribute('type') || 'text';
    const ph = this.getAttribute('placeholder') || '';
    const err = this.getAttribute('error');
    const hint = this.getAttribute('hint');
    const id = this.getAttribute('field-id') || 'field';
    this.innerHTML = `<label class="wk-label" for="${id}">${label}</label>
      <input id="${id}" class="wk-input" type="${type}" placeholder="${ph}" ${err ? 'aria-invalid="true" aria-describedby="wk-err"' : hint ? 'aria-describedby="wk-hint"' : ''}>
      ${hint ? `<p id="wk-hint" class="wk-hint">${hint}</p>` : ''}
      ${err ? `<p id="wk-err" class="wk-error" role="alert">${err}</p>` : ''}`;
  }
}

class WkNotice extends HTMLElement {
  static observedAttributes = ['tone'];
  connectedCallback() { this.render(); }
  attributeChangedCallback() { this.render(); }
  render() {
    const t = this.getAttribute('tone') || 'info';
    const role = t === 'danger' ? 'alert' : 'status';
    this.innerHTML = `<div class="wk-notice ${t}" role="${role}"><slot></slot></div>`;
  }
}

for (const [name, C] of Object.entries({ WkButton, WkBadge, WkCard, WkField, WkNotice })) {
  customElements.define('wk-' + name.toLowerCase(), C);
}
