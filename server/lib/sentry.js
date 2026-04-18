// server/lib/sentry.js
import * as Sentry from '@sentry/node';
// import { nodeProfilingIntegration } from '@sentry/profiling-node'; // Disabled due to Windows native module issues

const SENTRY_DSN = process.env.SENTRY_DSN;

if (SENTRY_DSN) {
  Sentry.init({
    dsn: SENTRY_DSN,
    environment: process.env.NODE_ENV || 'development',
    integrations: [
      // Add Express integration for automatic error handling
      new Sentry.Integrations.Http({ tracing: true }),
      new Sentry.Integrations.Express(),
      // Profiling disabled due to native module compatibility issues
      // nodeProfilingIntegration(),
    ],
    // Performance Monitoring
    tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
    // Release Health
    enableTracing: true,
    // Set profiling sample rate (disabled)
    // profilesSampleRate: 1.0,
  });

  console.log('Sentry initialized for server');
} else {
  console.warn('SENTRY_DSN not configured, Sentry will not be initialized');
}

export default Sentry;