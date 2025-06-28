---
tag: MarkDown 基本语法
categories:
  - 杂项
recommend: 6
---

# nvm&nrm

## 一、nvm

### 1.nvm安装

[开始 下载nvm - nvm中文官网](https://nvm.uihtm.com/doc/download-nvm.html)

### 2.配置镜像

**找到nvm安装路径 =>找到 setting.txt 文件 =>新增两行信息**

~~~
node_mirror:https://npmmirror.com/mirrors/node/
npm_mirror:https://npmmirror.com/mirrors/npm/
~~~

### 3.检查nvm是否安装成功

win + R，调用cmd，输入`nvm`

### 4.命令

```
nvm list available // 查询可插入版本号，LST表示可插入稳定版本
nvm install 16.14.0 // 安装node版本
nvm list或者nvm ls // 查看当前已安装的node.js版本
nvm use 16.14.0 // 切换node版本
nvm uninstall 16.14.0 // 删除某node.js版本
```

## 二、nrm

### 1.安装nrm

`npm install -g nrm`

### 2.命令

```
nrm use <registry> // 切换源：将当前的 npm 源切换为指定的源。可以使用源的名称或 URL 作为 参数。
nrm add <registry> <url> // 添加源：添加一个新的 npm 源并指定其名称和 URL。
nrm test <registry> // 测试源的速度：测试指定源的响应速度，并显示测试结果
nrm current // 显示当前使用的源：当前正在使用的 npm 源的名称和 URL。
```

## 三、环境变量配置

为了命令行安装包时，将包安装到自己设置的目录下。

### 1.新增俩文件夹

首先创建"node_global" 和 “node_cache”两个文件夹进行全局安装的时候安装对应的库到这两个文件。
在nvm的 nodejs 安装路径E:\nodejs 新建两个文件夹命名为 "node_global" 和 “node_cache”。

### 2.配置路径

打开cmd命令行工具，输入以下两句操作

```
npm config set prefix "E:\nodejs\node_global"
npm config set cache "E:\nodejs\node_cache"
```

### 3.配置环境变量

在环境变量配置

```
E:\nodejs\node_global
E:\nodejs\node_cache
```



