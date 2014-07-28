'use strict';

angular.module('mean.articles').controller('ArticlesController', ['$scope', '$http', '$stateParams', '$location', 'Global', 'Articles',
  function($scope, $http, $stateParams, $location, Global, Articles) {
    $scope.global = Global;

    $scope.hasAuthorization = function(article) {
      if (!article || !article.user) return false;
      return $scope.global.isAdmin || article.user._id === $scope.global.user._id;
    };

    $scope.create = function(isValid) {
      if (isValid) {
        var article = new Articles({
          title: this.title,
          content: this.content
        });
        article.$save(function(response) {
          $location.path('articles/' + response._id);
        });

        this.title = '';
        this.content = '';
      } else {
        $scope.submitted = true;
      }
    };

    $scope.remove = function(article) {
      if (article) {
        article.$remove();

        for (var i in $scope.articles) {
          if ($scope.articles[i] === article) {
            $scope.articles.splice(i, 1);
          }
        }
      } else {
        $scope.article.$remove(function(response) {
          $location.path('articles');
        });
      }
    };

    $scope.update = function(isValid) {
      if (isValid) {
        var article = $scope.article;
        if (!article.updated) {
          article.updated = [];
        }
        article.updated.push(new Date().getTime());

        article.$update(function() {
          $location.path('articles/' + article._id);
        });
      } else {
        $scope.submitted = true;
      }
    };

    $scope.up = function(article) {
          if (article) {


              $http.put('/articles/do/'+ article._id).success(function(art) {
                 article.up = article.up+1;
              });

          } else {
              $scope.article.$remove(function(response) {
                  $location.path('articles');
              });
          }
      };

      $scope.down = function(article) {
          if (article) {


              $http.delete('/articles/do/'+ article._id).success(function(art) {
                  article.down = article.down+1;
              });

          } else {
              $scope.article.$remove(function(response) {
                  $location.path('articles');
              });
          }
      };

    $scope.find = function() {
      Articles.query(function(articles) {
        $scope.articles = articles;
      });
    };

      $scope.hot = function() {

          $http.get('/articles/hot').success(function(articles) {
              $scope.articles = articles;
          });

      };

    $scope.findOne = function() {
      Articles.get({
        articleId: $stateParams.articleId
      }, function(article) {
        $scope.article = article;
      });
    };
  }
]);
