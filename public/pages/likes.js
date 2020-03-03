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

    var p = getCookie("pseudo");
    $scope.formData = {};

    $http.get('/getUserLikes/' + p)
		.success(function(data){
			$scope.laliste = data ;
			// console.log(data);
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

  $scope.unlike = function(id){
		$http.delete('/unlike/' + p + "/" + id)
			.success(function(data){
				$scope.laliste = data ;
				console.log(data);
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