# Web Security Scanner

A command-line tool for scanning websites for common security vulnerabilities.

## Features

- XSS vulnerability detection
- SQL injection testing
- Security headers analysis
- Detailed reporting

## Usage

```bash
# Run all scans
node src/index.js --url https://example.com --all

# Run specific scans
node src/index.js --url https://example.com --xss --headers

# Show help
node src/index.js --help
```

## Disclaimer

This tool is for educational purposes only. Always obtain proper authorization before scanning any website.
