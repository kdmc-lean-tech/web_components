
class CardElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['title', 'img', 'content', 'id'];
  }

  attributeChangedCallback(attr, oldVal, newVal) {
    if (oldVal !== newVal) {
        this[attr] = newVal;
    }
  }

  createTemplate() {
    const template = document.createElement('template');
    template.innerHTML = /*html*/ `
      <link href="https://fonts.googleapis.com/css2?family=Mukta:wght@200&display=swap" rel="stylesheet">
      <div class="card__container">
        <img src="${ this.img }" alt="${ this.title }"/>
        <div class="card__content">
          <h1 class="card__title">${ this.title }</h1>
          <div class="card__text">
            <p>${ this.content }<p>
          </div>
        </div>
        <div class="card__footer">
          <button class="card__footer-button">Read More</button>
        </div>
      </div>
      <style>${ this.setStyles() }</style>
    `;
    return template;
  }

  setStyles() {
    return /*css*/ `
      * {
        font-family: 'Mukta', sans-serif;
      }
      .card__container {
        width: 350px;
        height: 450px;
        border: 1px solid #E2EFFE;
        -webkit-box-shadow: 9px 11px 32px -21px rgba(0,0,0,0.75);
        -moz-box-shadow: 9px 11px 32px -21px rgba(0,0,0,0.75);
        box-shadow: 9px 11px 32px -21px rgba(0,0,0,0.75);
      }
      .card__container img {
        width: 100%;
      }
      .card__container .card__content {
        padding: 10px;
      }
      .card__container
      .card__content
      p {
        text-align: justify;
        color: #AEBDCD;
        font-size: 16px;
      }
      .card__container
      .card__content
      .card__title {
        font-size: 25px;
      }
      .card__container
      .card__footer {
        padding: 10px;
      }
      .card__container
      .card__footer
      .card__footer-button {
        padding: 5px 15px;
        background-color: black;
        color: white;
        border-radius: 30px;
        cursor: pointer;
        font-size: 16px;
      }
      .card__container
      .card__footer
      .card__footer-button:hover {
        border: 1px solid black;
        background-color: white;
        color: black;
      }
    `;
  }

  render() {
    this.shadowRoot.appendChild(this.createTemplate().content.cloneNode(true));
  }

  connectedCallback() {
    this.render();
    this.shadowRoot.querySelector('.card__footer-button')
      .addEventListener('click', e => {
        this.dispatchEvent(new CustomEvent('cardEvent', { detail: { _id: this.id } }))
      });
  }
}

customElements.define('card-element', CardElement);
