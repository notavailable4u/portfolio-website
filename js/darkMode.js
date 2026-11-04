(() => {
  const button = document.querySelector('.btn-toggle');
  const preference = window.matchMedia('(prefers-color-scheme: dark)');
  let saved;
  try { saved = localStorage.getItem('theme'); } catch { /* Storage is optional. */ }
  let explicit = saved === 'light' || saved === 'dark';
  function apply(theme) {
    document.documentElement.dataset.theme = theme;
    if (button) button.setAttribute('aria-pressed', String(theme === 'dark'));
  }
  apply(explicit ? saved : preference.matches ? 'dark' : 'light');
  if (button) {
    button.hidden = false;
    button.addEventListener('click', () => {
      const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      explicit = true;
      apply(theme);
      try { localStorage.setItem('theme', theme); } catch { /* Keep this page's theme. */ }
    });
  }
  preference.addEventListener('change', event => { if (!explicit) apply(event.matches ? 'dark' : 'light'); });
})();
