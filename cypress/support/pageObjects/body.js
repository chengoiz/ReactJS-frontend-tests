export class BodyPage {
  getCodeLineByText(text) {
    return cy.contains('.cm-line', text);
  }

  getSearchInputLine() {
    return cy.contains('.cm-line', 'SearchInput');
  }

  highlightCodeLineByText(text) {
    return this.getCodeLineByText(text).trigger('mouseover');
  }

  assertCodeLineHighlighted(text) {
    this.getCodeLineByText(text)
      .trigger('mouseover')
      .should('have.class', 'bg-github-highlight');
  }

  getHighlightOverlayBox() {
    return cy.get('div.pointer-events-none > div.rounded-lg');
  }

  assertHighlightBoxExistsWithHeight() {
    this.getHighlightOverlayBox()
      .should('exist')
      .and('have.attr', 'style')
      .and('match', /height:\s*\d+px/);
  }
}

export const bodyPage = new BodyPage();