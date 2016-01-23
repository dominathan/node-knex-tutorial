angular.module('userpost',[
  'ngRoute'
])
.controller('UsersController', function($scope,UsersService) {
  $scope.user = {};
  $scope.users = [];
  $scope.submitUser = function(user) {
    UsersService.createUser(user).then(function(data) {
      console.log(data);
    });
  };

  $scope.getUsers = function() {
    UsersService.getUsers().then(function(data) {
      console.log("GRABBING USERS", data);
      $scope.users = data.data;

    });
  }

})
.factory('UsersService', function($http) {
  var url = "/create-user";
  var getUrl = '/users';

  function createUser(user) {
    return $http.post(url, {user});
  };
  function getUsers() {
    return $http.get(getUrl);
  }

  return {
    createUser: createUser,
    getUsers: getUsers
  };
})
