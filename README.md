# NPI Calculator

Ce projet contient une application de calculatrice en notation polonaise inverse (NPI), avec un **backend** (API FastAPI en Python) et un **frontend** (interface Next.js en React). Ce README fournit les instructions pour installer, configurer et lancer l’application en mode développement et en utilisant Docker Compose.

## Structure du Projet

- **frontend/** : Interface utilisateur en Next.js (React + TypeScript).
- **backend/** : API FastAPI permettant d'effectuer des calculs en notation polonaise inverse.
- **docker-compose.yml** : Gère les services Docker pour le frontend et le backend.

## Prérequis

- **Docker** et **Docker Compose** doivent être installés sur votre machine.

## Installation et Lancement

### 1. Cloner le Répertoire

Clonez le projet dans le répertoire de votre choix :

```bash
git clone https://github.com/votre-utilisateur/npi-calculator.git
cd npi-calculator
```

### 2. Lancer l'Application en Mode Développement

Utilisez Docker Compose pour lancer le frontend et le backend en mode développement avec une seule commande :

```bash
docker-compose up
```
