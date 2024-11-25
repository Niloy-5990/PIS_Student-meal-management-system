// Populate additional meals dropdown with items from the main menus
function populateAdditionalMealDropdown() 
{
    let dropdown = document.getElementById('new-meal-dropdown');

    // Get options from all menus
    let allOptions = [...document.querySelectorAll('#breakfast-menu option, #lunch-menu option, #dinner-menu option')];
    allOptions.forEach(option => {
        let newOption = document.createElement('option');
        newOption.value = option.value;
        newOption.text = option.text;
        dropdown.appendChild(newOption);
    });
}
// Function to calculate the total price of meals
function calculateTotal() 
{
    // Calculate predefined meal prices
    let breakfastPrice = parseFloat(document.getElementById('breakfast-menu').value) || 0;
    let lunchPrice = parseFloat(document.getElementById('lunch-menu').value) || 0;
    let dinnerPrice = parseFloat(document.getElementById('dinner-menu').value) || 0;
    let mainMealPrice = breakfastPrice + lunchPrice + dinnerPrice;

    // Display main meal price
    document.getElementById('main-meal-price').textContent = `Main Meal Price: $${mainMealPrice}`;

    // Calculate additional meal prices
    let additionalMealDropdowns = document.querySelectorAll('.additional-meal-dropdown');
    let additionalMealsPrice = 0;
    additionalMealDropdowns.forEach(dropdown => {
        additionalMealsPrice += parseFloat(dropdown.value) || 0;
    });
