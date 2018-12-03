var calculatorControllers = angular.module('calculatorApp', []);

calculatorControllers.controller('CalculatorController', ['$scope', 'Validation', 'Utilities', 'CalcService',
            function CalculatorController($scope, Validation, Utilities, CalcService) {
    var vm = this;
    $scope.result = '0';
    $scope.resultToBeCleared = false;
    $scope.finalResult = '';
    $scope.hasOperator = false;
    $scope.evaluate = function (value) {
        //var value = element.currentTarget.value;
        CalcService.initializeStatement($scope);
        switch (value) {
            case 'clear':
                CalcService.allClear($scope);
                break;
            case 'CE':
                CalcService.clearEntry($scope);
                break;
            case '.':
                CalcService.checkAndAddDecimal($scope, value);
                break;
            case '+':
            case '-':
            case '*':
            case '/':
            case '%':
            case '(':
            case ')':
                CalcService.handleOperation($scope, value);
                break;
            case "x^2":
            case "x^3":
            case "squareroot":
            case "cuberoot":
                CalcService.handlePowerAndRoot($scope, value);
                break;
            case '=':
                CalcService.evaluate($scope);
                break;
            default:
                CalcService.clearResult($scope);
                CalcService.handleNumbers($scope, value)

        }
        $scope.finalResult = $scope.result;
        return $scope.result;
    };

}]);


