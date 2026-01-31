# Monorepo - Frontends & Backends

Questo è un monorepo che contiene applicazioni frontend React e backend NestJS, pronto per il deployment su **Netlify** (frontend) e **Google Cloud Run** (backend).

## 📁 Struttura del Progetto

```
monorepo/
├── frontends/
│   ├── frutta/          # Frontend React per Frutta (porta 5001)
│   │   ├── .env.example # Esempio variabili d'ambiente
│   │   └── netlify.toml # Configurazione Netlify
│   └── verdura/         # Frontend React per Verdura (porta 5002)
│       ├── .env.example
│       └── netlify.toml
├── backends/
│   ├── hello/           # Backend comune Hello (porta 3001)
│   │   ├── Dockerfile
│   │   └── cloudbuild.yaml
│   ├── frutta/          # Backend Frutta (porta 3002)
│   │   ├── Dockerfile
│   │   └── cloudbuild.yaml
│   └── verdura/         # Backend Verdura (porta 3003)
│       ├── Dockerfile
│       └── cloudbuild.yaml
├── deploy.sh            # Script helper per deployment
├── DEPLOYMENT.md        # Guida dettagliata al deployment
├── package.json
└── pnpm-workspace.yaml
```

## 🚀 Tecnologie Utilizzate

- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: NestJS + TypeScript
- **Monorepo**: pnpm workspaces
- **Hosting Frontend**: Netlify
- **Hosting Backend**: Google Cloud Run
- **Containerization**: Docker

## 📦 Installazione

Prima di tutto, assicurati di avere installato:
- Node.js (v18 o superiore)
- pnpm (`npm install -g pnpm`)

Poi installa le dipendenze:

```bash
pnpm install
```

## 🏃 Sviluppo Locale

### Avvia tutto in parallelo (consigliato)

```bash
pnpm dev:all
```

Questo comando avvia tutti i backend e frontend contemporaneamente.

### Avvia singolarmente

**Backend:**
```bash
pnpm dev:backend:hello     # Porta 3001
pnpm dev:backend:frutta    # Porta 3002
pnpm dev:backend:verdura   # Porta 3003
```

**Frontend:**
```bash
pnpm dev:frontend:frutta   # Porta 5001
pnpm dev:frontend:verdura  # Porta 5002
```

## 🌐 Endpoints API (Sviluppo)

### Backend Hello (http://localhost:3001)
- `GET /hello` → Restituisce un saluto

### Backend Frutta (http://localhost:3002)
- `GET /frutta` → Restituisce "Banana 🍌"

### Backend Verdura (http://localhost:3003)
- `GET /verdura` → Restituisce "Lattuga 🥬"

## 🎯 Funzionalità

### Frontend Frutta
- **Bottone "Chiama Hello"**: Chiama il backend comune e mostra il saluto
- **Bottone "Chiama Frutta"**: Chiama il backend frutta e mostra "Banana 🍌"

### Frontend Verdura
- **Bottone "Chiama Hello"**: Chiama il backend comune e mostra il saluto
- **Bottone "Chiama Verdura"**: Chiama il backend verdura e mostra "Lattuga 🥬"

## 🏗️ Build

Per buildare tutti i progetti:

```bash
pnpm build:all
```

## 🚀 Deployment in Produzione

### Quick Start

1. **Deploy Backend su Google Cloud Run:**
   ```bash
   ./deploy.sh
   # Scegli opzione 1
   ```

2. **Deploy Frontend su Netlify:**
   ```bash
   ./deploy.sh
   # Scegli opzioni 5 e 6
   ```

### Guida Completa

Per istruzioni dettagliate sul deployment, consulta **[DEPLOYMENT.md](./DEPLOYMENT.md)** che include:

- ✅ Setup iniziale Google Cloud
- ✅ Configurazione variabili d'ambiente
- ✅ Deploy backend su Cloud Run
- ✅ Deploy frontend su Netlify
- ✅ Configurazione CORS
- ✅ Continuous Deployment con GitHub Actions
- ✅ Monitoring e troubleshooting
- ✅ Costi stimati

## 🔧 Configurazione Variabili d'Ambiente

### Frontend (Development)

Crea file `.env` in `frontends/frutta` e `frontends/verdura`:

```bash
# Per Frutta
VITE_HELLO_API_URL=http://localhost:3001
VITE_FRUTTA_API_URL=http://localhost:3002

# Per Verdura
VITE_HELLO_API_URL=http://localhost:3001
VITE_VERDURA_API_URL=http://localhost:3003
```

### Frontend (Production)

