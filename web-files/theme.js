// Light / dark theme toggle (the saved choice is applied early in each page's <head>)
(function () {
  var root = document.documentElement;
  var btn = document.querySelector('.theme-toggle');
  if (!btn) return;

  function current() { return root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'; }

  function updateLabel() {
    btn.setAttribute('aria-label', current() === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  }

  btn.addEventListener('click', function () {
    var next = current() === 'dark' ? 'light' : 'dark';
    root.classList.add('theme-anim');                 // smooth colour fade for a moment
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
    updateLabel();
    setTimeout(function () { root.classList.remove('theme-anim'); }, 450);
  });

  updateLabel();
})();