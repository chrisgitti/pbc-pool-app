# PBC Erding – Pool Billard Web-App

Eine browserbasierte Pool-Billard-Simulation im Branding des Pool Billard Club Erding e.V.
Komplett selbstständig in **einer einzigen HTML-Datei** – keine Build-Tools, kein Server, keine Abhängigkeiten außer Google Fonts.

## Features

### Spielvarianten

| Variante | Beschreibung |
|---|---|
| **8-Ball** | Volle WPA/BCA-Regelwertung inkl. Call-Shot, Schwarze-8-Logik, Push-Out |
| **9-Ball** | Standard 9-Ball mit Break-Foul, korrekter Reihenfolge und Gewinn-9 |
| **8-Ball Mini** | 8-Ball mit wählbarer Kugelanzahl: 3, 5, 7 oder 9 Kugeln |
| **9-Ball Mini** | 9-Ball mit wählbarer Kugelanzahl: 3, 5, 7 oder 9 Kugeln |
| **Basisübung** | Drill-Modus: einzelne Kugel versenken, mit WIEDERHOLEN-Toggle |
| **15-Kugeln Drill** | 15 Kugeln nacheinander auf den Fußpunkt; Ball in Hand nur beim 1. Stoß und nach Weißer-Foul; je Kugel ein Versuch; Ziel: möglichst viele versenken |

### Spielmodi

| Modus | Beschreibung |
|---|---|
| **Hot-Seat** | Zwei Spieler an einem Gerät |
| **Gegen KI** | Drei Schwierigkeitsstufen (Einfach / Mittel / Schwer) |
| **Solo / Übung** | Freies Spiel ohne Gegner |
| **Online-Spiel** | Echtzeit-Mehrspielermodus via WebSocket (Raum erstellen / beitreten) |

### Physik

- Elastische Kugel-Kugel-Kollisionen
- Banden-Reflexion mit realistischer Energieabgabe
- Achteckiger Tisch mit verkürzten Eck-Banden (~2 Kugeln breite Lücke)
- 45°-Schräg-Banden in den Eck-Cuts
- Multiplikative + lineare Roll-Reibung (kein endloses Auslaufen)
- Adaptive Substepping zur Tunneling-Vermeidung bei hohen Geschwindigkeiten

### Steuerung

- **Zielwinkel**: Linke Maustaste (LMT) ziehen oder Hover über Tisch
- **Stoßstärke + Auslösen**: Rechte Maustaste (RMT) ziehen und loslassen
- **Power-Bar**: klick- und tappbar (Touch-Support für mobile Geräte)
- **Pfeiltasten**: Feinjustierung des Winkels (Shift = sehr fein, Strg = grob)
- **Leertaste** oder STOSS-Button als Backup-Auslöser
- **Effet (Spin)**: Klick auf Mini-Cueball – Top-Spin, Back-Spin, links/rechts-Drall

### Spielregeln (8-Ball)

- Vor jedem Stoß bei offenem Tisch Voll/Halb-Ansage (Inline-Banner, Tisch bleibt sichtbar)
- Bei Verfehlen der angesagten Gruppe → Tisch bleibt offen, Spielerwechsel
- Schwarze 8 vorzeitig versenkt → Re-Spotting auf Fußpunkt, Foul mit Ball-in-Hand
- Gewinn nur nach komplett geräumter eigener Gruppe + sauberem Stoß auf die 8
- Push-Out-Regel nach dem Eröffnungsstoß

### Online-Spiel (Multiplayer)

- WebSocket-Verbindung via Relay-Server (`wss://pbc-relay.onrender.com`)
- Raum erstellen → 4-stelligen Code teilen → Gast tritt bei
- Synchronisation: Schuss-Vektoren + Spielstand nach jedem Stoß
- Spielvariante und Einstellungen werden vom Host beim Start übertragen
- Rematch-Funktion nach Spielende

**Relay-Server (Middleware)**

