# Guida al Deployment

Questa guida spiega come deployare i frontend su **Netlify** e i backend su **Google Cloud Run**.

## Prerequisiti

### Per Netlify (Frontend)
1. Account Netlify (https://www.netlify.com/)
2. Netlify CLI (opzionale): `npm install -g netlify-cli`

### Per Google Cloud (Backend)
1. Account Google Cloud Platform
2. Google Cloud CLI installato: https://cloud.google.com/sdk/docs/install
3. Docker installato (per build locali)
4. Progetto GCP creato

## Setup Iniziale Google Cloud

```bash
# Login a Google Cloud
gcloud auth login

# Imposta il progetto (sostituisci YOUR_PROJECT_ID con il tuo project ID)
gcloud config set project YOUR_PROJECT_ID

# Abilita i servizi necessari
gcloud services enable run.googleapis.com
gcloud services enable containerregistry.googleapis.com
```

## Deployment Backend su Google Cloud Run

### Opzione 1: Build e Deploy Automatico (Consigliato)

Per ogni backend, esegui da dentro la directory del backend:

```bash
# Backend Hello
cd backends/hello
gcloud run deploy hello-backend \
  --source . \
  --platform managed \
  --region europe-west1 \
  --allow-unauthenticated \
  --set-env-vars ALLOWED_ORIGINS=https://your-frutta-app.netlify.app,https://your-verdura-app.netlify.app

# Backend Frutta
cd ../frutta
gcloud run deploy frutta-backend \
  --source . \
  --platform managed \
  --region europe-west1 \
  --allow-unauthenticated \
  --set-env-vars ALLOWED_ORIGINS=https://your-frutta-app.netlify.app

# Backend Verdura
cd ../verdura
gcloud run deploy verdura-backend \
  --source . \
  --platform managed \
  --region europe-west1 \
  --allow-unauthenticated \
  --set-env-vars ALLOWED_ORIGINS=https://your-verdura-app.netlify.app
```

### Opzione 2: Build Manuale con Docker

```bash
# Esempio per backend Hello
cd backends/hello

# Build dell'immagine
docker build -t gcr.io/YOUR_PROJECT_ID/hello-backend .

# Push su Google Container Registry
docker push gcr.io/YOUR_PROJECT_ID/hello-backend

# Deploy su Cloud Run
gcloud run deploy hello-backend \
  --image gcr.io/YOUR_PROJECT_ID/hello-backend \
  --platform managed \
  --region europe-west1 \
  --allow-unauthenticated \
  --set-env-vars ALLOWED_ORIGINS=https://your-frutta-app.netlify.app,https://your-verdura-app.netlify.app
```

**Nota:** Dopo ogni deploy, Cloud Run ti darà un URL tipo `https://hello-backend-xxxxx.run.app`. Salva questi URL!

## Deployment Frontend su Netlify

### Opzione 1: Deploy tramite Git (Consigliato per Produzione)

1. Fai push del codice su GitHub/GitLab/Bitbucket
2. Vai su Netlify Dashboard
3. Click "New site from Git"
4. Connetti il repository
5. Configura il build:
   - **Build command**: `pnpm install && pnpm build`
   - **Publish directory**: `dist`
   - **Base directory**: `frontends/frutta` (o `frontends/verdura`)

6. Aggiungi le variabili d'ambiente in **Site settings → Environment variables**:
   - Per frontend Frutta:
     - `VITE_HELLO_API_URL` = URL del backend Hello (es: `https://hello-backend-xxxxx.run.app`)
     - `VITE_FRUTTA_API_URL` = URL del backend Frutta
   - Per frontend Verdura:
     - `VITE_HELLO_API_URL` = URL del backend Hello
     - `VITE_VERDURA_API_URL` = URL del backend Verdura

7. Deploy!

### Opzione 2: Deploy manuale con Netlify CLI

```bash
# Installa Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy frontend Frutta
cd frontends/frutta

# Crea file .env per production
cat > .env << EOF
VITE_HELLO_API_URL=https://hello-backend-xxxxx.run.app
VITE_FRUTTA_API_URL=https://frutta-backend-xxxxx.run.app
EOF

# Build
pnpm build

# Deploy
netlify deploy --prod

# Ripeti per frontend Verdura
cd ../verdura

cat > .env << EOF
VITE_HELLO_API_URL=https://hello-backend-xxxxx.run.app
VITE_VERDURA_API_URL=https://verdura-backend-xxxxx.run.app
EOF

pnpm build
netlify deploy --prod
```

## Aggiornamento CORS dopo Deploy Frontend

Dopo aver deployato i frontend e ottenuto gli URL di Netlify, aggiorna le variabili d'ambiente dei backend:

```bash
# Aggiorna backend Hello
gcloud run services update hello-backend \
  --region europe-west1 \
  --set-env-vars ALLOWED_ORIGINS=https://frutta-app.netlify.app,https://verdura-app.netlify.app

# Aggiorna backend Frutta
gcloud run services update frutta-backend \
  --region europe-west1 \
  --set-env-vars ALLOWED_ORIGINS=https://frutta-app.netlify.app

# Aggiorna backend Verdura
gcloud run services update verdura-backend \
  --region europe-west1 \
  --set-env-vars ALLOWED_ORIGINS=https://verdura-app.netlify.app
```

## Monitoring e Logs

### Google Cloud Run
```bash
# Visualizza logs in tempo reale
gcloud run services logs tail hello-backend --region europe-west1

# Visualizza metriche
# Vai su: https://console.cloud.google.com/run
```

### Netlify
- Dashboard → Site → Deploys
- Dashboard → Site → Functions (se usi Netlify Functions)

## Costi Stimati

### Netlify (Frontend)
- Piano gratuito: 100GB bandwidth/mese, build illimitati
- Perfetto per progetti piccoli/medi

### Google Cloud Run (Backend)
- Piano gratuito: 
  - 2 milioni di richieste/mese
  - 360,000 GB-secondi di memoria/mese
  - 180,000 vCPU-secondi/mese
- Oltre il piano gratuito: pay-as-you-go (~$0.40 per million requests)

## Troubleshooting

### Errore CORS
Assicurati che:
1. Gli URL in `ALLOWED_ORIGINS` nei backend corrispondano esattamente agli URL Netlify
2. Non ci siano slash finali negli URL
3. Usa HTTPS in produzione

### Frontend non carica i dati
1. Controlla che le variabili d'ambiente `VITE_*` siano impostate correttamente
2. Verifica gli URL dei backend nella console del browser (F12)
3. Controlla i logs dei backend su Google Cloud

### Build fallisce su Netlify
1. Assicurati che `pnpm-lock.yaml` sia committato nel repo
2. Verifica che la `Base directory` sia impostata correttamente
3. Controlla i log di build per errori specifici

## Comandi Utili

```bash
# Visualizza servizi Cloud Run
gcloud run services list

# Descrivi un servizio
gcloud run services describe hello-backend --region europe-west1

# Elimina un servizio
gcloud run services delete hello-backend --region europe-west1

# Visualizza deployments Netlify
netlify sites:list

# Rollback deployment Netlify
netlify rollback
```

## Note di Sicurezza

1. **Mai** committare file `.env` con credenziali reali
2. Usa sempre HTTPS in produzione
3. Configura CORS solo per i domini necessari
4. Considera l'aggiunta di rate limiting per le API
5. Usa Google Cloud Secret Manager per dati sensibili

## Auto-scaling

Google Cloud Run scala automaticamente da 0 a N istanze basandosi sul traffico:
- **Scale to zero**: Nessun costo quando non ci sono richieste
- **Concurrent requests**: Default 80 richieste per istanza
- **Max instances**: Configurabile per controllare i costi

## Continuous Deployment

### Con Netlify
Netlify deploya automaticamente ad ogni push su main/master

### Con Google Cloud Run
Opzione 1 - GitHub Actions:

```yaml
# .github/workflows/deploy-backend.yml
name: Deploy to Cloud Run

on:
  push:
    branches: [ main ]
    paths:
      - 'backends/**'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - id: 'auth'
        uses: 'google-github-actions/auth@v1'
        with:
          credentials_json: '${{ secrets.GCP_SA_KEY }}'
      
      - name: Deploy Hello Backend
        run: |
          gcloud run deploy hello-backend \
            --source ./backends/hello \
            --region europe-west1 \
            --allow-unauthenticated
```

## Prossimi Passi

1. ✅ Deploy backend su Google Cloud Run
2. ✅ Deploy frontend su Netlify
3. ✅ Configurazione variabili d'ambiente
4. 🔄 Setup CI/CD (opzionale)
5. 📊 Configurazione monitoring (opzionale)
6. 🔒 Aggiunta autenticazione (opzionale)
