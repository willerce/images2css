var fs = require('fs');
var path = require('path');
var sizeOf = require('image-size');
var css = require("node-css");

function images2css(options) {

    options = options || {};

    options = {
        folderPath: options.folderPath || process.cwd(),
        imageRelativePath: options.imageRelativePath || "./",
        backgroundSize: options.backgroundSize || false
    };

    //遍历目录下的 jpg, png
    var files = fs.readdirSync(options.folderPath);

    var cssContent = "";

    files.forEach(function (file) {

        if (file !== '.git' && file !== ".svn" && file !== ".idea") {
            //判断是不是目录
            var subFolderPath = path.join(options.folderPath, file);
            var stat = fs.lstatSync(subFolderPath);
            if (stat.isDirectory()) {

                //在此目录遍历
                var subfolders = fs.readdirSync(subFolderPath);

                subfolders.forEach(function (image) {

                    var imagePath = path.join(subFolderPath, image);
                    var imageStat = fs.lstatSync(imagePath);

                    if (imageStat.isFile() && ".png.jpg".indexOf(path.extname(imagePath)) >= 0) {

                        //中~

                        //计算高宽
                        var dimensions = sizeOf(imagePath);
                        var result = "";

                        if (options.backgroundSize) {
                            result = css("." + file + "__" + path.basename(imagePath, '.' + dimensions.type), {
                                width: dimensions.width + "px",
                                height: dimensions.height + "px",
                                'background-image': 'url(' + options.imageRelativePath + file + '/' + image + ')',
                                '-webkit-background-size': dimensions.width + "px" + " " + dimensions.height + "px",
                                'background-size': dimensions.width + "px" + " " + dimensions.height + "px"
                            });
                        } else {
                            result = css("." + file + "__" + path.basename(imagePath, '.' + dimensions.type), {
                                width: dimensions.width + "px",
                                height: dimensions.height + "px",
                                'background-image': 'url(' + options.imageRelativePath + file + '/' + image + ')'
                            });
                        }

                        cssContent = cssContent + result;

                    }
                });
            }
        }
    });

    return cssContent;
}

module.exports = images2css;