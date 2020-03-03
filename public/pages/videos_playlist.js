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
  console.log("aaaaaaa");


function mainController($scope,$http,$window){


    var p = getCookie("pseudo");
    var v = sessionStorage.getItem("playlistId");
    var vv = sessionStorage.getItem("videoId");

    $scope.formData = {};

    $http.get('/getVideos/' + v)
		.success(function(data){
			$scope.laliste = data ;
			console.log($scope.laliste);
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

$scope.removeToPlaylist = function(idx){
  var obj = {
    index : idx
  };
  $http.put('/removeToPlaylist/' + v,obj)
    .success(function(data){
      $scope.laliste = data ;
      console.log(data);
    })
    
    .error(function(data){
      console.log('Error: ' + data);
    });
};

$scope.play = function(id){
  $http.post('/play/' + id)
      .success(function(data){
          console.log(id);
          var u = "http://localhost:3003/play";
          sessionStorage.setItem("videoId", id);
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