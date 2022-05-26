Feature: Jupiter Toys contact verification

Background:
   Given User navigates to the home page
@smokeTest
Scenario Outline: Contact page where user can verify their registration details
   When User click on Contact menu
   Then User will be redirected to the Contact screen
   When I click Submit button 
   Then I see error messages with the mandatory fields Forename, Email and Message
   When I enter the mandatory fields information "<Name>","<Email>", and "<Message>" for verification
   Then I will see the errors are gone
   Examples: 
      |Name|Email|Message|
      |John Matt_1|john.matt_1@gmail.com|Test Message_1|


