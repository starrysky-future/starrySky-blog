# React Native

## 一、搭建环境

### 1.安装node

下载 Node，注意 Node 的版本应大于等于 18，可以设置淘宝镜像用于下载加速

官方源：

~~~
npm config set registry https://registry.npmjs.org
~~~

淘宝镜像：

~~~
npm config set registry https://registry.npmmirror.com
~~~

可以使用nrm工具管理镜像源

使用nrm工具切换淘宝源：

~~~
npx nrm use taobao
~~~

 如果之后需要切换回官方源可使用：

~~~
npx nrm use npm
~~~

查看当前源：

~~~
nrm current
~~~

> 注意：强烈建议始终选择 Node 当前的 LTS （长期维护）版本，一般是偶数版本，不要选择偏实验性质的奇数版本。

> 注意：不要使用 cnpm！cnpm 安装的模块路径比较奇怪，packager 不能正常识别！

### 2.安装JDK

下载[Java SE Development Kit (JDK)](https://www.oracle.com/java/technologies/downloads/#java17)，React Native 需要 Java Development Kit [JDK] 17，在命令行中输入 `javac -version`，来查看你当前安装的 JDK 版本。如果版本不合要求，则可以去[Temurin](https://adoptium.net/?variant=openjdk17&jvmVariant=hotspot)或[Oracle JDK](https://www.oracle.com/java/technologies/downloads/#java17)上下载

> 低于 0.73 版本的 React Native 需要 JDK 11 版本，而低于 0.67 的需要 JDK 8 版本。

配置环境变量

打开`控制面板` -> `系统和安全` -> `系统` -> `高级系统设置` -> `高级` -> `环境变量` -> `新建`，创建一个名为`JAVA_HOME`的环境变量（系统或用户变量均可），指向你的 JDK 所在的目录

打开`控制面板` -> `系统和安全` -> `系统` -> `高级系统设置` -> `高级` -> `环境变量`，选中**Path**变量，然后点击**编辑**。点击**新建**然后把以下工具目录路径添加进去：

~~~powershell
%JAVA_HOME%\bin
~~~

### 3.安装Android Studio

[首先下载和安装 Android Studio](https://developer.android.google.cn/studio/)

#### 1.SDK

安装SDK，打开 SDK Manager

- 选择"SDK Platforms"选项卡，然后在右下角勾选"Show Package Details"。展开`Android 14 (UpsideDownCake)`选项
  - 勾选`Android SDK Platform 34`
  - 勾选`Intel x86 Atom_64 System Image`（官方模拟器镜像文件，使用非官方模拟器不需要安装此组件
- 点击"SDK Tools"选项卡，同样勾中右下角的"Show Package Details"
  - 展开"Android SDK Build-Tools"选项，勾选必须的`34.0.0`版本
  - 勾选`Android Emulator`
  - 勾选`Android SDK Platform-Tools`

#### 2.配置环境变量

打开`控制面板` -> `系统和安全` -> `系统` -> `高级系统设置` -> `高级` -> `环境变量` -> `新建`，创建一个名为`ANDROID_HOME`的环境变量（系统或用户变量均可），指向你的 Android SDK 所在的目录

SDK 默认是安装在下面的目录：

```powershell
C:\Users\你的用户名\AppData\Local\Android\Sdk
```

把工具目录添加到环境变量Path

打开`控制面板` -> `系统和安全` -> `系统` -> `高级系统设置` -> `高级` -> `环境变量`，选中**Path**变量，然后点击**编辑**。点击**新建**然后把以下工具目录路径添加进去：

~~~powershell
%ANDROID_HOME%\platform-tools
~~~

~~~powershell
%ANDROID_HOME%\emulator
~~~

#### 3.中文配置

[中文语言包](https://plugins.jetbrains.com/plugin/13710-chinese-simplified-language-pack----/versions)

使用的是 AndroidStudio 2022.3.1 版本，那就下载 223.360 插件版本

在setting->plugins->设置图标->install plugin from disk，选择下在文件的lib文件夹内的jar文件

#### 4.导入文件到模拟器中

打卡android device manager，选中对应模拟器的打开操作栏，选择open in device explorer，选中sdcard文件夹，
点击上传文件图标，选择要上传的文件

## 二、gradle

是一个基于Apache Ant和Apache Maven概念的项目自动化构建开源工具。

### 1.gradle镜像源

替换 <APP_ROOT>/android/wrapper/gradle-wrapper.properties 文件中 distributionUrl 参数

默认：

~~~
https://services.gradle.org/distributions/
~~~

阿里云镜像：

~~~
https://mirrors.aliyun.com/macports/distfiles/gradle/
~~~

腾讯云镜像：

~~~
https://mirrors.cloud.tencent.com/gradle/
~~~

### 2.maven镜像源

用于加速项目依赖下载

android -> build.gradle

默认：

~~~
repositories {
    google()
    mavenCentral()
}
~~~

腾讯云镜像：

~~~
 maven { url 'https://mirrors.cloud.tencent.com/nexus/repository/maven-public/' }
~~~

阿里云镜像：

~~~
maven { url 'https://maven.aliyun.com/repository/public/' }
maven { url 'https://maven.aliyun.com/repository/central/' }
maven { url 'https://maven.aliyun.com/repository/jcenter/' }
maven { url 'https://maven.aliyun.com/repository/google/' }
maven { url 'https://maven.aliyun.com/repository/gradle-plugin/' }
~~~

