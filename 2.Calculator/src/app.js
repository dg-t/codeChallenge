(function() {

    // Shortcut to get elements
    var el = function(element) {
        if (element.charAt(0) === "#") {
            // If passed an ID...
            return document.querySelector(element); // ... returns single element
        }
        return document.querySelectorAll(element); // Otherwise, returns a nodelist
    };

    // Variables
    var viewer = el("#viewer"), // Calculator screen where result is displayed
        equals = el("#equals"), // Equal button
        nums = el(".num"), // List of numbers
        ops = el(".ops"), // List of operators
        theNum = "", // Current number
        oldNum = "", // Previous number
        resultNum, // Result
        operator; // Operator

    // When: Number is clicked. Get the current number selected
    var setNum = function() {

        if (resultNum) {
            // If a result was displayed, reset number
            theNum = this.getAttribute("data-num");
            resultNum = "";

            // Allow only one decimal point
        } else if (this.getAttribute("data-num") === '.' && theNum.includes('.')) {
            return;

        } else {
            // Otherwise, add digit to previous number (this is a string!)
            theNum += this.getAttribute("data-num");
        }

        // Display numbers
        viewer.innerHTML = formatNumber(theNum);

    };

    // Add commas for thousands separator until decimal point
    var formatNumber = function(number) {
        var format = number.toString().split(".");
        format[0] = format[0].substring(0, 9).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return format.join(".");
    }

    // When: Operator is clicked. Pass number to oldNum and save operator
    var moveNum = function() {

        // Allow more then one operation consecutively
        if (oldNum !== "") {
            displayNum();
        }

        oldNum = theNum;
        theNum = "";
        operator = this.getAttribute("data-ops");

        equals.setAttribute("data-result", ""); // Reset result in attr
    };


    // When: Equals is clicked. Calculate result
    var displayNum = function() {
        // Convert string input to numbers
        oldNum = parseFloat(oldNum);
        theNum = parseFloat(theNum);

        // Perform operation
        switch (operator) {
            case "plus":
                resultNum = oldNum + theNum; // Fix bug by changing operator
                break;

            case "minus":
                resultNum = oldNum - theNum; // Fix bug by changing operator
                break;
            case "multiply":
                resultNum = oldNum * theNum;
                break;
            case "divide":
                resultNum = oldNum / theNum;
                break;

                // If equal is pressed without an operator, keep number and continue
            default:
                resultNum = theNum;
        }




        // Allow up to 5 decimals when displaying result
        if (resultNum.toString().includes('.')) {
            viewer.innerHTML = parseFloat(formatNumber(resultNum)).toFixed(5);

            // Display error if result is too long
        } else if (resultNum.toString().length > 9) {
            viewer.innerHTML = "Expression is too long!".fontsize(3);
        } else {
            // Display result, finally!
            viewer.innerHTML = formatNumber(resultNum);
            equals.setAttribute("data-result", resultNum);

            // Now reset oldNum & keep result
            oldNum = ""; // set to empty string to allow moltiple divisions
            theNum = resultNum;
        }

        // If NaN or Infinity returned
        if (!isFinite(resultNum)) {
            if (isNaN(resultNum)) {
                // If result is not a number; set off by, eg, double-clicking operators
                resultNum = "You broke it!";
            } else {
                // If result is infinity, set off by dividing by zero
                resultNum = "Look at what you've done".fontsize(3);
                el("#calculator").classList.add("broken"); // Break calculator
            }
            viewer.innerHTML = resultNum;
        }
    };

    // When: Clear button is pressed. Clear everything
    var clearAll = function() {
        oldNum = "";
        theNum = "";
        viewer.innerHTML = "0";
        equals.setAttribute("data-result", resultNum);
    };

    /* The click events */

    // Add click event to numbers
    for (var i = 0, l = nums.length; i < l; i++) {
        nums[i].onclick = setNum;
    }

    // Add click event to operators
    for (var i = 0, l = ops.length; i < l; i++) {
        ops[i].onclick = moveNum;
    }

    // Add click event to equal sign
    equals.onclick = displayNum;

    // Add click event to clear button
    el("#clear").onclick = clearAll;
})();