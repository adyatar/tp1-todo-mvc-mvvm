# TP1 - Todo-list MVC et MVVM

## Comparatif en dix points

1. MVC répartit les rôles entre Model, View et Controller; MVVM entre Model, View et ViewModel.
2. En MVC, le Controller reçoit les actions; en MVVM, le ViewModel expose les commandes.
3. Le Model MVC fournit les filtres; le ViewModel MVVM prépare les données affichables.
4. Le filtre courant appartient au Controller en MVC et au ViewModel en MVVM.
5. La View MVC transmet des événements au Controller; la View MVVM se lie à l’état du ViewModel.
6. Les deux Views rendent les tâches reçues et ne filtrent pas elles-mêmes la liste.
7. Le Model conserve les tâches, leur validation, leur ajout, leur suppression et leur état terminé.
8. Le compteur reste indépendant du filtre et indique toujours les tâches à faire.
9. Le Model et les règles MVC se testent sans navigateur avec `node:test`.
10. Les cinq tests du ViewModel vérifient état, commandes, filtre et compteur sans créer de DOM.

## Lancer

Prérequis : Node.js 20 ou supérieur. Depuis la racine du projet :

```sh
node --test seance1-presentation/tp1-todo-mvc-mvvm
node tools/serve.js
```

Ouvrir ensuite `http://localhost:5173/seance1-presentation/tp1-todo-mvc-mvvm/`.
