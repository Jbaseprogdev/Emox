import React from 'react'

// Performance monitoring utilities
export class PerformanceMonitor {
  private static instance: PerformanceMonitor
  private metrics: Map<string, number> = new Map()
  private observers: Map<string, PerformanceObserver> = new Map()

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor()
    }
    return PerformanceMonitor.instance
  }

  // Measure component render time
  measureRender(componentName: string, startTime: number): void {
    const duration = performance.now() - startTime
    this.metrics.set(`${componentName}_render`, duration)
    
    if (duration > 100) {
      console.warn(`Slow render detected for ${componentName}: ${duration.toFixed(2)}ms`)
    }
  }

  // Measure API call performance
  measureApiCall(endpoint: string, startTime: number): void {
    const duration = performance.now() - startTime
    this.metrics.set(`${endpoint}_api`, duration)
    
    if (duration > 2000) {
      console.warn(`Slow API call detected for ${endpoint}: ${duration.toFixed(2)}ms`)
    }
  }

  // Monitor Core Web Vitals
  monitorWebVitals(): void {
    if (typeof window === 'undefined') return

    // LCP (Largest Contentful Paint)
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      const lastEntry = entries[entries.length - 1]
      this.metrics.set('lcp', lastEntry.startTime)
      
      if (lastEntry.startTime > 2500) {
        console.warn(`Poor LCP detected: ${lastEntry.startTime.toFixed(2)}ms`)
      }
    })
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })
    this.observers.set('lcp', lcpObserver)

    // FID (First Input Delay)
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      entries.forEach((entry) => {
        const fid = (entry as any).processingStart - entry.startTime
        this.metrics.set('fid', fid)
        
        if (fid > 100) {
          console.warn(`Poor FID detected: ${fid.toFixed(2)}ms`)
        }
      })
    })
    fidObserver.observe({ entryTypes: ['first-input'] })
    this.observers.set('fid', fidObserver)

    // CLS (Cumulative Layout Shift)
    const clsObserver = new PerformanceObserver((list) => {
      let cls = 0
      const entries = list.getEntries()
      entries.forEach((entry: any) => {
        if (!entry.hadRecentInput) {
          cls += entry.value
        }
      })
      this.metrics.set('cls', cls)
      
      if (cls > 0.1) {
        console.warn(`Poor CLS detected: ${cls.toFixed(3)}`)
      }
    })
    clsObserver.observe({ entryTypes: ['layout-shift'] })
    this.observers.set('cls', clsObserver)
  }

  // Get performance report
  getReport(): Record<string, number> {
    return Object.fromEntries(this.metrics)
  }

  // Cleanup observers
  cleanup(): void {
    this.observers.forEach((observer) => observer.disconnect())
    this.observers.clear()
    this.metrics.clear()
  }
}

// React hook for performance monitoring
export function usePerformanceMonitor(componentName: string) {
  const startTime = React.useRef(performance.now())

  React.useEffect(() => {
    const monitor = PerformanceMonitor.getInstance()
    monitor.measureRender(componentName, startTime.current)
  })

  return {
    measureApiCall: (endpoint: string, startTime: number) => {
      const monitor = PerformanceMonitor.getInstance()
      monitor.measureApiCall(endpoint, startTime)
    }
  }
}

// Memory usage monitoring
export function monitorMemoryUsage(): void {
  if (typeof window === 'undefined' || !('memory' in performance)) return

  setInterval(() => {
    const memory = (performance as any).memory
    const usedMB = memory.usedJSHeapSize / 1024 / 1024
    const totalMB = memory.totalJSHeapSize / 1024 / 1024
    
    if (usedMB > 50) {
      console.warn(`High memory usage detected: ${usedMB.toFixed(2)}MB / ${totalMB.toFixed(2)}MB`)
    }
  }, 30000) // Check every 30 seconds
}

// Bundle size analyzer
export function analyzeBundleSize(): void {
  if (typeof window === 'undefined') return

  const observer = new PerformanceObserver((list) => {
    const entries = list.getEntries()
    entries.forEach((entry) => {
      if (entry.name.includes('chunk') || entry.name.includes('bundle')) {
        const size = (entry as any).transferSize || (entry as any).encodedBodySize || 0
        const sizeKB = size / 1024
        
        if (sizeKB > 500) {
          console.warn(`Large bundle detected: ${entry.name} (${sizeKB.toFixed(2)}KB)`)
        }
      }
    })
  })
  
  observer.observe({ entryTypes: ['resource'] })
}

// Initialize performance monitoring
export function initializePerformanceMonitoring(): void {
  const monitor = PerformanceMonitor.getInstance()
  monitor.monitorWebVitals()
  monitorMemoryUsage()
  analyzeBundleSize()
  
  // Log performance metrics on page unload
  window.addEventListener('beforeunload', () => {
    const report = monitor.getReport()
    console.log('Performance Report:', report)
  })
} 