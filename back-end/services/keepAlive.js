import https from 'https';
import http from 'http';

class KeepAliveService {
  constructor(url, interval = 14 * 60 * 1000) { // 14 minutes default
    this.url = url;
    this.interval = interval;
    this.intervalId = null;
    this.isRunning = false;
  }

  start() {
    if (this.isRunning) {
      console.log('Keep-alive service is already running');
      return;
    }

    console.log(`🔄 Starting keep-alive service for ${this.url}`);
    console.log(`⏰ Ping interval: ${this.interval / 1000 / 60} minutes`);
    
    this.isRunning = true;
    
    // Initial ping after 1 minute
    setTimeout(() => {
      this.ping();
    }, 60000);

    // Set up regular pings
    this.intervalId = setInterval(() => {
      this.ping();
    }, this.interval);
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      this.isRunning = false;
      console.log('🛑 Keep-alive service stopped');
    }
  }

  ping() {
    const startTime = Date.now();
    const protocol = this.url.startsWith('https') ? https : http;
    
    console.log(`🏓 Pinging ${this.url} at ${new Date().toISOString()}`);
    
    const request = protocol.get(this.url, (response) => {
      const duration = Date.now() - startTime;
      console.log(`✅ Keep-alive ping successful - Status: ${response.statusCode}, Duration: ${duration}ms`);
      
      // Consume response data to free up memory
      response.on('data', () => {});
      response.on('end', () => {});
    });

    request.on('error', (error) => {
      const duration = Date.now() - startTime;
      console.error(`❌ Keep-alive ping failed after ${duration}ms:`, error.message);
    });

    request.setTimeout(30000, () => {
      request.destroy();
      console.error('❌ Keep-alive ping timeout (30s)');
    });
  }

  getStatus() {
    return {
      isRunning: this.isRunning,
      url: this.url,
      interval: this.interval,
      nextPing: this.isRunning ? new Date(Date.now() + this.interval).toISOString() : null
    };
  }
}

export default KeepAliveService;
