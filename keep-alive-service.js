// External Keep-Alive Service
// You can run this separately or deploy it to a different service

import https from 'https';
import http from 'http';

class ExternalKeepAlive {
  constructor() {
    this.services = [
      // Add your Render backend URL here
      'https://your-backend-service.onrender.com/health',
      // You can add multiple services to keep alive
    ];
    this.interval = 13 * 60 * 1000; // 13 minutes
    this.intervals = [];
  }

  start() {
    console.log('🚀 External Keep-Alive Service Starting...');
    console.log(`📋 Services to keep alive: ${this.services.length}`);
    
    this.services.forEach((url, index) => {
      console.log(`🔗 Service ${index + 1}: ${url}`);
      
      // Initial ping after 1 minute
      setTimeout(() => {
        this.pingService(url, index + 1);
      }, 60000 + (index * 10000)); // Stagger initial pings
      
      // Set up regular pings
      const intervalId = setInterval(() => {
        this.pingService(url, index + 1);
      }, this.interval);
      
      this.intervals.push(intervalId);
    });
  }

  pingService(url, serviceNumber) {
    const startTime = Date.now();
    const protocol = url.startsWith('https') ? https : http;
    
    console.log(`🏓 [Service ${serviceNumber}] Pinging ${url} at ${new Date().toISOString()}`);
    
    const request = protocol.get(url, (response) => {
      const duration = Date.now() - startTime;
      console.log(`✅ [Service ${serviceNumber}] Ping successful - Status: ${response.statusCode}, Duration: ${duration}ms`);
      
      // Consume response data
      response.on('data', () => {});
      response.on('end', () => {});
    });

    request.on('error', (error) => {
      const duration = Date.now() - startTime;
      console.error(`❌ [Service ${serviceNumber}] Ping failed after ${duration}ms:`, error.message);
    });

    request.setTimeout(30000, () => {
      request.destroy();
      console.error(`❌ [Service ${serviceNumber}] Ping timeout (30s)`);
    });
  }

  stop() {
    this.intervals.forEach(intervalId => clearInterval(intervalId));
    this.intervals = [];
    console.log('🛑 External Keep-Alive Service Stopped');
  }
}

// Usage
const keepAlive = new ExternalKeepAlive();

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 SIGTERM received');
  keepAlive.stop();
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('🛑 SIGINT received');
  keepAlive.stop();
  process.exit(0);
});

// Start the service
keepAlive.start();

console.log('🔄 External Keep-Alive Service is running...');
console.log('Press Ctrl+C to stop');

// Keep the process alive
setInterval(() => {
  console.log(`💓 Keep-alive service heartbeat - ${new Date().toISOString()}`);
}, 5 * 60 * 1000); // Every 5 minutes
