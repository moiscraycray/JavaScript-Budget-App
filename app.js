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

  var data = {
    // allItems stores all the instances
    allItems: {
      exp: [],
      inc: []
    },
    // total incomes and total expenses. Displays the total amount of money we have
    totals: {
      exp: 0,
      inc: 0
    }
  };

  // making these public so allows other modules to add a new item into our data structure.
  // returning an object that contains all of our public methods
  return {
    addItem: function(type, des, val) { // getInput() handles getting these arguments
      var newItem;

      // [1 2 3 4 5], next ID = 6
      // [1 2 4 6 8], next ID = 9
      // last ID + 1
      // create new ID
      if (data.allItems[type].length > 0) {
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        ID = 0;
      }

      // Create new item based on 'inc' or 'exp' type
      if (type === 'exp') {
        newItem = new Expense(ID, des, val);
      } else if (type === 'inc') {
        newItem = new Income(ID, des, val);
      }

      /*
      the variable 'type' contains a string 'inc'/'exp'. Using the bracket notation, data.allItems[type] allows us to use the string stored in 'type' to reference the 'inc'/'exp' properties of the object. So this expression would resolve to one of the following statements:
      data.allItems['inc']; which is the same as data.allItems.inc using the dot notation
      OR
      data.allItems['exp']; which is the same as data.allItems.exp
      Using data.allItems.type would look for a property with the name 'type' but there is no such property in the 'data' object.
      */
      // push new item into our data structure
      data.allItems[type].push(newItem);

      // return the new instance
      return newItem;

    },
    testing: function() {
      console.log(data);
    }
  }

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

    var input, newItem;

    // 1. get the field input data
    // this will get the type, description, value from user input
    input = UICtrl.getInput();

    // 2. add the item to the budget controller
    newItem = budgetCtrl.addItem(input.type, input.description, input.value);

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
