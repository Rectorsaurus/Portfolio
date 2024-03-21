//Set test variables:
const donationAmount = 250;
const orgSubdomain = 'qa-interview-test-org-467719';
const emailAddress = 'clay@planningcenter.com';
const firstName = 'Hugh';
const lastName = 'Gwallet';

//Set card payment information variables. 
//This test data comes from Stripe: https://docs.stripe.com/testing
const cardNumber = '4242 4242 4242 4242';
const expirationDate = '12/34';
const cvcNumber = 747;
const zipCode = 95280


describe('Donation Form Tests', () => {
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
    //Type Card Number into Card number field.
    //cy.get('[id="Field-numberInput"]')
      //.type(`${cardNumber}`)
      //.should('have.value', `${cardNumber}`);

cy.get('iframe[allow="payment *; publickey-credentials-get *"][role="presentation"]')
  .then(($iframe) => {
    // Assuming we've successfully targeted the correct iframe
    const doc = $iframe.contents();
    cy.wrap(doc.find('body'))
      .find('[id="Field-numberInput"]', { timeout: 10000 })
      .should('exist')
      .then(($input) => {
        cy.wrap($input).type(cardNumber);
      });
  });
    
    
      
    //Type Expiration date into the Expiration field.
    cy.get('[id="Field-expiryInput"')
      .type(`${expirationDate}`)
      .should('have.value', `${expirationDate}`)
    //Type CVC into the CVC field.
    cy.get('[id="Field-cvcInput"]')
      .type(`${cvcNumber}`)
      .should('have.value', `${cvcNumber}`);
    //Select Country in the Country field.
    //cy.get('[')
    //Type ZIP code into the ZIP field.
    //Select the 'Give' button.
    cy.pause();
  });
});