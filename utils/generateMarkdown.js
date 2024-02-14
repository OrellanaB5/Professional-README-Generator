function generateMarkdown(data) {
  let toc = `## Table of Contents\n`;
  if (data.installation) toc += `- [Installation](#installation)\n`;
  if (data.usage) toc += `- [Usage](#usage)\n`;
  if (data.license) toc += `- [License](#license)\n`;
  if (data.contributing || data.contributors) toc += `- [Contributing](#contributing)\n`;
  if (data.tests) toc += `- [Tests](#tests)\n`;
  if (data.questions) toc += `- [Questions](#questions)\n`;
  data.customSections.forEach(section => {
    toc += `- [${section.title}](#${section.title.toLowerCase().replace(/ /g, '-')})\n`;
  });

  let markdown = `
# ${data.title}

## Description
${data.description}

${toc}

## Installation
${data.installation}

## Usage
${data.usage}

## License
This application is covered under the ${data.license} license.

## Contributing
${data.contributing}
${data.contributors?.map(username => `- [@${username}](https://github.com/${username})`).join('\n')}

## Tests
${data.tests}

## Questions
For questions or inquiries, please contact:
- GitHub: [${data.username}](https://github.com/${data.username})
- Email: ${data.email}
`;

  data.customSections.forEach(section => {
    markdown += `
## ${section.title}
${section.content}
`;
  });

  return markdown;
}

module.exports = generateMarkdown;
