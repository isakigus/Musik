describe("Unit test ms2mmss function", function () {
    it('1000 ms should be 0:01', function () {
        expect(ms2mmss(1000)).toBe('0:01');
    });

    it('1001 ms should be 0:01', function () {
        expect(ms2mmss(1001)).toBe('0:01');
    });

    it('60000 ms should be 1:00', function () {
        expect(ms2mmss(60000)).toBe('1:00');
    });

    it('61000 ms should be 1:01', function () {
        expect(ms2mmss(61000)).toBe('1:01');
    });

    it('121000 ms should be 2:01', function () {
        expect(ms2mmss(121000)).toBe('2:01');
    });

    it('aaa ms should be aaa', function () {
        expect(ms2mmss('aaa')).toBe('aaa');
    });

    it('-1000 ms should be error', function () {
        expect(ms2mmss(-1000)).toBe('error');
    });

    it('null should be null', function () {
        expect(ms2mmss(null)).toBe('error');
    });
});

describe('Test mmss filter', function () {

    var $filter;
    beforeEach(
        module('music')
    );

    beforeEach(inject(function (_$filter_) {
        $filter = _$filter_;
    }));

    it('filter mmss 60000 (ms) should be 1:00', function () {
        var mmss = $filter('mmss');
        expect(mmss(60000)).toBe('1:00');
    });

});


