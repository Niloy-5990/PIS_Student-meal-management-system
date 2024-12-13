// Mock data for testing
let mockAdditionalMeals;

QUnit.module("CRUD Functions", {
    beforeEach: function () {
        // Reset mock data before each test
        mockAdditionalMeals = [
            { id: 1, name: "Pancakes", price: 5 },
            { id: 2, name: "Omelette", price: 6 }
        ];
    }
});

QUnit.test("Add a new meal to the list", function (assert) {
    const newMeal = { id: 3, name: "Toast & Jam", price: 4 };
    const updatedMeals = addMeal(mockAdditionalMeals, newMeal);
    assert.equal(updatedMeals.length, 3, "Meal count should be 3");
    assert.deepEqual(updatedMeals[2], newMeal, "New meal should match added meal");
});

QUnit.test("Delete a meal by ID", function (assert) {
    const updatedMeals = deleteMeal(mockAdditionalMeals, 1);
    assert.equal(updatedMeals.length, 1, "Meal count should be 1 after deletion");
    assert.strictEqual(updatedMeals.find(meal => meal.id === 1), undefined, "Deleted meal should not exist");
});

QUnit.test("Get meal details by ID", function (assert) {
    const meal = getMealDetails(mockAdditionalMeals, 2);
    assert.deepEqual(meal, { id: 2, name: "Omelette", price: 6 }, "Retrieved meal should match expected meal");
});

QUnit.test("Handle deleting a non-existent meal", function (assert) {
    const updatedMeals = deleteMeal(mockAdditionalMeals, 99);
    assert.equal(updatedMeals.length, 2, "Meal count should remain the same");
});

QUnit.test("Handle getting details for a non-existent meal", function (assert) {
    const meal = getMealDetails(mockAdditionalMeals, 99);
    assert.strictEqual(meal, null, "Non-existent meal should return null");
});
