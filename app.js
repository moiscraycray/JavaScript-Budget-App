
// module pattern: it returns an object containing all of the functions that we want to be public. So the functions that we want to give the outside scope access to.
// we've wrapped the entire function in IIFE for privacy
var budgetController = (function() {

  // we cannot access variable x and add() from outside; throws error when we try
  var x = 23;
  var add = function(a) {
    return x + a;
  }

  // we can access this; this is public method because we have returned it. This object is what gets assigned to the budget variable after this function returns.
  // After all this runs, the budgetController variable is simply an object containing the method called publicTest, because that's what we returned from the budgetConroller anonymous function.
  // publicTest can get x variables and add() even after returning it thanks to closures
  // closures: an inner function always has access to the variables and parameters of its outer functino even after the outer function has returned.
  // so here: the IIFE returns immediately and so it's effectively gone, but the publicTest() that we return will always have access to the x variable and add() because of closure. That's why we say that the publicTest method is public because it was return and now we can use it. variable x and add() are private because they are in the closure and therefore only the publicTest() can access them.
  return {
    publicTest: function(b) {
      console.log(add(b));
    }
  }

})();
