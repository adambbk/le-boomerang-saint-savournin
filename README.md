# Le Boomerang — Saint-Savournin

Site vitrine responsive réalisé autour du restaurant **Le Boomerang**, à Saint-Savournin (Bouches-du-Rhône).

🌐 **Démo en ligne :** https://adambbk.github.io/le-boomerang-saint-savournin/

Le projet présente l’établissement, ses spécialités, ses services, ses horaires et un parcours de demande de réservation par WhatsApp.

## Fonctionnalités

- page d’accueil responsive ;
- présentation du restaurant et de sa cuisine méditerranéenne / cuisine du monde ;
- galerie de plats à partir de visuels publics du restaurant ;
- horaires dynamiques dans le formulaire de réservation ;
- validation des jours d’ouverture ;
- demande de réservation préremplie par WhatsApp ;
- accès direct au téléphone et au site officiel ;
- liens vers Facebook, Instagram, Tripadvisor et l’itinéraire ;
- section événements, groupes, traiteur et terrasse ;
- données structurées Schema.org de type `Restaurant`.

## Technologies

- HTML5
- CSS3
- JavaScript
- responsive design
- Schema.org / JSON-LD

## Lancer le site

Le projet est entièrement statique :

```bash
python -m http.server 8000
```

Puis ouvrir `http://localhost:8000`.

## Réservation

Le formulaire ne prétend pas confirmer automatiquement une table. Il prépare une **demande de réservation WhatsApp** au numéro public du restaurant. La réservation n’est considérée comme confirmée qu’après réponse de l’établissement.

## Sources

Les informations publiques utilisées pour cette démonstration sont recensées dans `SOURCES.md`. Les visuels sont chargés depuis les sources publiques officielles citées ; pour une mise en production commerciale réelle, les fichiers devraient être hébergés localement avec l’accord du restaurant.

## Auteur

Adam Bouberka
