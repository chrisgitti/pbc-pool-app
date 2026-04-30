# PBC Erding – Pool Billard Web-App

Eine browserbasierte 8-Ball- und 9-Ball-Simulation im Branding des Pool Billard Club Erding e.V.
Komplett selbstständig in **einer einzigen HTML-Datei** – keine Build-Tools, kein Server, keine Abhängigkeiten außer Google Fonts.

## Features

- **Spielvarianten**: 8-Ball (mit Call-Shot nach modernen WPA/BCA-Regeln) und 9-Ball
- **Spielmodi**:
  - Hot-Seat (zwei Spieler an einem Gerät)
  - Gegen KI (drei Schwierigkeitsstufen)
  - Solo / Übung
- **Physik**:
  - Elastische Kugel-Kugel-Kollisionen
  - Banden-Reflexion mit realistischer Energieabgabe
  - Achteckiger Tisch mit verkürzten Eck-Banden (~2 Kugeln breite Lücke)
  - 45°-Schräg-Banden in den Eck-Cuts
  - Multiplikative + lineare Roll-Reibung (kein endloses Auslaufen)
  - Adaptive Substepping zur Tunneling-Vermeidung bei hohen Geschwindigkeiten
- **Effet (Spin)**: Top-Spin, Back-Spin, links/rechts-Drall – beeinflusst Cue-Ball-Verhalten nach Kontakt + Banden
- **Steuerung**:
  - LMB ziehen → Queue/Zielwinkel
  - RMB ziehen → Stoßstärke + Stoß auslösen
  - Power-Bar klick- und tappbar (Touch-Support)
  - Pfeiltasten für Feinjustierung (mit Shift = sehr fein, Strg = grob)
  - Leertaste oder STOSS-Button als Backup
- **Ansage-Logik (8-Ball)**:
  - Vor jedem Stoß bei offenem Tisch Voll/Halb-Ansage (Inline-Banner, Tisch bleibt sichtbar)
  - Bei Verfehlen der angesagten Gruppe → Tisch bleibt offen, Spielerwechsel
- **Schwarze 8 (8-Ball)**:
  - Vorzeitig versenkt → automatisches Re-Spotting auf Fußpunkt, Foul mit Ball-in-Hand
  - Gewinn nur nach komplett geräumter eigener Gruppe + sauberem Stoß
- **Anstoß**:
  - Weiße per Maus im Kopffeld platzierbar (gold hervorgehoben)
- **Sound**: synthetisch über Web Audio API (kein Asset-Download)
- **Design**: PBC-Erding-Branding (Schwarz/Gold/Anthrazit, Bebas Neue + Inter)

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

## Steuerung im Detail

| Aktion | Eingabe |
|---|---|
| Zielwinkel | LMB ziehen / Hover über Tisch |
| Stoßstärke | RMB ziehen / Power-Bar klicken |
| Stoß auslösen | RMB loslassen / Leertaste / STOSS-Button |
| Feinjustierung | ←/→ Pfeiltasten |
| Sehr fein | Shift + ←/→ (oder eigene Buttons) |
| Grob | Strg + ←/→ |
| Power +/− | ↑/↓ Pfeiltasten |
| Effet | Klick auf Mini-Cueball |
| Menü öffnen | M |
| Stoßstärke wachsen | Power-Bar entlangziehen |

## Aufbau

```
pbc-pool-app/
├── index.html      # Komplette App – HTML + CSS + JS in einer Datei
├── README.md       # Diese Datei
└── .gitignore
```

## Starten

Einfach `index.html` im Browser öffnen – fertig. Keine Installation, kein Server.

```bash
# Per Doppelklick
explorer index.html

# Oder mit lokalem Webserver (optional, z. B. für Sound auf einigen Browsern)
python -m http.server 8080
# dann http://localhost:8080/ aufrufen
```

## Tech-Stack

- **HTML5 Canvas** für 2D-Tisch-Rendering
- **Web Audio API** für synthetische Soundeffekte
- **Vanilla JS / ES2022** – keine Frameworks
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

## Lizenz

Privatprojekt für den PBC Erding e.V. – kein öffentliches Release.
