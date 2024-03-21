# Portfolio

 ## Welcome
 This collection of tests is suite and marks my first journey into automating with Cypress.
 The approach I took with this assignment is straightforward. I stayed on the happy path of submitting a donation while exercising as many different commands as I could. The two tests in this suite cover submitting a donation and begins the complex journey into a field validation test. Overall, it was fun. 10/10 would do again!

 ## Challenges
 The learning curve for Cypress was fairly steep. I started from scratch and set up Node.js and Cypress on my machine. The biggest challenge was finding out how to interact with Stripe's iframe. I was able to narrow down the scope and identify the correct iframe using the `cypress-iframe` plugin and a multiple selector approach that works well with dynamic page elements. 

 ## Environment Setup
 Node and Cypress must be installed on your machine. 

 Chrome is the browser the test suite must be ran in. Web security is disabled in Chrome through the `cypress.config.js` file. 

 Install the cypress iframe plugin by running this line of code in terminal:
 `npm install cypress-iframe --save-dev` 



