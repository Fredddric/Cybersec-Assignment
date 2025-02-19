export const securitySolutions = {
  'Potential XSS': {
    general: [
      'Implement input validation and sanitization',
      'Use Content Security Policy (CSP) headers',
      'Encode user input using HTML entities',
      'Use modern frameworks that automatically escape content'
    ],
    specific: {
      'Input field': [
        'Add input validation patterns',
        'Implement server-side sanitization',
        'Use CSRF tokens for forms',
        'Consider using the "pattern" HTML attribute for validation'
      ],
      'Form': [
        'Add CSRF protection tokens',
        'Validate form submissions server-side',
        'Use HTTPS for form submissions',
        'Implement rate limiting on form submissions'
      ]
    }
  },
  'Potential SQL Injection': {
    general: [
      'Use parameterized queries or prepared statements',
      'Implement input validation and sanitization',
      'Use an ORM (Object-Relational Mapping)',
      'Apply the principle of least privilege for database users'
    ],
    specific: {
      'parameter': [
        'Use parameterized queries',
        'Implement proper input validation',
        'Consider using query builders or ORMs',
        'Escape special characters in user input'
      ]
    }
  },
  'Missing Security Header': {
    'X-Frame-Options': [
      'Add header: X-Frame-Options: SAMEORIGIN',
      'Configure CSP frame-ancestors directive'
    ],
    'X-XSS-Protection': [
      'Add header: X-XSS-Protection: 1; mode=block',
      'Consider implementing Content-Security-Policy instead'
    ],
    'Content-Security-Policy': [
      'Implement a strict CSP policy',
      'Start with default-src \'self\'',
      'Gradually add required sources for scripts, styles, and media'
    ],
    'X-Content-Type-Options': [
      'Add header: X-Content-Type-Options: nosniff'
    ],
    'Strict-Transport-Security': [
      'Add header: Strict-Transport-Security: max-age=31536000; includeSubDomains',
      'Consider adding preload directive'
    ]
  },
  'Information Disclosure': {
    general: [
      'Remove or mask server information headers',
      'Configure web server to hide version information',
      'Use security through obscurity as an additional layer'
    ],
    specific: {
      'Server': [
        'Remove or customize Server header in web server configuration',
        'Use reverse proxy to hide backend server details'
      ],
      'X-Powered-By': [
        'Remove X-Powered-By header in application configuration',
        'Use security middleware to remove sensitive headers'
      ]
    }
  }
};
