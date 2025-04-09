class HeaderPage {
    getNavLink(label) {
      return cy.contains('a', label)
    }
  
    getDarkModeToggle() {
      return cy.get('button[aria-label*="Mode"]')
    }
    getEnableDarkModeButton() {
      return cy.get('button[aria-label="Use Dark Mode"]')
    }
    
    getDisableDarkModeButton() {
      return cy.get('button[aria-label="Use Light Mode"]')
    }
  
    getGitHubLink() {
      return cy.get('a[aria-label="Open on GitHub"]')
    }
    
    getTranslationsButton() {
      return cy.get('a[aria-label="Translations"]')
    }
    
    getReactLogo() {
      return cy.get('a[href="/"] svg[viewBox="-10.5 -9.45 21 18.9"]')
    }
    
    getVersionButton() {
      return cy.get('a[href="/versions"]')
    }
  
    getMenuButton() {
      return cy.get('button[aria-label="Menu"]')
    }
    getSearchBar() {
      return cy.get('button').contains('Search')
    }
    
    getSearchButton() {
      return cy.get('button[aria-label="Search"]');
    }
  
    getMobileSearchButton() {
      return cy.get('button[aria-label="Search"].md\\:hidden')
    }
  
    getHeader() {
      return cy.get('header')
    }
    getSearchResultsContainer() {
      return cy.get('.DocSearch-Dropdown');
    }
    getSearchInput() {
      return cy.get('input[type="search"]');
    }

    getSearchResultTitles() {
      return cy.get('.DocSearch-Hit-title');
    }

    typeInSearchInput(text) {
      return this.getSearchInput().should('be.visible').type(text);
    }

    assertSearchHasResultsContaining(term) {
      this.getSearchResultTitles()
        .should('exist')
        .then(($titles) => {
          const hasMatch = [...$titles].some((el) =>
            el.textContent.toLowerCase().includes(term.toLowerCase())
          );
          expect(hasMatch).to.be.true;
        });
    }
}
  
export const headerPage = new HeaderPage()