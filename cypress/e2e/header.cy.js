import { headerPage } from '../support/pageObjects/header.js'

describe('Header Component Tests', () => {
    
    describe('Layout and Visibility', () => {
     beforeEach(() => {
       cy.visit('/')
     })
     it('should display all navigation links on large screen exsept menu', () => {
       cy.viewport(1280, 800) // Large screen
       headerPage.getNavLink('Learn').should('be.visible')
       headerPage.getNavLink('Reference').should('be.visible')
       headerPage.getNavLink('Community').should('be.visible')
       headerPage.getNavLink('Blog').should('be.visible')
       headerPage.getDarkModeToggle().should('be.visible')
       headerPage.getSearchBar().should('be.visible')
       headerPage.getTranslationsButton().should('be.visible').should('have.attr', 'href').and('include', '/community/translations')
       headerPage.getMenuButton().should('not.be.visible')  
       headerPage.getGitHubLink().should('be.visible').should('have.attr', 'href').and('include', 'github.com')
       headerPage.getReactLogo().should('be.visible').parent().should('have.attr', 'href', '/')
       headerPage.getVersionButton().should('be.visible').should('have.attr', 'href').and('include', '/versions')  
     })
     it('should display some navigation links on medium screen', () => {
       cy.viewport(1000, 800) // Medium screen
       headerPage.getNavLink('Learn').should('not.be.visible')
       headerPage.getNavLink('Reference').should('not.be.visible')
       headerPage.getNavLink('Community').should('not.be.visible')
       headerPage.getNavLink('Blog').should('not.be.visible')
       headerPage.getDarkModeToggle().should('be.visible')
       headerPage.getGitHubLink().should('be.visible').should('have.attr', 'href')
       headerPage.getReactLogo().should('be.visible').parent().should('have.attr', 'href', '/')
       headerPage.getVersionButton().should('be.visible').should('have.attr', 'href').and('include', '/versions')  
       headerPage.getSearchBar().should('be.visible')
       headerPage.getTranslationsButton().should('be.visible').should('have.attr', 'href').and('include', '/community/translations')
       headerPage.getMenuButton().should('be.visible')  
     })
     it('should display appropriate elements on small screen', () => {
       cy.viewport(375, 667) // small screen
       headerPage.getNavLink('Learn').should('not.be.visible')
       headerPage.getNavLink('Reference').should('not.be.visible')
       headerPage.getNavLink('Community').should('not.be.visible')
       headerPage.getNavLink('Blog').should('not.be.visible')
       headerPage.getDarkModeToggle().should('be.visible')
       headerPage.getGitHubLink().should('be.visible').should('have.attr', 'href')
       headerPage.getReactLogo().should('be.visible')
       headerPage.getVersionButton().should('be.visible')
       headerPage.getSearchBar().should('not.be.visible')
       headerPage.getMobileSearchButton().should('be.visible')
       headerPage.getTranslationsButton().should('be.visible').should('have.attr', 'href').and('include', '/community/translations')
       headerPage.getMenuButton().should('be.visible')
     })
   })

   describe('Functionality', () => {
    
    describe('Dark theme', () => {
    beforeEach(() => {
        cy.visit('/')
      })
      
      it('should change dark mode icon on click', () => {
        cy.viewport(1280, 800)

        headerPage.getEnableDarkModeButton().should('be.visible')
        headerPage.getDisableDarkModeButton().should('not.be.visible')

        headerPage.getEnableDarkModeButton().click()

        headerPage.getDisableDarkModeButton().should('be.visible')
        headerPage.getEnableDarkModeButton().should('not.be.visible')

        headerPage.getDisableDarkModeButton().click()

        headerPage.getEnableDarkModeButton().should('be.visible')
        headerPage.getDisableDarkModeButton().should('not.be.visible')
      })

      it('should toggle dark mode on and off accurately', () => {
        cy.viewport(1280, 800)
      
        cy.get('html').should('not.have.class', 'dark')
        headerPage.getEnableDarkModeButton().should('be.visible')
        headerPage.getDisableDarkModeButton().should('not.be.visible')

        headerPage.getEnableDarkModeButton().click()
      
        cy.get('html').should('have.class', 'dark')
        headerPage.getDisableDarkModeButton().should('be.visible')
        headerPage.getEnableDarkModeButton().should('not.be.visible')
      
        cy.window().then((win) => {
          expect(win.localStorage.getItem('theme')).to.eq('dark')
        })
      
        headerPage.getDisableDarkModeButton().click()
      
        cy.get('html').should('not.have.class', 'dark')
        headerPage.getEnableDarkModeButton().should('be.visible')
        headerPage.getDisableDarkModeButton().should('not.be.visible')
      
        cy.window().then((win) => {
          expect(win.localStorage.getItem('theme')).to.eq('light')
        })
      })
    })

    describe('Search Functionality', () => {
        beforeEach(() => {
          cy.visit('/')
        })
  
        context('Mobile view', () => {
          beforeEach(() => {
            cy.viewport(375, 667)
          })
  
          it('opens the search input when clicking the search icon', () => {
            headerPage.getSearchButton().click()
            headerPage.getSearchInput().should('be.visible')
          })
        })
  
        context('Desktop view', () => {
          beforeEach(() => {
            cy.viewport(1280, 800)
            headerPage.getSearchBar().click()
          })
  
          it('displays the search input with correct placeholder', () => {
            headerPage.getSearchInput()
              .should('be.visible')
              .should('have.attr', 'placeholder', 'Search docs')
          })
  
          it('performs a search and shows relevant results', () => {
            headerPage.typeInSearchInput('hooks')
  
            headerPage.assertSearchHasResultsContaining('hooks')
          })

          it('performs a search and shows no results after clearing', () => {
            headerPage.typeInSearchInput('{enter}')
            headerPage.getSearchInput().click()
  
            cy.get('.DocSearch-Hit-title')
              .should('not.exist')
          })
        })
      })
})
})