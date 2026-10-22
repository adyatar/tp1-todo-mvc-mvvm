// VIEW : affiche les données et capte les actions de l'utilisateur.
// Elle ne modifie jamais le modèle elle-même : elle prévient le contrôleur.
export class TodoView {
  constructor(root) {
    this.form = root.querySelector('form');
    this.input = root.querySelector('input');
    this.list = root.querySelector('ul');
    this.counter = root.querySelector('.counter');
    this.error = root.querySelector('.error');
    this.filters = [...root.querySelectorAll('[data-filtre]')];
  }
  render(todos, restantes) {
    this.list.innerHTML = '';
    for (const t of todos) {
      const li = document.createElement('li');
      li.innerHTML = `<label><input type="checkbox" ${t.done ? 'checked' : ''}>
        <span class="${t.done ? 'done' : ''}"></span></label> <button>✕</button>`;
      li.querySelector('span').textContent = t.title; // pas d'injection HTML
      li.querySelector('input').onchange = () => this.onToggle?.(t.id);
      li.querySelector('button').onclick = () => this.onRemove?.(t.id);
      this.list.append(li);
    }
    this.counter.textContent = `${restantes} tâche(s) à faire`;
  }
  showFiltre(nom) {
    for (const button of this.filters) {
      const actif = button.dataset.filtre === nom;
      button.classList.toggle('actif', actif);
      button.setAttribute('aria-pressed', String(actif));
    }
  }
  showError(msg) {
    this.error.textContent = msg;
  }
  bindAdd(handler) {
    this.form.addEventListener('submit', e => {
      e.preventDefault();
      handler(this.input.value);
      this.input.value = '';
    });
  }
  bindToggle(handler) {
    this.onToggle = handler;
  }
  bindRemove(handler) {
    this.onRemove = handler;
  }
  bindFilter(handler) {
    this.filters.forEach(button => {
      button.addEventListener('click', () => handler(button.dataset.filtre));
    });
  }
}
