#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Emolinkdn Setup Verification');
console.log('================================\n');

// Check Node.js version
const nodeVersion = process.version;
const nodeMajor = parseInt(nodeVersion.slice(1).split('.')[0]);
console.log(`✅ Node.js: ${nodeVersion} ${nodeMajor >= 18 ? '(✓ Compatible)' : '(✗ Need 18+)'}`);

// Check npm
try {
    const npmVersion = require('child_process').execSync('npm --version', { encoding: 'utf8' }).trim();
    console.log(`✅ npm: ${npmVersion}`);
} catch (error) {
    console.log('❌ npm: Not found');
}

// Check if package.json exists
if (fs.existsSync('package.json')) {
    console.log('✅ package.json: Found');
} else {
    console.log('❌ package.json: Not found');
}

// Check if node_modules exists
if (fs.existsSync('node_modules')) {
    console.log('✅ node_modules: Found (dependencies installed)');
} else {
    console.log('⚠️  node_modules: Not found (run npm install)');
}

// Check environment file
if (fs.existsSync('.env.local')) {
    console.log('✅ .env.local: Found');
    
    // Check if env vars are set
    const envContent = fs.readFileSync('.env.local', 'utf8');
    const hasSupabaseUrl = envContent.includes('NEXT_PUBLIC_SUPABASE_URL=') && 
                          !envContent.includes('your_supabase_project_url');
    const hasSupabaseKey = envContent.includes('NEXT_PUBLIC_SUPABASE_ANON_KEY=') && 
                          !envContent.includes('your_supabase_anon_key');
    const hasOpenAIKey = envContent.includes('OPENAI_API_KEY=') && 
                        !envContent.includes('your_openai_api_key');
    
    console.log(`   Supabase URL: ${hasSupabaseUrl ? '✅ Set' : '❌ Not set'}`);
    console.log(`   Supabase Key: ${hasSupabaseKey ? '✅ Set' : '❌ Not set'}`);
    console.log(`   OpenAI Key: ${hasOpenAIKey ? '✅ Set' : '❌ Not set'}`);
} else {
    console.log('❌ .env.local: Not found (copy from env.example)');
}

// Check key files
const keyFiles = [
    'app/layout.tsx',
    'components/dashboard/dashboard.tsx',
    'lib/supabase.ts',
    'types/index.ts'
];

console.log('\n📁 Key Files Check:');
keyFiles.forEach(file => {
    if (fs.existsSync(file)) {
        console.log(`✅ ${file}`);
    } else {
        console.log(`❌ ${file}`);
    }
});

// Summary
console.log('\n📋 Summary:');
if (nodeMajor >= 18 && fs.existsSync('package.json')) {
    console.log('✅ Ready to install dependencies');
    if (fs.existsSync('node_modules')) {
        console.log('✅ Ready to run development server');
    } else {
        console.log('⚠️  Run: npm install');
    }
} else {
    console.log('❌ Please install Node.js 18+ first');
}

console.log('\n🚀 Next Steps:');
console.log('1. Install Node.js 18+ from https://nodejs.org/');
console.log('2. Run: npm install');
console.log('3. Copy env.example to .env.local and configure');
console.log('4. Set up Supabase project and database');
console.log('5. Get OpenAI API key');
console.log('6. Run: npm run dev'); 