# API du blog pour n8n

URL de base : `https://votre-domaine.tld/api`

Toutes les requêtes doivent envoyer l’en-tête suivant :

```http
Authorization: Bearer VOTRE_BLOG_API_KEY
```

Dans n8n, utilisez le nœud **HTTP Request**, choisissez **Header Auth**, puis ajoutez cet en-tête. Conservez la clé dans les credentials n8n, jamais directement dans un workflow exporté.

## Articles

- `GET /articles` : liste les articles. Filtres facultatifs : `locale=fr`, `status=DRAFT|PUBLISHED`, `limit=1..100`.
- `GET /articles/:id` : récupère un article.
- `POST /articles` : crée un article.
- `PATCH /articles/:id` : modifie uniquement les champs envoyés.
- `DELETE /articles/:id` : supprime l’article et son image locale.

Exemple de corps JSON pour une création :

```json
{
  "locale": "fr",
  "title": "Comment choisir une chéchia en gros",
  "slug": "comment-choisir-chechia-en-gros",
  "excerpt": "Les critères essentiels pour sélectionner un fabricant et préparer une commande professionnelle.",
  "content": "## Bien définir votre besoin\n\nLe contenu de l’article est rédigé en Markdown et doit contenir au moins cinquante caractères.",
  "coverImage": "/uploads/articles/nom-image.webp",
  "seoTitle": "Choisir une chéchia en gros | Guide B2B",
  "seoDescription": "Découvrez les critères de qualité, quantités et personnalisation pour vos commandes de chéchias en gros.",
  "seoKeywords": "chéchia en gros, fabricant de chéchias, fournisseur B2B",
  "canonicalUrl": null,
  "author": "AL MUMAYIZ",
  "status": "PUBLISHED"
}
```

Les langues acceptées sont `fr`, `en` et `ar`. Le statut est `DRAFT` ou `PUBLISHED`. Si un article est publié sans `publishedAt`, l’API utilise la date actuelle.

## Images

Envoyez une requête `POST /uploads` en `multipart/form-data`, avec l’image dans le champ `file`. Les formats JPEG, PNG, WebP et AVIF sont acceptés, avec une taille maximale de 8 Mo. La réponse contient l’URL WebP à réutiliser dans `coverImage` :

```json
{
  "data": {
    "url": "/uploads/articles/nom-image.webp"
  }
}
```

Pour automatiser un article illustré, faites donc deux nœuds : upload de l’image, puis création de l’article en utilisant `{{$json.data.url}}` comme `coverImage`.
