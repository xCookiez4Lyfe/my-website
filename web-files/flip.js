// Flip cards: tap or press Enter/Space to turn a card over
(function () {
  var cards = document.querySelectorAll('.flip-card');

  function updateLabel(card) {
    var name = card.getAttribute('data-label') || 'Card';
    var flipped = card.classList.contains('flipped');
    card.setAttribute('aria-label', name + (flipped
      ? ': showing the back. Press to see the front.'
      : ': showing the front. Press to see the back.'));
  }

  cards.forEach(function (card) {
    updateLabel(card);
    card.addEventListener('click', function () {
      card.classList.toggle('flipped');
      updateLabel(card);
    });
  });
})();