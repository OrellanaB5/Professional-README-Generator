const inquirer = require('inquirer');
const fs = require('fs');
const generateMarkdown = require('./utils/generateMarkdown');

const getContributors = async (contributors = []) => {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'username',
      message: "Contributor's GitHub username (leave blank to finish):",
    },
  ]);

  if (answers.username) {
    contributors.push(answers.username);
    await getContributors(contributors);
  }

  return contributors;
};

const customSections = async (sections = []) => {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Section title (leave blank to finish):',
    },
    {
      type: 'input',
      name: 'content',
      message: 'Section content:',
      when: (answers) => answers.title,
    },
  ]);

  if (answers.title && answers.content) {
    sections.push(answers);
    await customSections(sections);
  }

  return sections;
};

const questions = [
  {
    type: 'input',
    message: 'What is the title for your application? (Required)',
    name: 'title',
  },
  {
    type: 'description',
    message: 'Please provide a description of your application. (Required)',
    name: 'description',
  },
  {
    type: 'input',
    message: 'Please provide a link to an image of the application.',
    name: 'image',
  },
  {
    type: 'input',
    message: 'Please explain how to install the application. (Required)',
    name: 'installation',
  },
  {
    type: 'input',
    message:
      'Please explain how to use the application. If there is a live link, include that as well. (Required)',
    name: 'usage',
  },
  {
    type: 'list',
    message:
      'Please choose one of the following licenses for your application. (Required)',
    name: 'license',
    choices: ['MIT', 'Apache 2.0', 'GNU GPLv3', 'ISC', 'No License'],
  },
  {
    type: 'input',
    message: 'Please provide any contribution guidelines.',
    name: 'contributing',
  },
  {
    type: 'input',
    message:
      'Please provide the names of those that need to credited for the development of the application.',
    name: 'credits',
  },
  {
    type: 'input',
    message:
      'Please provide instructions on how to run tests on the application?',
    name: 'tests',
  },
  {
    type: 'input',
    message: 'Please provide a link to your github account. (Required)',
    name: 'username',
  },
  {
    type: 'input',
    message: 'Please provide your email address. (Required)',
    name: 'email',
  },
];

async function promptUserAndGenerateREADME() {
  try {
    const baseData = await inquirer.prompt(questions);
    const contributors = await getContributors();
    const sections = await customSections();

    baseData.contributors = contributors;
    baseData.customSections = sections;

    const markdownContent = generateMarkdown(baseData);
    fs.writeFileSync('README.md', markdownContent);
    console.log('README.md successfully made!');
  } catch (error) {
    console.error('Error:', error);
  }
}

function init() {
  promptUserAndGenerateREADME();
}

init();
