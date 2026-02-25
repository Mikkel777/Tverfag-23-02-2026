## Serverarkitektur

Applikasjonen er delt opp i flere virtuelle maskiner for bedre sikkerhet og struktur.

### VM-er brukt

1. *Node VM*
   - Kjører Express webserver
   - Håndterer frontend og backend logikk

2. *MongoDB VM*
   - Kjører databasen separat
   - Kun tilgjengelig via nettverk fra Node VM

3. *Nginx VM (reverse proxy / statisk innhold)*

## Brannmur – UFW

Alle VM-er ble konfigurert med:

- Default incoming: DENY
- Default outgoing: ALLOW

Dette hindrer uønsket innkommende trafikk.

# Node vm since UFW regler

Porter som er tillat:

22 - OpenSSH
3000- Node.js - Express applikasjon
80 - HTTP - web trafikk
443 - HTTPS - Kryptert web trafikk

Regler:
OpenSSH ALLOW Anywhere
3000 ALLOW Anywhere
80/tcp ALLOW anywhere
443 ALLOW anywhere

# Mongodb VM regler

porter:
22 - OpenSSH
27017 - Mongodb

regler:
27017 ALLOW IN anywhere
22/tcp ALLOW IN anywhere

Mongodb blir kun brukt av node serveren

## Nettverkssikkerhet

Tiltak som ble implementert:

- Database kjører på egen VM
- Brannmur blokkerer all unødvendig trafikk
- Kun nødvendige porter åpnet
- Passord hashes med bcrypt
- Sessions brukes for autentisering
- Admin-rettigheter kontrolleres server-side


Fordeler:
- Bedre sikkerhet
- Enklere debugging
- Skalerbar løsning