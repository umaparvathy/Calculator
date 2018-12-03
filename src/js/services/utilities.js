//var calculatorApp = angular.module('calculatorApp', []);

angular.module('calculatorApp').factory('Utilities', ['$sce', function($sce) {
    return {
        constructStatement: function(expr) {
            return $sce.trustAsHtml(expr);
        }
    }
}]);
