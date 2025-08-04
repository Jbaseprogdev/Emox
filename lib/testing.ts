// Comprehensive testing utilities for Emolinkdn

export interface TestResult {
  name: string
  passed: boolean
  error?: string
  duration: number
  timestamp: Date
}

export class TestSuite {
  private tests: Array<() => Promise<TestResult>> = []
  private results: TestResult[] = []

  addTest(name: string, testFn: () => Promise<void> | void): void {
    this.tests.push(async () => {
      const startTime = Date.now()
      try {
        await testFn()
        return {
          name,
          passed: true,
          duration: Date.now() - startTime,
          timestamp: new Date()
        }
      } catch (error) {
        return {
          name,
          passed: false,
          error: error instanceof Error ? error.message : String(error),
          duration: Date.now() - startTime,
          timestamp: new Date()
        }
      }
    })
  }

  async runTests(): Promise<TestResult[]> {
    console.log(`🧪 Running ${this.tests.length} tests...`)
    
    for (const test of this.tests) {
      const result = await test()
      this.results.push(result)
      
      if (result.passed) {
        console.log(`✅ ${result.name} (${result.duration}ms)`)
      } else {
        console.error(`❌ ${result.name} - ${result.error}`)
      }
    }

    const passed = this.results.filter(r => r.passed).length
    const failed = this.results.length - passed
    
    console.log(`\n📊 Test Results: ${passed} passed, ${failed} failed`)
    
    return this.results
  }

  getResults(): TestResult[] {
    return this.results
  }
}

// Component testing utilities
export function testComponent(componentName: string) {
  return {
    render: () => {
      const startTime = performance.now()
      return {
        end: () => {
          const duration = performance.now() - startTime
          if (duration > 100) {
            console.warn(`Slow render for ${componentName}: ${duration.toFixed(2)}ms`)
          }
          return duration
        }
      }
    },
    
    testProps: (props: any) => {
      const requiredProps = ['onClose', 'currentUser']
      const missingProps = requiredProps.filter(prop => !(prop in props))
      
      if (missingProps.length > 0) {
        throw new Error(`Missing required props for ${componentName}: ${missingProps.join(', ')}`)
      }
      
      return true
    }
  }
}

// API testing utilities
export async function testAPI(endpoint: string, options: RequestInit = {}): Promise<{
  success: boolean
  status: number
  data?: any
  error?: string
  duration: number
}> {
  const startTime = Date.now()
  
  try {
    const response = await fetch(endpoint, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    })
    
    const duration = Date.now() - startTime
    const data = await response.json()
    
    return {
      success: response.ok,
      status: response.status,
      data: response.ok ? data : undefined,
      error: response.ok ? undefined : data.message || 'API request failed',
      duration
    }
  } catch (error) {
    const duration = Date.now() - startTime
    return {
      success: false,
      status: 0,
      error: error instanceof Error ? error.message : 'Network error',
      duration
    }
  }
}

// Local storage testing
export function testLocalStorage(): TestResult[] {
  const results: TestResult[] = []
  
  // Test localStorage availability
  try {
    localStorage.setItem('test', 'value')
    const value = localStorage.getItem('test')
    localStorage.removeItem('test')
    
    results.push({
      name: 'LocalStorage Availability',
      passed: value === 'value',
      duration: 0,
      timestamp: new Date()
    })
  } catch (error) {
    results.push({
      name: 'LocalStorage Availability',
      passed: false,
      error: 'LocalStorage not available',
      duration: 0,
      timestamp: new Date()
    })
  }
  
  // Test demo user data
  try {
    const demoUser = localStorage.getItem('demoUser')
    if (demoUser) {
      const parsed = JSON.parse(demoUser)
      const hasRequiredFields = ['id', 'email', 'name'].every(field => field in parsed)
      
      results.push({
        name: 'Demo User Data Structure',
        passed: hasRequiredFields,
        duration: 0,
        timestamp: new Date()
      })
    } else {
      results.push({
        name: 'Demo User Data Structure',
        passed: true, // No user logged in is valid
        duration: 0,
        timestamp: new Date()
      })
    }
  } catch (error) {
    results.push({
      name: 'Demo User Data Structure',
      passed: false,
      error: 'Invalid demo user data',
      duration: 0,
      timestamp: new Date()
    })
  }
  
  return results
}

