// CONTROLLER : traduit les actions de la vue en opérations sur le modèle.
export class TodoController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.filtre = 'a-faire';

    view.bindAdd(title => {
      try {
        model.add(title);
        view.showError('');
      } catch (e) {
        view.showError(e.message);
      }
    });
    view.bindToggle(id => model.toggle(id));
    view.bindRemove(id => model.remove(id));
    view.bindFilter(nom => {
      this.filtre = nom;
      this.render();
    });
    model.subscribe(() => this.render());
  }

  render() {
    this.view.render(this.model.filtrer(this.filtre), this.model.restantes());
    this.view.showFiltre(this.filtre);
  }
}
