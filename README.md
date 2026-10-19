# Le Boomerang — Saint-Savournin

Site vitrine responsive réalisé comme **projet de démonstration** autour du restaurant *Le Boomerang*, à Saint-Savournin (Bouches-du-Rhône).

🌐 **Démo en ligne :** https://adambbk.github.io/le-boomerang-saint-savournin/

> ⚠️ **Projet indépendant.** Ce site est une maquette réalisée par un développeur en formation. Il n'est ni affilié, ni commandité, ni validé par le restaurant. Pour le site officiel, voir les sources dans [`SOURCES.md`](SOURCES.md).

| Desktop | Mobile |

## Fonctionnalités

- Page d'accueil responsive
- Présentation du restaurant et de sa cuisine méditerranéenne et du monde
- Galerie de plats
- **Formulaire de demande de réservation** : horaires dynamiques selon le jour, validation des jours d'ouverture, message prérempli envoyé par WhatsApp
- Accès direct au téléphone, au site officiel et à l'itinéraire
- Liens vers Facebook, Instagram et Tripadvisor
- Section événements, groupes, traiteur et terrasse
- Données structurées **Schema.org / JSON-LD** de type `Restaurant`

## Technologies

- HTML5
- CSS3
- JavaScript (sans framework)
- Responsive design
- Schema.org / JSON-LD
- Hébergement : GitHub Pages

## Structure du projet

```
├── index.html     Structure de la page
├── styles.css     Mise en page et responsive
├── app.js         Formulaire de réservation, horaires, validation
├── SOURCES.md     Sources des informations publiques utilisées
└── README.md
```

## Lancer le projet

Le projet est entièrement statique :

```bash
python -m http.server 8000
```

Puis ouvre `http://localhost:8000`.

## À propos de la réservation

Le formulaire ne confirme pas automatiquement une table. Il prépare une **demande de réservation WhatsApp** à destination du numéro public du restaurant. Une réservation n'est confirmée qu'après réponse de l'établissement.

## Ce que ce projet démontre

- Intégration responsive d'une maquette de site vitrine
- Validation de formulaire en JavaScript (jours et horaires d'ouverture)
- Génération d'un lien WhatsApp prérempli
- Référencement technique avec données structurées Schema.org

## Limites connues

- Les images sont chargées depuis des sources publiques officielles. Pour une vraie mise en production, il faudrait les héberger localement (format WebP compressé) avec l'accord du restaurant.
- Les informations (horaires, carte) proviennent de sources publiques et peuvent changer.

## Améliorations prévues

- Hébergement local des images optimisées
- Audit Lighthouse (performance, accessibilité, SEO) et corrections
- Balises Open Graph pour le partage sur les réseaux

## Auteur

Adam Bouberka — [GitHub](https://github.com/adambbk) · [LinkedIn](https://www.linkedin.com/in/adam-bouberka-741467334/)
