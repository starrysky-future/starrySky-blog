---
tag: nodejs
categories:
  - node
recommend: 1
---

# Node.js

[Node.js 中文文档](https://www.nodeapp.cn/)

Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行环境。 Node.js 使用了一个事件驱动、非阻塞式 I/O 的模型，使其轻量又高效。

## 事件驱动程序

大多数 Node.js 核心 API 都采用惯用的异步事件驱动架构，其中某些类型的对象（触发器）会周期性地触发命名事件来调用函数对象（监听器）。

根据设计模式中观察者模式实现，每个异步事件都生成一个事件的观察值，如果有事件发生就调用该回调函数，监听器函数可以使用 `setImmediate()` 或 `process.nextTick()` 方法切换到异步操作模式

## 非阻塞式 I/O

可以将一些相应的逻辑处理程序放入回调中去执行，这样就不会阻塞后面的代码。例如，可以一边读取文件，一边执行其他命令，在文件读取完毕后，将文件内容作为回调的参数给到回调函数，这样这样在执行代码时就没有阻塞或等待文件 `I/O` 操作

## Buffer (缓冲)

在 ES6 引入 TypeArray 之前，Javascript 语言没有读取或操作二进制数据流的机制。Buffer 被引入，用来在 TCP 流或文件系统操作等中处理二进制数据流。

Buffer 类的实例类似于整数数组，大小是固定的、且在 V8 堆外分配物理内存，大小在被创建时确定，且无法调整。

```js
// 创建一个长度为 10、且用 0 填充的 Buffer。
const buf1 = Buffer.alloc(10);

// 创建一个长度为 10、且用 0x1 填充的 Buffer。
const buf2 = Buffer.alloc(10, 1);

// 创建一个长度为 10、且未初始化的 Buffer。
// 这个方法比调用 Buffer.alloc() 更快，
// 但返回的 Buffer 实例可能包含旧数据，
// 因此需要使用 fill() 或 write() 重写。
const buf3 = Buffer.allocUnsafe(10);

// 创建一个包含 [0x1, 0x2, 0x3] 的 Buffer。
const buf4 = Buffer.from([1, 2, 3]);

// 创建一个包含 UTF-8 字节 [0x74, 0xc3, 0xa9, 0x73, 0x74] 的 Buffer。
const buf5 = Buffer.from("tést");

// 创建一个包含 Latin-1 字节 [0x74, 0xe9, 0x73, 0x74] 的 Buffer。
const buf6 = Buffer.from("tést", "latin1");
```

为了使 `Buffer` 实例的创建更可靠、更不容易出错，各种 `new Buffer()` 构造函数已被 **废弃**，并由 `Buffer.from()`、`Buffer.alloc()`、和 `Buffer.allocUnsafe()` 方法替代。

- [`Buffer.from(array)`](https://www.nodeapp.cn/buffer.html#buffer_class_method_buffer_from_array) 返回一个新建的包含所提供的字节数组的副本的 `Buffer`。
- \[`Buffer.from(arrayBuffer[, byteOffset [, length]])`\][`Buffer.from(arrayBuffer)`](https://www.nodeapp.cn/buffer.html#buffer_class_method_buffer_from_arraybuffer_byteoffset_length) 返回一个新建的与给定的 [`ArrayBuffer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) 共享同一内存的 `Buffer`。
- [`Buffer.from(buffer)`](https://www.nodeapp.cn/buffer.html#buffer_class_method_buffer_from_buffer) 返回一个新建的包含所提供的 `Buffer` 的内容的副本的 `Buffer`。
- [`Buffer.from(string[, encoding])`](https://www.nodeapp.cn/buffer.html#buffer_class_method_buffer_from_string_encoding) 返回一个新建的包含所提供的字符串的副本的 `Buffer`。
- \[`Buffer.alloc(size[, fill[, encoding]])`\][`Buffer.alloc()`](https://www.nodeapp.cn/buffer.html#buffer_class_method_buffer_alloc_size_fill_encoding) 返回一个指定大小的被填满的 `Buffer` 实例。 这个方法会明显地比 [`Buffer.allocUnsafe(size)`](https://www.nodeapp.cn/buffer.html#buffer_class_method_buffer_allocunsafe_size) 慢，但可确保新创建的 `Buffer` 实例绝不会包含旧的和潜在的敏感数据。
- [`Buffer.allocUnsafe(size)`](https://www.nodeapp.cn/buffer.html#buffer_class_method_buffer_allocunsafe_size) 与 [`Buffer.allocUnsafeSlow(size)`](https://www.nodeapp.cn/buffer.html#buffer_class_method_buffer_allocunsafeslow_size) 返回一个新建的指定 `size` 的 `Buffer`，但它的内容**必须**被初始化，可以使用 [`buf.fill(0)`](https://www.nodeapp.cn/buffer.html#buffer_buf_fill_value_offset_end_encoding) 或完全写满。

如果 `size` 小于或等于 [`Buffer.poolSize`](https://www.nodeapp.cn/buffer.html#buffer_class_property_buffer_poolsize) 的一半，则 [`Buffer.allocUnsafe()`](https://www.nodeapp.cn/buffer.html#buffer_class_method_buffer_allocunsafe_size) 返回的 `Buffer` 实例**可能**会被分配进一个共享的内部内存池。

## stream(流)

### 管道流

用于从一个流中获取数据，并将数据传输到另一个流中。

```js
const fs = require("fs");
// 创建可读流
const readerStream = fs.createReadStream("./package.json");
// 创建可写流
const writerStream = fs.createWriteStream("./test.txt");
// 设置编码为utf8
readerStream.pipe(writerStream);
console.log("执行完毕");
```

### 链式流

链式是通过连接输出流到另外一个流并创建多个流操作链的机制。

```js
const fs = require("fs");
const zlib = require("zlib");
// 压缩test.txt为test.zip
fs.createReadStream("./test.txt")
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream("test.txt.zip"));
console.log("文件压缩成功");
```

## 模块

### 1.fs

`fs` 模块是文件系统模块（File System module）的缩写，它提供了与文件系统进行交互的各种功能。通过 `fs` 模块，你可以执行诸如读取文件、写入文件、更改文件权限、创建目录等操作，`Node.js 核心API之一`。

#### 1.打开文件

异步地打开文件

```js
fs.open(path, flags, mode, callback);
```

- path：string|Buffer|URL - 文件的路径

- flags - 文件打开的行为

- mode - 设置文件模式(权限)，文件创建默认权限为 0666(可读，可写)

- callback - 回调函数，带有两个参数如：callback(err, fd)

flags 参数可以是以下值：

| **Flag** | **描述**                                               |
| -------- | ------------------------------------------------------ |
| **r**    | 以读取模式打开文件。如果文件不存在抛出异常。           |
| **r+**   | 以读写模式打开文件。如果文件不存在抛出异常。           |
| **rs**   | 以同步的方式读取文件。                                 |
| **rs+**  | 以同步的方式读取和写入文件。                           |
| **w**    | 以写入模式打开文件，如果文件不存在则创建。             |
| **wx**   | 类似 'w'，但是如果文件路径存在，则文件写入失败。       |
| **w+**   | 以读写模式打开文件，如果文件不存在则创建。             |
| **wx+**  | 类似 'w+'， 但是如果文件路径存在，则文件读写失败。     |
| **a**    | 以追加模式打开文件，如果文件不存在则创建。             |
| **ax**   | 类似 'a'， 但是如果文件路径存在，则文件追加失败。      |
| **a+**   | 以读取追加模式打开文件，如果文件不存在则创建。         |
| **ax+**  | 类似 'a+'， 但是如果文件路径存在，则文件读取追加失败。 |

#### 2.写入文件

```js
fs.writeFile(file, data, options, callback);
```

异步地写入数据到文件，如果文件已经存在，则替代文件。 `data` 可以是一个字符串或一个 buffer。

- **file** ：string|Buffer|URL|integer- 文件名或文件描述符。

- **data** - 要写入文件的数据，可以是 String(字符串) 或 Buffer(流) 对象。

- **options** - 该参数是一个对象，包含 {encoding, mode, flag}。默认编码为 utf8, 模式为 0666 ， flag 为 'w'

- **callback** - 回调函数，回调函数只包含错误信息参数(err)，在写入失败时返回。

如果 `data` 是一个 buffer，则忽略 `encoding` 选项。它默认为 `'utf8'`。

```js
fs.writeFile("message.txt", "Hello Node.js", (err) => {
  if (err) throw err;
  console.log("The file has been saved!");
});
```

> 注意：如果 `file` 指定为一个文件描述符，则它不会被自动关闭。多次对同一文件使用 `fs.writeFile` 且不等待回调，是不安全的。 对于这种情况，强烈推荐使用 `fs.createWriteStream`。

#### 3.读取文件

```js
fs.read(fd, buffer, offset, length, position, callback);
```

- `fd`
- `buffer`
- `offset`
- `length`
- `position`
- `callback`
  - `err`
  - `bytesRead`
  - `buffer`

从 `fd` 指定的文件中读取数据。

`buffer` 是数据将被写入到的 buffer。

`offset` 是 buffer 中开始写入的偏移量。

`length` 是一个整数，指定要读取的字节数。

`position` 指定从文件中开始读取的位置。 如果 `position` 为 `null`，则数据从当前文件读取位置开始读取，且文件读取位置会被更新。 如果 `position` 为一个整数，则文件读取位置保持不变。

回调有三个参数 `(err, bytesRead, buffer)`。

如果调用该方法的 [`util.promisify()`](https://www.nodeapp.cn/util.html#util_util_promisify_original) 版本，将会返回一个包含 `bytesRead` 和 `buffer` 属性的 Promise。

#### 4.关闭文件

```js
fs.close(fd, callback);
```

- `fd`
- `callback`
  - `err`

完成回调只有一个可能的异常参数。

#### 5.截取文件

```js
fs.ftruncate(fd[, len], callback)
```

- `fd`
- `len` 默认 = `0`
- `callback`
  - `err`

完成回调只有一个可能的异常参数。

如果文件描述符指向的文件大于 `len` 个字节，则只有前面 `len` 个字节会保留在文件中。

```js
console.log(fs.readFileSync("temp.txt", "utf8"));
// 输出: Node.js

// 获取要截断的文件的文件描述符
const fd = fs.openSync("temp.txt", "r+");

// 截断文件至前4个字节
fs.ftruncate(fd, 4, (err) => {
  assert.ifError(err);
  console.log(fs.readFileSync("temp.txt", "utf8"));
});
// 输出: Node
```

如果前面的文件小于 `len` 个字节，则扩展文件，且扩展的部分用空字节（'\0'）填充。

```js
console.log(fs.readFileSync("temp.txt", "utf8"));
// 输出: Node.js

// 获取要截断的文件的文件描述符
const fd = fs.openSync("temp.txt", "r+");

// 截断文件至前10个字节，但实际大小是7个字节
fs.ftruncate(fd, 10, (err) => {
  assert.ifError(err);
  console.log(fs.readFileSync("temp.txt"));
});
// 输出: <Buffer 4e 6f 64 65 2e 6a 73 00 00 00>
// ('Node.js\0\0\0' in UTF8)
```

#### 6.删除文件

```js
fs.rm(path, callback);
```

#### 7.创建目录

```js
fs.mkdir(path[, mode], callback)
```

- `path`
- `mode` **Default:** `0o777`
- `callback`
  - `err`

异步地创建目录。 完成回调只有一个可能的异常参数。 `mode` 默认为 `0o777`。

#### 8.读取目录

```js
fs.readdir(path[, options], callback)
```

- `path`
- `options`
  - `encoding` 默认 = `'utf8'`
- `callback`
  - `err`
  - `files`

读取一个目录的内容。 回调有两个参数 `(err, files)`，其中 `files` 是目录中不包括 `'.'` 和 `'..'` 的文件名的数组

#### 9.删除目录

```js
fs.rmdir(path, callback);
```

- **path** - 文件路径。
- **callback** - 回调函数，没有参数
  - err

完成回调只有一个可能的异常参数。

#### 异步代码同步化

##### 1.promise

```js
const { promisify } = require("util");
const readFile = promisify(fs.readFile);
readFile("./01-runnode.js").then((data) => console.log(data));
```

##### 2.Promises API（node 版本在 10.0 以上）

```js
const { promises } = require("fs");
promises.readFile("./01-runnode.js").then((data) => console.log(data));
```

##### 3.generator

```js
const fs = require("fs");
const { promisify } = require("util");
const readFile = promisify(fs.readFile);

function* read() {
  yield readFile("./01-runnode.js");
}
let ge = read();
ge.next().value.then((data) => {
  console.log(data);
});
```

##### 4.async

```js
const fs = require("fs");
const { promisify } = require("util");
const readFile = promisify(fs.readFile);

async function asyncReadFile() {
  let a = await readFile("./01-runnode.js");
  console.log(a.toString());
}
asyncReadFile();
```

#### 10.硬链接 和 软连接

```js
fs.linkSync("./index.txt", "./index2.txt"); //硬链接

fs.symlinkSync("./index.txt", "./index3.txt", "file"); //软连接
```

硬链接的作用和用途如下：

1. 文件共享：硬链接允许多个文件名指向同一个文件，这样可以在不同的位置使用不同的文件名引用相同的内容。这样的共享文件可以节省存储空间，并且在多个位置对文件的修改会反映在所有引用文件上。

2. 文件备份：通过创建硬链接，可以在不复制文件的情况下创建文件的备份。如果原始文件发生更改，备份文件也会自动更新。这样可以节省磁盘空间，并确保备份文件与原始文件保持同步。
3. 文件重命名：通过创建硬链接，可以为文件创建一个新的文件名，而无需复制或移动文件。这对于需要更改文件名但保持相同内容和属性的场景非常有用。

软链接的一些特点和用途如下：

1. 软链接可以创建指向文件或目录的引用。这使得你可以在不复制或移动文件的情况下引用它们，并在不同位置使用不同的文件名访问相同的内容。
2. 软链接可以用于创建快捷方式或别名，使得你可以通过一个简短或易记的路径来访问复杂或深层次的目录结构。
3. 软链接可以用于解决文件或目录的位置变化问题。如果目标文件或目录被移动或重命名，只需更新软链接的目标路径即可，而不需要修改引用该文件或目录的其他代码。

### 2.path

#### 1.path.basename

获取给定路径的最后一部分

```js
path.basename("C:\tempmyfile.html");
// 返回myfile.html

特殊情况: posix需要对应操作系统的方法;
path.win32.basename("C:\tempmyfile.html");
```

#### 2.path.dirname

获取给定路径的文件目录路径

```js
path.dirname("/aaaa/bbbb/cccc/index.html");
// 返回/aaaa/bbbb/cccc/
```

#### 3.path.extname

返回扩展名

```js
path.dirname("/aaaa/bbbb/cccc/index.html");
// 返回.html
```

#### 4.path.join

拼接路径

```js
path.join("/aaa", "/bbb", "/ccc");
// 返回 /aaa/bbb/ccc
```

#### 5.path.resolve

将相对路径解析并且返回`绝对路径`

如果传入了多个绝对路径 它将返回最右边的绝对路径

```js
path.resolve("/aaa", "/bbb", "/ccc");
//返回 /ccc
```

传入绝对路径 + 相对路径

```js
path.resolve(__dirname, "./index.js");
//返回 /User/xiaoman/DeskTop/node/index.js
```

如果只传入相对路径

```js
path.resolve("./index.js");
// 返回工作目录 + index.js
```

#### 6.path.parse&&path.format

`parse`

用于解析文件路径。它接受一个路径字符串作为输入，并返回一个包含路径各个组成部分的对象

```js
path.parse('/home/user/dir/file.txt')

{
  root: '/',
  dir: '/home/user/dir',
  base: 'file.txt',
  ext: '.txt',
  name: 'file'
}
```

- `root`：路径的根目录，即 `/`。
- `dir`：文件所在的目录，即 `/home/user/documents`。
- `base`：文件名，即 `file.txt`。
- `ext`：文件扩展名，即 `.txt`。
- `name`：文件名去除扩展名，即 `file`。

format 正好相反 在把对象转回字符串

```js
path.format({
  root: "/",
  dir: "/home/user/documents",
  base: "file.txt",
  ext: ".txt",
  name: "file",
});
// /home/user/dir/file.txt
```

### 3.os

Nodejs os 模块可以跟操作系统进行交互

| **API**           | **作用**                                                                                                                                                                      |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **os.type()**     | 它在 Linux 上返回 `'Linux'`，在 macOS 上返回 `'Darwin'`，在 Windows 上返回 `'Windows_NT'`                                                                                     |
| **os.platform()** | 返回标识为其编译 Node.js 二进制文件的操作系统平台的字符串。 该值在编译时设置。 可能的值为 `'aix'`、`'darwin'`、`'freebsd'`、`'linux'`、`'openbsd'`、`'sunos'`、以及 `'win32'` |
| **os.release()**  | 返回操作系统的版本例如 10.xxxx win10                                                                                                                                          |
| **os.homedir()**  | 返回用户目录 例如 c:\user\xiaoman 原理就是 windows `echo %USERPROFILE% `posix $HOME                                                                                           |
| **os.arch()**     | 返回 cpu 的架构 可能的值为 `'arm'`、`'arm64'`、`'ia32'`、`'mips'`、`'mipsel'`、`'ppc'`、`'ppc64'`、`'s390'`、`'s390x'`、以及 `'x64'`                                          |

#### 获取 CPU 的线程以及详细信息

```js
const os = require('node:os')
os.cpus()


[
  {
    model: 'Intel(R) Core(TM) i7 CPU         860  @ 2.80GHz',
    speed: 2926,
    times: {
      user: 252020,
      nice: 0,
      sys: 30340,
      idle: 1070356870,
      irq: 0,
    },
  },
  ...
]
```

- model: 表示 CPU 的型号信息，其中 “Intel® Core™ i7 CPU 860 @ 2.80GHz” 是一种具体的型号描述。

- speed: 表示 CPU 的时钟速度，以 MHz 或 GHz 为单位。在这种情况下，速度为 2926 MHz 或 2.926 GHz。

- times: 是一个包含 CPU 使用时间的对象，其中包含以下属性：

  - user: 表示 CPU 被用户程序使用的时间（以毫秒为单位）。

  - nice: 表示 CPU 被优先级较低的用户程序使用的时间（以毫秒为单位）。

  - sys: 表示 CPU 被系统内核使用的时间（以毫秒为单位）。

  - idle: 表示 CPU 处于空闲状态的时间（以毫秒为单位）。

  - irq: 表示 CPU 被硬件中断处理程序使用的时间（以毫秒为单位）。

#### 获取网络信息

```js
const os = require("node:os");
os.networkInterfaces();
```

```js
{
  lo: [
    {
      address: '127.0.0.1',
      netmask: '255.0.0.0',
      family: 'IPv4',
      mac: '00:00:00:00:00:00',
      internal: true,
      cidr: '127.0.0.1/8'
    },
    {
      address: '::1',
      netmask: 'ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff',
      family: 'IPv6',
      mac: '00:00:00:00:00:00',
      scopeid: 0,
      internal: true,
      cidr: '::1/128'
    }
  ],
  eth0: [
    {
      address: '192.168.1.108',
      netmask: '255.255.255.0',
      family: 'IPv4',
      mac: '01:02:03:0a:0b:0c',
      internal: false,
      cidr: '192.168.1.108/24'
    },
    {
      address: 'fe80::a00:27ff:fe4e:66a1',
      netmask: 'ffff:ffff:ffff:ffff::',
      family: 'IPv6',
      mac: '01:02:03:0a:0b:0c',
      scopeid: 1,
      internal: false,
      cidr: 'fe80::a00:27ff:fe4e:66a1/64'
    }
  ]
}
```

- address: 表示本地回环接口的 IP 地址，这里是 '127.0.0.1'。

- netmask: 表示本地回环接口的子网掩码，这里是 '255.0.0.0'。
- family: 表示地址族（address family），这里是 'IPv4'，表示 IPv4 地址。
- mac: 表示本地回环接口的 MAC 地址，这里是 '00:00:00:00:00:00'。请注意，本地回环接口通常不涉及硬件，因此 MAC 地址通常为全零。
- internal: 表示本地回环接口是否是内部接口，这里是 true，表示它是一个内部接口。
- cidr: 表示本地回环接口的 CIDR 表示法，即网络地址和子网掩码的组合，这里是 '127.0.0.1/8'，表示整个 127.0.0.0 网络。

```js
const os = require("os");
// 系统内存总量
console.log(os.totalmem());
// 操作系统空闲内存量
console.log(os.freemem());

const mem = (os.freemem() / os.totalmem()) * 100;
console.log(`内存占有率${mem}%`);
```

### 4.process

`process` 是 Nodejs 操作当前进程和控制当前进程的 API，并且是挂载到 globalThis 下面的全局 API

1. process.arch
   返回操作系统 CPU 架构 跟我们之前讲的 os.arch 一样
   'arm'、'arm64'、'ia32'、'mips'、'mipsel'、'ppc'、'ppc64'、's390'、's390x'、以及 'x64'

2. process.cwd()
   返回当前的工作目录 例如在 F:\project\node> 执行的脚本就返回这个目录 也可以和 path 拼接代替\_\_dirname 使用

3. process.argv

获取执行进程后面的参数 返回是一个数组

4. process.memoryUsage

用于获取当前进程的内存使用情况。该方法返回一个对象，其中包含了各种内存使用指标，如 rss（Resident Set Size，常驻集大小）、heapTotal（堆区总大小）、heapUsed（已用堆大小）和 external（外部内存使用量）等

5. process.exit

调用 `process.exit()` 将强制进程尽快退出，即使仍有未完全完成的异步操作挂起

6. process.kill

与 exit 类似，kill 用来杀死一个进程，接受一个参数进程 id 可以通过 process.pid 获取

7. process.env

用于读取操作系统所有的环境变量，也可以修改和查询环境变量。

> 修改 注意修改并不会真正影响操作系统的变量，而是只在当前线程生效，线程结束便释放。

### 5.child_process

子进程是 Nodejs 核心 API

子进程共有 7 个 API Sync 同步 API 不加是异步 API

- spawn 执行命令

- exec 执行命令
- execFile 执行可执行文件
- fork 创建 node 子进程
- execSync 执行命令 同步执行
- execFileSync 执行可执行文件 同步执行
- spawnSync 执行命令 同步执行

#### 1.exec

```js
child_process.exec(command, [options], callback);
```

options 配置项

```
cwd <string> 子进程的当前工作目录。
env <Object> 环境变量键值对。
encoding <string> 默认为 'utf8'。
shell <string> 用于执行命令的 shell。 在 UNIX 上默认为 '/bin/sh'，在 Windows 上默认为 process.env.ComSpec。 详见 Shell Requirements 与 Default Windows Shell。
timeout <number> 默认为 0。
maxBuffer <number> stdout 或 stderr 允许的最大字节数。 默认为 200*1024。 如果超过限制，则子进程会被终止。 查看警告： maxBuffer and Unicode。
killSignal <string> | <integer> 默认为 'SIGTERM'。
uid <number> 设置该进程的用户标识。（详见 setuid(2)）
gid <number> 设置该进程的组标识。（详见 setgid(2)）
```

获取 nodejs 版本号

```js
exec("node -v", (err, stdout, stderr) => {
  if (err) {
    return err;
  }
  console.log(stdout.toString());
});
```

#### 2.execSync

打开谷歌浏览器 使用 exec 可以打开一些软件例如 wx 谷歌 qq 音乐等 以下会打开百度并且进入`无痕模式`

```js
execSync("start chrome http://www.baidu.com --incognito");
```

#### 3.execFile

execFile 适合执行可执行文件，例如执行一个 node 脚本，或者 shell 文件，windows 可以编写 cmd 脚本，posix，可以编写 sh 脚本

编写`bat.cmd`文件

创建一个文件夹 mkdir 进入目录 写入一个文件 test.js 最后执行

```
echo '开始'

mkdir test

cd ./test

echo console.log("test1232131") >test.js

echo '结束'

node test.js
```

使用 execFile 执行`bat.cmd`

```
execFile(path.resolve(process.cwd(),'./bat.cmd'),null,(err,stdout)=>{
    console.log(stdout.toString())
})
```

#### 4.spawn

> spawn 用于执行一些实时获取的信息因为 spawn 返回的是流边执行边返回，exec 是返回一个完整的 buffer，buffer 的大小是 200k，如果超出会报错，而 spawn 是无上限的。

> spawn 在执行完成后会抛出 close 事件监听，并返回状态码，通过状态码可以知道子进程是否顺利执行。exec 只能通过返回的 buffer 去识别完成状态，识别起来较为麻烦

```js
const { spawn } = require("child_process");

//                       命令      参数  options配置
const { stdout } = spawn("netstat", ["-an"], {});

//返回的数据用data事件接受
stdout.on("data", (steram) => {
  console.log(steram.toString());
});
```

> exec -> execFile -> spawn

exec 是底层通过 execFile 实现 execFile 底层通过 spawn 实现

#### 5.fork

场景适合大量的计算，或者容易阻塞主进程操作的一些代码，就适合开发 fork

index.js

```js
const { fork } = require("child_process");

const testProcess = fork("./test.js");

testProcess.send("我是主进程");

testProcess.on("message", (data) => {
  console.log("我是主进程接受消息111：", data);
});
```

test.js

```js
process.on("message", (data) => {
  console.log("子进程接受消息：", data);
});

process.send("我是子进程");
```

### 6.zlib

`zlib` 模块提供了对数据压缩和解压缩的功能，以便在应用程序中减少数据的传输大小和提高性能。该模块支持多种压缩算法，包括 Deflate、Gzip 和 Raw Deflate。

#### 1.gzip

压缩

```js
// 引入所需的模块
const zlib = require("zlib"); // zlib 模块提供数据压缩和解压缩功能
const fs = require("fs"); // 引入fs 模块用于文件操作

// 创建可读流和可写流
const readStream = fs.createReadStream("index.txt"); // 创建可读流，读取名为 index.txt 的文件
const writeStream = fs.createWriteStream("index.txt.gz"); // 创建可写流，将压缩后的数据写入 index.txt.gz 文件

// 使用管道将可读流中的数据通过 Gzip 压缩，再通过管道传输到可写流中进行写入
readStream.pipe(zlib.createGzip()).pipe(writeStream);
```

解压

```js
const readStream = fs.createReadStream("index.txt.gz");
const writeStream = fs.createWriteStream("index2.txt");
readStream.pipe(zlib.createGunzip()).pipe(writeStream);
```

#### 2.deflate

压缩，无损压缩使用 createDeflate 方法

```js
const readStream = fs.createReadStream("index.txt"); // 创建可读流，读取名为 index.txt 的文件
const writeStream = fs.createWriteStream("index.txt.deflate"); // 创建可写流，将压缩后的数据写入 index.txt.deflate 文件
readStream.pipe(zlib.createDeflate()).pipe(writeStream);
```

解压

```js
const readStream = fs.createReadStream("index.txt.deflate");
const writeStream = fs.createWriteStream("index3.txt");
readStream.pipe(zlib.createInflate()).pipe(writeStream);
```

gzip 和 deflate 区别

1. 压缩算法：Gzip 使用的是 Deflate 压缩算法，该算法结合了 LZ77 算法和哈夫曼编码。LZ77 算法用于数据的重复字符串的替换和引用，而哈夫曼编码用于进一步压缩数据。
2. 压缩效率：Gzip 压缩通常具有更高的压缩率，因为它使用了哈夫曼编码来进一步压缩数据。哈夫曼编码根据字符的出现频率，将较常见的字符用较短的编码表示，从而减小数据的大小。
3. 压缩速度：相比于仅使用 Deflate 的方式，Gzip 压缩需要更多的计算和处理时间，因为它还要进行哈夫曼编码的步骤。因此，在压缩速度方面，Deflate 可能比 Gzip 更快。
4. 应用场景：Gzip 压缩常用于文件压缩、网络传输和 HTTP 响应的内容编码。它广泛应用于 Web 服务器和浏览器之间的数据传输，以减小文件大小和提高网络传输效率。

#### 3.http 请求压缩

```js
const zlib = require("zlib");
const http = require("node:http");
const server = http.createServer((req, res) => {
  const txt = "xy".repeat(1000);

  // res.setHeader('Content-Encoding','gzip')
  res.setHeader("Content-Encoding", "deflate");
  res.setHeader("Content-type", "text/plan;charset=utf-8");

  // const result = zlib.gzipSync(txt);
  const result = zlib.deflateSync(txt);
  res.end(result);
});

server.listen(3000);
```

### 7.http

“http” 模块是 Node.js 中用于创建和处理 HTTP 服务器和客户端的核心模块。它使得构建基于 HTTP 协议的应用程序变得更加简单和灵活。

创建 Web 服务器：你可以使用 “http” 模块创建一个 HTTP 服务器，用于提供 Web 应用程序或网站。通过监听特定的端口，服务器可以接收客户端的请求，并生成响应。你可以处理不同的路由、请求方法和参数，实现自定义的业务逻辑。
构建 RESTful API：“http” 模块使得构建 RESTful API 变得简单。你可以使用 HTTP 请求方法（如 GET、POST、PUT、DELETE 等）和路径来定义 API 的不同端点。通过解析请求参数、验证身份和权限，以及生成相应的 JSON 或其他数据格式，你可以构建强大的 API 服务。
代理服务器：“http” 模块还可以用于创建代理服务器，用于转发客户端的请求到其他服务器。代理服务器可以用于负载均衡、缓存、安全过滤或跨域请求等场景。通过在代理服务器上添加逻辑，你可以对请求和响应进行修改、记录或过滤。
文件服务器：“http” 模块可以用于创建一个简单的文件服务器，用于提供静态文件（如 HTML、CSS、JavaScript、图像等）。通过读取文件并将其作为响应发送给客户端，你可以轻松地构建一个基本的文件服务器。

```js
const http = require("http");
http
  .createServer((req, res) => {
    res.end("响应完成了");
  })
  .listen(3000, () => {
    console.log("server is running on port 3000");
  });
```

### 8.events

发布订阅模式

```js
const EventEmitter = require("events");

const event = new EventEmitter();
//监听test
event.on("test", (data) => {
  console.log(data);
});

event.emit("test", "xyxyxyxyx"); //派发事件
```

监听消息数量默认是 10 个

```js
const EventEmitter = require("events");

const event = new EventEmitter();

event.on("test", (data) => {
  console.log(data);
});
event.on("test", (data) => {
  console.log(data);
});
event.on("test", (data) => {
  console.log(data);
});
event.on("test", (data) => {
  console.log(data);
});
event.on("test", (data) => {
  console.log(data);
});
event.on("test", (data) => {
  console.log(data);
});
event.on("test", (data) => {
  console.log(data);
});
event.on("test", (data) => {
  console.log(data);
});
event.on("test", (data) => {
  console.log(data);
});

event.on("test", (data) => {
  console.log(data);
});
event.on("test", (data) => {
  console.log(data);
});
event.on("test", (data) => {
  console.log(data);
});

event.emit("test", "xyxyxyxyx");
```

解除限制调用 setMaxListeners 传入数量

```js
event.setMaxListeners(20);
```

只想监听一次 once 即使`emit`派发多次也只触发一次 once

```js
const EventEmitter = require("events");

const event = new EventEmitter();
event.setMaxListeners(20);
event.once("test", (data) => {
  console.log(data);
});

event.emit("test", "xyxyxyxyx1");
event.emit("test", "xyxyxyxyx2");
```

取消侦听 off

```js
const EventEmitter = require("events");

const event = new EventEmitter();

const fn = (msg) => {
  console.log(msg);
};
event.on("test", fn);
event.off("test", fn);

event.emit("test", "xyxyxyxyx1");
event.emit("test", "xyxyxyxyx2");
```

### 9.util

#### util.promisify

将回调函数风格转为 promise 风格

```js
const { exec } = require("child_process");
const util = require("util");

const execPromise = util.promisify(exec);

execPromise("node -v")
  .then((res) => {
    console.log(res, "res");
  })
  .catch((err) => {
    console.log(err, "err");
  });
```

#### util.callbackify

将 promise 风格转为回调函数风格

```js
const util = require("util");

const fn = (type) => {
  if (type == 1) {
    return Promise.resolve("test");
  }
  return Promise.reject("error");
};

const callback = util.callbackify(fn);

callback(1222, (err, val) => {
  console.log(err, val);
});
```

#### util.format

- %s: String 将用于转换除 BigInt、Object 和 -0 之外的所有值。 BigInt 值将用 n 表示，没有用户定义的 toString 函数的对象使用具有选项 { depth: 0, colors: false, compact: 3 } 的 util.inspect() 进行检查。

- %d: Number 将用于转换除 BigInt 和 Symbol 之外的所有值。
- %i: parseInt(value, 10) 用于除 BigInt 和 Symbol 之外的所有值。
- %f: parseFloat(value) 用于除 Symbol 之外的所有值。
- %j: JSON。 如果参数包含循环引用，则替换为字符串 '[Circular]'。
- %o: Object. 具有通用 JavaScript 对象格式的对象的字符串表示形式。 类似于具有选项 { showHidden: true, showProxy: true } 的 util.inspect()。 这将显示完整的对象，包括不可枚举的属性和代理。
- %O: Object. 具有通用 JavaScript 对象格式的对象的字符串表示形式。 类似于没有选项的 util.inspect()。 这将显示完整的对象，但不包括不可枚举的属性和代理。
- %c: CSS. 此说明符被忽略，将跳过任何传入的 CSS。
- %%: 单个百分号 ('%')。 这不消费参数。

```
util.format('%s-----%s %s/%s','foo','bar','xy','zs')
//foo-----bar xy/zs  可以返回指定的格式
```

### 10.crypto

密码学是计算机科学中的一个重要领域，它涉及到加密、解密、哈希函数和数字签名等技术。Node.js 是一个流行的服务器端 JavaScript 运行环境，它提供了强大的密码学模块，使开发人员能够轻松地在其应用程序中实现各种密码学功能。

#### 1.对称加密

```js
const crypto = require("node:crypto");

// 生成一个随机的 16 字节的初始化向量 (IV)
const iv = Buffer.from(crypto.randomBytes(16));

// 生成一个随机的 32 字节的密钥
const key = crypto.randomBytes(32);

// 创建加密实例，使用 AES-256-CBC 算法，提供密钥和初始化向量
const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);

// 对输入数据进行加密，并输出加密结果的十六进制表示
cipher.update("哇哇哇", "utf-8", "hex");
const result = cipher.final("hex");

// 解密
const de = crypto.createDecipheriv("aes-256-cbc", key, iv);
de.update(result, "hex");
const decrypted = de.final("utf-8");

console.log("Decrypted:", decrypted);
```

#### 2.非对称加密

```js
const crypto = require("node:crypto");
// 生成 RSA 密钥对
const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
  modulusLength: 2048,
});

// 要加密的数据
const text = "xy";

// 使用公钥进行加密
const encrypted = crypto.publicEncrypt(publicKey, Buffer.from(text, "utf-8"));

// 使用私钥进行解密
const decrypted = crypto.privateDecrypt(privateKey, encrypted);

console.log(decrypted.toString());
```

非对称加密使用一对密钥，分别是公钥和私钥。发送者使用接收者的公钥进行加密，而接收者使用自己的私钥进行解密。公钥可以自由分享给任何人，而私钥必须保密。非对称加密算法提供了更高的安全性，因为即使公钥泄露，只有持有私钥的接收者才能解密数据。然而，非对称加密算法的加密速度相对较慢，不适合加密大量数据。因此，在实际应用中，通常使用非对称加密来交换对称密钥，然后使用对称加密算法来加密实际的数据。

#### 3.哈希函数

```js
const crypto = require("node:crypto");

// 要计算哈希的数据
let text = "123456";

// 创建哈希对象，并使用 MD5 算法
const hash = crypto.createHash("md5");

// 更新哈希对象的数据
hash.update(text);

// 计算哈希值，并以十六进制字符串形式输出
const hashValue = hash.digest("hex");

console.log("Text:", text);
console.log("Hash:", hashValue);
```

哈希函数具有以下特点：

1. 固定长度输出：不论输入数据的大小，哈希函数的输出长度是固定的。例如，常见的哈希函数如 MD5 和 SHA-256 生成的哈希值长度分别为 128 位和 256 位。

2. 不可逆性：哈希函数是单向的，意味着从哈希值推导出原始输入数据是非常困难的，几乎不可能。即使输入数据发生微小的变化，其哈希值也会完全不同。
3. 唯一性：哈希函数应该具有较低的碰撞概率，即不同的输入数据生成相同的哈希值的可能性应该非常小。这有助于确保哈希值能够唯一地标识输入数据。

使用场景

1. 我们可以避免密码明文传输 使用 md5 加密或者 sha256
2. 验证文件完整性，读取文件内容生成 md5 如果前端上传的 md5 和后端的读取文件内部的 md5 匹配说明文件是完整的
