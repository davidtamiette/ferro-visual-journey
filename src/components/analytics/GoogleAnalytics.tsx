
import { useEffect } from 'react';
import ReactGA from 'react-ga4';
import { useLocation } from 'react-router-dom';

interface GoogleAnalyticsProps {
  trackingId: string | null;
}

const GoogleAnalytics = ({ trackingId }: GoogleAnalyticsProps) => {
  const location = useLocation();
  
  useEffect(() => {
    // Initialize Google Analytics only if a tracking ID is provided
    if (trackingId && !window.GA_INITIALIZED) {
      ReactGA.initialize(trackingId);
      window.GA_INITIALIZED = true;
      console.log('Google Analytics initialized with ID:', trackingId);
    }
  }, [trackingId]);
  
  useEffect(() => {
    // Track page views whenever location changes and GA is initialized
    if (trackingId && window.GA_INITIALIZED) {
      ReactGA.send({ hitType: "pageview", page: location.pathname });
      console.log('Pageview tracked:', location.pathname);
    }
  }, [location, trackingId]);

  return null; // This component doesn't render anything
};

export default GoogleAnalytics;

// Add GA_INITIALIZED to Window interface
declare global {
  interface Window {
    GA_INITIALIZED: boolean;
  }
}
