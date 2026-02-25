# Tverfaglig prosjektt 2026 - PLAN

## Prosjektbeskrivelse

Dette prosjektet går ut på å utvikle en nettside hvor brukere kan vurdere andre nettsteder basert på WCAG (universell utforming).  
Brukere skal kunne lagre vurderinger permanent, se eksempelbilder av nettsteder, besøke nettstedene direkte og gi tilbakemeldinger på andres vurderinger.

Prosjektet inkluderer tre fagområder:
- Utvikling
- Drift
- Brukerstøtte

Målet med oppgaven er å lage en fungerende mvp (minimum viable product) innen 2 dager.

## Hovedmål

Nettsiden skal gjøre det mulig å::

- Se en liste over vurderte sider
- Legge til nye nettsider (Kanskje)
- Laste opp bilder av nettsiden
- Besøke nettsidene via lenker
- Skrive vurderinger av nettsidene (WCAG)
- Lagre vurderinger permanent i databasen
- Se hvilken bruker har skrevet vurderinger
- Gi positivt og negativt tilbakemeldinger på vurderingene

## Fremdriftsplan

## Dag 1 - Design, planlegging og grunnleggende utvikling

Fokus:
- Struktur og design
- Databasekobling
- Grunnleggende funksjonalitet

Oppgaver:
- Lage Express-server
- Koble til MongoDB med Mongoose
- Lage database-modeller (User, Review)
- Implementere registrering og innlogging
- Lage side for å opprette vurdering
- Lagre vurderinger permanent
- Lage visning av vurderinger på forsiden

Krav:
- Bruker kan legge inn vurderinger
- Data lagres permanent i databasen
- Innlogget bruker knyttes til vurdering

### Dag 2 – Videreutvikling og drift

Fokus:
- Sikkerhet
- Brukerfunksjoner
- Serveroppsett

Oppgaver:
- Upvote / downvote system
- Begrense stemmer til én per bruker
- Admin-panel for rapporter
- Profilside
- Mulighet for å slette egen bruker
- Deploy på VM-servere
- Brannmur og nettverkssikkerhet

## Database model (eksempel)

*Users*
- id
- username

*Websites*
- id
- name
- url
- image

*Reviews*
- rating
- id
- website id
- user id
- comment

*Reports*
- id
- reviewId
- reportedBy
- reason
- createdAt

*Feedback*
- id
- review id
-  type - positiv/negativ


### Wireframe  (konsept)


Det ble laget enkle skisser av:

- *Forside*
  - Liste over vurderinger
  - Stemmeknapper
  - Lenker til nettsteder

- *Rate-side*
  - Skjema for ny vurdering

- *Profilside*
  - Brukerinformasjon
  - Slett bruker

- *Admin-side*
  - Liste over rapporterte vurderinger

### Utvikling

Frontend:
- Html
- Css
- EJS templates
- Litt JS

Backend:
- Node.js
- Express

Database:
- Mongodb
-Mongoose

Autentisering:
- Express-session
- Bcrypt (Hasing passord)
