// Budget Controller
var budgetController = (function() {



})();


// UI Controller
var UIController = (function() {

  // it needs to be public function because it needs to be accessible by the other controller
  return {
    getinput: function() {
      // to return all 3 variables in a function, return them as properties in an object
      return {
        type: document.querySelector('.add__type').value, // Will be either inc or exp
        description: document.querySelector('.add__description').value,
        value: document.querySelector('add__value').value;
      }
    }
  };

})();


// Global App Controller
var controller = (function(budgetCtrl, UICrtl) {

  var ctrlAddItem = function() {
    // 1. get the field input data

    // 2. add the item to the budget controller

    // 3. add the item to the UI

    // 4. calculate the budget

    // 5. display the budget on the UI
  }

  document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);

  // adding keypress listener to the global document
  // 'event' parameter gets automically passed into our event handler by the browser, we don't need to do anything else like calling it; we just need to specify it in anonymous function
  document.addEventListener('keypress', function(event) {
    // console.log(event); // keyCode identifies which key was pressed; keyCodes are unique
    // older browsers don't support .keyCode so .which is a backup
    if (event.keyCode === 13 || event.which === 13) {
      ctrlAddItem();
    }
  });

})(budgetController, UIController);
