// Budget Controller
var budgetController = (function() {

  var Expense = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

})();


// UI Controller
var UIController = (function() {

  // storing all class names in this object so it's easy to change class names in html without messing up the code because we can replace the class names here which will reflect in the rest of the code
  // We return DOMstrings below so other functions can access it
  var DOMstrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputBtn: '.add__btn'
  };

  // it needs to be public function because it needs to be accessible by the other controller
  return {
    getInput: function() {
      // to return all 3 variables in a function, return them as properties in an object
      return {
        type: document.querySelector(DOMstrings.inputType).value, // Will be either inc or exp
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value
      };
    },
    // returning DOMstrings here so other functions can access the classnames
    getDOMstrings: function() {
      return DOMstrings;
    }
  };

})();


// Global App Controller
var controller = (function(budgetCtrl, UICtrl) {

  // we can call this function by creating an init() below, and returning init()
  var setupEventListeners = function() {
    var DOM = UICtrl.getDOMstrings();

    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

    // adding keypress listener to the global document
    // 'event' parameter gets automically passed into our event handler by the browser, we don't need to do anything else like calling it; we just need to specify it in anonymous function
    document.addEventListener('keypress', function(event) {
      // console.log(event); // keyCode identifies which key was pressed; keyCodes are unique
      // older browsers don't support .keyCode so .which is a backup
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });
  }



  var ctrlAddItem = function() {

    // 1. get the field input data
    var input = UICtrl.getInput();

    // 2. add the item to the budget controller

    // 3. add the item to the UI

    // 4. calculate the budget

    // 5. display the budget on the UI
  };

  // need to return it so it's a public function/can access it from the outside
  return {
    init: function() {
      console.log('app started.');
      setupEventListeners();
    }
  };

})(budgetController, UIController);

// this starts the code. Init() is the only public function
controller.init();
