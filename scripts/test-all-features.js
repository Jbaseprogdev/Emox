#!/usr/bin/env node

/**
 * Comprehensive Feature Testing Script for Emolinkdn
 * Tests all 38 features to ensure they are functional and working
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Feature definitions
const features = [
  'emotion-detection',
  'ai-journal',
  'stress-games',
  'meditation-room',
  'vibe-rooms',
  'analytics',
  'emotional-wellness',
  'habit-recommendation',
  'emotion-threshold',
  'gamification',
  'ai-coach',
  'emotional-matching',
  'chat-room-manager',
  'social-analytics',
  'enhanced-profile',
  'mental-state-snapshot',
  'mood-timeline-visual',
  'personality-assessment',
  'notification-center',
  'room-permissions',
  'community-guidelines',
  'community-education',
  'profile-photo-upload',
  'cover-photo-manager',
  'ai-emotional-coach',
  'ai-emotion-predictor',
  'vr-meditation-space',
  'biometric-wellness-tracker',
  'social-wellness-community',
  'mindful-task-boards',
  'mood-based-calendar-planner',
  'wellness-wiki',
  'wellness-workflows',
  'template-gallery',
  'collaborative-healing-boards',
  'mood-progress-reports',
  'mindful-goals-tracker',
  'universal-search'
];

class FeatureTester {
  constructor() {
    this.browser = null;
    this.page = null;
    this.results = [];
    this.startTime = Date.now();
  }

  async initialize() {
    console.log('🚀 Initializing Feature Tester...');
    this.browser = await puppeteer.launch({
      headless: false,
      defaultViewport: { width: 1280, height: 720 },
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    this.page = await this.browser.newPage();
    
    // Set user agent
    await this.page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    
    console.log('✅ Browser initialized successfully');
  }

  async navigateToDashboard() {
    console.log('📱 Navigating to dashboard...');
    await this.page.goto('http://localhost:3001/dashboard', { waitUntil: 'networkidle2' });
    
    // Wait for dashboard to load
    await this.page.waitForSelector('.bg-gradient-to-br', { timeout: 10000 });
    console.log('✅ Dashboard loaded successfully');
  }

  async testFeature(featureId) {
    const result = {
      id: featureId,
      name: featureId.replace('-', ' '),
      status: 'pending',
      error: null,
      duration: 0,
      timestamp: new Date().toISOString()
    };

    const startTime = Date.now();

    try {
      console.log(`🧪 Testing feature: ${featureId}`);

      // Click on the feature card
      const featureSelector = `[data-feature-id="${featureId}"]`;
      await this.page.waitForSelector(featureSelector, { timeout: 5000 });
      await this.page.click(featureSelector);

      // Wait for modal to appear
      await this.page.waitForSelector('.fixed.inset-0.bg-black\\/50', { timeout: 5000 });

      // Check if modal content is loaded
      const modalContent = await this.page.$('.bg-white.dark\\:bg-gray-800.rounded-2xl');
      if (!modalContent) {
        throw new Error('Modal content not found');
      }

      // Check for feature-specific elements
      const featureTitle = await this.page.$eval('h2', el => el.textContent);
      if (!featureTitle.toLowerCase().includes(featureId.replace('-', ' '))) {
        throw new Error('Feature title mismatch');
      }

      // Test basic functionality
      await this.testFeatureFunctionality(featureId);

      // Close modal
      await this.page.click('button[aria-label="Close"]');

      result.status = 'passed';
      result.duration = Date.now() - startTime;
      console.log(`✅ ${featureId} - PASSED (${result.duration}ms)`);

    } catch (error) {
      result.status = 'failed';
      result.error = error.message;
      result.duration = Date.now() - startTime;
      console.log(`❌ ${featureId} - FAILED: ${error.message}`);
    }

    this.results.push(result);
  }

  async testFeatureFunctionality(featureId) {
    // Feature-specific tests
    switch (featureId) {
      case 'emotion-detection':
        await this.testEmotionDetection();
        break;
      case 'ai-journal':
        await this.testAIJournal();
        break;
      case 'stress-games':
        await this.testStressGames();
        break;
      case 'vibe-rooms':
        await this.testVibeRooms();
        break;
      case 'analytics':
        await this.testAnalytics();
        break;
      default:
        // Generic test for other features
        await this.testGenericFeature();
        break;
    }
  }

  async testEmotionDetection() {
    // Test emotion selection
    const emotionButtons = await this.page.$$('[data-emotion]');
    if (emotionButtons.length > 0) {
      await emotionButtons[0].click();
    }

    // Test intensity slider
    const intensitySlider = await this.page.$('input[type="range"]');
    if (intensitySlider) {
      await intensitySlider.evaluate(el => el.value = '7');
    }
  }

  async testAIJournal() {
    // Test journal input
    const textarea = await this.page.$('textarea');
    if (textarea) {
      await textarea.type('This is a test journal entry for testing purposes.');
    }

    // Test AI analysis button
    const analyzeButton = await this.page.$('button:contains("Analyze")');
    if (analyzeButton) {
      await analyzeButton.click();
      await this.page.waitForTimeout(2000); // Wait for AI processing
    }
  }

  async testStressGames() {
    // Test game canvas
    const canvas = await this.page.$('canvas');
    if (canvas) {
      // Simulate mouse interaction
      await this.page.mouse.click(400, 300);
      await this.page.waitForTimeout(1000);
    }
  }

  async testVibeRooms() {
    // Test room creation
    const createRoomButton = await this.page.$('button:contains("Create Room")');
    if (createRoomButton) {
      await createRoomButton.click();
      await this.page.waitForTimeout(1000);
    }
  }

  async testAnalytics() {
    // Test chart rendering
    const charts = await this.page.$$('[data-chart]');
    if (charts.length > 0) {
      await this.page.waitForTimeout(2000); // Wait for charts to load
    }
  }

  async testGenericFeature() {
    // Generic test - just check if content is loaded
    await this.page.waitForTimeout(1000);
    
    // Check for common elements
    const content = await this.page.$('.p-6');
    if (!content) {
      throw new Error('Feature content not found');
    }
  }

  async runAllTests() {
    console.log(`🎯 Starting tests for ${features.length} features...`);
    
    for (const feature of features) {
      await this.testFeature(feature);
      await this.page.waitForTimeout(500); // Small delay between tests
    }
  }

  generateReport() {
    const endTime = Date.now();
    const totalDuration = endTime - this.startTime;
    
    const passed = this.results.filter(r => r.status === 'passed').length;
    const failed = this.results.filter(r => r.status === 'failed').length;
    const successRate = Math.round((passed / this.results.length) * 100);

    const report = {
      summary: {
        totalFeatures: this.results.length,
        passed,
        failed,
        successRate,
        totalDuration: `${Math.round(totalDuration / 1000)}s`,
        timestamp: new Date().toISOString()
      },
      results: this.results,
      recommendations: this.generateRecommendations()
    };

    return report;
  }

  generateRecommendations() {
    const failedFeatures = this.results.filter(r => r.status === 'failed');
    const recommendations = [];

    if (failedFeatures.length > 0) {
      recommendations.push(`Fix ${failedFeatures.length} failed features: ${failedFeatures.map(f => f.id).join(', ')}`);
    }

    if (this.results.some(r => r.duration > 5000)) {
      recommendations.push('Optimize slow-loading features for better performance');
    }

    if (this.results.filter(r => r.status === 'passed').length === this.results.length) {
      recommendations.push('All features are working perfectly! 🎉');
    }

    return recommendations;
  }

  async saveReport(report) {
    const reportPath = path.join(__dirname, '../reports/feature-test-report.json');
    const reportDir = path.dirname(reportPath);
    
    if (!fs.existsSync(reportDir)) {
      fs.mkdirSync(reportDir, { recursive: true });
    }

    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`📊 Report saved to: ${reportPath}`);
  }

  async cleanup() {
    if (this.browser) {
      await this.browser.close();
    }
  }

  printResults() {
    console.log('\n📋 FEATURE TEST RESULTS');
    console.log('='.repeat(50));
    
    this.results.forEach(result => {
      const status = result.status === 'passed' ? '✅' : '❌';
      const duration = `${result.duration}ms`;
      console.log(`${status} ${result.name.padEnd(30)} ${duration.padStart(10)}`);
      
      if (result.error) {
        console.log(`   Error: ${result.error}`);
      }
    });

    const summary = this.generateReport().summary;
    console.log('\n📊 SUMMARY');
    console.log('='.repeat(50));
    console.log(`Total Features: ${summary.totalFeatures}`);
    console.log(`Passed: ${summary.passed}`);
    console.log(`Failed: ${summary.failed}`);
    console.log(`Success Rate: ${summary.successRate}%`);
    console.log(`Total Duration: ${summary.totalDuration}`);
  }
}

async function main() {
  const tester = new FeatureTester();
  
  try {
    await tester.initialize();
    await tester.navigateToDashboard();
    await tester.runAllTests();
    
    const report = tester.generateReport();
    await tester.saveReport(report);
    tester.printResults();
    
    console.log('\n🎉 Feature testing completed!');
    
    if (report.summary.successRate === 100) {
      console.log('🌟 All features are working perfectly!');
      process.exit(0);
    } else {
      console.log('⚠️  Some features need attention. Check the report for details.');
      process.exit(1);
    }
    
  } catch (error) {
    console.error('❌ Test execution failed:', error);
    process.exit(1);
  } finally {
    await tester.cleanup();
  }
}

// Run the tests
if (require.main === module) {
  main().catch(console.error);
}

module.exports = FeatureTester; 