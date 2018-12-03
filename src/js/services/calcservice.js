//var calculatorApp = angular.module('calculatorApp', []);

angular.module('calculatorApp').factory('CalcService', ['Utilities', 'Validation', function(Utilities, Validation) {
    return {
        clearEntry: function($scope) {
            $scope.result = $scope.result.slice(0, -1);
            if ($scope.result == '') {
                $scope.result = '0';
            }
        },
        allClear: function($scope) {
            $scope.statement = Utilities.constructStatement("Ans = " + $scope.result);
            $scope.result = '0';
        },
        initializeStatement: function($scope) {
            if ($scope.statement == null || $scope.statement === "") {
                $scope.statement = Utilities.constructStatement('Ans = 0');
            }
        },
        clearResult: function($scope) {
            if ($scope.resultToBeCleared) {
                $scope.statement = Utilities.constructStatement('Ans = ' + $scope.result);
                $scope.result = '';
                $scope.resultToBeCleared = false;
            }
        },
        checkAndAddDecimal: function($scope, value)  {
            if ($scope.hasOperator) {
                $scope.result = $scope.result + '' + value;
                $scope.hasOperator = false;
            } else {
                if ($scope.result.indexOf('.') <= -1) {
                    $scope.result = $scope.result + '' + value;
                }
            }

        },
        handleNumbers: function($scope, value) {
            let numbers = new RegExp(/^[0-9]+[.]?[0-9]*$/);
            if (numbers.test(value)) {
                if ($scope.result === '0') {
                    $scope.result = value;
                } else {
                    $scope.result = $scope.result + '' + value;
                }
            } else {
                $scope.result = value;
            }
        },
        handlePowerAndRoot: function ($scope, operation) {

            if(Validation.checkValidPowAndRoot($scope.result)) {
                $scope.statement = Utilities.constructStatement($scope.result + '2'.sup() + ' = ');
                $scope.resultToBeCleared = true;
                switch (operation) {
                    case "x^2":
                        $scope.result = Math.pow($scope.result, 2) + '';
                        break;
                    case "x^3":
                        $scope.result = Math.pow($scope.result, 3)+ '';
                        break;
                    case "squareroot":
                        $scope.result = Math.sqrt($scope.result)+ '';
                        break;
                    case "cuberoot":
                        $scope.result = Math.cbrt($scope.result)+ '';
                        break;
                }
            }
        },
        handleOperation: function($scope, value) {
            if (value === '-' && $scope.result === '0') {
                    $scope.result = '-';
            }
            value = Validation.handleConsecutiveOperators($scope.result, value);
            $scope.result = value;
            $scope.resultToBeCleared = false;
            $scope.hasOperator = true;
        },
        evaluate: function($scope) {
            $scope.result = Validation.handleUnequalBrackets($scope.result);
            $scope.statement = Utilities.constructStatement($scope.result + " = ");
            $scope.result = eval($scope.result) + '';
            $scope.resultToBeCleared = true;
        }
    }
}]);
