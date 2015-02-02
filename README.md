# images2css

generate css from the existing sprite images

## 使用

```
var kalok = images2css({
    folderPath: ""
    imageRelativePath: "../",
    backgrounSize: true
});

fs.writeFile(path.join(process.cwd(), "kalok.css"), kalok);

```

参数说明：

**folderPath**

String 类型，需要遍历的图片目录，只遍历一层目录，不会遍历深层子目录，默认值： process.cwd()

**imageRelativePath**

String 类型，background-image 的 url 相对路径，默认值： "./"


**backgroundSize**

Boolean 类型，CSS 中是否需要带上 background-size 属性，默认值： false

## 联系我

willerce(willerce@gmail.com)