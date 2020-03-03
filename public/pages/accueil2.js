var Polyvideos = angular.module('Polyvideos', []);

function getCookie(cname) {
    console.log("getCookie");
      var name = cname + "=";
      var decodedCookie = decodeURIComponent(document.cookie);
      var ca = decodedCookie.split(';');
      for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    };

function mainController($scope,$http,$window){

    $scope.formDataPlaylist = {}
    $scope.all_playlist = {}

    var p = getCookie("pseudo");
    var v = sessionStorage.getItem("videoId");
    $scope.formData = {};
    // $scope.form = {};

    $http.get('http://localhost:3003/getUserPlaylists/' + p)
		.success(function(data){
			$scope.playlists = data ;
			// console.log(data);
		})
		
		.error(function(data){
			console.log('Error: ' + data);
    });

    $scope.search = function(){
        $http.post('/search', $scope.formData)
            .success(function(data){
                // $scope.formData = {};
                $scope.laliste = data;
                // console.log(data[0]);
            })

            .error(function(data){
                console.log('Error: ' + data);
            });
    };

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

    $scope.play = function(id){
        $http.post('/play/' + id)
            .success(function(data){
                console.log(id);
                var u = "http://localhost:3001/play";
                sessionStorage.setItem("videoId", id);
                $window.location.href = u;
            })

            .error(function(data){
                console.log('Error: ' + data);
            });
    };

    $scope.addToLikes = function(id,video){
        $http.post('http://localhost:3002/addToLikes/' + p + "/" + id,video)
            .success(function(data){
                console.log(id);
                // $scope.laliste = data;
                // var u = "http://localhost:3002/addLike/" + p + "/" + id;
                // $window.location.href = u;
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

    $scope.add_to_playlist = function(video,playlist_id,ind){
        $http.put('http://localhost:3003/addToPlaylist/' + playlist_id,video)
            .success(function(data){
                console.log(data);
                node = document.getElementsByClassName("list_playlist");
                node[ind].style.visibility = "hidden";
            })

            .error(function(data){
                console.log('Error: ' + data);
                console.log("info" + video);
                
            });
    };

    $scope.get_playlist = function(ind){
        node = document.getElementsByClassName("list_playlist");
        // console.log(node);
        node[ind].style.visibility = "visible";
        node[ind].style.height = "auto";	

        $http.get('http://localhost:3003/getUserPlaylists/' + p)
            .success(function(data){
                $scope.all_playlist = data ; 
                // console.log($scope.all_playlist);
            })

            .error(function(data){
                console.log('Error: ' + data);
            });
    }

    $scope.create_playlist = function(ind){
        $http.post('http://localhost:3003/createPlaylist/' + p,$scope.formDataPlaylist)
        .success(function(data){
            $scope.formDataPlaylist = {};
            $scope.all_playlist = data ; 

            node = document.getElementsByClassName("new_playlist");
            node[ind].style.visibility = "hidden";
            node[ind].style.height = "0";
        
            node2 = document.getElementsByClassName("toggle_view");
            node2[ind].style.visibility = "visible";
            node2[ind].style.height = "auto";	
        })
        .error(function(data){
            console.log('Error: ' + data);
        });
    };

    $scope.create_new_playlist = function(ind){
        node = document.getElementsByClassName("new_playlist");
        node[ind].style.visibility = "visible";
        node[ind].style.height = "auto";	
        
        node2 = document.getElementsByClassName("toggle_view");
        node2[ind].style.visibility = "hidden";
        node2[ind].style.height = "0";
    }
};

function logout() {
    document.cookie = "pseudo=" + "" + "; path=/";
    window.location.assign("http://localhost:3000/")
}
