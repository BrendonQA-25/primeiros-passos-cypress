import userData from "../fixtures/users/userData.json";

describe("Orange HRM Tests", () => {
  const selectorsList = {
    usernameField: "[name='username']",
    passwordField: "[name='password']",
    loginButton: "[type='submit']",
    sectionTitleTopbar: ".oxd-topbar-header-breadcrumb-module",
    dasboardGrid: ".orangehrm-dashboard-grid",
    wrongCredentialAlert: "[role='alert']",
    myInfoButton: "[href='/web/index.php/pim/viewMyDetails']",
    firstNameField: "[name='firstName']",
    midelleNameField: "[name='middleName']",
    lastNameField: "[name='lastName']",
    genericField: ".oxd-input--active",
    dateField: "[placeholder='yyyy-dd-mm']",
    dateCloseButton: ".--close",
    submiteButton: ".orangehrm-left-space"
  };

  it.only("User Info Update - Success", () => {
    cy.visit("/auth/login");
    cy.get(selectorsList.usernameField).type(userData.userSuccess.username);
    cy.get(selectorsList.passwordField).type(userData.userSuccess.password);
    cy.get(selectorsList.loginButton).click();
    cy.location("pathname").should("equal", "/web/index.php/dashboard/index");
    cy.get(selectorsList.dasboardGrid);
    cy.get(selectorsList.myInfoButton).click();
    cy.get(selectorsList.firstNameField).clear().type("FirstNameTest");
    cy.get(selectorsList.lastNameField).clear().type("LasNameTest");
    cy.get(selectorsList.genericField).eq(3).clear().type("NickNameTest");
    cy.get(selectorsList.genericField).eq(4).clear().type("Employee");
    cy.get(selectorsList.genericField).eq(5).clear().type("OtherIdTest");
    cy.get(selectorsList.genericField).eq(6).clear().type("DriversLicenseTest");
    cy.get(selectorsList.dateField).eq(0).clear().type("2025-12-23");
    cy.get(selectorsList.dateCloseButton).click();
    // cy.get(selectorsList.genericField).eq(8).clear().type("ssnNumberTest");
    // cy.get(selectorsList.genericField).eq(9).clear().type("sinNumberTest");
    cy.get(selectorsList.submiteButton).eq(0).click();
    cy.get('body').should('contain', 'Successfully Updated');
    cy.get('.oxd-toast-close')
  });

  it("Fail - Success", () => {
    cy.visit("/auth/login");
    cy.get(selectorsList.usernameField).type(userData.userFail.username);
    cy.get(selectorsList.passwordField).type(userData.userFail.password);
    cy.get(selectorsList.loginButton).click();
    cy.get(selectorsList.wrongCredentialAlert);
  });
});
