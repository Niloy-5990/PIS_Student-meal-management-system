

document.addEventListener('DOMContentLoaded', () => {
    const breakfastMenu = document.getElementById('breakfast-menu');
    const lunchMenu = document.getElementById('lunch-menu');
    const dinnerMenu = document.getElementById('dinner-menu');
    const newMealDropdown = document.getElementById('new-meal-dropdown');
    const additionalMealContainer = document.getElementById('additional-meal-dropdowns');
    const mainMealPriceEl = document.getElementById('main-meal-price');
    const additionalMealsPriceEl = document.getElementById('additional-meals-price');
    const totalPriceEl = document.getElementById('total-price');

    // Initialize menus to have blank first options
    [breakfastMenu, lunchMenu, dinnerMenu].forEach(menu => {
        const blankOption = document.createElement('option');
        blankOption.value = 0;
        blankOption.textContent = "Select a meal";
        menu.insertBefore(blankOption, menu.firstChild);
        menu.value = 0; // Set initial selection to blank
    });

    // Populate the additional meal dropdown with options
    const populateAdditionalMeals = () => {
        const allOptions = [
            ...breakfastMenu.options,
            ...lunchMenu.options,
            ...dinnerMenu.options
        ];
        newMealDropdown.innerHTML = ""; // Clear existing options
        allOptions.forEach(option => {
            if (option.value !== "0") {
                const newOption = document.createElement('option');
                newOption.value = option.value;
                newOption.textContent = option.textContent;
                newMealDropdown.appendChild(newOption);
            }
        });
    };

    populateAdditionalMeals();

    // Calculate and update prices
    const updatePrices = () => {
        // Calculate Main Meal Price
        const mainMealPrice = [
            parseFloat(breakfastMenu.value),
            parseFloat(lunchMenu.value),
            parseFloat(dinnerMenu.value)
        ].reduce((sum, price) => sum + price, 0);

        // Calculate Additional Meals Price
        const additionalMealPrices = Array.from(additionalMealContainer.querySelectorAll('select'))
            .map(select => parseFloat(select.value))
            .reduce((sum, price) => sum + price, 0);

        // Update Total Price
        const totalPrice = mainMealPrice + additionalMealPrices;

        // Update DOM elements
        mainMealPriceEl.textContent = `Main Meal Price: $${mainMealPrice.toFixed(2)}`;
        additionalMealsPriceEl.textContent = `Additional Meals Price: $${additionalMealPrices.toFixed(2)}`;
        totalPriceEl.textContent = `Total Price: $${totalPrice.toFixed(2)}`;
    };

    // Add event listeners to main menus
    [breakfastMenu, lunchMenu, dinnerMenu].forEach(menu => {
        menu.addEventListener('change', updatePrices);
    });

    // Add additional meal
    window.addMeal = () => {
        const selectedMeal = newMealDropdown.value;
        if (selectedMeal === "0") return; // Skip if blank

        const container = document.createElement('div');
        container.className = 'additional-meal-container';

        const mealSelect = document.createElement('select');
        mealSelect.innerHTML = newMealDropdown.innerHTML; // Copy options
        mealSelect.value = selectedMeal;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Remove';
        deleteButton.addEventListener('click', () => {
            container.remove();
            updatePrices();
        });

        container.appendChild(mealSelect);
        container.appendChild(deleteButton);
        additionalMealContainer.appendChild(container);

        // Reset dropdown and update prices
        newMealDropdown.value = 0;
        updatePrices();
    };

    // Delete a meal (for breakfast, lunch, or dinner)
    window.deleteMeal = (menuId) => {
        const menu = document.getElementById(menuId);
        menu.value = 0; // Reset to blank
        updatePrices();
    };

    // Initial price update
    updatePrices();
});

function generateReceipt() {
    // Get meal details
    const getMealDetails = (menuId) => {
        const menu = document.getElementById(menuId);
        return menu.options[menu.selectedIndex]?.textContent || "Not selected";
    };

    const breakfast = getMealDetails('breakfast-menu');
    const lunch = getMealDetails('lunch-menu');
    const dinner = getMealDetails('dinner-menu');

    // Get additional meals
    const additionalMeals = Array.from(document.querySelectorAll('#additional-meal-dropdowns select'))
        .map((select, index) => `Additional Meal ${index + 1}: ${select.options[select.selectedIndex]?.textContent || "Not selected"}`)
        .join('\n');

    // Get total price
    const totalPrice = document.getElementById('total-price').textContent;

    // Create unique receipt number and timestamp
    const receiptNumber = `R${Date.now()}`;
    const timestamp = new Date().toLocaleString();

    // Format the receipt
    const receiptContent = `
        ----- Receipt -----
        Receipt Number: ${receiptNumber}
        Timestamp: ${timestamp}

        Main Meals:
        - Breakfast: ${breakfast}
        - Lunch: ${lunch}
        - Dinner: ${dinner}

        Additional Meals:
        ${additionalMeals || "None"}

        ${totalPrice}
        -------------------
    `;

    // Display the receipt as a popup
    alert(receiptContent);
}



//CRUD Testing

function addMeal(mealList, newMeal) {
    return [...mealList, newMeal];
}

function deleteMeal(mealList, id) {
    return mealList.filter(meal => meal.id !== id);
}

function getMealDetails(mealList, id) {
    return mealList.find(meal => meal.id === id) || null;
}

