// Screen carousel: one screen at a time. Swipe, use the arrows or tabs, or press the arrow keys.
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.querySelectorAll('[data-carousel]').forEach(function (root) {
    var track = root.querySelector('.carousel-track');
    var slides = Array.prototype.slice.call(track.children);
    var tabs = Array.prototype.slice.call(root.querySelectorAll('.carousel-tab'));
    var prev = root.querySelector('.carousel-btn.prev');
    var next = root.querySelector('.carousel-btn.next');
    var count = root.querySelector('.carousel-count');
    var live = root.querySelector('[data-live]');
    var n = slides.length;
    var current = 0, ticking = false, locked = false, lockTimer = null;
    if (n < 2) return;

    function width() { return track.clientWidth; }

    function setCurrent(i, announce) {
      current = i;
      tabs.forEach(function (t, k) {
        if (k === i) t.setAttribute('aria-current', 'true'); else t.removeAttribute('aria-current');
      });
      slides.forEach(function (s, k) { s.setAttribute('aria-hidden', k === i ? 'false' : 'true'); });
      if (count) count.textContent = (i + 1) + ' / ' + n;
      if (live && announce) live.textContent = slides[i].getAttribute('aria-label');
    }

    function go(i) {
      i = (i + n) % n;                                   // wraps around at both ends
      locked = true;                                     // ignore scroll updates while it glides
      clearTimeout(lockTimer);
      lockTimer = setTimeout(function () { locked = false; }, 700);
      track.scrollTo({ left: i * width(), behavior: reduce ? 'auto' : 'smooth' });
      setCurrent(i, true);
    }

    // Keep the tabs and counter in step when the visitor swipes
    track.addEventListener('scroll', function () {
      if (locked || ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        ticking = false;
        var i = Math.round(track.scrollLeft / width());
        if (i !== current && i >= 0 && i < n) setCurrent(i, true);
      });
    }, { passive: true });

    track.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); go(current + 1); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); go(current - 1); }
      else if (e.key === 'Home') { e.preventDefault(); go(0); }
      else if (e.key === 'End') { e.preventDefault(); go(n - 1); }
    });

    if (prev) prev.addEventListener('click', function () { go(current - 1); });
    if (next) next.addEventListener('click', function () { go(current + 1); });
    tabs.forEach(function (t, k) { t.addEventListener('click', function () { go(k); }); });

    // Stay on the same screen when the window is resized or the phone is rotated
    window.addEventListener('resize', function () {
      track.scrollTo({ left: current * width(), behavior: 'auto' });
    });

    setCurrent(0, false);
  });
})();