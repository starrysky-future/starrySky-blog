---
tag:
  - 问题记录
categories:
  - 日志
recommend: 1
top: 3
---

# 问题记录

## 一.前端问题

### 1.calc 不生效问题

在 less 中使用 calc，calc 需要加上~和引号，如：`clac(~"100vw - 14px")`

### 2.ios 时间 NaN

1. 时间格式为 2022-07-14,ios 中时间转换识别不了“-”需要将格式转为“/”，如：2022/07/14
2. 关于时间临界值：对于 00:00:00 和 24:00:00 这两个时间临界值, ios 会转成 NAN
3. 时间格式为 2022/07（年月）,这种在 ios 用 new Date 转换也会变成 NaN，需要补全日期

### 3.replaceAll 方法

低版本手机不支持 replaceAll 方法

### 4.eventBus 事件多次触发

eventBus.on 注册的页面作为模块多次复用会导致 eventBus.emit 时注册事件多次触发，如果需要事件只触发一次，可以将事件注册为全局唯一事件

![eventBus注册唯一事件](/workingDiary/frontEnd/error_eventbus_multiple.png)

### 5.vue3 的 css 使用 js 中变量出现 undefined

![error_css_var_undefined_web](/workingDiary/frontEnd/error_css_var_undefined_web.png)

![error_css_var_undefined_code](/workingDiary/frontEnd/error_css_var_undefined_code.png)

vue3 在 css 中引用 js 中的变量，找不到变量，原因是组件通过 Teleport 挂载到 app 元素下导致，改为在内联样式 style 中使用变量

### 6.eslint 行首尾的 cr 警告

行首尾的 cr 警告，设置 prettierrc 文件 endOfLine: auto

![error_endOfLine](/workingDiary/eslint/error_endOfLine.png)

### 7.selint 开启行尾分号

开启行尾分号在 prettierrc 文件加入 semi: true

![error_semi](/workingDiary/eslint/error_semi.png)

### 8.store 使用时 pinia 还未注册

![error_no_active_pinia](/workingDiary/frontEnd/error_no_active_pinia.png)

store 使用时 pinia 实例可能还没有注册给 app，因此需要在使用 store 的地方手动给 store 注入 pinia 实例，例：const setStore = useSetStore(pinia);

## 二.electron 问题

### 1.无法收到鼠标事件（window）

如果当前元素或上级元素设置了-webkit-app-region：drag 进行拖拽支持，那么就是导致当前元素无法收到鼠标事件

