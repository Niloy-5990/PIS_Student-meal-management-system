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

