
const cardElement = document.querySelector('card-element');

cardElement.addEventListener('cardEvent', e => {
  alert(`The ID selected is ${e.detail._id}`);
});
