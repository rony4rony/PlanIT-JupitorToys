
const addToCart = require('../pages/addToCart_pageObjects.js');
const contactVerification = require('../pages/contactVerification_pageObjects.js');
const {Given, When, Then} = require('cucumber');
const { Selector } = require('testcafe');

let letTotalItem_StuffedFrog, letTotalItem_FluffyBunny, letTotalItem_ValentineBear
let letStuffedFrog_UnitPrice, letFluffyBunny_UnitPrice, letValentineBear_UnitPrice
let letStuffedFrog_subTotalCalculatedPrice, letFluffyBunny_subTotalCalculatedPrice, letValentineBear_subTotalCalculatedPrice
let letStuffedFrog_CartSubTotal, letValentineBear_CartSubTotal, letFluffyBunny_CartSubTotal

When('User click on Start Shopping button', async function () {
    await testController.click(addToCart.elements.btnStartShopping());
});

When('I add {int} Stuffed Frog to the cart', async function (clickCount_StuffedFrog) {
    letTotalItem_StuffedFrog = clickCount_StuffedFrog;
    for (i = 0; i < letTotalItem_StuffedFrog; i++) 
    {       
        await testController.click(addToCart.elements.itemStuffedFrog());
    }
    letStuffedFrog_UnitPrice = await addToCart.elements.itemStuffedFrogPrice().innerText;
    letStuffedFrog_UnitPrice = letStuffedFrog_UnitPrice.substring(1,letStuffedFrog_UnitPrice.length)
    //console.log ('letStuffedFrog_UnitPrice=' + letStuffedFrog_UnitPrice)
    //console.log ('letStuffedFrog_subTotalCalculatedPrice=' + (letStuffedFrog_UnitPrice * letTotalItem_StuffedFrog))
    letStuffedFrog_subTotalCalculatedPrice = letStuffedFrog_UnitPrice * letTotalItem_StuffedFrog
});

When('I add {int} Fluffy Bunny to the cart', async function (clickCount_FluffyBunny) {
    letTotalItem_FluffyBunny = clickCount_FluffyBunny;
    for (i = 0; i < letTotalItem_FluffyBunny; i++) 
    {       
        await testController.click(addToCart.elements.itemFluffyBunny());
    }
    letFluffyBunny_UnitPrice = await (await addToCart.elements.itemFluffyBunnyPrice().innerText)
    letFluffyBunny_UnitPrice = letFluffyBunny_UnitPrice.substring(1,letFluffyBunny_UnitPrice.length)
    //console.log ('letFluffyBunny_UnitPrice=' + letFluffyBunny_UnitPrice)
    //console.log ('letFluffyBunny_subTotalCalculatedPrice=' + (letFluffyBunny_UnitPrice * letTotalItem_FluffyBunny))
    letFluffyBunny_subTotalCalculatedPrice = letFluffyBunny_UnitPrice * letTotalItem_FluffyBunny
});

When('I add {int} Valentine Bear to the cart', async function (clickCount_ValentineBear) {
    letTotalItem_ValentineBear = clickCount_ValentineBear
    for (i = 0; i < letTotalItem_ValentineBear; i++) 
    {       
        await testController.click(addToCart.elements.itemValentineBear());
    }
    letValentineBear_UnitPrice = await addToCart.elements.itemValentineBearPrice().innerText;
    letValentineBear_UnitPrice = letValentineBear_UnitPrice.substring(1,letValentineBear_UnitPrice.length)
    //console.log ('letValentineBear_UnitPrice=' + letValentineBear_UnitPrice)
    //console.log ('letValentineBear_subTotalCalculatedPrice=' + (letValentineBear_UnitPrice * letTotalItem_ValentineBear))
    letValentineBear_subTotalCalculatedPrice = letValentineBear_UnitPrice * letTotalItem_ValentineBear
});

Then('I see total number of items in the cart is correct', async function () {
    let letCalculatedTotalItemsCart = letTotalItem_StuffedFrog + letTotalItem_FluffyBunny + letTotalItem_ValentineBear
    let letActualTotalItemsCart = await addToCart.elements.linkCart().innerText
    //console.log ('varTotalItemsCart=' + letCalculatedTotalItemsCart)
    //console.log ('CartInnerText=' + await addToCart.elements.linkCart().innerText)
    await testController.expect(Number(letActualTotalItemsCart)).eql(letCalculatedTotalItemsCart);
});

