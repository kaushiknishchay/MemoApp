// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngMaterial'])

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    })
  })
  .service('memoService', function () {
    this.memos = [{
      title:'Demo Title 1',
      text:'1234567890qwertyuiopasdfghjkl',
      key:'q2s4'
    },{
      title:'Demo Title 2',
      text:'1234567890',
      key: 'w2s5'
    }];
    this.genKey = function () {
      return ("0000" + (Math.random() * Math.pow(36, 4) << 0).toString(36)).slice(-4)
    }
    this.add = function (memo) {
      memo.key = this.genKey();
      this.memos.push(memo);
    };

    this.get = function () {
      return this.memos;
    };

  })
  .controller('BaseController', function ($scope, $mdDialog, memoService, $mdToast) {
    $scope.nums = [1, 2];
    $scope.memos = memoService.get();

    $scope.showToast = function(memo) {
      $mdToast.show(
        $mdToast.simple()
          .content(memo.title+','+memo.text+',;;'+memo.key)
      );
    };

    $scope.showAdd = function (ev) {
      $mdDialog.show({
        controller: DialogController,
        template: '<md-dialog aria-label="Add New Memo" flex="80"> ' +
        '<md-content class="md-padding"> <form name="userForm"> ' +
        '<md-input-container flex> <label class="md-subhead">Title</label> <input ng-model="memo.title"> </md-input-container> ' +
        '<md-input-container flex> <label class="md-subhead">Content</label> ' +
        '<textarea ng-model="memo.text" columns="1" row="1" md-maxlength="9999"></textarea> ' +
        '</md-input-container> ' +
        '</form> </md-content> ' +
        '<div class="md-actions" layout="row"> ' +
        '<span flex></span> <md-button ng-click="answer(\'cancel\')"> Cancel </md-button>' +
        '<md-button ng-click="answer(memo)" class="md-primary"> Save </md-button>' +
        '</div></md-dialog>',
        targetEvent: ev,
        parent: angular.element(document.body),
        clickOutsideToClose: true
      })
        .then(function (answer) {
          $scope.alert = 'You said the information was "' + answer + '".';
        }, function () {
          $scope.alert = 'You cancelled the dialog.';
        });
    };

  });


function DialogController($scope, $mdDialog, memoService) {
  $scope.hide = function () {
    $mdDialog.hide();
  };
  $scope.cancel = function () {
    $mdDialog.cancel();
  };
  $scope.answer = function (answer) {
    $mdDialog.hide(answer);
    if (answer != 'cancel') {
      memoService.add(answer);
      console.log(answer);
    }
  };
  console.log($scope.memo);
}
