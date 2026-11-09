// Floating connect button: pops the label up once per visit after a short pause
(function () {
  var fab = document.querySelector('.connect-fab');
  if (!fab) return;

  var seen = false;
  try { seen = sessionStorage.getItem('connectPopped') === '1'; } catch (e) {}
  if (seen) return;

  setTimeout(function () {
    fab.classList.add('show');
    try { sessionStorage.setItem('connectPopped', '1'); } catch (e) {}
    setTimeout(function () { fab.classList.remove('show'); }, 6000);
  }, 3500);
})();