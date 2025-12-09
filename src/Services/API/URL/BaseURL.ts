// For React Native, you'll need to use your actual server IP or domain
// Don't use localhost - use your computer's IP address or deployed API URL

// Option 1: Development (use your computer's IP)
export const LOCALHOST = 'http://192.168.1.49'; // Replace with your IP

// Option 2: Production
// export const LOCALHOST = 'https://api.yourdomain.com';

export const PORT = '8001';
export const LOCALHOSTWITHPORT = `${LOCALHOST}:${PORT}`;

export const BaseURL = {
  MagicDwellAPI: `${LOCALHOSTWITHPORT}/api/`,
};

export const MagicDwellAPI = BaseURL.MagicDwellAPI;