describe('Tickets', () => {
  beforeEach(() => cy.visit('https://ticket-box.s3.eu-central-1.amazonaws.com/index.html'))

  it('should fill all text fields', () => {
    cy.get('#first-name').type('FirstName')
    cy.get('#last-name').type('LastName')
    cy.get('#email').type('any_email@mail.com')
    cy.get('#requests').type('Special Requests Test')
    cy.get('#signature').type('Any Signature')
  });

  it('should select two tickets', () => {
    cy.get('#ticket-quantity').select('2')
  });

  it('should select VIP option on radio button', () => {
    cy.get('#vip').check()
  });

  it('should select friends and social media options on checkbox and then uncheck friends', () => {
    cy.get('#friend').check()
    cy.get('#social-media').check()
    cy.get('#friend').uncheck()
  });

  it('should have "ticketbox" headers heading', () => {
    cy.get('header > h1').should('contain', 'TICKETBOX')
  });

  it('should alert users on invalid email', () => {
    cy.get('#email').as('email').type('invalid_email')
    cy.get('#email.invalid').should('exist')
    cy.get('@email').clear().type('valid_email@mail.com')
    cy.get('#email.invalid').should('not.exist')
  });
  
  it('should fill all fields and reset the form', () => {
    const firstName = 'FirstName'
    const lastName = 'LastName'

    cy.get('#first-name').type(firstName)
    cy.get('#last-name').type(lastName)
    cy.get('#email').type('any_email@mail.com')
    cy.get('#requests').type('Special Requests Test')
    cy.get('#signature').type('Any Signature')
    cy.get('#ticket-quantity').select('2')
    cy.get('#friend').check()
    cy.get('#social-media').check()
    cy.get('#agree').check()

    cy.get('.agreement p').should('contain', `I, ${firstName} ${lastName}, wish to buy 2 General Admission tickets.`)

    cy.get('button[type="submit"]').as("submit").should('not.be.disabled')
    
    cy.get('button[type="reset"]').as("reset").click()
    
    cy.get('@submit').should('be.disabled')
  });

  it('fills required fields and check for submit button', () => {
    const customer = {
      firstName: "FirstName",
      lastName: "LastName",
      email: "any_email@mail.com"
    }

    cy.fillRequiredFields(customer)
    
    cy.get('button[type="submit"]').as("submit").should('not.be.disabled')
    
    cy.get('button[type="reset"]').as("reset").click()
    
    cy.get('@submit').should('be.disabled')
  });
})
