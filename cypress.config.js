const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Adding custom browser launch arguments
      on('before:browser:launch', (browser = {}, launchOptions) => {
        if (browser.family === 'chromium' && browser.name !== 'electron') {
          // Flags to disable web security in Chrome
          launchOptions.args.push('--disable-web-security');
          launchOptions.args.push('--disable-features=IsolateOrigins,site-per-process');
      
          return launchOptions;
        }
      });
    },
  },
});

