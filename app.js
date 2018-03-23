// In this app, the way we structure the functions is that each function will do an individual action. There will be setter and getter functions

/* -------------------------------------------------------

 Budget Controller

----------------------------------------------------------*/
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

  var calculateTotal = function(type) {
    var sum = 0;
    data.allItems[type].forEach(function(currentValue) {
      sum += currentValue.value; // .value refers to the current element's (instance's) this.value
    });
    data.totals[type] = sum;
  }

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
    },
    budget: 0,
    percentage: -1 // we set -1 because it's usually a value that we say something is nonexistant. if there are no budget values and no total expenses, there cannot be a percentage
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
      //data.allItems[type] -> property accessor, bracket notation

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

    calculateBudget: function() {

      // calculate total income and expenses
      calculateTotal('exp');
      calculateTotal('inc');

      // calculate the budget: income - expenses
      data.budget = data.totals.inc - data.totals.exp;

      // calculate the percentage of income that we spent
      if (data.totals.inc > 0) {
        data.percentage = Math.round(data.totals.exp / data.totals.inc * 100);
      } else {
        data.percentage = -1;
      } // we only want to calculate the percentage if income > 0 because we cannot divide something by 0

    },

    getBudget: function() {
      return {
        budget: data.budget,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp,
        percentage: data.percentage
      };
    },

    testing: function() {
      console.log(data);
    }
  }

})();

/* -------------------------------------------------------

 UI Controller

----------------------------------------------------------*/
var UIController = (function() {

  // storing all class names in this object so it's easy to change class names in html without messing up the code because we can replace the class names here which will reflect in the rest of the code
  // We return DOMstrings below so other functions can access it
  var DOMstrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputBtn: '.add__btn',
    incomeContainer: '.income__list',
    expensesContainer: '.expenses__list',
    budgetLabel: '.budget__value',
    incomeLabel: '.budget__income--value',
    expensesLabel: '.budget__expenses--value',
    percentageLabel: '.budget__expenses--percentage'
  };

  // it needs to be public function because it needs to be accessible by the other controller
  return {
    getInput: function() {
      // to return all 3 variables in a function, return them as properties in an object
      return {
        type: document.querySelector(DOMstrings.inputType).value, // Will be either inc or exp
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: parseFloat(document.querySelector(DOMstrings.inputValue).value) // parseFloat converts string to float
      };
    },

    // obj is the instance e.g. {1, 'new car', 24000}. type is income/expense
    addListItem: function(obj, type) {
      var html, newHtml, element;

      // create HTML string with placeholder text
      // we put in some % signs so it's easier to find later
      if (type === 'inc') {
        element = DOMstrings.incomeContainer;
        html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else if (type === 'exp') {
        element = DOMstrings.expensesContainer;
        html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
      };


      // replace the placeholder text with some actual data
      // replace() searches for a string and then replaces that string with the data that we put into the method
      newHtml = html.replace('%id%', obj.id)
      newHtml = newHtml.replace('%description%', obj.description);
      newHtml = newHtml.replace('%value%', obj.value);

      // insert the HTML into the DOM
      /*
      insertAdjacentHTML(position, text); position is the position relative to the element, and must be one of the following strings:
      'beforebegin': Before the element itself
      'afterbegin': Just inside the element, before its first child
      'beforeend': Just inside the element, after its last child
      'afterend': After the element itself
      */
      document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
    },

    // clearing input fields after hitting 'enter'
    clearFields: function() {
      var fields, fieldsArr;

      // querySelectorAll returns a list instead of array so we need to convert it to array
      // querySelectorAll returns all the of the selected elements in the document e.g. all <p>
      fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);

      // slice() is a method of the Array object. We cannot call slice() directly on a list ('field') so we need to use to call() to trick the slice() into thinking that we gave it an array, so it will return an array
      fieldsArr = Array.prototype.slice.call(fields);

      // forEarch: Loops over all the elements of the array. We need to pass a callback function to forEach, and then this callback function is applied to each of the elements in the array
      // This anonymous function can receive up to 3 arguments
      fieldsArr.forEach(function(currentValue, index, array) {
        currentValue.value = ""; // loops over array and sets all elements of array to ""
      });

      // set the focus back on the first element of the array (description input field)
      fieldsArr[0].focus();
    },

    displayBudget: function(obj) {

      // getBudget() has all the calculated totals; we're accessing the objects from that function which was passed in as obj when we called displayBudget in the global app controller
      document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget;
      document.querySelector(DOMstrings.incomeLabel).textContent = obj.totalInc;
      document.querySelector(DOMstrings.expensesLabel).textContent = obj.totalExp;

      // we only want to display the percentage if it's greater than 0 && not -1
      if (obj.percentage > 0) {
        document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';
      } else {
        document.querySelector(DOMstrings.percentageLabel).textContent = '---';
      }
    },

    // returning DOMstrings here so other functions can access the classnames
    getDOMstrings: function() {
      return DOMstrings;
    }
  };

})();



/* -------------------------------------------------------

  Global App Controller

----------------------------------------------------------*/
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

  var updateBudget = function() {

    // 1. calculate the budget
    budgetCtrl.calculateBudget();

    // 2. Return the budget
    var budget = budgetCtrl.getBudget();

    // 3. display the budget on the UI
    UICtrl.displayBudget(budget);
  };


  var ctrlAddItem = function() {

    var input, newItem;

    // 1. get the field input data
    // this will get the type, description, value from user input
    input = UICtrl.getInput();

    // user input validation. isNaN() if not number, return true. if number, return false.
    // trim() removes whitespace from both sides of a string
    input.description = input.description.trim();
    if (input.description !== "" && !isNaN(input.value) && input.value > 0) {

      // 2. add the item to the budget controller
      newItem = budgetCtrl.addItem(input.type, input.description, input.value);

      // 3. add the item to the UI
      UICtrl.addListItem(newItem, input.type);

      // 4. Clear the fields
      UICtrl.clearFields();

      // 5. Calculate and update budget
      updateBudget();

    }

  };

  // need to return it so it's a public function/can access it from the outside
  return {
    init: function() {
      console.log('app started.');
      UICtrl.displayBudget({
        budget: 0,
        totalInc: 0,
        totalExp: 0,
        percentage: -1
      });
      setupEventListeners();
    }
  };

})(budgetController, UIController);

// this starts the code. Init() is the only public function
controller.init();
