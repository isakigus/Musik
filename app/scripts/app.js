var app = angular.module('music', []);

function ms2mmss(ms) {
    if (isNaN(ms))
        return ms
    var seconds = ms / 1000;
    var min = seconds / 60;
    var s = seconds % 60;
    var s1 = ("00" + s.toFixed(0)).slice(-2);
    return min.toFixed(0) + ':' + s1
}

app.filter('mmss', function () {
    return function (item) {
        return ms2mmss(item);
    };
});


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
                //$scope.intro = false;
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
                console.log($scope.page_data);
                $scope.list_cl = "animated fadeOutRight move";
                $scope.table_sw = true;
                $scope.table_cl = "animated fadeIn";
            });
    };

    $scope.customer = {
        name: 'Naomi',
        address: '1600 Amphitheatre'
    };

    $scope.do_chart = function (id, genre_name) {
        $http.get("/genre/" + id + "/chart")
            .then(function (response) {
                    $scope.chart_data = response.data.data;
                    $scope.list_cl = "animated fadeOutRight move";
                    $scope.chart_sw = true;
                    $scope.chart_cl = "animated fadeIn";
                    $scope.genre_name = genre_name;

                    var barHeight = 10;
                    var n = 1000;

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
                        .data($scope.chart_data)
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
            )
    }
});

/* directives */

app.directive('msGraph', function () {
    return {
        restrict: 'E',
        templateUrl: 'template/graph.html'
    };
});

app.directive('msGenres', function () {
    return {
        restrict: 'E',
        templateUrl: 'template/genres_list.html'
    };
});

app.directive('msTable', function () {
    return {
        restrict: 'E',
        templateUrl: 'template/table.html'
    };
});


app.directive('msIntro', function () {
    return {
        restrict: 'E',
        template: '<div class="{{ intro_cl }}" ng-show="intro_sw" ng-click="genres()">'
        + '<h1><strong> Welcome!</strong></h1></div>'
    };
});

