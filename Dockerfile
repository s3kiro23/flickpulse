# Utilisation d'une image Node.js
FROM node:alpine

# Créer un répertoire de travail
WORKDIR /app

# Installer PM2
RUN npm install --global pm2

# Copier les dépendances de l'application
COPY package.json yarn.lock ./

# Installer les dépendances
RUN npm install --production

# Copier le reste des fichiers de l'application
COPY . .

RUN npm prisma generate

# Construction de l'application
RUN npm run build

# Exposer le port sur lequel l'application fonctionnera
EXPOSE 3000

USER node

# Commande pour démarrer l'application
CMD [ "pm2-runtime", "npm", "--", "start" ]