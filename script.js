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

    // Display additional meals price
    document.getElementById('additional-meals-price').textContent = `Additional Meals Price: $${additionalMealsPrice}`;

    // Calculate and display total price
    let totalPrice = mainMealPrice + additionalMealsPrice;
    document.getElementById('total-price').textContent = `Total Price: $${totalPrice}`;
}

// Function to delete a selected meal
function deleteMeal(mealId) 
{
    // Reset the dropdown selection
    let mealSelect = document.getElementById(mealId);
    mealSelect.selectedIndex = -1;

    // Recalculate the total price
    calculateTotal();
}


// Function to add a new additional meal option
function addMeal() 
{
    let dropdown = document.getElementById('new-meal-dropdown');
    let selectedValue = dropdown.value;
    let selectedText = dropdown.options[dropdown.selectedIndex].text;

    // Create a new dropdown for the additional meal
    let dropdownContainer = document.getElementById('additional-meal-dropdowns');
    let newDropdown = document.createElement('div');
    newDropdown.className = 'additional-meal-container';

    newDropdown.innerHTML = 
    `
        <select class="additional-meal-dropdown">
            <option value="${selectedValue}">${selectedText}</option>
            <option value="0">None</option>
        </select>
        <button onclick="removeMeal(this)">Remove</button>
    `;

    // Append the new dropdown
    dropdownContainer.appendChild(newDropdown);

    // Recalculate the total price
    calculateTotal();
}

// Function to remove an additional meal dropdown
function removeMeal(button) {
    // Remove the dropdown container
    let container = button.parentElement;
    container.parentElement.removeChild(container);

    // Recalculate the total price
    calculateTotal();
}

// Populate dropdowns on page load
document.addEventListener('DOMContentLoaded', populateAdditionalMealDropdown);

