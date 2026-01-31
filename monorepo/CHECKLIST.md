# ✅ Deployment Checklist

## Prima del Deployment

- [ ] Ho un account Google Cloud Platform
- [ ] Ho un account Netlify  
- [ ] Ho installato `gcloud` CLI
- [ ] Ho installato `pnpm`
- [ ] Ho installato `netlify` CLI (opzionale)

## Setup Google Cloud

- [ ] Login: `gcloud auth login`
- [ ] Set project: `gcloud config set project YOUR_PROJECT_ID`
- [ ] Abilita servizi: `gcloud services enable run.googleapis.com`

## Deploy Backend

- [ ] Esegui: `./deploy.sh` e scegli opzione 1
- [ ] Salva URL generati:
  - [ ] Hello Backend: `_______________________________`
  - [ ] Frutta Backend: `_______________________________`
  - [ ] Verdura Backend: `_______________________________`

## Deploy Frontend Frutta

### Via Netlify Dashboard
- [ ] Push codice su GitHub
- [ ] Nuovo site da Git su Netlify
- [ ] Base directory: `frontends/frutta`
- [ ] Build command: `pnpm install && pnpm build`
- [ ] Publish directory: `dist`
- [ ] Environment variables:
  - [ ] `VITE_HELLO_API_URL` = URL Hello Backend
  - [ ] `VITE_FRUTTA_API_URL` = URL Frutta Backend
- [ ] Deploy
- [ ] Salva URL: `_______________________________`

### Via CLI
- [ ] `cd frontends/frutta`
- [ ] Crea `.env` con URL backend
- [ ] `pnpm build`
- [ ] `netlify deploy --prod`
- [ ] Salva URL: `_______________________________`

## Deploy Frontend Verdura

### Via Netlify Dashboard
- [ ] Nuovo site da Git su Netlify
- [ ] Base directory: `frontends/verdura`
- [ ] Build command: `pnpm install && pnpm build`
- [ ] Publish directory: `dist`
- [ ] Environment variables:
  - [ ] `VITE_HELLO_API_URL` = URL Hello Backend
  - [ ] `VITE_VERDURA_API_URL` = URL Verdura Backend
- [ ] Deploy
- [ ] Salva URL: `_______________________________`

### Via CLI
- [ ] `cd frontends/verdura`
- [ ] Crea `.env` con URL backend
- [ ] `pnpm build`
- [ ] `netlify deploy --prod`
- [ ] Salva URL: `_______________________________`

## Configura CORS

- [ ] Update Hello Backend:
  ```bash
  gcloud run services update hello-backend \
    --region europe-west1 \
    --set-env-vars ALLOWED_ORIGINS=<URL_FRUTTA>,<URL_VERDURA>
  ```

- [ ] Update Frutta Backend:
  ```bash
  gcloud run services update frutta-backend \
    --region europe-west1 \
    --set-env-vars ALLOWED_ORIGINS=<URL_FRUTTA>
  ```

- [ ] Update Verdura Backend:
  ```bash
  gcloud run services update verdura-backend \
    --region europe-west1 \
    --set-env-vars ALLOWED_ORIGINS=<URL_VERDURA>
  ```

## Test

- [ ] Apri URL Frutta e clicca i bottoni
- [ ] Apri URL Verdura e clicca i bottoni
- [ ] Verifica che non ci siano errori CORS nella console

## Opzionale - CI/CD

- [ ] Aggiungi secret `GCP_SA_KEY` su GitHub
- [ ] Aggiungi secret `GCP_PROJECT_ID` su GitHub
- [ ] Aggiungi secret `ALLOWED_ORIGINS_*` su GitHub
- [ ] Push su main → auto-deploy!

## Monitoring

- [ ] Google Cloud Console → Cloud Run → Logs
- [ ] Netlify Dashboard → Deploys
- [ ] Setup alerting (opzionale)

---

**🎉 Deployment Completato!**

Data: _______________
Tempo impiegato: _______________
Note: _____________________________
