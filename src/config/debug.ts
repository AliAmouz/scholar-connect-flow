// Debug configuration for authentication bypass
export const DEBUG_CONFIG = {
  // Set to true to disable authentication
  DISABLE_AUTH: true,
  
  // Mock user role for testing different user types
  // Options: 'admin', 'teacher', 'parent'
  MOCK_USER_ROLE: 'admin',
  
  // Mock user data
  MOCK_USER: {
    id: 'debug-user-123',
    email: 'debug@edumanage.com',
    full_name: 'Debug User',
    role: 'admin'
  },
  
  // Default redirect when auth is disabled
  DEFAULT_REDIRECT: '/admin',
  
  // Enable debug logging
  DEBUG_LOGGING: true
};

// Helper function to log debug messages
export const debugLog = (message: string, data?: any) => {
  if (DEBUG_CONFIG.DEBUG_LOGGING) {
    console.log(`[DEBUG AUTH] ${message}`, data || '');
  }
};