
Feature: Jupiter Toys contact submit

Background: 
   Given User navigates to the home page
@smokeTest
Scenario Outline: Contact page where user can submit their registration details
   When User click on Contact menu
   Then User will be redirected to the Contact screen
   When I enter the mandatory fields information "<Name>","<Email>", and "<Message>" for submission
   When I click Submit button
   Then I see the Thanks message
   Examples: 
      |Name|Email|Message|
      |John Matt_1|john.matt_1@gmail.com|Test Message_1|
      |John Matt_2|john.matt_2@gmail.com|Test Message_2|
      |John Matt_3|john.matt_3@gmail.com|Test Message_3|
      |John Matt_4|john.matt_4@gmail.com|Test Message_4|
      |John Matt_5|john.matt_5@gmail.com|Test Message_5|
