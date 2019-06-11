const path = require('path');

const packageConfig = require('../package.json');

module.exports = {
    joinRelativeToProjectRootDirectory(...paths) {
        return path.join(
            __dirname.substring(
                0,
                __dirname.indexOf(packageConfig.name) +
                    packageConfig.name.length
            ),
            ...paths
        );
    }
};
