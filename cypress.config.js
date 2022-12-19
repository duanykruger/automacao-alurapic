const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'siipw2',
    e2e: {
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
        specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx,feature}",
        chromeWebSecurity: false,
        reporter: "mochawesome",
        reporterOptions: {
            reportDir: "cypress/report/mochawesome-report",
            overwrite: true,
            html: true,
            json: false,
            timestamp: "mmddyyyy_HHMMss",
        },
    },
});