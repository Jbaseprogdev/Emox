#!/bin/bash

# Emolinkdn Deployment Script
# This script handles the complete deployment process

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
APP_NAME="emolinkdn"
DEPLOYMENT_ENV=${1:-"production"}
NODE_VERSION="18"

echo -e "${BLUE}🚀 Starting Emolinkdn Deployment${NC}"
echo -e "${BLUE}Environment: ${DEPLOYMENT_ENV}${NC}"
echo -e "${BLUE}Node Version: ${NODE_VERSION}${NC}"

# Function to print status
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check prerequisites
check_prerequisites() {
    print_status "Checking prerequisites..."
    
    # Check Node.js version
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed"
        exit 1
    fi
    
    NODE_CURRENT=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_CURRENT" -lt "$NODE_VERSION" ]; then
        print_error "Node.js version $NODE_VERSION or higher is required. Current: $(node --version)"
        exit 1
    fi
    
    # Check npm
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed"
        exit 1
    fi
    
    # Check git
    if ! command -v git &> /dev/null; then
        print_error "git is not installed"
        exit 1
    fi
    
    print_status "All prerequisites are satisfied"
}

# Clean and prepare
clean_and_prepare() {
    print_status "Cleaning and preparing build environment..."
    
    # Remove old build artifacts
    rm -rf .next
    rm -rf node_modules
    rm -rf out
    
    # Clear npm cache
    npm cache clean --force
    
    print_status "Build environment cleaned"
}

# Install dependencies
install_dependencies() {
    print_status "Installing dependencies..."
    
    # Install dependencies
    npm install --production=false
    
    print_status "Dependencies installed successfully"
}

# Run tests
run_tests() {
    print_status "Running tests..."
    
    # Run TypeScript check
    if npm run type-check; then
        print_status "TypeScript check passed"
    else
        print_error "TypeScript check failed"
        exit 1
    fi
    
    # Run linting
    if npm run lint; then
        print_status "Linting passed"
    else
        print_warning "Linting failed - continuing with deployment"
    fi
    
    print_status "Tests completed"
}

# Build application
build_application() {
    print_status "Building application..."
    
    # Set environment
    export NODE_ENV=production
    
    # Build the application
    if npm run build; then
        print_status "Application built successfully"
    else
        print_error "Build failed"
        exit 1
    fi
}

# Optimize build
optimize_build() {
    print_status "Optimizing build..."
    
    # Analyze bundle size
    if command -v npx &> /dev/null; then
        npx @next/bundle-analyzer .next/static/chunks --out-dir=analyze
        print_status "Bundle analysis completed"
    fi
    
    # Check for large files
    find .next -name "*.js" -size +500k -exec echo "Large file detected: {}" \;
    
    print_status "Build optimization completed"
}

# Security check
security_check() {
    print_status "Running security checks..."
    
    # Check for vulnerabilities
    if npm audit --audit-level=high; then
        print_status "Security audit passed"
    else
        print_warning "Security vulnerabilities detected - review before deployment"
    fi
    
    # Check for outdated packages
    npm outdated || true
    
    print_status "Security checks completed"
}

# Deploy to Vercel (if configured)
deploy_vercel() {
    if command -v vercel &> /dev/null; then
        print_status "Deploying to Vercel..."
        
        # Deploy to Vercel
        vercel --prod --yes
        
        print_status "Deployed to Vercel successfully"
    else
        print_warning "Vercel CLI not found - skipping Vercel deployment"
    fi
}

# Deploy to custom server
deploy_custom() {
    print_status "Preparing for custom server deployment..."
    
    # Create deployment package
    mkdir -p deploy
    cp -r .next deploy/
    cp -r public deploy/
    cp package.json deploy/
    cp next.config.js deploy/
    cp .env* deploy/ 2>/dev/null || true
    
    # Create deployment script
    cat > deploy/start.sh << 'EOF'
#!/bin/bash
export NODE_ENV=production
npm install --production
npm start
EOF
    chmod +x deploy/start.sh
    
    print_status "Deployment package created in ./deploy/"
    print_status "Upload ./deploy/ to your server and run ./start.sh"
}

# Health check
health_check() {
    print_status "Running health checks..."
    
    # Start the application in background
    npm start &
    SERVER_PID=$!
    
    # Wait for server to start
    sleep 10
    
    # Check if server is responding
    if curl -f http://localhost:3000 > /dev/null 2>&1; then
        print_status "Health check passed - server is responding"
    else
        print_error "Health check failed - server is not responding"
    fi
    
    # Stop the server
    kill $SERVER_PID 2>/dev/null || true
    
    print_status "Health checks completed"
}

# Generate deployment report
generate_report() {
    print_status "Generating deployment report..."
    
    REPORT_FILE="deployment-report-$(date +%Y%m%d-%H%M%S).txt"
    
    cat > "$REPORT_FILE" << EOF
Emolinkdn Deployment Report
==========================
Date: $(date)
Environment: $DEPLOYMENT_ENV
Node Version: $(node --version)
NPM Version: $(npm --version)

Build Information:
- Build Time: $(date)
- Build Size: $(du -sh .next 2>/dev/null || echo "Unknown")
- Bundle Size: $(find .next -name "*.js" -exec du -ch {} + | tail -1 2>/dev/null || echo "Unknown")

Dependencies:
$(npm list --depth=0 2>/dev/null | head -20)

Security:
$(npm audit --json 2>/dev/null | jq -r '.vulnerabilities | length' 2>/dev/null || echo "Audit not available")

Performance:
- Build Duration: $(date)
- Memory Usage: $(ps -o rss= -p $$ 2>/dev/null | awk '{print $1/1024 " MB"}' || echo "Unknown")

EOF
    
    print_status "Deployment report generated: $REPORT_FILE"
}

# Main deployment process
main() {
    echo -e "${BLUE}Starting deployment process...${NC}"
    
    check_prerequisites
    clean_and_prepare
    install_dependencies
    run_tests
    build_application
    optimize_build
    security_check
    
    # Choose deployment method
    if [ "$DEPLOYMENT_ENV" = "vercel" ]; then
        deploy_vercel
    else
        deploy_custom
    fi
    
    health_check
    generate_report
    
    echo -e "${GREEN}🎉 Deployment completed successfully!${NC}"
    echo -e "${BLUE}📊 Check the deployment report for details${NC}"
}

# Run main function
main "$@" 