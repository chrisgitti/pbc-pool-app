# GitHub-Setup für pbc-pool-app

Kurzanleitung zum Veröffentlichen dieses Projekts unter `https://github.com/chrisgitti/pbc-pool-app`.

## 1. Repo auf GitHub anlegen

1. https://github.com/new öffnen
2. Felder ausfüllen:
   - **Owner:** `chrisgitti`
   - **Repository name:** `pbc-pool-app`
   - **Description:** `PBC Erding – Pool Billard Web-App (8-Ball & 9-Ball, Vanilla JS)`
   - **Visibility:** Private (empfohlen) oder Public
   - **Initialize this repository with:** **nichts** ankreuzen (kein README, kein .gitignore, keine Lizenz – haben wir schon lokal).
3. „Create repository" klicken.

## 2. Lokal initialisieren und pushen

In PowerShell oder cmd im Projektordner:

```powershell
cd C:\Daten\Projects\pbc-pool-app

git init
git add .
git commit -m "Initial commit: PBC Erding Pool Billard App"
git branch -M master
git remote add origin https://github.com/chrisgitti/pbc-pool-app.git
git push -u origin master
```

Falls deine andere Repos `main` statt `master` nutzen, einfach `master` durch `main` ersetzen.

## 3. Spätere Updates

Nachdem du Änderungen am Code gemacht hast:

```powershell
cd C:\Daten\Projects\pbc-pool-app
git add .
git commit -m "kurze Beschreibung der Änderung"
git push
```

## 4. Optional: GitHub Pages für Live-Demo

Da die App eine reine HTML-Datei ist, kann sie kostenlos via GitHub Pages live gehostet werden:

1. Im Repo auf **Settings → Pages**
2. Source: **Deploy from a branch**
3. Branch: `master` / `(root)` → Save
4. Nach kurzer Wartezeit unter `https://chrisgitti.github.io/pbc-pool-app/` erreichbar.

Falls das Repo private ist, ist Pages nur mit GitHub Pro / Team möglich.
