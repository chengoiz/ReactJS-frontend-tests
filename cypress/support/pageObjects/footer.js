export class FooterPage {
    getLinkByAriaLabel(label) {
      return cy.get(`a[aria-label="${label}"]`);
    }

    getFooterSectionLink(text) {
      return cy.contains('footer a', text);
    }

    getLearnReactLink() {
      return this.getFooterSectionLink('Learn React');
    }

    getCommunityLink() {
      return this.getFooterSectionLink('Community');
    }

    getAPIReferenceLink() {
      return this.getFooterSectionLink('API Reference');
    }

    getMoreLink() {
      return this.getFooterSectionLink('More');
    }
}

export const footerPage = new FooterPage();