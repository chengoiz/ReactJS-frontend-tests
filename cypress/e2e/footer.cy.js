import { footerPage } from '../support/pageObjects/footer.js'

describe('Footer Component Tests', () => {
  describe('Footer Link Visibility', () => {
    beforeEach(() => {
      cy.visit('/')
    });

    it('Meta Open Source link should be visible', () => {
      footerPage.getLinkByAriaLabel("Meta Open Source")
        .should('be.visible');
    });

    it('Learn React link should be visible', () => {
      footerPage.getFooterSectionLink("Learn React")
        .should('be.visible');
    });

    it('Community link should be visible', () => {
      footerPage.getFooterSectionLink("Community")
        .should('be.visible');
    });

    it('API Reference link should be visible', () => {
      footerPage.getFooterSectionLink("API Reference")
        .should('be.visible');
    });
  });

  describe('Footer Social Links Visibility', () => {
    beforeEach(() => {
      cy.visit('/')
    });

    it('Facebook icon link should be visible', () => {
      footerPage.getLinkByAriaLabel("React on Facebook")
        .should('be.visible');
    });

    it('Twitter icon link should be visible', () => {
      footerPage.getLinkByAriaLabel("React on Twitter")
        .should('be.visible');
    });

    it('Bluesky icon link should be visible', () => {
      footerPage.getLinkByAriaLabel("React on Bluesky")
        .should('be.visible');
    });

    it('Github icon link should be visible', () => {
      footerPage.getLinkByAriaLabel("React on Github")
        .should('be.visible');
    });
  });

  describe('Footer Link URLs', () => {
    beforeEach(() => {
      cy.visit('/')
    });

    it('Meta Open Source link should point to the correct URL', () => {
      footerPage.getLinkByAriaLabel("Meta Open Source")
        .should('have.attr', 'href', 'https://opensource.fb.com/');
    });

    it('Learn React link should point to /learn', () => {
      footerPage.getFooterSectionLink("Learn React")
        .should('have.attr', 'href', '/learn');
    });

    it('Community link should point to /community', () => {
      footerPage.getFooterSectionLink("Community")
        .should('have.attr', 'href', '/community');
    });

    it('API Reference link should point to /reference/react', () => {
      footerPage.getFooterSectionLink("API Reference")
        .should('have.attr', 'href', '/reference/react');
    });
  });

  describe('Footer Social Links URLs', () => {
    beforeEach(() => {
      cy.visit('/')
    });

    it('Facebook icon link should point to Facebook React page', () => {
      footerPage.getLinkByAriaLabel("React on Facebook")
        .should('have.attr', 'href', 'https://www.facebook.com/react');
    });

    it('Twitter icon link should point to Twitter React page', () => {
      footerPage.getLinkByAriaLabel("React on Twitter")
        .should('have.attr', 'href', 'https://twitter.com/reactjs');
    });

    it('Bluesky icon link should point to Bluesky React page', () => {
      footerPage.getLinkByAriaLabel("React on Bluesky")
        .should('have.attr', 'href', 'https://bsky.app/profile/react.dev');
    });

    it('Github icon link should point to GitHub React repo', () => {
      footerPage.getLinkByAriaLabel("React on Github")
        .should('have.attr', 'href', 'https://github.com/facebook/react');
    });
  });
});