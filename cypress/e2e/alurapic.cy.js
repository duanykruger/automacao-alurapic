describe('Login e registro de usuarios alura pic', () => {

  beforeEach(() => {
    cy.visit('https://alura-fotos.herokuapp.com')
   })

  it('verifica mensagens de validacao', () => {
    cy.contains('a', 'Register now').click()
    cy.contains('button', 'Register').click()
    cy.contains('ap-vmessage', 'Email is required!').should('be.visible')
    cy.contains('button', 'Register').click()
    cy.contains('ap-vmessage', 'Full name is required!').should('be.visible')
    cy.contains('ap-vmessage', 'Full name is required!').should('be.visible')
    cy.contains('ap-vmessage', 'Password is required!').should('be.visible')
  })

  it('verifica mensagem de email invalido', () => {
    cy.contains('a', 'Register now').click()
    cy.contains('button', 'Register').click()
    cy.get('input[formcontrolname="email"]').type('Duany')
    cy.contains('ap-vmessage', 'Invalid e-mail').should('be.visible')
  })

  it('verifica mensagem de que o nome completo deve ter mais de 2 caracteres', () => {
    cy.contains('a', 'Register now').click()
    cy.contains('button', 'Register').click()
    cy.get('input[formcontrolname="fullName"]').type('H')
    cy.contains('button', 'Register').click()
    cy.contains('ap-vmessage', 'Mininum length is 2').should('be.visible')
  })

  it('verifica mensagem de que o usuário deve estar em minúsculo', () => {
    cy.contains('a', 'Register now').click()
    cy.contains('button', 'Register').click()
    cy.get('input[formcontrolname="userName"]').type('Duany')
    cy.contains('button', 'Register').click()
    cy.contains('ap-vmessage', 'Must be lower case').should('be.visible')
  })

  it('verifica mensagem de senha com menos de 8 caracteres', () => {
    cy.contains('a', 'Register now').click()
    cy.contains('button', 'Register').click()
    cy.get('input[formcontrolname="password"]').type('123')
    cy.contains('button', 'Register').click()
    cy.contains('ap-vmessage', 'Mininum length is 8').should('be.visible')
  })

  it('fazer login de usuário válido', () => {
    cy.login('flavio', '123')
    cy.contains('a', '(Logout)').should('be.visible')
  })

  it('fazer login de usuário inválido', () => {
    cy.login('duany', '12345')
    cy.on('windows:alert', (str) => {
        expect(str).to.equal('Invalid user name or password')  
    })
  })

  const usuarios = require('../fixtures/usuarios.json')
  usuarios.forEach(usuario => {
    it.only('cadastrar novo usuário ' + usuario.userName, () => {
      cy.contains('a', 'Register now').click()
      cy.contains('button', 'Register').click()
      cy.get('input[formcontrolname="email"]').type(usuario.email)
      cy.get('input[formcontrolname="fullName"]').type(usuario.fullName)
      cy.get('input[formcontrolname="userName"]').type(usuario.userName)
      cy.get('input[formcontrolname="password"]').type(usuario.password)
      cy.contains('button', 'Register').click()
    })
  })
})