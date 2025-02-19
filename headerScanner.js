import axios from 'axios';

export async function scanHeaders(url) {
  const vulnerabilities = [];
  
  try {
    const response = await axios.get(url);
    const headers = response.headers;
    
    // Enhanced security headers check with specific recommendations
    const securityHeaders = {
      'X-Frame-Options': {
        message: 'Missing X-Frame-Options header. Site might be vulnerable to clickjacking.',
        severity: 'High'
      },
      'X-XSS-Protection': {
        message: 'Missing X-XSS-Protection header.',
        severity: 'Medium'
      },
      'Content-Security-Policy': {
        message: 'Missing Content-Security-Policy header.',
        severity: 'High'
      },
      'X-Content-Type-Options': {
        message: 'Missing X-Content-Type-Options header.',
        severity: 'Medium'
      },
      'Strict-Transport-Security': {
        message: 'Missing HSTS header.',
        severity: 'High'
      }
    };
    
    for (const [header, info] of Object.entries(securityHeaders)) {
      if (!headers[header.toLowerCase()]) {
        vulnerabilities.push({
          type: 'Missing Security Header',
          header,
          description: info.message,
          severity: info.severity
        });
      }
    }
    
    // Enhanced information disclosure check
    const sensitiveHeaders = {
      'Server': 'Server version information exposed',
      'X-Powered-By': 'Technology stack information exposed',
      'X-AspNet-Version': '.NET version information exposed',
      'X-AspNetMvc-Version': 'ASP.NET MVC version exposed'
    };

    for (const [header, message] of Object.entries(sensitiveHeaders)) {
      if (headers[header.toLowerCase()]) {
        vulnerabilities.push({
          type: 'Information Disclosure',
          header,
          description: message,
          severity: 'Medium',
          value: headers[header.toLowerCase()]
        });
      }
    }
  } catch (error) {
    console.error('Error scanning headers:', error.message);
  }
  
  return vulnerabilities;
}
