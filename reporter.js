import chalk from 'chalk';
import { securitySolutions } from './solutions.js';

function getSolutions(vulnerability) {
  const solutions = securitySolutions[vulnerability.type];
  if (!solutions) return [];

  let relevantSolutions = [];

  // Add general solutions if they exist
  if (solutions.general) {
    relevantSolutions.push(...solutions.general);
  }

  // Add specific solutions based on vulnerability details
  Object.keys(vulnerability).forEach(key => {
    if (solutions.specific && solutions.specific[key]) {
      relevantSolutions.push(...solutions.specific[key]);
    }
    if (solutions[vulnerability[key]]) {
      relevantSolutions.push(...solutions[vulnerability[key]]);
    }
  });

  return [...new Set(relevantSolutions)]; // Remove duplicates
}

export function generateReport(vulnerabilities, url) {
  console.log(chalk.blue('\n=== Security Scan Report ==='));
  console.log(chalk.gray(`Target URL: ${url}`));
  console.log(chalk.gray(`Scan Date: ${new Date().toISOString()}\n`));

  if (vulnerabilities.length === 0) {
    console.log(chalk.green('No vulnerabilities detected!'));
    return;
  }

  const grouped = vulnerabilities.reduce((acc, vuln) => {
    if (!acc[vuln.type]) {
      acc[vuln.type] = [];
    }
    acc[vuln.type].push(vuln);
    return acc;
  }, {});

  for (const [type, vulns] of Object.entries(grouped)) {
    console.log(chalk.red(`\n${type} (${vulns.length}):`));
    vulns.forEach((vuln, i) => {
      console.log(chalk.yellow(`\n  ${i + 1}. Details:`));
      for (const [key, value] of Object.entries(vuln)) {
        if (key !== 'type') {
          console.log(chalk.gray(`     ${key}: ${value}`));
        }
      }

      // Add solutions section
      const solutions = getSolutions(vuln);
      if (solutions.length > 0) {
        console.log(chalk.green('\n     Recommended Solutions:'));
        solutions.forEach((solution, index) => {
          console.log(chalk.cyan(`       ${index + 1}. ${solution}`));
        });
      }
    });
  }

  console.log(chalk.blue('\n=== End of Report ===\n'));

  // Add summary of findings
  console.log(chalk.yellow('Summary of Findings:'));
  console.log(chalk.gray(`Total vulnerabilities found: ${vulnerabilities.length}`));
  for (const [type, vulns] of Object.entries(grouped)) {
    console.log(chalk.gray(`${type}: ${vulns.length} issues`));
  }
  
  // Add general recommendations
  console.log(chalk.yellow('\nGeneral Security Recommendations:'));
  console.log(chalk.cyan('1. Implement regular security audits'));
  console.log(chalk.cyan('2. Keep all software and dependencies updated'));
  console.log(chalk.cyan('3. Use HTTPS everywhere'));
  console.log(chalk.cyan('4. Implement proper error handling'));
  console.log(chalk.cyan('5. Consider using a Web Application Firewall (WAF)'));
}
