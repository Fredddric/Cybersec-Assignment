import axios from 'axios';

const SQL_PAYLOADS = [
  "'",
  "' OR '1'='1",
  "'; DROP TABLE users--",
  "' UNION SELECT NULL--",
];

export async function scanForSQLInjection(url) {
  const vulnerabilities = [];
  
  try {
    // Test URL parameters
    const urlObj = new URL(url);
    const params = urlObj.searchParams;
    
    if (params.toString()) {
      for (const [param, value] of params) {
        for (const payload of SQL_PAYLOADS) {
          const testUrl = new URL(url);
          testUrl.searchParams.set(param, payload);
          
          try {
            const response = await axios.get(testUrl.toString());
            if (response.data.includes('SQL') || response.data.includes('database error')) {
              vulnerabilities.push({
                type: 'Potential SQL Injection',
                parameter: param,
                description: 'Parameter appears vulnerable to SQL injection'
              });
              break;
            }
          } catch (error) {
            if (error.response?.data?.includes('SQL')) {
              vulnerabilities.push({
                type: 'Potential SQL Injection',
                parameter: param,
                description: 'Error response indicates possible SQL injection'
              });
            }
          }
        }
      }
    }
  } catch (error) {
    console.error('Error scanning for SQL injection:', error.message);
  }
  
  return vulnerabilities;
}
