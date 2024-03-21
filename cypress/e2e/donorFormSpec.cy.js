//Set test variables:
const donationAmount = 250;
const orgSubdomain = 'qa-interview-test-org-467719';
const emailAddress = 'clay@planningcenter.com';
const firstName = 'Hugh';
const lastName = 'Gwallet';

//Set card payment information variables. 
//This test data comes from Stripe: https://docs.stripe.com/testing
const cardNumber = '4242 4242 4242 4242';
const expirationDate = '12 / 34';
const cvcNumber = 747;
const zipCode = 95280;

//Begin Donation Form Test Suite
describe('Donation Form Tests', () => {
  
  //Begin Donation Form Submission Test Case
  it('Submits a donation', () => {

    //Navigate to the donation form.
    cy.visit(`https://${orgSubdomain}.churchcenter.com/giving`);
    
    //Type donation amount into field.
    cy.get('[data-cy="designations_input_amount"]')
      .type(`${donationAmount}`)
    
    //Verify the field holds the correct donation amount.
      .should('have.value', `${donationAmount}`);
    
    //Verify default frequency of 'One time'.
    cy.get('[data-cy="is_recurring_select"]')
      .should('have.value', 'false');
    
    //Type email into email field and verify the email address is shown.
    cy.get('[data-cy="new_person_form_email"]')
      .type(`${emailAddress}`)
      .should('have.value', `${emailAddress}`);
    
    //Type first name into the first name field and verify the first name is displayed.
    cy.get('[data-cy="new_person_form_first_name"]')
      .type(`${firstName}`)
      .should('have.value', `${firstName}`);

    //Type last name into the last name field and verify the last name is displyed.
    cy.get('[data-cy="new_person_form_last_name"]')
      .type(`${lastName}`)
      .should('have.value', `${lastName}`);

    //Select the 'Continue' button to submit the form.
    cy.get('[data-cy="new_person_form_submit"]')
      .click();

    //iframe work starts here.

    //define function to correctly identify iframe.
    function getStripeIframe() {
      return cy
        .frameLoaded('iframe[name^="__privateStripeFrame"][src*="https://js.stripe.com/v3/elements-inner-payment"]')
        .iframe('iframe[name^="__privateStripeFrame"][src*="https://js.stripe.com/v3/elements-inner-payment"]');
      }

    //Type Card Number into Card number field.
    getStripeIframe()
      .find('[id="Field-numberInput"]')
      .type(`${cardNumber}`)
      .should('have.value', `${cardNumber}`);

    //Type Expiration date into the Expiration field.
    getStripeIframe()
      .find('[name="expiry"]')
      .type(`${expirationDate}`)
      .should('have.value', `${expirationDate}`);

    //Type CVC into the CVC field.
    getStripeIframe()
      .find('[id="Field-cvcInput"]')
      .type(`${cvcNumber}`)
      .should('have.value', `${cvcNumber}`);

    //Verify Country is "United States" in the Country field.
    getStripeIframe()
      .find('[id="Field-countryInput"]')
      .should('have.value', "US");

    //Type ZIP code into the ZIP field.
    getStripeIframe()
      .find('[id="Field-postalCodeInput"]')
      .type(`${zipCode}`)
      .should('have.value', `${zipCode}`);

    //End iframe work.

    //Verify donation value is displayed correctly on Give button.
    cy.get('.ladda-label')
      .should('have.text', `Give $${donationAmount} now`);

    //Select Give button.
    cy.get('[data-cy="submit_donation_form_button"]')
      .click();

    //Verify donation submission.
    cy.get('[data-cy="background_donation_status_description"]', { timeout: 10000 })
      .should('contain', 'We’re processing your donation and will email a receipt for your records.');

//End of test
    })

// Begin field verification test case.
  it('Fields validate on the donation form', () => {

    //Navigate to the donation form.
    cy.visit(`https://${orgSubdomain}.churchcenter.com/giving`);

    // Verify the donation frequency field loads with 'One time' selected.
    cy.get('[data-cy="is_recurring_select"]')
      .should('have.value', 'false');

    // Verify the recurring field options do not display with 'One time' selected.
    cy.get('[data-cy="frequency_select"]')
      .should('not.exist');

    // Verify the recurring day field options do not display with 'One time' selected.
    cy.get('[aria-label="weekday for donation"]')
      .should('not.exist');

    // Verify the 'My first donation...' field options do not display with 'One time' selected.
    cy.get('[id="next_donation"]')
      .should('not.exist');

    // Select the 'Regularly' donation frequency option.
    cy.get('[data-cy="is_recurring_select"]')
      .select('true');

    // Verify the recurring field options display with 'Regularly' selected.
    cy.get('[data-cy="frequency_select"]')
      .should('exist');

    // Verify the recurring field options display with 'Regularly' selected.
    cy.get('[aria-label="weekday for donation"]')
      .should('exist');

    // Verify the 'My first donation...' field options display with 'Regularly' selected.
    cy.get('[id="next_donation"]')
      .should('exist');

    // Verify a properly formatted email address must be entered to continue.
    cy.get('[data-cy="new_person_form_email"]')
      .type(`asdf@.com`);

    //Enter firstName into field.
    cy.get('[data-cy="new_person_form_first_name"]')
      .type(`${firstName}`);

    //Enter lastName into field.
    cy.get('[data-cy="new_person_form_last_name"]')
      .type(`${lastName}`);

    //Select the 'Continue' button to submit the form.
    cy.get('[data-cy="new_person_form_submit"]')
      .click();

    //Verify element on payment page does not load.
    cy.get('[href="//stripe.com/"]')
      .should('not.exist');

    //Reload page.
    cy.visit(`https://${orgSubdomain}.churchcenter.com/giving`);

    //Verify alphanumeric text cannot be entered into the donation field.
    cy.get('[data-cy="designations_input_amount"]')
      .type(`boris`)
      .should('have.value', '');

//End of test.

    });


 });

    