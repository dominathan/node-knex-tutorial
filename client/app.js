angular.module('userpost',[
  'ngRoute'
])
.controller('UsersController', function($scope,UsersService) {
  $scope.user = {};
  $scope.users = [];
  $scope.blogs = [];

  UsersService.getBlogs().then(function(blogData) {
    $scope.blogs = blogData.data;
  });

  UsersService.getUsers().then(function(data) {
    console.log("GRABBING USERS", data);
    $scope.users = data.data;
  });

  $scope.submitBlog = function(blog) {
    UsersService.createBlog(blog).then(function(data) {
      console.log("SUCCESSFULLY CREATED BLOG: ", data);
    });
  };

  $scope.getUserBlogs = function(user) {
    UsersService.getUserBlogs(user).then(function(data) {
      $scope.blogs = data.data;
    });
  };

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
  var createBlogUrl = "/create-blog";
  var blogUrl = "/blogs"

  function createBlog(blog) {
    return $http.post(createBlogUrl, {blog});
  };

  function getUserBlogs(user) {
    return $http.get('/user-blogs/' + user.id);
  }

  function getBlogs() {
    return $http.get(blogUrl);
  }

  function createUser(user) {
    return $http.post(url, {user});
  };
  function getUsers() {
    return $http.get(getUrl);
  }

  return {
    createUser: createUser,
    getUsers: getUsers,
    createBlog: createBlog,
    getBlogs: getBlogs,
    getUserBlogs: getUserBlogs
  };
})