When('I click on the cart link', async function () {
    await testController.click(addToCart.elements.linkCart());
});

Then('I see the Price for each product, Subtotal of each product and Total price are correct', async function () {
    for (i = 1; i < 4; i++) 
    {         
        if (i == 1) //Stuffed Frog
        {
            let letStuffedFrog_CartUnitPrice = await addToCart.elements.tableCart(i,2).innerText;
            letStuffedFrog_CartUnitPrice = letStuffedFrog_CartUnitPrice.substring(1,letStuffedFrog_CartUnitPrice.length)

            letStuffedFrog_CartSubTotal = await addToCart.elements.tableCart(i,4).innerText;
            letStuffedFrog_CartSubTotal = letStuffedFrog_CartSubTotal.substring(1,letStuffedFrog_CartSubTotal.length)

            //console.log ('letStuffedFrog_CartUnitPrice=' + letStuffedFrog_CartUnitPrice)
            //console.log ('letStuffedFrog_CartSubTotal=' + letStuffedFrog_CartSubTotal)
            
            await testController.expect(Number(letStuffedFrog_UnitPrice)).eql(Number(letStuffedFrog_CartUnitPrice))
            await testController.expect(Number(letStuffedFrog_subTotalCalculatedPrice)).eql(Number(letStuffedFrog_CartSubTotal))
        }
        else if(i == 2) //Fluffy Bunny
        {
            let letFluffyBunny_CartUnitPrice = await addToCart.elements.tableCart(i,2).innerText;
            letFluffyBunny_CartUnitPrice = letFluffyBunny_CartUnitPrice.substring(1,letFluffyBunny_CartUnitPrice.length)

            letFluffyBunny_CartSubTotal = await addToCart.elements.tableCart(i,4).innerText;
            letFluffyBunny_CartSubTotal = letFluffyBunny_CartSubTotal.substring(1,letFluffyBunny_CartSubTotal.length)

            //console.log ('letFluffyBunny_CartUnitPrice=' + letFluffyBunny_CartUnitPrice)
            //console.log ('letFluffyBunny_CartSubTotal=' + letFluffyBunny_CartSubTotal)
            
            await testController.expect(Number(letFluffyBunny_UnitPrice)).eql(Number(letFluffyBunny_CartUnitPrice))
            await testController.expect(Number(letFluffyBunny_subTotalCalculatedPrice)).eql(Number(letFluffyBunny_CartSubTotal))
        }
        else if(i == 3) //Valentine Bear
        {
            let letValentineBear_CartUnitPrice = await addToCart.elements.tableCart(i,2).innerText;
            letValentineBear_CartUnitPrice = letValentineBear_CartUnitPrice.substring(1,letValentineBear_CartUnitPrice.length)

            letValentineBear_CartSubTotal = await addToCart.elements.tableCart(i,4).innerText;
            letValentineBear_CartSubTotal = letValentineBear_CartSubTotal.substring(1,letValentineBear_CartSubTotal.length)

            //console.log ('letValentineBear_CartUnitPrice=' + letValentineBear_CartUnitPrice)
            //console.log ('letValentineBear_CartSubTotal=' + letValentineBear_CartSubTotal)

            await testController.expect(Number(letValentineBear_UnitPrice)).eql(Number(letValentineBear_CartUnitPrice))
            await testController.expect(Number(letValentineBear_subTotalCalculatedPrice)).eql(Number(letValentineBear_CartSubTotal))
        }
    }    
});

When('I see the Total is the sum of the subTotal', async function () {
    let letCalculatedTotal = Number(letStuffedFrog_CartSubTotal) + 
        Number(letFluffyBunny_CartSubTotal) + Number(letValentineBear_CartSubTotal)
    let letTotal = await addToCart.elements.lblTotalPrice().innerText;
    letTotal = letTotal.substring(letTotal.indexOf(' '), letTotal.length)

    await testController.expect(Number(letCalculatedTotal)).eql(Number(letTotal));
});
