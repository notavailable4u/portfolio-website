(() => {
  const group = document.querySelector('.filter');
  if (!group) return;
  const buttons = [...group.querySelectorAll('button')];
  const cards = [...document.querySelectorAll('.project-card')];
  const sections = [...document.querySelectorAll('.project-section')];
  const status = document.querySelector('.filter-status');
  function filterProjects(filter) {
    buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === filter)));
    cards.forEach(card => { card.hidden = filter !== 'all' && !card.dataset.category.split(' ').includes(filter); });
    sections.forEach(section => { section.hidden = ![...section.querySelectorAll('.project-card')].some(card => !card.hidden); });
    const count = cards.filter(card => !card.hidden).length;
    if (status) status.textContent = `${count} ${count === 1 ? 'project' : 'projects'} shown`;
  }
  buttons.forEach(button => button.addEventListener('click', () => filterProjects(button.dataset.filter)));
  group.hidden = false;
  filterProjects('all');
  function revealLinkedProject() {
    const card = cards.find(card => `#${card.id}` === window.location.hash);
    if (card?.hidden) { filterProjects('all'); card.scrollIntoView(); }
  }
  window.addEventListener('hashchange', revealLinkedProject);
  revealLinkedProject();
})();