Configura in Netlify Dashboard → Site Settings → Environment Variables:

```bash
VITE_HELLO_API_URL=https://hello-backend-xxxxx.run.app
VITE_FRUTTA_API_URL=https://frutta-backend-xxxxx.run.app
VITE_VERDURA_API_URL=https://verdura-backend-xxxxx.run.app
```

### Backend (Production)

Imposta tramite Google Cloud:

```bash
gcloud run services update SERVICE_NAME \
  --set-env-vars ALLOWED_ORIGINS=https://your-app.netlify.app
```

## 🐳 Docker

Ogni backend include un `Dockerfile` ottimizzato con:
- Multi-stage build per ridurre dimensione immagine
- Separazione tra build e runtime
- Solo dipendenze di produzione nell'immagine finale

Test locale con Docker:

```bash
cd backends/hello
docker build -t hello-backend .
docker run -p 8080:8080 hello-backend
```

## 📊 Architettura

```
┌─────────────────────┐
│   Netlify CDN       │
│  (Frontend Apps)    │
└──────────┬──────────┘
           │
           │ HTTPS
           │
           ▼
┌──────────────────────────────┐
│   Google Cloud Run           │
│  ┌────────────────────────┐  │
│  │  Hello Backend (3001)  │  │
│  └────────────────────────┘  │
│  ┌────────────────────────┐  │
│  │  Frutta Backend (3002) │  │
│  └────────────────────────┘  │
│  ┌────────────────────────┐  │
│  │  Verdura Backend(3003) │  │
│  └────────────────────────┘  │
└──────────────────────────────┘
```

## ⚙️ Features di Produzione

- ✅ **Auto-scaling**: Cloud Run scala automaticamente da 0 a N istanze
- ✅ **CORS configurabile**: Gestione dinamica tramite variabili d'ambiente
- ✅ **HTTPS**: Certificati SSL automatici su Netlify e Cloud Run
- ✅ **Zero downtime**: Deploy con rollback automatico
- ✅ **Environment Variables**: Configurazione separata per dev/prod
- ✅ **Monitoring**: Logs e metriche integrate in Google Cloud Console

## 🔒 Sicurezza

- CORS configurato per domini specifici
- HTTPS obbligatorio in produzione
- Nessun secret committato nel repository
- Rate limiting configurabile
- Autenticazione pronta per essere aggiunta

## 💰 Costi

### Netlify (Piano Free)
- 100GB bandwidth/mese
- Build illimitati
- HTTPS gratuito

### Google Cloud Run (Piano Free)
- 2M richieste/mese
- 360k GB-secondi memoria/mese
- 180k vCPU-secondi/mese

**Stima per app con traffico moderato**: ~$0-5/mese

## 🛠️ Script Disponibili

```bash
# Sviluppo
pnpm dev:all                    # Avvia tutto
pnpm dev:frontend:frutta        # Solo frontend frutta
pnpm dev:backend:hello          # Solo backend hello

# Build
pnpm build:all                  # Build di tutto

# Deployment
./deploy.sh                     # Script interattivo di deployment
```

## 🐛 Troubleshooting

### CORS Error
- Verifica che `ALLOWED_ORIGINS` includa l'URL esatto del frontend
- Controlla che non ci siano trailing slash

### API non raggiungibile
- Verifica le variabili d'ambiente `VITE_*` nel frontend
- Controlla i logs su Google Cloud Console

### Build Failure
- Esegui `pnpm install` nella root
- Verifica che `pnpm-lock.yaml` sia presente

Per problemi più specifici, consulta [DEPLOYMENT.md](./DEPLOYMENT.md)

## 📝 Note

- I backend usano CORS abilitato per permettere le chiamate dai frontend
- Ogni applicazione gira su una porta diversa per evitare conflitti
- I frontend sono configurati con Vite per hot-reload veloce
- In produzione, i backend usano la porta 8080 (richiesta da Cloud Run)

## 🤝 Contribuire

1. Fork del progetto
2. Crea un branch per la feature (`git checkout -b feature/AmazingFeature`)
3. Commit delle modifiche (`git commit -m 'Add AmazingFeature'`)
4. Push del branch (`git push origin feature/AmazingFeature`)
5. Apri una Pull Request

## 📄 Licenza

Questo progetto è sotto licenza MIT.

## 🔗 Link Utili

- [Netlify Documentation](https://docs.netlify.com/)
- [Google Cloud Run Documentation](https://cloud.google.com/run/docs)
- [NestJS Documentation](https://docs.nestjs.com/)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
