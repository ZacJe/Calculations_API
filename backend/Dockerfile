# Utilise une image officielle de Python 3.10.9 comme image de base
FROM python:3.10.9

# Définit le répertoire de travail dans le conteneur à /app
WORKDIR /app

# Copie le fichier des dépendances (requirements.txt) dans le conteneur
COPY requirements.txt .

# Installe les dépendances en utilisant pip, sans cache pour réduire la taille de l'image
RUN pip install --no-cache-dir -r requirements.txt

# Copie tous les fichiers de l'application dans le conteneur
COPY . .

# Expose le port 8000 (par défaut pour Uvicorn), permettant d'accéder à l'API
EXPOSE 8000

# Définit la commande de démarrage pour lancer l'application FastAPI avec Uvicorn
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
