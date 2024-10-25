# Utilise l'image Node.js comme base
FROM node:18

# Installer pnpm globalement
RUN npm install -g pnpm

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de configuration et installer les dépendances
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

# Copier le reste des fichiers du projet
COPY . .

# Exposer le port 3000
EXPOSE 3000

# Démarrer l'application Next.js en mode développement
CMD ["pnpm", "dev"]
