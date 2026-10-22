// Le modèle se teste sans navigateur : il ne dépend pas du DOM.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { TodoModel } from './TodoModel.js';

test('ajouter une tâche notifie les abonnés', () => {
  const model = new TodoModel();
  const snapshots = [];
  model.subscribe(todos => snapshots.push(todos));
  model.add('Lire le cours');
  assert.equal(snapshots.length, 2); // état initial + après ajout
  assert.equal(snapshots[1][0].title, 'Lire le cours');
});

test('un titre vide est refusé', () => {
  assert.throws(() => new TodoModel().add('   '), /obligatoire/);
});

test('toggle inverse l’état done', () => {
  const model = new TodoModel();
  model.add('A');
  const [a] = model.all();
  model.toggle(a.id);
  assert.equal(model.all()[0].done, true);
});

test('filtrer « faites » ne garde que les tâches cochées', () => {
  const model = new TodoModel();
  model.add('A');
  model.add('B');
  model.toggle(model.all()[0].id);
  assert.deepEqual(model.filtrer('faites').map(todo => todo.title), ['A']);
  assert.equal(model.restantes(), 1);
});

test('filtrer « à faire » ne garde que les tâches non cochées', () => {
  const model = new TodoModel();
  model.add('A');
  model.add('B');
  model.toggle(model.all()[1].id);
  assert.deepEqual(model.filtrer('a-faire').map(todo => todo.title), ['A']);
});

test('filtrer « toutes » renvoie toutes les tâches', () => {
  const model = new TodoModel();
  model.add('A');
  model.add('B');
  assert.deepEqual(model.filtrer('toutes').map(todo => todo.title), ['A', 'B']);
});

test('filtrer renvoie une copie défensive', () => {
  const model = new TodoModel();
  model.add('A');
  const [todo] = model.filtrer('toutes');
  todo.title = 'Modifiée';
  assert.equal(model.all()[0].title, 'A');
});

test('un nom de filtre inconnu est refusé', () => {
  assert.throws(() => new TodoModel().filtrer('inconnu'), /Filtre inconnu/);
});
