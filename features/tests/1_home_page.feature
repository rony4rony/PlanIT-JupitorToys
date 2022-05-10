Feature: Jupiter Toys Home page

Background:
   Given User navigates to the home page

Scenario: Landing page of the Jupitor Toys where user can redirects to other pages
   When User click on Contact menu
   Then User will be redirected to the Contact screen
   When I click Submit button 
   Then I see error messages with the mandatory fields Forename, Email and Message
   When I enter the mandatory fields information 
   Then I will see the errors are gone

# Test Case 2
#Given User navigates to the home page
#   When User click on Contact menu
#   Then User will be redirected to the Contact screen
#    When I enter the mandatory fields information 5 times
#    When I click Submit button
#    Then I see the Thanks message

