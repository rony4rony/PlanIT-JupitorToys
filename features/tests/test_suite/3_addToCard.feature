Feature: Jupiter Toys cart verification

Background: 
Given User navigates to the home page
@smokeTest
Scenario: User can add products to the cart and verify the price
   When User click on Start Shopping button
   When I add 2 Stuffed Frog to the cart
   When I add 5 Fluffy Bunny to the cart
   When I add 3 Valentine Bear to the cart
   Then I see total number of items in the cart is correct
   When I click on the cart link
   Then I see the Price for each product, Subtotal of each product and Total price are correct
   Then I see the Total is the sum of the subTotal