describe('Test angular controller mainCtrl', function () {
    beforeEach(
        module('music')
    );

    var $httpBackend, compile, $scope, createController;

    beforeEach(inject(function ($injector) {
        // Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');
        // backend definition common for all tests
        compile = $injector.get('$compile');
        $httpBackend.when('GET', '/genres')
            .respond({"1": "Rock", "2": "Jazz"});

        $httpBackend.when('GET', '/genre/1/table/1')
            .respond({
                "pagination": {
                    "pages": 130,
                    "prev": 1,
                    "page_data": [1, 2, 3, 4, 5, 6],
                    "page": 1,
                    "next": 2
                },
                "data": [{
                    "album": "O Samba Pocon\u00e9",
                    "artist": "Skank",
                    "song": "\u00c9 Uma Partida De Futebol",
                    "ms": 1071
                }, {
                    "album": "Maquinarama",
                    "artist": "Skank",
                    "song": "\u00c1gua E Fogo",
                    "ms": 278987
                }, {
                    "album": "Compositores",
                    "artist": "O Ter\u00e7o",
                    "song": "\u00c0s Vezes",
                    "ms": 330292
                }, {
                    "album": "O Samba Pocon\u00e9",
                    "artist": "Skank",
                    "song": "Z\u00e9 Trindade",
                    "ms": 247954
                }, {
                    "album": "Zooropa",
                    "artist": "U2",
                    "song": "Zooropa",
                    "ms": 392359
                }, {
                    "album": "Achtung Baby",
                    "artist": "U2",
                    "song": "Zoo Station",
                    "ms": 276349
                }, {
                    "album": "New Adventures In Hi-Fi",
                    "artist": "R.E.M.",
                    "song": "Zither",
                    "ms": 154148
                }, {
                    "album": "Led Zeppelin I",
                    "artist": "Led Zeppelin",
                    "song": "Your Time Is Gonna Come",
                    "ms": 274860
                }, {
                    "album": "Un-Led-Ed",
                    "artist": "Dread Zeppelin",
                    "song": "Your Time Is Gonna Come",
                    "ms": 310774
                }, {
                    "album": "Greatest Hits",
                    "artist": "Lenny Kravitz",
                    "song": "Your Mirror",
                    "ms": 240666
                }]
            });

        $httpBackend.when('GET', '/genre/1/chart')
            .respond({
                "data": [{
                    "avg": 262851.6153846154,
                    "name": "Velvet Revolver"
                }, {
                    "avg": 236484.98076923078,
                    "name": "Van Halen"
                }, {
                    "avg": 270420.5089285714,
                    "name": "U2"
                }, {
                    "avg": 229003.2,
                    "name": "The Who"
                }]
            });

        // Get hold of a scope (i.e. the root scope)
        $scope = $injector.get('$rootScope');
        // The $controller service is used to create instances of controllers
        var $controller = $injector.get('$controller');

        createController = function () {
            return $controller('mainCtrl', {'$scope': $scope});
        };
    }));

    describe('mainCtrl', function () {

        it('check show variables initial states and class', function () {
            createController();
            expect($scope.intro_sw).toEqual(true);
            expect($scope.list_sw).toEqual(true);
            expect($scope.table_sw).toEqual(false);
            expect($scope.chart_sw).toEqual(false);
            expect($scope.intro_cl).toEqual("animated fadeInRight");
        });

        it('test mainCtrl genres function', function () {

            $httpBackend.expectGET('/genres');
            createController();
            $scope.genres();
            $httpBackend.flush();

            expect($scope.genres_data).toEqual({"1": "Rock", "2": "Jazz"});
            expect($scope.list_sw).toEqual(true);
            expect($scope.table_sw).toEqual(false);
            expect($scope.chart_sw).toEqual(false);
            expect($scope.intro_cl).toEqual("animated fadeOutRight");
            expect($scope.list_cl).toEqual('animated fadeIn');

        });

        it('Test mainCtrl genre table function', function () {

            $httpBackend.expectGET('/genre/1/table/1');
            createController();
            $scope.do_table(1, 1, "Rock");
            $httpBackend.flush();

            expect($scope.table_data).toEqual(
                {
                    "pagination": {
                        "pages": 130,
                        "prev": 1,
                        "page_data": [1, 2, 3, 4, 5, 6],
                        "page": 1,
                        "next": 2
                    },
                    "data": [{
                        "album": "O Samba Pocon\u00e9",
                        "artist": "Skank",
                        "song": "\u00c9 Uma Partida De Futebol",
                        "ms": 1071
                    }, {
                        "album": "Maquinarama",
                        "artist": "Skank",
                        "song": "\u00c1gua E Fogo",
                        "ms": 278987
                    }, {
                        "album": "Compositores",
                        "artist": "O Ter\u00e7o",
                        "song": "\u00c0s Vezes",
                        "ms": 330292
                    }, {
                        "album": "O Samba Pocon\u00e9",
                        "artist": "Skank",
                        "song": "Z\u00e9 Trindade",
                        "ms": 247954
                    }, {
                        "album": "Zooropa",
                        "artist": "U2",
                        "song": "Zooropa",
                        "ms": 392359
                    }, {
                        "album": "Achtung Baby",
                        "artist": "U2",
                        "song": "Zoo Station",
                        "ms": 276349
                    }, {
                        "album": "New Adventures In Hi-Fi",
                        "artist": "R.E.M.",
                        "song": "Zither",
                        "ms": 154148
                    }, {
                        "album": "Led Zeppelin I",
                        "artist": "Led Zeppelin",
                        "song": "Your Time Is Gonna Come",
                        "ms": 274860
                    }, {
                        "album": "Un-Led-Ed",
                        "artist": "Dread Zeppelin",
                        "song": "Your Time Is Gonna Come",
                        "ms": 310774
                    }, {
                        "album": "Greatest Hits",
                        "artist": "Lenny Kravitz",
                        "song": "Your Mirror",
                        "ms": 240666
                    }]
                }
            );

            expect($scope.genre_id).toEqual(1);
            expect($scope.genre_name).toEqual("Rock");
            expect($scope.pagination).toEqual({
                "pages": 130,
                "prev": 1,
                "page_data": [1, 2, 3, 4, 5, 6],
                "page": 1,
                "next": 2
            });
            expect($scope.list_cl).toEqual("animated fadeOutRight move");
            expect($scope.table_cl).toEqual("animated fadeIn");
            expect($scope.table_sw).toEqual(true);

        });

        it('Test mainCtrl genre chart function', function () {

            $httpBackend.expectGET('/genre/1/chart');
            createController();
            $scope.do_chart(1, "Rock");
            $httpBackend.flush();

            expect($scope.chart_data).toEqual([{
                "avg": 262851.6153846154,
                "name": "Velvet Revolver"
            }, {
                "avg": 236484.98076923078,
                "name": "Van Halen"
            }, {"avg": 270420.5089285714, "name": "U2"}, {
                "avg": 229003.2,
                "name": "The Who"
            }]);

            expect($scope.genre_name).toEqual("Rock");
            expect($scope.chart_sw).toEqual(true);
            expect($scope.chart_cl).toEqual("animated fadeIn");
            expect($scope.list_cl).toEqual('animated fadeOutRight move');

        });
    });
});

describe('Test angular directive msGraph', function () {
    var $compile, $rootScope, $_templateCache;

    beforeEach(module('music'));

    beforeEach(inject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;

    }));

    beforeEach(inject(function ($templateCache) {
        var directiveTemplate = null;
        var req = new XMLHttpRequest();
        req.onload = function () {
            directiveTemplate = this.responseText;
        };

        req.open("get", "template/graph.html", false);
        req.send();
        $templateCache.put("template/graph.html", directiveTemplate);
        $_templateCache = $templateCache;
    }));

    it(' Replaces the element with the appropriate content', function () {
        // Compile a piece of HTML containing the directive
        var template = $_templateCache.get('template/graph.html');
        $rootScope.genre_name = 'Rock and Roll';
        $rootScope.chart_sw = true;

        //var msGraph = $compile("<msGraph></msGraph>")($rootScope);
        var msGraph = $compile(template)($rootScope);
        $rootScope.$digest();

        expect(msGraph.html()).toContain('<div id="chart" style="width:100%; height:100%;"></div>');
        expect(msGraph.html()).toContain('Rock and Roll');
        expect(msGraph.html()).toContain('<h3 class="centered">Average artist song length</h3>');
    });
});

