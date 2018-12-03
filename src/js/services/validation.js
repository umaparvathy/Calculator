//var calculatorApp = angular.module('calculatorApp', []);

angular.module('calculatorApp').factory('Validation', function() {
    return {
        handleUnequalBrackets: function(expr) {
            if (expr.length > 0) {
                let numberOfLeftBrackets = (expr.match(/\(/g) || []).length;
                let numberOfRightBrackets = (expr.match(/\)/g) || []).length;

                if (numberOfRightBrackets < numberOfLeftBrackets) {
                    for (i = 0; i < numberOfLeftBrackets - numberOfRightBrackets; i++) {
                        expr += ')';
                    }
                } else {
                    for (i = 0; i < numberOfRightBrackets - numberOfLeftBrackets; i++) {
                        expr = '(' + expr;
                    }
                }
            }
            return expr;
        },

        checkValidPowAndRoot: function (expr) {

            isValid = false;

            if (expr.length > 0) {

                let prevChar = expr.slice(-1);

                var numbers = new RegExp(/^[0-9]+[.]?[0-9]*$/);
                if (numbers.test(prevChar) || prevChar === ')') {
                    isValid = true;
                }
            }
            return isValid;
        },

        handleConsecutiveOperators: function (expr, secondOperator) {

            let shouldReplace = false;
            var operator = secondOperator;

            if (expr.length > 0) {
                let firstOperator = expr.slice(-1);


                if (firstOperator === '+' || firstOperator === '-' || firstOperator === '*' || firstOperator === '/') {
                    switch (secondOperator) {
                        case '*':
                        case '/':
                        case '+':
                            operator = secondOperator;
                            shouldReplace = true;
                            break;
                        case '-':
                            if (firstOperator === '-') {
                                operator = secondOperator;
                            } else {
                                operator = firstOperator + secondOperator;
                            }
                            shouldReplace = true;
                            break;
                        case ')':
                            operator = '';
                            break;

                    }
                } else if (firstOperator === '(') {
                    switch (secondOperator) {
                        case '*':
                        case '/':
                        case '+':
                            operator = '';
                            break;

                    }
                }

                if (secondOperator === '(' && !(firstOperator === '+' || firstOperator === '-' || firstOperator === '*' || firstOperator === '/' || firstOperator === '(')) {
                    if (firstOperator === '0') {
                        shouldReplace = true;
                        operator = '(';
                    } else {
                        operator = '*(';
                    }
                }

            }


            if (shouldReplace) {
                expr = expr.slice(0, -1) + operator;
            } else {
                expr = expr + operator;
            }
            return expr;
        }

    }
});
