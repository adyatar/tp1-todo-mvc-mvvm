import { test } from 'node:test';
import assert from 'node:assert/strict';
import { TodoModel } from './TodoModel.js';
import { TodoViewModel } from './TodoViewModel.js';

const createViewModel = () => new TodoViewModel(new TodoModel());

test('le ViewModel démarre sur le filtre « à faire »', () => {
  const viewModel = createViewModel();
  assert.deepEqual(viewModel.getState(), {
    todos: [],
    restantes: 0,
    filtre: 'a-faire',
    erreur: '',
  });
});

test('ajouter une tâche met à jour la liste et le compteur', () => {
  const viewModel = createViewModel();
  viewModel.add('  Lire le cours  ');
  const state = viewModel.getState();
  assert.equal(state.todos[0].title, 'Lire le cours');
  assert.equal(state.restantes, 1);
});

test('le filtre « faites » affiche les tâches terminées sans fausser le compteur', () => {
  const viewModel = createViewModel();
  viewModel.add('A');
  viewModel.add('B');
  const [todo] = viewModel.getState().todos;
  viewModel.toggle(todo.id);
  viewModel.setFilter('faites');
  const state = viewModel.getState();
  assert.deepEqual(state.todos.map(item => item.title), ['A']);
  assert.equal(state.restantes, 1);
});

test('cocher une tâche la retire du filtre « à faire »', () => {
  const viewModel = createViewModel();
  viewModel.add('A');
  viewModel.add('B');
  const [todo] = viewModel.getState().todos;
  viewModel.toggle(todo.id);
  const state = viewModel.getState();
  assert.deepEqual(state.todos.map(item => item.title), ['B']);
  assert.equal(state.restantes, 1);
});

test('un filtre inconnu est refusé sans changer le filtre actif', () => {
  const viewModel = createViewModel();
  assert.throws(() => viewModel.setFilter('inconnu'), /Filtre inconnu/);
  assert.equal(viewModel.getState().filtre, 'a-faire');
});