describe('Test angular directive msGenres', function () {
    var $compile, $rootScope, $_templateCache;

    beforeEach(module('music'));

    beforeEach(inject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;

    }));

    beforeEach(inject(function ($templateCache) {
        var directiveTemplate = null;
        var req = new XMLHttpRequest();
        req.onload = function () {
            directiveTemplate = this.responseText;
        };

        req.open("get", "template/genres_list.html", false);
        req.send();
        $templateCache.put("template/genres_list.html", directiveTemplate);
        $_templateCache = $templateCache;
    }));

    it(' Replaces the element with the appropriate content', function () {
        // Compile a piece of HTML containing the directive
        var template = $_templateCache.get('template/genres_list.html');
        console.log(template);
        $rootScope.list_cl = 'Rock and Roll';
        $rootScope.genres_data = {"1": "Rock", "2": "Jazz"};

        //var msGraph = $compile("<ms-genres></ms-genres>")($rootScope);
        var msGraph = $compile(template)($rootScope);
        $rootScope.$digest();

        expect(msGraph.html()).toContain('<strong class="ng-binding">Rock</strong></h2>');
        expect(msGraph.html()).toContain('<strong class="ng-binding">Jazz</strong></h2>');

    });

});

describe('Test angular directive msTable', function () {
    var $compile, $rootScope, $_templateCache;

    beforeEach(module('music'));

    beforeEach(inject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;

    }));

    beforeEach(inject(function ($templateCache) {
        var directiveTemplate = null;
        var req = new XMLHttpRequest();
        req.onload = function () {
            directiveTemplate = this.responseText;
        };

        req.open("get", "template/table.html", false);
        req.send();
        $templateCache.put("template/table.html", directiveTemplate);
        $_templateCache = $templateCache;
    }));

    it(' Replaces the element with the appropriate content', function () {
        // Compile a piece of HTML containing the directive
        var template = $_templateCache.get('template/table.html');
        console.log(template);
        $rootScope.list_cl = 'Rock and Roll';
        $rootScope.table_data = {
            "pagination": {
                "pages": 130,
                "prev": 1,
                "page_data": [1, 2, 3, 4, 5, 6],
                "page": 1,
                "next": 2
            },
            "data": [{
                "album": "O Samba Pocon\u00e9",
                "artist": "Skank",
                "song": "\u00c9 Uma Partida De Futebol",
                "ms": 1071
            }, {
                "album": "Zooropa",
                "artist": "U2",
                "song": "Zooropa",
                "ms": 392359
            }, {
                "album": "Led Zeppelin I",
                "artist": "Led Zeppelin",
                "song": "Your Time Is Gonna Come",
                "ms": 274860
            }, {
                "album": "Un-Led-Ed",
                "artist": "Dread Zeppelin",
                "song": "Your Time Is Gonna Come",
                "ms": 310774
            }, {
                "album": "Greatest Hits",
                "artist": "Lenny Kravitz",
                "song": "Your Mirror",
                "ms": 240666
            }]
        };

        //var msGraph = $compile("<ms-table></ms-table>")($rootScope);
        var msGraph = $compile(template)($rootScope);
        $rootScope.$digest();

        expect(msGraph.html()).toContain('<td class="ng-binding">Dread Zeppelin</td>');
        expect(msGraph.find('tr').length).toBe(6);

    });

});

describe('Test create chart ', function () {
    beforeEach(function () {

        var data = [{
            "avg": 262851.6153846154,
            "name": "Velvet Revolver"
        }, {
            "avg": 236484.98076923078,
            "name": "Van Halen"
        }, {
            "avg": 270420.5089285714,
            "name": "U2"
        }, {
            "avg": 229003.2,
            "name": "The Who"
        }];

        d3.select('body').append('div')
            .attr('id', 'chart');

        create_chart(data, 10, 1000);
    });

    afterEach(function () {
        d3.selectAll("div#chart").remove()
    });

    describe('create chart', function () {
        it('should render the correct number of bars', function () {
            expect(getBars().length).toBe(4);
        });

        it('should render the bars with correct title', function () {
            expect(d3.select(getBars()[0]).selectAll('title').nodes()[0].innerHTML).toBe("Velvet Revolver 4:23");
        });
    });

    function getBars() {
        return d3.selectAll('rect').nodes();
    }
});
