// Mobile menu: toggles the nav panel under the header
(function () {
  var header = document.querySelector('.top');
  var btn = header && header.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (!btn || !nav) return;

  function setOpen(open) {
    header.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', String(open));
  }

  btn.addEventListener('click', function (e) {
    e.stopPropagation();
    setOpen(!header.classList.contains('open'));
  });

  // Close after choosing a link, tapping outside, or pressing Escape
  nav.addEventListener('click', function (e) { if (e.target.closest('a')) setOpen(false); });
  document.addEventListener('click', function (e) { if (!header.contains(e.target)) setOpen(false); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && header.classList.contains('open')) { setOpen(false); btn.focus(); }
  });

  // Reset if the window grows past the mobile breakpoint
  window.matchMedia('(min-width: 641px)').addEventListener('change', function (e) {
    if (e.matches) setOpen(false);
  });
})();