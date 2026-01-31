# Monorepo - Frontends & Backends

Questo è un monorepo che contiene applicazioni frontend React e backend NestJS.

## Struttura del Progetto

```
monorepo/
├── frontends/
│   ├── frutta/          # Frontend React per Frutta (porta 5001)
│   └── verdura/         # Frontend React per Verdura (porta 5002)
└── backends/
    ├── hello/           # Backend comune Hello (porta 3001)
    ├── frutta/          # Backend Frutta (porta 3002)
    └── verdura/         # Backend Verdura (porta 3003)
```

## Tecnologie Utilizzate

- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: NestJS + TypeScript
- **Monorepo**: pnpm workspaces

## Installazione

Prima di tutto, assicurati di avere installato:
- Node.js (v18 o superiore)
- pnpm (`npm install -g pnpm`)

Poi installa le dipendenze:

```bash
pnpm install
```

## Avvio del Progetto

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

## Endpoints API

### Backend Hello (http://localhost:3001)
- `GET /hello` → Restituisce un saluto

### Backend Frutta (http://localhost:3002)
- `GET /frutta` → Restituisce "Banana 🍌"

### Backend Verdura (http://localhost:3003)
- `GET /verdura` → Restituisce "Lattuga 🥬"

## Funzionalità

### Frontend Frutta
- **Bottone "Chiama Hello"**: Chiama il backend comune e mostra il saluto
- **Bottone "Chiama Frutta"**: Chiama il backend frutta e mostra "Banana 🍌"

### Frontend Verdura
- **Bottone "Chiama Hello"**: Chiama il backend comune e mostra il saluto
- **Bottone "Chiama Verdura"**: Chiama il backend verdura e mostra "Lattuga 🥬"

## Build

Per buildare tutti i progetti:

```bash
pnpm build:all
```

## Note

- I backend usano CORS abilitato per permettere le chiamate dai frontend
- Ogni applicazione gira su una porta diversa per evitare conflitti
- I frontend sono configurati con Vite per hot-reload veloce
