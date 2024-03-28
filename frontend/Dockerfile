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

#RUN npx prisma generate

# Construction de l'application
RUN npm run build

USER node

# Exposer le port sur lequel l'application fonctionnera
EXPOSE 3000

# Commande pour démarrer l'application
CMD [ "pm2-runtime", "npm", "--", "start" ]

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx

#COPY --from=build-stage /app/.next/ /var/www/flickpulse/

