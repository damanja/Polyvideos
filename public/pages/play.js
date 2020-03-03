var Polyvideos = angular.module('Polyvideos', []);

function mainController($scope,$http,$window){

    var v = sessionStorage.getItem("videoId");
	$scope.formData = {};

        $http.get('/play')
            .success(function(data){
                var v = sessionStorage.getItem("videoId");
                var x = document.getElementById('video');
                // var url = "https://www.youtube.com/embed/" + v + "?autoplay=1";
                var url = "https://www.youtube.com/embed/" + v;
                x.setAttribute("src", url);	
                console.log(x.getAttribute("src"));
            })

            .error(function(data){
                console.log('Error: ' + data);
            });

            $scope.goToSearch = function(id){
                $http.get('/search')
                    .success(function(data){
                        console.log(id);
                        var u = "http://localhost:3001/accueil";
                        $window.location.href = u;
                    })
          
                    .error(function(data){
                        console.log('Error: ' + data);
                    });
            };

            $scope.goToLikes = function(id){
                $http.get('/likes')
                    .success(function(data){
                        console.log(id);
                        var u = "http://localhost:3002/likes";
                        $window.location.href = u;
                    })
        
                    .error(function(data){
                        console.log('Error: ' + data);
                    });
            };
        
            $scope.goToPlaylists = function(id){
                $http.get('/playlist')
                    .success(function(data){
                        console.log(id);
                        var u = "http://localhost:3003/playlist";
                        $window.location.href = u;
                    })
          
                    .error(function(data){
                        console.log('Error: ' + data);
                    });
            };
};

function logout() {
    document.cookie = "pseudo=" + "" + "; path=/";
    window.location.assign("http://localhost:3000/")
}