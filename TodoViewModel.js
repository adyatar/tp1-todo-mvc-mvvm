const FILTERS = new Set(['toutes', 'faites', 'a-faire']);

export class TodoViewModel {
  #model;
  #listeners = [];
  #todos = [];
  #filtre = 'a-faire';
  #erreur = '';

  constructor(model) {
    this.#model = model;
    this.#model.subscribe(todos => {
      this.#todos = todos;
      this.#notify();
    });
  }

  getState() {
    const todos = this.#filtre === 'faites'
      ? this.#todos.filter(todo => todo.done)
      : this.#filtre === 'a-faire'
        ? this.#todos.filter(todo => !todo.done)
        : this.#todos;
    return {
      todos: todos.map(todo => ({ ...todo })),
      restantes: this.#todos.filter(todo => !todo.done).length,
      filtre: this.#filtre,
      erreur: this.#erreur,
    };
  }

  subscribe(listener) {
    this.#listeners.push(listener);
    listener(this.getState());
    return () => {
      this.#listeners = this.#listeners.filter(subscriber => subscriber !== listener);
    };
  }

  add(title) {
    this.#erreur = '';
    try {
      this.#model.add(title);
    } catch (error) {
      this.#erreur = error.message;
      this.#notify();
    }
  }

  toggle(id) {
    this.#model.toggle(id);
  }

  remove(id) {
    this.#model.remove(id);
  }

  setFilter(nom) {
    if (!FILTERS.has(nom)) throw new Error(`Filtre inconnu : ${nom}`);
    this.#filtre = nom;
    this.#notify();
  }

  #notify() {
    const state = this.getState();
    this.#listeners.forEach(listener => listener(state));
  }
}