// VIEW : affiche les données et capte les actions de l'utilisateur.
// Elle affiche l'état du ViewModel et lui transmet les actions de l'utilisateur.
export class TodoView {
  constructor(root) {
    this.form = root.querySelector('form');
    this.input = root.querySelector('input');
    this.list = root.querySelector('ul');
    this.counter = root.querySelector('.counter');
    this.error = root.querySelector('.error');
    this.filters = [...root.querySelectorAll('[data-filtre]')];
  }
  bind(viewModel) {
    this.viewModel = viewModel;
    this.form.addEventListener('submit', event => {
      event.preventDefault();
      viewModel.add(this.input.value);
      this.input.value = '';
    });
    this.filters.forEach(button => {
      button.addEventListener('click', () => viewModel.setFilter(button.dataset.filtre));
    });
    viewModel.subscribe(state => this.render(state));
  }
  render({ todos, restantes, filtre, erreur }) {
    this.list.innerHTML = '';
    for (const t of todos) {
      const li = document.createElement('li');
      li.innerHTML = `<label><input type="checkbox" ${t.done ? 'checked' : ''}>
        <span class="${t.done ? 'done' : ''}"></span></label> <button>✕</button>`;
      li.querySelector('span').textContent = t.title; // pas d'injection HTML
      li.querySelector('input').onchange = () => this.viewModel.toggle(t.id);
      li.querySelector('button').onclick = () => this.viewModel.remove(t.id);
      this.list.append(li);
    }
    this.counter.textContent = `${restantes} tâche(s) à faire`;
    this.error.textContent = erreur;
    for (const button of this.filters) {
      const actif = button.dataset.filtre === filtre;
      button.classList.toggle('actif', actif);
      button.setAttribute('aria-pressed', String(actif));
    }
  }
}
