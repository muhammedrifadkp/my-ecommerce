'use client';

import { useEffect, useRef } from 'react';

export default function KeepAlive() {
  const intervalRef = useRef(null);
  const isActiveRef = useRef(true);

  useEffect(() => {
    const PING_INTERVAL = 13 * 60 * 1000; // 13 minutes (slightly less than backend's 14 minutes)
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    
    console.log('🔄 Frontend keep-alive service initialized');

    const pingBackend = async () => {
      // Only ping if the tab is active and visible
      if (!isActiveRef.current || document.hidden) {
        console.log('⏸️ Skipping keep-alive ping (tab inactive or hidden)');
        return;
      }

      try {
        console.log(`🏓 Frontend pinging backend: ${API_URL}/health`);
        
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
        
        const response = await fetch(`${API_URL}/health`, {
          method: 'GET',
          signal: controller.signal,
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        clearTimeout(timeoutId);
        
        if (response.ok) {
          const data = await response.json();
          console.log('✅ Frontend keep-alive ping successful:', data.status);
        } else {
          console.warn(`⚠️ Backend responded with status: ${response.status}`);
        }
      } catch (error) {
        if (error.name === 'AbortError') {
          console.error('❌ Frontend keep-alive ping timeout');
        } else {
          console.error('❌ Frontend keep-alive ping failed:', error.message);
        }
      }
    };

    // Initial ping after 2 minutes
    const initialTimeout = setTimeout(() => {
      pingBackend();
    }, 2 * 60 * 1000);

    // Set up regular pings
    intervalRef.current = setInterval(pingBackend, PING_INTERVAL);

    // Handle visibility change
    const handleVisibilityChange = () => {
      isActiveRef.current = !document.hidden;
      console.log(`👁️ Tab visibility changed: ${isActiveRef.current ? 'visible' : 'hidden'}`);
      
      if (isActiveRef.current) {
        // Tab became visible, ping immediately
        setTimeout(pingBackend, 1000);
      }
    };

    // Handle page focus/blur
    const handleFocus = () => {
      isActiveRef.current = true;
      console.log('🎯 Page focused - keep-alive active');
    };

    const handleBlur = () => {
      isActiveRef.current = false;
      console.log('😴 Page blurred - keep-alive paused');
    };

    // Add event listeners
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);
    window.addEventListener('blur', handleBlur);

    // Cleanup
    return () => {
      clearTimeout(initialTimeout);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('blur', handleBlur);
      console.log('🛑 Frontend keep-alive service stopped');
    };
  }, []);

  // This component doesn't render anything
  return null;
}

// Hook for manual keep-alive control
export function useKeepAlive() {
  const pingBackend = async () => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    
    try {
      const response = await fetch(`${API_URL}/health`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      return response.ok;
    } catch (error) {
      console.error('Manual keep-alive ping failed:', error);
      return false;
    }
  };

  return { pingBackend };
}