// Feature testing
export function testFeatures(): TestResult[] {
  const results: TestResult[] = []
  
  // Test camera access
  if (typeof navigator !== 'undefined' && navigator.mediaDevices) {
    results.push({
      name: 'Camera API Available',
      passed: true,
      duration: 0,
      timestamp: new Date()
    })
  } else {
    results.push({
      name: 'Camera API Available',
      passed: false,
      error: 'Camera API not available',
      duration: 0,
      timestamp: new Date()
    })
  }
  
  // Test WebGL support
  try {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    
    results.push({
      name: 'WebGL Support',
      passed: !!gl,
      duration: 0,
      timestamp: new Date()
    })
  } catch (error) {
    results.push({
      name: 'WebGL Support',
      passed: false,
      error: 'WebGL not supported',
      duration: 0,
      timestamp: new Date()
    })
  }
  
  // Test animation support
  results.push({
    name: 'CSS Animations',
    passed: 'animation' in document.documentElement.style,
    duration: 0,
    timestamp: new Date()
  })
  
  return results
}

// Performance testing
export function testPerformance(): TestResult[] {
  const results: TestResult[] = []
  
  // Test page load time
  if (typeof window !== 'undefined') {
    const loadTime = performance.now()
    results.push({
      name: 'Page Load Time',
      passed: loadTime < 3000,
      duration: loadTime,
      timestamp: new Date()
    })
  }
  
  // Test memory usage
  if (typeof window !== 'undefined' && 'memory' in performance) {
    const memory = (performance as any).memory
    const usedMB = memory.usedJSHeapSize / 1024 / 1024
    
    results.push({
      name: 'Memory Usage',
      passed: usedMB < 100,
      duration: 0,
      timestamp: new Date()
    })
  }
  
  return results
}

// Run comprehensive tests
export async function runComprehensiveTests(): Promise<{
  results: TestResult[]
  summary: {
    total: number
    passed: number
    failed: number
    successRate: number
  }
}> {
  const allResults = [
    ...testLocalStorage(),
    ...testFeatures(),
    ...testPerformance()
  ]
  
  const passed = allResults.filter(r => r.passed).length
  const total = allResults.length
  
  const summary = {
    total,
    passed,
    failed: total - passed,
    successRate: (passed / total) * 100
  }
  
  console.log('🧪 Comprehensive Test Results:')
  console.log(`Total: ${summary.total}`)
  console.log(`Passed: ${summary.passed}`)
  console.log(`Failed: ${summary.failed}`)
  console.log(`Success Rate: ${summary.successRate.toFixed(1)}%`)
  
  return { results: allResults, summary }
}

// Development testing helper
export function enableDevTesting(): void {
  if (process.env.NODE_ENV === 'development') {
    // Add test button to page
    const testButton = document.createElement('button')
    testButton.textContent = '🧪 Run Tests'
    testButton.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 10000;
      padding: 10px 15px;
      background: #3b82f6;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-size: 14px;
    `
    
    testButton.addEventListener('click', async () => {
      const { results, summary } = await runComprehensiveTests()
      
      // Show results in a modal
      const modal = document.createElement('div')
      modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10001;
      `
      
      const content = document.createElement('div')
      content.style.cssText = `
        background: white;
        padding: 20px;
        border-radius: 12px;
        max-width: 600px;
        max-height: 80vh;
        overflow-y: auto;
      `
      
      content.innerHTML = `
        <h2>Test Results</h2>
        <p>Success Rate: ${summary.successRate.toFixed(1)}% (${summary.passed}/${summary.total})</p>
        <div>
          ${results.map(r => `
            <div style="margin: 10px 0; padding: 10px; border: 1px solid ${r.passed ? '#10b981' : '#ef4444'}; border-radius: 6px;">
              <strong>${r.name}</strong>: ${r.passed ? '✅ PASS' : '❌ FAIL'}
              ${r.error ? `<br><small style="color: red;">${r.error}</small>` : ''}
            </div>
          `).join('')}
        </div>
        <button onclick="this.parentElement.parentElement.remove()" style="margin-top: 15px; padding: 8px 16px; background: #6b7280; color: white; border: none; border-radius: 6px; cursor: pointer;">Close</button>
      `
      
      modal.appendChild(content)
      document.body.appendChild(modal)
    })
    
    document.body.appendChild(testButton)
  }
} 