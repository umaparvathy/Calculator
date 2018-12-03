
describe("CalculatorController", function() {

    var $controller;
    var $scope;
    beforeEach(module('calculatorApp'));
    beforeEach(inject(function(_$controller_){
        $controller = _$controller_;
        $scope = {};
        var controller = $controller('CalculatorController', {$scope: $scope});

    }));

    it("should perform basic addition", function() {
        $scope.evaluate('2');
        $scope.evaluate('+');
        $scope.evaluate('3');
        $scope.evaluate('=');
        expect($scope.result).toBe('5');
    });

    it("should perform basic subtraction", function() {
        $scope.evaluate('2');
        $scope.evaluate('-');
        $scope.evaluate('3');
        $scope.evaluate('=');
        expect($scope.result).toBe('-1');
    });

    it("should perform addition subtraction combination", function() {
        $scope.evaluate('2');
        $scope.evaluate('-');
        $scope.evaluate('3');
        $scope.evaluate('+');
        $scope.evaluate('5');
        $scope.evaluate('=');
        expect($scope.result).toBe('4');
    });

    it("should perform multiplication", function() {
        $scope.evaluate('2');
        $scope.evaluate('*');
        $scope.evaluate('3');
        $scope.evaluate('*');
        $scope.evaluate('5');
        $scope.evaluate('=');
        expect($scope.result).toBe('30');
    });

    it("should perform multiplication and division", function() {
        $scope.evaluate('2');
        $scope.evaluate('*');
        $scope.evaluate('3');
        $scope.evaluate('/');
        $scope.evaluate('2');
        $scope.evaluate('=');
        expect($scope.result).toBe('3');
    });

    it("should perform multiplication of negative number", function() {
        $scope.evaluate('-');
        $scope.evaluate('2');
        $scope.evaluate('*');
        $scope.evaluate('3');
        $scope.evaluate('=');
        expect($scope.result).toBe('-6');
    });

    it("should perform multiplication of negative numbers", function() {
        $scope.evaluate('-');
        $scope.evaluate('2');
        $scope.evaluate('*');
        $scope.evaluate('-');
        $scope.evaluate('3');
        $scope.evaluate('=');
        expect($scope.result).toBe('6');
    });

    it("should perform addition with decimal", function() {
        $scope.evaluate('2');
        $scope.evaluate('.');
        $scope.evaluate('3');
        $scope.evaluate('+');
        $scope.evaluate('2');
        $scope.evaluate('=');
        expect($scope.result).toBe('4.3');
    });

    it("should perform multiplication with decimal", function() {
        $scope.evaluate('2');
        $scope.evaluate('.');
        $scope.evaluate('1');
        $scope.evaluate('*');
        $scope.evaluate('3');
        $scope.evaluate('.');
        $scope.evaluate('2');
        $scope.evaluate('=');
        expect($scope.result).toBeCloseTo('6.72');
    });

    it("should perform operation with brackets", function() {
        $scope.evaluate('2');
        $scope.evaluate('*');
        $scope.evaluate('(');
        $scope.evaluate('3');
        $scope.evaluate('+');
        $scope.evaluate('2');
        $scope.evaluate(')');
        $scope.evaluate('=');
        expect($scope.result).toBe('10');
    });

    it("should perform operation with brackets, brackets not closed", function() {
        $scope.evaluate('2');
        $scope.evaluate('(');
        $scope.evaluate('3');
        $scope.evaluate('+');
        $scope.evaluate('2');
        $scope.evaluate('=');
        expect($scope.result).toBe('10');
    });

    it("should perform operation with brackets", function() {
        $scope.evaluate('(');
        $scope.evaluate('2');
        $scope.evaluate('+');
        $scope.evaluate('3');
        $scope.evaluate(')');
        $scope.evaluate('(');
        $scope.evaluate('3');
        $scope.evaluate('+');
        $scope.evaluate('2');
        $scope.evaluate(')');
        $scope.evaluate('=');
        expect($scope.result).toBe('25');
    });

    it("should perform operation with brackets not matching", function() {
        $scope.evaluate('(');
        $scope.evaluate('2');
        $scope.evaluate('+');
        $scope.evaluate('3');
        $scope.evaluate('(');
        $scope.evaluate('3');
        $scope.evaluate('+');
        $scope.evaluate('2');
        $scope.evaluate(')');
        $scope.evaluate('=');
        expect($scope.result).toBe('17');
    });

    it("should perform square", function() {
        $scope.evaluate('7');
        $scope.evaluate('x^2');
        $scope.evaluate('=');
        expect($scope.result).toBe('49');
    });

    it("should perform cube", function() {
        $scope.evaluate('2');
        $scope.evaluate('x^3');
        $scope.evaluate('=');
        expect($scope.result).toBe('8');
    });

    it("should perform square root", function() {
        $scope.evaluate('16');
        $scope.evaluate('squareroot');
        $scope.evaluate('=');
        expect($scope.result).toBe('4');
    });

    it("should perform cube root", function() {
        $scope.evaluate('8');
        $scope.evaluate('cuberoot');
        $scope.evaluate('=');
        expect($scope.result).toBe('2');
    });
});
