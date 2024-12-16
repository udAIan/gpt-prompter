#!/usr/bin/env node

import { Command } from 'commander';
const program = new Command();

program.name('mycli').description('My custom CLI tool').version('1.0.0');

program
  .command('greet <name>')
  .description('Greets a user')
  .action((name) => {
    console.log(`Hello, ${name}!`);
  });

program.parse();
