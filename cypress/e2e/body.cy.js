import { bodyPage } from '../support/pageObjects/body.js'

describe('Code line hover effect', () => {
    it('should highlight the code line on hover', () => {
        cy.visit('/');
        bodyPage.assertCodeLineHighlighted('SearchInput');
    });

    it('should display the highlight box after hovering a code line', () => {
      cy.visit('/');
      bodyPage.highlightCodeLineByText('SearchInput');
      bodyPage.assertHighlightBoxExistsWithHeight();
    });
});