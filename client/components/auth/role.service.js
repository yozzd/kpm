'use strict';
angular.module('kpmApp')
    .factory('roleService', function () {

        var userRoles = ['guest', 'user', 'oprstok', 'oprrekam', 'admin'];

        return {
            hasAccess: function (userRole, roleRequired) {
                if (userRole === 'oprrekam' && roleRequired === 'oprstok') {
                    return false;
                } else {
                    return userRoles.indexOf(userRole) >= userRoles.indexOf(roleRequired);
                }
            }
        };

    });