需要在当前元素设置-[webkit](https://so.csdn.net/so/search?q=webkit&spm=1001.2101.3001.7020)-app-region: no-drag 进行解决

### 2.打包报错'window.api' is of type 'unknown'

需要在 renderer 下的 env.d.ts 中去声明

```ts
declare global {
  interface Window {
    electron: ElectronAPI;
    api: any;
  }
}
```

### 3.background-image 图片不显示

触发内容安全策略

```js
Refused to load the image 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAARzQklUCAgICHwIZIgAAAYnSURBVGiB1ZpPbxvHGcZ/s1wulxRlaXcRNU4F1aUpFYLhwIGDFL24hwIBAufQqh8iOrbuzQoMoUDcU50e6y+h5AsECHxpAwSIEcMQSkpMIreJoXaXpGSJ/5Y7PZCidpekOMswQfIAA3J25nne950/OzO7K7gA7z99cQMpN5DiFsh1YOmi+jPEIYhdhHyEEDt/vJZ/PK6iGHXxwefedaHp28DGd+RgUuzIwN++86r9JF4wFMDfntbeCeDv01hxgyqu9HBldZAHcDSr9yssHGEP8kmhweYfri0+DF+LBPDgqXcXId5LKlzyK5S6FeX6jmaxlipMF4iUW3eu2ffPsoMA/rrrvSOmaPmSX6Hkf5HcEfqB6D9PHIiEzT+t2w+hH8CD3efXQf88iUjJ/4KS/...71Rb9OZ6TjZ5rT+CL+Uv94qpt5tdFhv3ZCtdGZhj6AlU3z+uWkj9bPoSOCQylF4pd3i1mdm9kFKtVTKtXTqYwXrBwFK5dozIchhDzUpWAXgqnfPhZsEyubolJtKvdGwcoOuEnHfBhSiF1dEDySgl9PrQJYOZ2buTwA1YZPxWtQbfiROj1noWCH91TfbisikI+0QAQ7g5VvBsnKpbi5nB8yVnBMCo45MzsISSCCHW0r/+ZjhNyRImCWKY6Z6wu5s5V/87EO4MvOdkpLJXqp/dG/4k/iJtQvXfzg9ze/SLYQ+oG/DaAB3MvffiI0udmbUKpp1lC3LTS5eS9/+8kgAIC75lsPpQi2lMfgrKFoV4pg66751uBtvRbWeDf79n0h2PyhBiAEm+9m374foY3S+nPrw+sptG35A/nYQ8BOl2D7Xua3kz/2COO99gc3ENoGklsSuQ7JV+zpIA8FYhfBI2Sws2X8buznNv8HRQ7I8Ouz4V4AAAAASUVORK5CYII=' because it violates the following Content Security Policy directive: "default-src 'self'". Note that 'img-src' was not explicitly set, so 'default-src' is used as a fallback.
```

设置 img-src 包含 data:内容

```js
<meta
  http-equiv="Content-Security-Policy"
  content="default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline';img-src 'self' data:"
/>
```

| 策略指令        | 策略说明                                                            |
| :-------------- | :------------------------------------------------------------------ |
| default-src     | 默认加载策略                                                        |
| script-src      | 外部脚本                                                            |
| style-src       | 样式表                                                              |
| img-src         | 图像                                                                |
| media-src       | 媒体文件（音频和视频）                                              |
| font-src        | 字体文件                                                            |
| object-src      | 插件（比如 Flash）                                                  |
| child-src       | 框架                                                                |
| frame-ancestors | 嵌入的外部资源（比如`<iframe>`、`<iframe>`、`<embed>`和`<applet>`） |
| connect-src     | HTTP 连接（通过 XHR、WebSockets、EventSource 等）                   |
| worker-src      | worker 脚本                                                         |
| manifest-src    | manifest 文件                                                       |

| 指令值                                                                             | 指令值说明                                                                                                                |
| :--------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------ |
| \*                                                                                 | 允许任何内容                                                                                                              |
| ‘none’                                                                             | 不允许任何内容                                                                                                            |
| ‘self’                                                                             | 允许来自相同来源的内容（相同的协议、域名和端口）                                                                          |
| data:                                                                              | 允许 data: 协议（如 base64 编码的图片）                                                                                   |
| 例子：[www.Google.com](https://link.juejin.im/?target=http%3A%2F%2Fwww.Google.com) | 允许加载指定域名的资源                                                                                                    |
| \*.Google.com                                                                      | 允许加载 [Google.com](https://link.juejin.im/?target=http%3A%2F%2FGoogle.com) 任何子域的资源                              |
| ‘unsafe-inline’                                                                    | 允许使用内联资源,如内联的 `<script>` 元素、javascript: URL、内联的事件处理函数和内联的 `<style>` 元素.两侧单引号是必须的. |
| ‘unsafe-eval’                                                                      | 允许使用`eval()`等通过字符串创建代码的方法。两侧单引号是必须的。                                                          |

### 4.electron 自定义安装路径

[electon-builder 文档](https://www.electron.build/configuration/nsis)

allowToChangeInstallationDirectory = `false`：允许改变安装路径，默认 false

开启需要将 oneClick 设置为 false

```yml
nsis:
	oneClick:false
	allowToChangeInstallationDirectory:true
```

### 5.vite-plugin-node-polyfills

加入 node 中的模块，如：crypto

### 6.跨域警告

```
webPreferences:{
	webSecurity:false
}
```

![error_webSecurity](/workingDiary/electron/error_webSecurity.png)

electron 开启跨域警告，在 vite.config 文件配置 process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'消除警告;

### 7.electron 的 hover 样式 bug

electron 的 hover 样式 bug：在最小化后再打开 app 发现最小化按钮的 hover 样式还存在着，使用动态加载 hover，在最小化时去除 hover 样式，然后监听最小化按钮的鼠标移动事件动态加入 hover

```vue
<div
      ref=""minDom""
      class=""min icon_position""
      :class=""{ minHover: hasHover }""
      @click=""changeWinState('min')""
    >
</div>
```

```vue
<script lang=""ts"" setup>
import { ref, VNodeRef } from 'vue';
const hasHover = ref<boolean>(true);
const minDom = ref<VNodeRef | null>(null);
const changeWinState = (operate: string): void => {
  if (operate === 'min') {
    hasHover.value = false;

    minDom.value.addEventListener('mousemove', () => {
      hasHover.value = true;
      minDom.value.removeEventListener('mousemove', () => {});
    });
  }

  window.api![operate]();
};
</script>
```

### 8.Cannot find module 'builder-util-runtime'

`electron-updater`自动升级报错

![builder-util-runtime](/workingDiary/electron/builder-util-runtime.png)

因为项目使用 `pnpm` 安装依赖，打完包后有些资源找不到，导致这种很奇怪的报错，改为 npm 安装

## 三.github Action 问题

[github 文档](https://docs.github.com/zh/actions/quickstart)

### 1.工作流：digital envelope routines::unsupported

```yml
[info] [webpackbar] Compiling Client
[info] [webpackbar] Compiling Server
/home/runner/work/blog/blog/node_modules/loader-runner/lib/LoaderRunner.js:114
			throw e;
			^

Error: error:0308010C:digital envelope routines::unsupported
    at new Hash (node:internal/crypto/hash:71:19)
    at Object.createHash (node:crypto:133:10)
    at module.exports (/home/runner/work/blog/blog/node_modules/webpack/lib/util/createHash.js:135:53)
    at NormalModule._initBuildHash (/home/runner/work/blog/blog/node_modules/webpack/lib/NormalModule.js:417:16)
    at handleParseError (/home/runner/work/blog/blog/node_modules/webpack/lib/NormalModule.js:471:10)
    at /home/runner/work/blog/blog/node_modules/webpack/lib/NormalModule.js:503:5
    at /home/runner/work/blog/blog/node_modules/webpack/lib/NormalModule.js:358:12
    at /home/runner/work/blog/blog/node_modules/loader-runner/lib/LoaderRunner.js:373:3
    at iterateNormalLoaders (/home/runner/work/blog/blog/node_modules/loader-runner/lib/LoaderRunner.js:214:10)
    at iterateNormalLoaders (/home/runner/work/blog/blog/node_modules/loader-runner/lib/LoaderRunner.js:221:10)
    at /home/runner/work/blog/blog/node_modules/loader-runner/lib/LoaderRunner.js:236:3
    at context.callback (/home/runner/work/blog/blog/node_modules/loader-runner/lib/LoaderRunner.js:111:13)
    at /home/runner/work/blog/blog/node_modules/cache-loader/dist/index.js:134:7
    at /home/runner/work/blog/blog/node_modules/graceful-fs/graceful-fs.js:61:14
    at FSReqCallback.oncomplete (node:fs:198:23) {
  opensslErrorStack: [ 'error:03000086:digital envelope routines::initialization error' ],
  library: 'digital envelope routines',
  reason: 'unsupported',
  code: 'ERR_OSSL_EVP_UNSUPPORTED'
}

Node.js v18.15.0
error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
Error: Process completed with exit code 1.
```

node 版本过高，deploy.yml 文件设置 node 的版本

```yml
# 设置 Node
- name: Setup Node
  uses: actions/setup-node@v3
  with:
    node-version: 16
```

### 2.工作流 release：创建 release 失败

```yml
Run softprops/action-gh-release@v1
  with:
    files: dist/**
    token: ***
  env:
    GITHUB_TOKEN:
⚠️ Unexpected error fetching GitHub release for tag refs/tags/v1.0.0: HttpError: Resource not accessible by integration
Error: Resource not accessible by integration
```

需要根据没有的 tags 创建 release

### 3.工作流 Cleanup artifacts for windows：删除文件失败

```yml
Run npx del-cli "dist/!(*.exe|*.dmg|latest*.yml)"
  npx del-cli "dist/!(*.exe|*.dmg|latest*.yml)"
  shell: C:\Program Files\PowerShell\7\pwsh.EXE -command ". '{0}'"
'*.dmg' is not recognized as an internal or external command,
operable program or batch file.
Error: Process completed with exit code 1.
```

需要在项目内安装 del-cli，package.json 文件

### 4.工作流 release：创建 release 403

```
Run softprops/action-gh-release@v1
  with:
    files: dist/**
    token: ***
  env:
    GITHUB_TOKEN:
👩‍🏭 Creating new GitHub release for tag v1.0.0...
⚠️ GitHub release failed with status: 403
undefined
retrying... (2 retries remaining)
👩‍🏭 Creating new GitHub release for tag v1.0.0...
⚠️ GitHub release failed with status: 403
undefined
retrying... (1 retries remaining)
👩‍🏭 Creating new GitHub release for tag v1.0.0...
⚠️ GitHub release failed with status: 403
undefined
retrying... (0 retries remaining)
❌ Too many retries. Aborting...
Error: Too many retries.
```

没有将 ACCESS_TOKEN 放入到项目的设置中

### 5.工作流 release：创建 release 404

```
Run softprops/action-gh-release@v1
  with:
    files: dist/**
    token: ***
  env:
    GITHUB_TOKEN: ***
👩‍🏭 Creating new GitHub release for tag v1.0.0...
⚠️ GitHub release failed with status: 404
undefined
retrying... (2 retries remaining)
👩‍🏭 Creating new GitHub release for tag v1.0.0...
⚠️ GitHub release failed with status: 404
undefined
retrying... (1 retries remaining)
👩‍🏭 Creating new GitHub release for tag v1.0.0...
⚠️ GitHub release failed with status: 404
undefined
retrying... (0 retries remaining)
❌ Too many retries. Aborting...
Error: Too many retries.
```

将 ACCESS_TOKEN 的 workflow 选项选上

### 6. C:\Users\runneradmin\AppData\Local\electron-builder\Cache\nsis\nsis-3.0.4.1\Bin\makensis.exe process failed ERR_ELECTRON_BUILDER_CANNOT_EXECUTE

```
⨯ C:\Users\runneradmin\AppData\Local\electron-builder\Cache\nsis\nsis-3.0.4.1\Bin\makensis.exe process failed ERR_ELECTRON_BUILDER_CANNOT_EXECUTE
Exit code:
1
Output:
Command line defined: "APP_ID=com.electron.app"
Command line defined: "APP_GUID=f8941786-352c-5c22-bea5-7886c3ac4a8f"
Command line defined: "UNINSTALL_APP_KEY=f8941786-352c-5c22-bea5-7886c3ac4a8f"
Command line defined: "PRODUCT_NAME=starrysky-music"
Command line defined: "PRODUCT_FILENAME=starrysky-music"
Command line defined: "APP_FILENAME=starrysky-music"
Command line defined: "APP_DESCRIPTION=??????"
Command line defined: "VERSION=1.0.0"
Command line defined: "PROJECT_DIR=D:\a\starrysky-music-desktop\starrysky-music-desktop"
Command line defined: "BUILD_RESOURCES_DIR=D:\a\starrysky-music-desktop\starrysky-music-desktop\build"
Command line defined: "APP_PACKAGE_NAME=starrysky-music-desktop"
Command line defined: "MUI_ICON=D:\a\starrysky-music-desktop\starrysky-music-desktop\resources\icon.ico"
Command line defined: "MUI_UNICON=D:\a\starrysky-music-desktop\starrysky-music-desktop\resources\icon.ico"
Command line defined: "APP_64=D:\a\starrysky-music-desktop\starrysky-music-desktop\dist\starrysky-music-desktop-1.0.0-x64.nsis.7z"
Command line defined: "APP_64_NAME=starrysky-music-desktop-1.0.0-x64.nsis.7z"
Command line defined: "APP_64_HASH=669243A0ED8C749B8E003F23EF44136096E315E9037BAF26A2ADEDDAC7E62F95A05AE04AA229650CC603FC614C1E792C036A54C4968A8DB40802336D6132B8B2"
Command line defined: "APP_64_UNPACKED_SIZE=343317"
Command line defined: "COMPANY_NAME=seven"
Command line defined: "APP_INSTALLER_STORE_FILE=starrysky-music-desktop-updater\installer.exe"
Command line defined: "COMPRESSION_METHOD=7z"
Command line defined: "MULTIUSER_INSTALLMODE_ALLOW_ELEVATION"
Command line defined: "INSTALL_MODE_PER_ALL_USERS_REQUIRED"
Command line defined: "allowToChangeInstallationDirectory"
Command line defined: "SHORTCUT_NAME=starrysky-music"
Command line defined: "UNINSTALL_DISPLAY_NAME=starrysky-music"
Command line defined: "RECREATE_DESKTOP_SHORTCUT"
Command line defined: "MUI_WELCOMEFINISHPAGE_BITMAP=${NSISDIR}\Contrib\Graphics\Wizard\nsis3-metro.bmp"
Command line defined: "MUI_UNWELCOMEFINISHPAGE_BITMAP=${NSISDIR}\Contrib\Graphics\Wizard\nsis3-metro.bmp"
Command line defined: "ESTIMATED_SIZE=343317"
Command line defined: "COMPRESS=auto"
Command line defined: "BUILD_UNINSTALLER"
Command line defined: "UNINSTALLER_OUT_FILE=D:\a\starrysky-music-desktop\starrysky-music-desktop\dist\__uninstaller-nsis-starrysky-music-desktop.exe"
Processing config: C:\Users\runneradmin\AppData\Local\electron-builder\Cache\nsis\nsis-3.0.4.1\nsisconf.nsh
Processing script file: "<stdin>" (UTF8)

Error output:
!include: could not open file: "D:\a\starrysky-music-desktop\starrysky-music-desktop\node_modules\.pnpm\app-builder-lib@24.13.3_dmg-builder@24.13.3_electron-builder-squirrel-windows@24.13.3_dmg-bui_lrspnoputfiosacwyigcypdbdi\node_modules\app-builder-lib\templates\nsis\include\allowOnlyOneInstallerInstance.nsh"
Error in script "<stdin>" on line 88 -- aborting creation process
  failedTask=build stackTrace=Error: C:\Users\runneradmin\AppData\Local\electron-builder\Cache\nsis\nsis-3.0.4.1\Bin\makensis.exe process failed ERR_ELECTRON_BUILDER_CANNOT_EXECUTE
Exit code:
1
Output:
Command line defined: "APP_ID=com.electron.app"
Command line defined: "APP_GUID=f8941786-352c-5c22-bea5-7886c3ac4a8f"
Command line defined: "UNINSTALL_APP_KEY=f8941786-352c-5c22-bea5-7886c3ac4a8f"
Command line defined: "PRODUCT_NAME=starrysky-music"
Command line defined: "PRODUCT_FILENAME=starrysky-music"
Command line defined: "APP_FILENAME=starrysky-music"
Command line defined: "APP_DESCRIPTION=??????"
Command line defined: "VERSION=1.0.0"
Command line defined: "PROJECT_DIR=D:\a\starrysky-music-desktop\starrysky-music-desktop"
Command line defined: "BUILD_RESOURCES_DIR=D:\a\starrysky-music-desktop\starrysky-music-desktop\build"
Command line defined: "APP_PACKAGE_NAME=starrysky-music-desktop"
Command line defined: "MUI_ICON=D:\a\starrysky-music-desktop\starrysky-music-desktop\resources\icon.ico"
Command line defined: "MUI_UNICON=D:\a\starrysky-music-desktop\starrysky-music-desktop\resources\icon.ico"
Command line defined: "APP_64=D:\a\starrysky-music-desktop\starrysky-music-desktop\dist\starrysky-music-desktop-1.0.0-x64.nsis.7z"
Command line defined: "APP_64_NAME=starrysky-music-desktop-1.0.0-x64.nsis.7z"
Command line defined: "APP_64_HASH=669243A0ED8C749B8E003F23EF44136096E315E9037BAF26A2ADEDDAC7E62F95A05AE04AA229650CC603FC614C1E792C036A54C4968A8DB40802336D6132B8B2"
Command line defined: "APP_64_UNPACKED_SIZE=343317"
Command line defined: "COMPANY_NAME=seven"
Command line defined: "APP_INSTALLER_STORE_FILE=starrysky-music-desktop-updater\installer.exe"
Command line defined: "COMPRESSION_METHOD=7z"
Command line defined: "MULTIUSER_INSTALLMODE_ALLOW_ELEVATION"
Command line defined: "INSTALL_MODE_PER_ALL_USERS_REQUIRED"
Command line defined: "allowToChangeInstallationDirectory"
Command line defined: "SHORTCUT_NAME=starrysky-music"
Command line defined: "UNINSTALL_DISPLAY_NAME=starrysky-music"
Command line defined: "RECREATE_DESKTOP_SHORTCUT"
Command line defined: "MUI_WELCOMEFINISHPAGE_BITMAP=${NSISDIR}\Contrib\Graphics\Wizard\nsis3-metro.bmp"
Command line defined: "MUI_UNWELCOMEFINISHPAGE_BITMAP=${NSISDIR}\Contrib\Graphics\Wizard\nsis3-metro.bmp"
Command line defined: "ESTIMATED_SIZE=343317"
Command line defined: "COMPRESS=auto"
Command line defined: "BUILD_UNINSTALLER"
Command line defined: "UNINSTALLER_OUT_FILE=D:\a\starrysky-music-desktop\starrysky-music-desktop\dist\__uninstaller-nsis-starrysky-music-desktop.exe"
Processing config: C:\Users\runneradmin\AppData\Local\electron-builder\Cache\nsis\nsis-3.0.4.1\nsisconf.nsh
Processing script file: "<stdin>" (UTF8)
                                                                        Error output:
!include: could not open file: "D:\a\starrysky-music-desktop\starrysky-music-desktop\node_modules\.pnpm\app-builder-lib@24.13.3_dmg-builder@24.13.3_electron-builder-squirrel-windows@24.13.3_dmg-bui_lrspnoputfiosacwyigcypdbdi\node_modules\app-builder-lib\templates\nsis\include\allowOnlyOneInstallerInstance.nsh"
Error in script "<stdin>" on line 88 -- aborting creation process
                                                                        at ChildProcess.<anonymous> (D:\a\starrysky-music-desktop\starrysky-music-desktop\node_modules\.pnpm\builder-util@24.13.1\node_modules\builder-util\src\util.ts:252:14)
    at Object.onceWrapper (node:events:632:26)
    at ChildProcess.emit (node:events:517:28)
    at ChildProcess.cp.emit (D:\a\starrysky-music-desktop\starrysky-music-desktop\node_modules\.pnpm\cross-spawn@7.0.3\node_modules\cross-spawn\lib\enoent.js:34:29)
    at maybeClose (node:internal/child_process:1098:16)
    at Process.ChildProcess._handle.onexit (node:internal/child_process:303:5)
 ELIFECYCLE  Command failed with exit code 1.
Error: Process completed with exit code 1.
```

升级 electron 30 后 electron-builder 需要降级到 24.9.1，这个冲突只影响 action, 本地构建没事，将 electron-builder 锁定 24.9.1。

## 四.docker 问题

### 1.wsl 的更新下载

1. 启用 Windows 的 Linux 子系统：我的电脑右键-->属性-->系统组件-->程序和功能-->启动或关闭 win 功能：启动虚拟机平台和适用于 Linux 的 win 子系统
2. 安装更新 wsl2：https://wslstorestorage.blob.core.windows.net/wslblob/wsl_update_x64.msi

### 2.通过 docker-compose 部署 process.env.NODE_ENV:undefined

需要设置环境变量
services:
app:
environment:

 - NODE_ENV=production

## 五.Minio 问题

### 1.无法启动一直 Adding local Minio host to 'mc' configuration

账号密码长度太短，账号长度必须大于等于 5，密码长度必须大于等于 8 位

### 2.文件上传后回显 403 Forbidden && AccessDenied

进入 minIo 控制台，将 buckets 中 access Policy 改为 public

### 3.buckets 中 access Policy 改为 public,文件还是 403 Forbidden

通过 presignedGetObject 获取的 url 接有参数检验，去除问好后面内容

## 六.typeorm 问题

### 1.npm run migration:generate 时会出现部分 entity cannot find module 问题

entity 内使用的绝对路径找不到模块，使用相对路径解决

### 2.npm run migration:generate 时出现 No changes in database schema were fou. To create a new empty migration use "typeorm migration:create" command

dev 数据库已经建表，导出数据删表执行

## 七.Nginx 问题

### 1.Request Entity Too Large

nginx 限制了上传数据的大小。打开 nginx 主配置文件 nginx.conf，一般在/usr/local/nginx/conf/nginx.conf 这个位置，找到 http{}段，修改或者添加：client_max_body_size 2m;

## 八、React Native问题

### 1.Cannot find JAR 'kotlin-compiler-embeddable-1.9.0.jar' required by module 'gradle-kotlin-dsl' using classpath or distribution directory 'C:\Users\Administrator\.gradle\wrapper\dists\gradle-8.3-all\6en3ugtfdg5xnpx44z4qbwgas\gradle-8.3'

将gradle-8.3-al整个文件夹删除，重新下载就好了

### 2.Gradle构建失败，找不到keystore.properties

这个文件通常用于存储应用程序的签名信息，包括密钥库路径、密钥库密码等。下载其他人的项目，这个文件因为信息问题
不会上传的
将android==>app==>build.gradle文件内的这几行代码进行屏蔽：

~~~
// keystoreProperties.load(new FileInputStream(keystorePropertiesFile))
// storeFile file(keystoreProperties['storeFile'])
// storePassword keystoreProperties['storePassword']
// keyAlias keystoreProperties['keyAlias']
// keyPassword keystoreProperties['keyPassword']
~~~

### 3.Gradle构建失败，Failed to apply plugin 'org.jetbrains.kotlin.jvm'.

C:\Users\Administrator\.gradle\caches\jars-9内的文件缺失，删除重下

## 九、git问题

### 1. git 推送push代码出现github远程分支拒绝error: GH013: Repository rule violations found for refs/heads/main.

~~~
Enumerating objects: 218, done.
Counting objects: 100% (218/218), done.
Delta compression using up to 8 threads
Compressing objects: 100% (209/209), done.
Writing objects: 100% (210/210), 696.63 KiB | 5.20 MiB/s, done.
Total 210 (delta 13), reused 0 (delta 0), pack-reused 0 (from 0)
remote: Resolving deltas: 100% (13/13), completed with 6 local objects.
remote: error: GH013: Repository rule violations found for refs/heads/main.
remote: 
remote: - GITHUB PUSH PROTECTION
remote:   —————————————————————————————————————————
remote:     Resolve the following violations before pushing again
remote:
remote:     - Push cannot contain secrets
remote:
remote:
remote:      (?) Learn how to resolve a blocked push
remote:      https://docs.github.com/code-security/secret-scanning/working-with-secret-scanning-and-push-protection/working-with-push-protection-from-the-command-line#resolving-a-blocked-push
remote:
remote:
remote:       —— Google OAuth Client ID ————————————————————————————
remote:        locations:
remote:          - commit: e558858dd4f264a222e09136c4c7669e30fbbfbc
remote:            path: docs/node/nestJsCheats2.0/75.passport 实现 Google 三方账号登录.md:106
remote:
remote:        (?) To push, remove secret from commit(s) or follow this URL to allow the secret.
remote:        https://github.com/starrysky-future/starrySky-blog/security/secret-scanning/unblock-secret/2oIes6iSzXAPXDSXjnnHGPalZMz       
remote:
remote:
remote:       —— Google OAuth Client Secret ————————————————————————
remote:        locations:
remote:          - commit: e558858dd4f264a222e09136c4c7669e30fbbfbc
remote:            path: docs/node/nestJsCheats2.0/75.passport 实现 Google 三方账号登录.md:107
remote:
remote:        (?) To push, remove secret from commit(s) or follow this URL to allow the secret.
remote:        https://github.com/starrysky-future/starrySky-blog/security/secret-scanning/unblock-secret/2oIes3uZW5uvtc7Kesq0OwxQu5V       
remote:
remote:
remote:       —— Google OAuth Client ID ————————————————————————————
remote:        locations:
remote:          - commit: e558858dd4f264a222e09136c4c7669e30fbbfbc
remote:            path: docs/node/nestJsCheats2.0/133.会议室预定系统：Google 账号登录后端开发.md:196
remote:
remote:        (?) To push, remove secret from commit(s) or follow this URL to allow the secret.
remote:        https://github.com/starrysky-future/starrySky-blog/security/secret-scanning/unblock-secret/2oIes6e26D3W89qK6wQf3vGtLsW       
remote:
remote:
remote:       —— Google OAuth Client Secret ————————————————————————
remote:        locations:
remote:          - commit: e558858dd4f264a222e09136c4c7669e30fbbfbc
remote:            path: docs/node/nestJsCheats2.0/133.会议室预定系统：Google 账号登录后端开发.md:197
remote:
remote:        (?) To push, remove secret from commit(s) or follow this URL to allow the secret.
remote:        https://github.com/starrysky-future/starrySky-blog/security/secret-scanning/unblock-secret/2oIes6aZGuxLClq7nCtCNkog1s4       
remote:
remote:
remote:       —— Alibaba Cloud AccessKey ID ————————————————————————
remote:        locations:
remote:          - commit: e558858dd4f264a222e09136c4c7669e30fbbfbc
remote:            path: docs/node/nestJsCheats2.0/35.最完美的 OSS 上传方案.md:308
remote:          - commit: e558858dd4f264a222e09136c4c7669e30fbbfbc
remote:            path: docs/node/nestJsCheats2.0/35.最完美的 OSS 上传方案.md:367
remote:
remote:        (?) To push, remove secret from commit(s) or follow this URL to allow the secret.
remote:        https://github.com/starrysky-future/starrySky-blog/security/secret-scanning/unblock-secret/2oIes3QP0sMrG0jubCmffTxnoyo       
remote:
remote:
remote:     ——[ WARNING ]—————————————————————————————————————————
remote:      1 more secrets detected. Remove each secret from your commit history to view more detections.
remote:      https://docs.github.com/code-security/secret-scanning/using-advanced-secret-scanning-and-push-protection-features/excluding-folders-and-files-from-secret-scanning
remote:     ——————————————————————————————————————————————————————
remote:
remote:
To https://github.com/starrysky-future/starrySky-blog.git
 ! [remote rejected] main -> main (push declined due to repository rule violations)
error: failed to push some refs to 'https://github.com/starrysky-future/starrySky-blog.git'
~~~

这是因为github的保护机制引起的，代码中有一些重要的key可能会泄露

解决方法：

1. 删除代码里面定义的secret相关的值，重新commit，再push
2. 修改仓库的配置关闭secret检测
   1. 单个仓库的设置：Settings-->Code security-->Secret scanning
   2. 个人的设置：Settings-->Code security-->Push protection for yourself
3. 通过push提示给出的访问链接进行许可添加
