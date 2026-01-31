# 🚀 Quick Start - Deployment Guide

Guida rapida per deployare il monorepo in 10 minuti.

## ✅ Prerequisiti

- [ ] Account Google Cloud Platform
- [ ] Account Netlify
- [ ] `gcloud` CLI installato
- [ ] `pnpm` installato

## 📋 Checklist Deployment

### Parte 1: Backend su Google Cloud Run (5 minuti)

1. **Login e Setup Google Cloud:**
   ```bash
   gcloud auth login
   gcloud config set project YOUR_PROJECT_ID
   gcloud services enable run.googleapis.com
   ```

2. **Deploy tutti i backend:**
   ```bash
   # Dalla root del monorepo
   ./deploy.sh
   # Scegli opzione "1"
   ```

3. **Salva gli URL generati:**
   ```
   Hello Backend:   https://hello-backend-xxxxx.run.app
   Frutta Backend:  https://frutta-backend-xxxxx.run.app
   Verdura Backend: https://verdura-backend-xxxxx.run.app
   ```

### Parte 2: Frontend su Netlify (5 minuti)

#### Opzione A: Deploy via Git (Consigliato)

1. **Push del codice su GitHub**

2. **Per ogni frontend (frutta e verdura):**
   - Vai su [Netlify](https://app.netlify.com)
   - "New site from Git" → Seleziona il repo
   - **Build settings:**
     - Base directory: `frontends/frutta` (o `verdura`)
     - Build command: `pnpm install && pnpm build`
     - Publish directory: `dist`
   - **Environment variables:**
     ```
     VITE_HELLO_API_URL=https://hello-backend-xxxxx.run.app
     VITE_FRUTTA_API_URL=https://frutta-backend-xxxxx.run.app
     (o VITE_VERDURA_API_URL per verdura)
     ```
   - Click "Deploy site"

#### Opzione B: Deploy Manuale

1. **Deploy frontend Frutta:**
   ```bash
   cd frontends/frutta
   
   # Crea .env
   cat > .env << EOF
   VITE_HELLO_API_URL=https://hello-backend-xxxxx.run.app
   VITE_FRUTTA_API_URL=https://frutta-backend-xxxxx.run.app
   EOF
   
   # Build e deploy
   pnpm build
   netlify deploy --prod
   ```

2. **Ripeti per Verdura:**
   ```bash
   cd ../verdura
   
   cat > .env << EOF
   VITE_HELLO_API_URL=https://hello-backend-xxxxx.run.app
   VITE_VERDURA_API_URL=https://verdura-backend-xxxxx.run.app
   EOF
   
   pnpm build
   netlify deploy --prod
   ```

### Parte 3: Configurazione CORS (2 minuti)

**Dopo aver ottenuto gli URL Netlify**, aggiorna i backend con gli origin permessi:

```bash
# Backend Hello (accetta richieste da entrambi i frontend)
gcloud run services update hello-backend \
  --region europe-west1 \
  --set-env-vars ALLOWED_ORIGINS=https://frutta-app.netlify.app,https://verdura-app.netlify.app

# Backend Frutta
gcloud run services update frutta-backend \
  --region europe-west1 \
  --set-env-vars ALLOWED_ORIGINS=https://frutta-app.netlify.app

# Backend Verdura
gcloud run services update verdura-backend \
  --region europe-west1 \
  --set-env-vars ALLOWED_ORIGINS=https://verdura-app.netlify.app
```

## ✨ Verifica

1. Apri i frontend deployati:
   - `https://frutta-app.netlify.app`
   - `https://verdura-app.netlify.app`

2. Clicca i bottoni e verifica che funzionino!

## 🔄 Aggiornamenti Futuri

### Backend
```bash
# Dalla directory del backend
cd backends/hello
gcloud run deploy hello-backend --source .
```

### Frontend
- **Se usi Git:** Push su main → auto-deploy
- **Se usi CLI:** 
  ```bash
  cd frontends/frutta
  pnpm build
  netlify deploy --prod
  ```

## 🆘 Problemi Comuni

### "CORS error"
→ Verifica che `ALLOWED_ORIGINS` corrisponda esattamente agli URL Netlify

### "Cannot connect to backend"
→ Controlla le variabili d'ambiente `VITE_*` in Netlify

### "Build failed"
→ Assicurati che `pnpm-lock.yaml` sia committato

## 📊 Monitoraggio

- **Backend logs:** https://console.cloud.google.com/run
- **Frontend deploys:** https://app.netlify.com

## 💡 Pro Tips

1. **Domini custom:** Configura in Netlify Settings → Domain management
2. **Auto-deploy:** Netlify deploya automaticamente ad ogni push
3. **Rollback:** Netlify permette rollback istantaneo
4. **Costs:** Monitora su Google Cloud Console → Billing

## 🎯 Next Steps

- [ ] Setup custom domains
- [ ] Configure GitHub Actions per CI/CD automatico
- [ ] Aggiungi autenticazione
- [ ] Setup monitoring e alerting
- [ ] Implementa rate limiting

---

**Tempo totale stimato:** ~12 minuti

Per la guida completa, vedi [DEPLOYMENT.md](./DEPLOYMENT.md)
