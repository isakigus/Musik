/*
 * Main application angular module
 */
var app = angular.module('music', []);

/*
 * Function  for converting milliseconds
 * to minutes and seconds format
 * example:
 *   23:21
 * @param {int} ms - milliseconds
 */
function ms2mmss(ms) {

    if (ms == null) {
        return 'error'
    }
    else if (isNaN(ms)) {
        return ms
    }
    else if (ms < 0) {
        return 'error'
    }

    var seconds = ms / 1000;
    var min = seconds / 60;
    var s = seconds % 60;
    var s1 = ("00" + s.toFixed(0)).slice(-2);
    return min.toFixed(0) + ':' + s1
}


/*
 * Angular filter used to convert time formats
 */
app.filter('mmss', function () {
    return function (item) {
        return ms2mmss(item);
    };
});

/*
 * Angular main application controller
 */
app.controller('mainCtrl', function ($scope, $http) {

    $scope.intro_sw = true;
    $scope.list_sw = true;
    $scope.table_sw = false;
    $scope.chart_sw = false;

    $scope.intro_cl = "animated fadeInRight";

    $scope.genres = function () {
        $http.get("/genres")
            .then(function (response) {
                $scope.genres_data = response.data;
                $scope.list_sw = true;
                $scope.list_cl = "animated fadeIn";

                $scope.table_sw = false;
                $scope.chart_sw = false;
                $scope.intro_cl = "animated fadeOutRight";

                var element = document.getElementById("intro");
                if (element) {
                    element.outerHTML = "";
                    delete element;
                }
                d3.selectAll("div.svg-container").remove()

            });
    };

    $scope.do_table = function (id, page, genre_name) {
        $http.get("/genre/" + id + "/table/" + page)
            .then(function (response) {
                $scope.table_data = response.data;
                $scope.genre_name = genre_name;
                $scope.genre_id = id;
                $scope.pagination = response.data.pagination;
                $scope.page_data = $scope.pagination.page_data;

                $scope.list_cl = "animated fadeOutRight move";
                $scope.table_sw = true;
                $scope.table_cl = "animated fadeIn";
            });
    };

    $scope.do_chart = function (id, genre_name) {
        $http.get("/genre/" + id + "/chart")
            .then(function (response) {
                    $scope.chart_data = response.data.data;
                    $scope.list_cl = "animated fadeOutRight move";
                    $scope.chart_sw = true;
                    $scope.chart_cl = "animated fadeIn";
                    $scope.genre_name = genre_name;

                    create_chart($scope.chart_data, 10, 1000);
                }
            )
    }
});

/*
 * Function that creates a bar chart
 */
function create_chart(chart_data, barHeight, n) {

    var chart = d3.select("div#chart")
        .append("div")
        .classed("svg-container", true) //container class to make it responsive
        .append("svg")
        //responsive SVG needs these 2 attributes and no width and height attr
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "0 0 600 400")
        //class to make it responsive
        .classed("svg-content-responsive", true);

    var bar = chart.selectAll("g")
        .data(chart_data)
        .enter().append("g")
        .attr("class", "rmg")
        .attr("transform", function (d, i) {
            return "translate(0," + i * barHeight + ")";
        });

    var rect = bar.append("rect")
        .attr("width", function (d) {
            return d.avg / n / 3
        })
        .on('mouseover', function (d) {
            d3.select(this).style("fill", "green");

        }).on('mouseout', function (d) {
            d3.select(this).style("fill", "steelblue");
        });

    rect.transition()
        .duration(2000)
        .attr("width", function (d) {
            return d.avg / n
        })
        .attr("height", barHeight - 1);

    rect.append("title")
        .text(function (d) {
            return d.name + ' ' + ms2mmss(d.avg)
        });

    bar.append("text")
        .attr("x", function (d) {
            return d.avg / n * 1.1
        })
        .attr("y", barHeight / 2)
        .text(function (d) {
            return ' ' + d.name + ' ' + ms2mmss(d.avg)
        });

    window.scrollTo(0, 0);
}

/*
 * Angular directive for creating a bar chart
 */
app.directive('msGraph', function () {
    return {
        restrict: 'E',
        templateUrl: 'template/graph.html'
    };
});

/*
 * Angular directive for creating the genres list
 */
app.directive('msGenres', function () {
    return {
        restrict: 'E',
        templateUrl: 'template/genres_list.html'
    };
});

/*
 * Angular directive for creating the songs table
 */
app.directive('msTable', function () {
    return {
        restrict: 'E',
        templateUrl: 'template/table.html'
    };
});

/*
 * Angular directive for creating the intro label
 */
app.directive('msIntro', function () {
    return {
        restrict: 'E',
        template: '<div class="{{ intro_cl }} text-center" ng-show="intro_sw" ng-click="genres()">'
        + '<h1><strong> Welcome!</strong></h1><small>click me</small></div>'
    };
});

