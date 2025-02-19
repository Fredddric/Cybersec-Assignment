import axios from 'axios';
import * as cheerio from 'cheerio';

const XSS_PAYLOADS = [
  '<script>alert(1)</script>',
  '"><script>alert(1)</script>',
  '"><img src=x onerror=alert(1)>',
  '\'><img src=x onerror=alert(1)>',
];

export async function scanForXSS(url) {
  const vulnerabilities = [];
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    
    // Find all input fields
    const inputs = $('input');
    const forms = $('form');
    
    // Check input fields
    inputs.each((i, input) => {
      const type = $(input).attr('type');
      if (!type || type === 'text' || type === 'search') {
        vulnerabilities.push({
          type: 'Potential XSS',
          element: `Input field: ${$(input).attr('name') || 'unnamed'}`,
          description: 'Unprotected input field found'
        });
      }
    });

    // Check forms
    forms.each((i, form) => {
      const action = $(form).attr('action');
      if (!action || action.includes('?')) {
        vulnerabilities.push({
          type: 'Potential XSS',
          element: `Form: ${$(form).attr('id') || 'unnamed'}`,
          description: 'Form with potentially unsafe action found'
        });
      }
    });
  } catch (error) {
    console.error('Error scanning for XSS:', error.message);
  }
  
  return vulnerabilities;
}
