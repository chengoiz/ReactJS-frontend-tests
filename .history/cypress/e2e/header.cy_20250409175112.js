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
       cy.viewport(375, 667) // iPhone 6/7/8
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

        // Initial state should show the "Use Dark Mode" button and not "Use Light Mode"
        headerPage.getEnableDarkModeButton().should('be.visible')
        headerPage.getDisableDarkModeButton().should('not.be.visible')

        // Click to enable dark mode
        headerPage.getEnableDarkModeButton().click()

        // Now the "Use Light Mode" button should be visible instead
        headerPage.getDisableDarkModeButton().should('be.visible')
        headerPage.getEnableDarkModeButton().should('not.be.visible')

        // Toggle back to light mode
        headerPage.getDisableDarkModeButton().click()

        // Confirm it reverted
        headerPage.getEnableDarkModeButton().should('be.visible')
        headerPage.getDisableDarkModeButton().should('not.be.visible')
      })

      it('should toggle dark mode on and off accurately', () => {
        cy.viewport(1280, 800)
      
        // Initially, should be light mode (html does NOT have class 'dark')
        cy.get('html').should('not.have.class', 'dark')
        headerPage.getEnableDarkModeButton().should('be.visible')
        headerPage.getDisableDarkModeButton().should('not.be.visible')
      
        // Enable dark mode
        headerPage.getEnableDarkModeButton().click()
      
        // Assert dark mode is active (class 'dark' added to <html>)
        cy.get('html').should('have.class', 'dark')
        headerPage.getDisableDarkModeButton().should('be.visible')
        headerPage.getEnableDarkModeButton().should('not.be.visible')
      
        // Optionally check localStorage
        cy.window().then((win) => {
          expect(win.localStorage.getItem('theme')).to.eq('dark')
        })
      
        // Disable dark mode
        headerPage.getDisableDarkModeButton().click()
      
        // Assert it's back to light mode
        cy.get('html').should('not.have.class', 'dark')
        headerPage.getEnableDarkModeButton().should('be.visible')
        headerPage.getDisableDarkModeButton().should('not.be.visible')
      
        // Confirm localStorage updated
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
            cy.get('input[type="search"]').should('be.visible')
          })
        })
  
        context('Desktop view', () => {
          beforeEach(() => {
            cy.viewport(1280, 800)
            headerPage.getSearchBar().click()
          })
  
          it('displays the search input with correct placeholder', () => {
            cy.get('input[type="search"]')
              .should('be.visible')
              .should('have.attr', 'placeholder', 'Search docs')
          })
  
          it('performs a search and shows relevant results', () => {
            cy.get('input[type="search"]')
              .should('be.visible')
              .type('hired')
              .should('have.value', 'hired')
  
            cy.get('input[type="search"]').click()
  
            cy.get('.DocSearch-Hit-title')
              .should('exist')
              .then(($titles) => {
                const hasMatch = [...$titles].some((el) =>
                  el.textContent.toLowerCase().includes('hooks')
                )
                expect(hasMatch).to.be.true
              })
          })
  
          it('retains focus on search input after submission', () => {
            cy.get('input[type="search"]')
              .should('be.visible')
              .type('react{enter}')
              .should('have.focus')
          })
        })
      })
})
})