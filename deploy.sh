#!/bin/bash

# Emolinkdn Deployment Script
# This script helps set up and deploy the Emolinkdn app

set -e

echo "🚀 Emolinkdn Deployment Script"
echo "================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Node.js is installed
check_node() {
    print_status "Checking Node.js installation..."
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js 18+ first."
        exit 1
    fi
    
    NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_VERSION" -lt 18 ]; then
        print_error "Node.js version 18+ is required. Current version: $(node --version)"
        exit 1
    fi
    
    print_success "Node.js $(node --version) is installed"
}

# Check if npm is installed
check_npm() {
    print_status "Checking npm installation..."
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed. Please install npm first."
        exit 1
    fi
    
    print_success "npm $(npm --version) is installed"
}

# Install dependencies
install_dependencies() {
    print_status "Installing dependencies..."
    npm install
    print_success "Dependencies installed successfully"
}

# Check environment variables
check_env() {
    print_status "Checking environment variables..."
    
    if [ ! -f ".env.local" ]; then
        print_warning ".env.local file not found. Creating from template..."
        cp env.example .env.local
        print_warning "Please edit .env.local with your actual credentials:"
        echo "  - NEXT_PUBLIC_SUPABASE_URL"
        echo "  - NEXT_PUBLIC_SUPABASE_ANON_KEY"
        echo "  - OPENAI_API_KEY"
        echo ""
        print_warning "After editing .env.local, run this script again."
        exit 1
    fi
    
    # Check if required env vars are set
    source .env.local
    
    if [ -z "$NEXT_PUBLIC_SUPABASE_URL" ] || [ "$NEXT_PUBLIC_SUPABASE_URL" = "your_supabase_project_url" ]; then
        print_error "NEXT_PUBLIC_SUPABASE_URL is not set in .env.local"
        exit 1
    fi
    
    if [ -z "$NEXT_PUBLIC_SUPABASE_ANON_KEY" ] || [ "$NEXT_PUBLIC_SUPABASE_ANON_KEY" = "your_supabase_anon_key" ]; then
        print_error "NEXT_PUBLIC_SUPABASE_ANON_KEY is not set in .env.local"
        exit 1
    fi
    
    if [ -z "$OPENAI_API_KEY" ] || [ "$OPENAI_API_KEY" = "your_openai_api_key" ]; then
        print_error "OPENAI_API_KEY is not set in .env.local"
        exit 1
    fi
    
    print_success "Environment variables are properly configured"
}

# Build the application
build_app() {
    print_status "Building the application..."
    npm run build
    print_success "Application built successfully"
}

# Run type check
type_check() {
    print_status "Running TypeScript type check..."
    npm run type-check
    print_success "TypeScript type check passed"
}

# Run linting
run_lint() {
    print_status "Running ESLint..."
    npm run lint
    print_success "ESLint passed"
}

# Start development server
start_dev() {
    print_status "Starting development server..."
    print_success "Development server will be available at http://localhost:3000"
    print_warning "Press Ctrl+C to stop the server"
    npm run dev
}

# Deploy to Vercel
deploy_vercel() {
    print_status "Deploying to Vercel..."
    
    if ! command -v vercel &> /dev/null; then
        print_warning "Vercel CLI not found. Installing..."
        npm install -g vercel
    fi
    
    vercel --prod
    print_success "Deployment completed!"
}

# Show setup instructions
show_setup_instructions() {
    echo ""
    echo "📋 Setup Instructions"
    echo "===================="
    echo ""
    echo "1. Create a Supabase project:"
    echo "   - Go to https://supabase.com"
    echo "   - Create a new project"
    echo "   - Get your project URL and anon key from Settings > API"
    echo ""
    echo "2. Set up the database schema:"
    echo "   - Copy the SQL from README.md"
    echo "   - Run it in your Supabase SQL editor"
    echo ""
    echo "3. Get an OpenAI API key:"
    echo "   - Go to https://platform.openai.com"
    echo "   - Create an account and get an API key"
    echo ""
    echo "4. Configure environment variables:"
    echo "   - Edit .env.local with your credentials"
    echo ""
    echo "5. Run the development server:"
    echo "   - npm run dev"
    echo ""
}

# Main function
main() {
    case "${1:-dev}" in
        "dev")
            check_node
            check_npm
            install_dependencies
            check_env
            type_check
            run_lint
            start_dev
            ;;
        "build")
            check_node
            check_npm
            install_dependencies
            check_env
            type_check
            run_lint
            build_app
            ;;
        "deploy")
            check_node
            check_npm
            install_dependencies
            check_env
            type_check
            run_lint
            build_app
            deploy_vercel
            ;;
        "setup")
            show_setup_instructions
            ;;
        *)
            echo "Usage: $0 {dev|build|deploy|setup}"
            echo ""
            echo "Commands:"
            echo "  dev     - Start development server"
            echo "  build   - Build for production"
            echo "  deploy  - Deploy to Vercel"
            echo "  setup   - Show setup instructions"
            exit 1
            ;;
    esac
}

# Run main function
main "$@" 