Der Online-Modus erfordert einen eigenständigen WebSocket-Relay-Server.
Quellcode: [`pbc-relay`](https://github.com/chrisgitti/pbc-relay) · Betrieb: [Render.com](https://render.com) (Free Tier)

| Eigenschaft | Wert |
|---|---|
| Protokoll | WebSocket (`ws` / Node.js) |
| Deployment | Render.com Free Tier (auto-deploy bei `git push`) |
| URL | `wss://pbc-relay.onrender.com` |
| Raumstruktur | `{ host, guest, hostName }` – max. 2 aktive Spieler pro Raum |
| Nachrichtentypen | `create`, `created`, `join`, `start`, `shot`, `sync`, `settings`, `rematch`, `disconnect`, `ping` |
| Weiterleitung | Blind-Relay: alle nicht behandelten Nachrichten werden an den Gegenspieler weitergeleitet |
| RAM-Bedarf | ~40–80 KB pro Verbindung; Free-Tier-Limit (512 MB) nicht erreichbar |

```
Client (Host)          Relay-Server            Client (Gast)
     │── create ──────────▶│                        │
     │◀─ created (Code) ───│                        │
     │                     │◀──── join (Code) ──────│
     │◀─ start ────────────│──── start ────────────▶│
     │── shot/sync ────────▶│──── shot/sync ────────▶│
     │◀─ shot/sync ────────│◀─── shot/sync ──────────│
```

### Basisübung (Drill)

- Eine Kugel wird aufgestellt, Cue Ball frei platzierbar
- **WIEDERHOLEN**: Toggle-Button stellt nach jedem Einlochen automatisch neu auf
- Ohne WIEDERHOLEN: Spieler setzt selbst neu auf (Übungsmodus für gezielte Drills)

### 15-Kugeln Drill

- 15 Kugeln werden nacheinander einzeln auf den Fußpunkt gesetzt
- Ball in Hand nur beim ersten Stoß und nach einem Weißer-Foul
- Je Kugel nur ein Versuch – trifft der Stoß nicht, kommt die nächste Kugel
- Ziel: möglichst viele der 15 Kugeln einlochen
- Trefferquote (z. B. „11/15") wird am Ende angezeigt

---

## Tisch-Geometrie

| Element | Wert |
|---|---|
| Canvas | 920 × 500 px |
| Banden-Tiefe | 40 px |
| Filz | 840 × 420 px (achteckig) |
| Kugel-Radius | 11 px (= 22 px Diameter) |
| Eck-Cut | 30 px → ~42 px diagonale Lücke |
| Pocket-Detection | 22 px (= 1 Kugeldurchmesser) |
| Diamonds | 6 pro Längsseite, 3 pro Breitseite |

---

## Mini-Modus Aufstellungen

### 9-Ball Mini

| Kugelanzahl | Aufstellung |
|---|---|
| 3 Kugeln | Reihe: 1 – 9 – 2 |
| 5 Kugeln | 1 vorne; 2+3 zweite Reihe; 9 mittig dritte Reihe; 4 hinten |
| 7 Kugeln | Standard 9-Ball-Raute ohne 8 und 9; 9 in der Mitte |
| 9 Kugeln | Standard 9-Ball-Raute |

### 8-Ball Mini

| Kugelanzahl | Aufstellung |
|---|---|
| 3 Kugeln | Reihe: 1 – 8 – 9 |
| 5 Kugeln | 1 vorne; 2+9 zweite Reihe; 8 mittig dritte Reihe; 10 hinten |
| 7 Kugeln | 7 Kugeln im Dreieck mit 8 mittig |
| 9 Kugeln | 9 Kugeln im Dreieck mit 8 mittig |

---

## Aufbau

```
pbc-pool-app/
├── index.html      # Komplette App – HTML + CSS + JS in einer Datei
├── server.js       # Optionaler lokaler Dev-Server (Port 3004, Cache-Control: no-store)
├── package.json    # npm start → node server.js
├── README.md       # Diese Datei
└── .gitignore
```

## Starten

Einfach `index.html` im Browser öffnen – fertig. Keine Installation, kein Server.

```bash
# Direkt im Browser
start index.html

# Mit lokalem Dev-Server (empfohlen, verhindert Browser-Cache-Probleme)
npm start
# → http://localhost:3004/
```

---

## Tech-Stack

- **HTML5 Canvas** für 2D-Tisch-Rendering
- **Web Audio API** für synthetische Soundeffekte
- **WebSocket API** für den Online-Mehrspielermodus
- **Vanilla JS / ES2022** – keine Frameworks, keine Abhängigkeiten
- **Google Fonts**: Bebas Neue (Display), Inter (Body)
- **CSS Custom Properties** mit den PBC-Erding-Designtokens

## Designtokens

Übernommen aus dem Web-Projekt `pbc-erding2`:

```css
--charcoal-950: #0a0a0b
--charcoal-900: #111113
--charcoal-800: #1a1a1e
--green-700:    #134d22  /* Filz */
--green-600:    #1a6b2f
--gold-400:     #e2b96f
--gold-500:     #d4a043  /* Akzent */
--gold-600:     #b8852e
```

---

## Lizenz

Privatprojekt für den PBC Erding e.V. – kein öffentliches Release.
