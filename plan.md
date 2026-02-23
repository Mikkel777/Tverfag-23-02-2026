# Tverfaglig prosjektt 2026 - PLAN

## Prosjektbeskrivelse

Dette prosjektet går ut på å utvikle en nettside hvor brukere kan vurdere andre nettsteder basert på WCAG (universell utforming).  
Brukere skal kunne lagre vurderinger permanent, se eksempelbilder av nettsteder, besøke nettstedene direkte og gi tilbakemeldinger på andres vurderinger.

Prosjektet inkluderer tre fagområder:
- Utvikling
- Drift
- Brukerstøtte

Målet med oppgaven er å lage en fungerende mvp (minimum viable product) innen *2 dager*.

## Hovedmål

Nettsiden skal gjøre det mulig å:

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

Eksempler på krav for nettsiden:
- Bruker kan legge inn vurderinger
- Vurderinger blir lagret permenant i databasen
- Brukeren kan gi positiv/negativ valg (Up votes og downvotes)
- Nettsider kan bli rangert fra værst til best, osv.

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

*Feedback*
- id
- review id
-  type - positiv/negativ


### Wireframe 
Enkle skisser av:
- Forside (Liste over nettsider + vurderinger)
- Nettstedsside (Vurderinger)
- side for å lage egen vurdering

### Utvikling