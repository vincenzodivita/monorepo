#!/bin/bash

# Script helper per il deployment

echo "🚀 Deployment Helper Script"
echo "============================="
echo ""

# Colori
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

function print_info() {
    echo -e "${GREEN}ℹ️  $1${NC}"
}

function print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

function print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Controlla se gcloud è installato
if ! command -v gcloud &> /dev/null; then
    print_error "gcloud CLI non trovato. Installalo da: https://cloud.google.com/sdk/docs/install"
    exit 1
fi

# Controlla se netlify CLI è installato
if ! command -v netlify &> /dev/null; then
    print_warning "netlify CLI non trovato. Puoi installarlo con: npm install -g netlify-cli"
fi

echo "Cosa vuoi deployare?"
echo "1) Tutti i backend su Google Cloud Run"
echo "2) Backend Hello"
echo "3) Backend Frutta"
echo "4) Backend Verdura"
echo "5) Frontend Frutta su Netlify"
echo "6) Frontend Verdura su Netlify"
echo "7) Tutto (backend + frontend)"
echo ""
read -p "Scelta (1-7): " choice

# Chiedi PROJECT_ID se deploy backend
if [[ $choice =~ ^[1-4]$ ]]; then
    read -p "Inserisci il tuo Google Cloud Project ID: " PROJECT_ID
    print_info "Imposto il progetto: $PROJECT_ID"
    gcloud config set project $PROJECT_ID
    
    read -p "Inserisci la region (default: europe-west1): " REGION
    REGION=${REGION:-europe-west1}
fi

function deploy_backend() {
    local name=$1
    local dir=$2
    
    print_info "Deploying backend: $name"
    
    cd "$dir" || exit
    
    gcloud run deploy "$name-backend" \
        --source . \
        --platform managed \
        --region "$REGION" \
        --allow-unauthenticated
    
    cd - > /dev/null || exit
    
    print_info "✅ $name backend deployato!"
}

function deploy_frontend() {
    local name=$1
    local dir=$2
    
    print_info "Deploying frontend: $name"
    
    if ! command -v netlify &> /dev/null; then
        print_error "Netlify CLI richiesto. Installalo con: npm install -g netlify-cli"
        return 1
    fi
    
    cd "$dir" || exit
    
    print_warning "Assicurati di aver configurato le variabili d'ambiente in Netlify!"
    
    pnpm build
    netlify deploy --prod
    
    cd - > /dev/null || exit
    
    print_info "✅ $name frontend deployato!"
}

case $choice in
    1)
        deploy_backend "hello" "backends/hello"
        deploy_backend "frutta" "backends/frutta"
        deploy_backend "verdura" "backends/verdura"
        ;;
    2)
        deploy_backend "hello" "backends/hello"
        ;;
    3)
        deploy_backend "frutta" "backends/frutta"
        ;;
    4)
        deploy_backend "verdura" "backends/verdura"
        ;;
    5)
        deploy_frontend "frutta" "frontends/frutta"
        ;;
    6)
        deploy_frontend "verdura" "frontends/verdura"
        ;;
    7)
        deploy_backend "hello" "backends/hello"
        deploy_backend "frutta" "backends/frutta"
        deploy_backend "verdura" "backends/verdura"
        deploy_frontend "frutta" "frontends/frutta"
        deploy_frontend "verdura" "frontends/verdura"
        ;;
    *)
        print_error "Scelta non valida"
        exit 1
        ;;
esac

print_info "🎉 Deployment completato!"
