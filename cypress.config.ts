import { exec } from 'child_process';
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        'db:reset': () => {
          return new Promise((resolve, reject) => {
            exec('tsx ./cypress/utils/resetDb.ts', (error, stdout, stderr) => {
              if (error) {
                console.error(`\nError: \n${stderr}`);
                reject(error);
              } else {
                console.log(`\nDatabase reset: \n${stdout}`);
                resolve(stdout);
              }
            });
          });
        },
      });
    },
    baseUrl: 'https://cofi-develop.circclo.com',
    experimentalStudio: true,
  },
  defaultCommandTimeout: 10000, // Increase the timeout to 10 seconds
});
