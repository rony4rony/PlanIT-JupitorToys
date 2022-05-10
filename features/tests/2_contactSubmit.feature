Feature: Jupiter Toys contact submit

Background: 
Given User navigates to the home page

Scenario: Contact Page Jupitor Toys where user can submit contact details
   When User click on Contact menu
   Then User will be redirected to the Contact screen
   When I enter the mandatory fields information 
   When I click Submit button
   Then I see the Thanks message

