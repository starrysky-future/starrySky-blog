---
tag: vue3.0
tags: 前端
categories:
  - 大前端
recommend: 1
sticky: 5
---

# VUE 3.0

[vue 官方中文文档](https://cn.vuejs.org/)

## 一、composition API

### 1.setup

setup 函数是一个新的组件选项，作为组件内使用 composition API 的入口

```vue
<script setup lang="ts">
console.log("hello script setup");
</script>
```

### 2.响应式核心

- ref：可传入任意类型的值并返回一个响应式且可改变的 ref 对象。ref 对象拥有一个指向内部值的单一属性`.value`,改变值的时候必须使用其 value 属性
- reactive：接受一个普通对象然后返回该普通对象的响应式代理

#### ref

```vue
<script setup lang="ts">
import { ref } from "vue";
import type { Ref } from "vue";

const count: Ref<number> = ref(0);
console.log(count.value); // 0

count.value++;
console.log(count.value); // 1
</script>
```

不需要深层次的响应，可以使用 shallowRef()来代替

#### reactive

```vue
<script setup lang="ts">
import { reactive } from "vue";

interface ObjType {
  count: number;
}

const obj: ObjType = reactive({ count: 0 });
obj.count++;
</script>
```

不需要深层次的响应，可以使用 shallowReactive()来代替

#### computed

```vue
<script setup lang="ts">
import { computed, ref } from "vue";
import type { Ref } from "vue";

const count: Ref<number> = ref(1);
// 只读的计算属性
const plusOne = computed<number>(() => count.value + 1);

// 可写的计算属性
let plusTwo = computed<number>({
  get() {
    return count.value + 1;
  },
  set(val) {
    count.value = val - 1;
  },
});

plusTwo.value = 5;
</script>
```

#### readonly

接收一个对象（不论是响应式还是普通的）或是一个 ref，返回一个原值的只读代理

```vue
<script setup lang="ts">
import { reactive, readonly, watchEffect } from "vue";

interface OriginalType {
  count: number;
}

const original: OriginalType = reactive({ count: 0 });
const copy = readonly(original);

watchEffect(() => {
  console.log(copy.count);
});

original.count++;
copy.count++; // 更改失败，触发警告
</script>
```

[shallowReadonly()](https://cn.vuejs.org/api/reactivity-advanced.html#shallowreadonly)

#### watchEffect()

立即运行一个函数，同时响应式地追踪其依赖，并在依赖更改时重新执行，返回值是一个用来停止该副作用的函数。

```vue
<script setup lang="ts">
import { ref, watchEffect, nextTick } from "vue";

const count = ref(0);

const stop = watchEffect(() => console.log(count.value));
// -> 输出 0

count.value++;
// -> 输出 1

nextTick(() => {
  stop();
  count.value++; // 不再监听
});
</script>
```

#### watch

watch()接收的第一个参数被称作"数据源",它可以是：

- 一个返回任意值的 getter 函数
- 一个包装对象(可以是 ref 也可以是 reactive 包装的对象)
- 一个包含上述两种数据源的数组

1. 监听单个数据源

   ```js
   const state = reactive({ count: 1 });

   //侦听一个reactive定义的数据,修改count值时会触发 watch的回调
   watch(
     () => state.count,
     (newCount, oldCount) => {
       console.log("newCount:", newCount);
       console.log("oldCount:", oldCount);
     }
   );
   //侦听一个ref
   const num = ref(0);
   watch(num, (newNum, oldNum) => {
     console.log("newNum:", newNum);
     console.log("oldNum:", oldNum);
   });
   ```

2. 侦听多个数据源(数组)

   ```js
   const state = reactive({ count: 1 });
   const num = ref(0);
   // 监听一个数组
   watch([() => state.count, num], ([newCount, newNum], [oldCount, oldNum]) => {
     console.log("new:", newCount, newNum);
     console.log("old:", oldCount, oldNum);
   });
   ```

3. 侦听复杂的嵌套对象

   ```js
   const state = reactive({
     person: {
       name: "坤哥",
       fav: ["basketball", "chicken", "music"],
     },
   });
   watch(
     () => state.person,
     (newType, oldType) => {
       console.log("新值:", newType, "老值:", oldType);
     },
     { deep: true } // 立即监听
   );
   ```

### 3.响应式工具

1. isRef()：检查某个值是否为 ref

2. unRef：如果参数是 ref，则返回内部值，否则返回参数本身。这是 `val = isRef(val) ? val.value : val` 计算的一个语法糖。

3. toRef()：可以将值、refs 或 getters 规范化为 refs (3.3+)，也可以基于响应式对象上的一个属性，创建一个对应的 ref

   ```js
   const state = reactive({
     foo: 1,
     bar: 2,
   });

   // 双向 ref，会与源属性同步
   const fooRef = toRef(state, "foo");

   // 更改该 ref 会更新源属性
   fooRef.value++;
   console.log(state.foo); // 2

   // 更改源属性也会更新该 ref
   state.foo++;
   console.log(fooRef.value); // 3
   ```

4. toValue()（3.3+）：将值、refs 或 getters 规范化为值。这与 [unref()](https://cn.vuejs.org/api/reactivity-utilities.html#unref) 类似，不同的是此函数也会规范化 getter 函数。如果参数是一个 getter，它将会被调用并且返回它的返回值。

5. toRefs()：将一个响应式对象转换为一个普通对象，这个普通对象的每个属性都是指向源对象相应属性的 ref。每个单独的 ref 都是使用 [`toRef()`](https://cn.vuejs.org/api/reactivity-utilities.html#toref) 创建的。

6. isProxy()：检查一个对象是否是由 [`reactive()`](https://cn.vuejs.org/api/reactivity-core.html#reactive)、[`readonly()`](https://cn.vuejs.org/api/reactivity-core.html#readonly)、[`shallowReactive()`](https://cn.vuejs.org/api/reactivity-advanced.html#shallowreactive) 或 [`shallowReadonly()`](https://cn.vuejs.org/api/reactivity-advanced.html#shallowreadonly) 创建的代理。

7. isReactive()：检查一个对象是否是由 [`reactive()`](https://cn.vuejs.org/api/reactivity-core.html#reactive) 或 [`shallowReactive()`](https://cn.vuejs.org/api/reactivity-advanced.html#shallowreactive) 创建的代理。

8. isReadonly()：检查传入的值是否为只读对象。只读对象的属性可以更改，但他们不能通过传入的对象直接赋值。通过 [`readonly()`](https://cn.vuejs.org/api/reactivity-core.html#readonly) 和 [`shallowReadonly()`](https://cn.vuejs.org/api/reactivity-advanced.html#shallowreadonly) 创建的代理都是只读的，因为他们是没有 `set` 函数的 [`computed()`](https://cn.vuejs.org/api/reactivity-core.html#computed) ref。

### 4.生命周期

![组件生命周期图示](https://cn.vuejs.org/assets/lifecycle.DLmSwRQE.png)

```vue
<script setup lang="ts">
import {
  ref,
  onMounted,
  onBeforeMount,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
} from "vue";

// 初始化数据阶段的生命周期，介于beforeCreate和created之间
const a = ref(0);
function handleClick() {
  a.value += 1;
}
onBeforeMount(() => {
  console.log("组件挂载之前");
});
onMounted(() => {
  console.log("DOM挂载完成");
});
onBeforeUpdate(() => {
  console.log("DOM更新之前", document.getElementById("test")!.innerHTML);
});
onUpdated(() => {
  console.log("DOM更新完成", document.getElementById("test")!.innerHTML);
});
onBeforeUnmount(() => {
  console.log("实例卸载之前");
});
onUnmounted(() => {
  console.log("实例卸载之后");
});
</script>

<template>
  <div id="test" @click="handleClick">{{ a }}</div>
</template>
```

### 5.依赖注入

#### Provide (提供)

```vue
<script setup>
import { provide } from "vue";

provide(/* 注入名 */ "message", /* 值 */ "hello!");
</script>
```

#### 应用层 Provide

```vue
import { createApp } from 'vue' const app = createApp({}) app.provide(/* 注入名
*/ 'message', /* 值 */ 'hello!')
```

#### Inject (注入)

```vue
<script setup>
import { inject } from "vue";

const message = inject("message");
</script>
```

#### 6.模板引用 ref

```vue
<script setup>
import { ref, onMounted } from "vue";

// 声明一个 ref 来存放该元素的引用
// 必须和模板里的 ref 同名
const input = ref(null);

onMounted(() => {
  input.value.focus();
});
</script>

<template>
  <input ref="input" />
</template>
```

### 7.组件通信

- defineProps & defineEmits

  使用 typescript

  ```vue
  <script setup lang="ts">
  defineProps<{
    title?: string;
    likes?: number;
  }>();
  </script>
  ```

  ```vue
  <script setup>
  const props = defineProps({
    foo: String,
  });

  const emit = defineEmits(["change", "delete"]);
  </script>
  ```

- v-model

  - ```vue
    const isVisible = defineModel<boolean>();
    ```

- provide & inject

  - ```vue
    <script setup>
    import { ref, provide } from "vue";
    import { countSymbol } from "./injectionSymbols";
  
    // 提供静态值
    provide("path", "/project/");
  
    // 提供响应式的值
    const count = ref(0);
    provide("count", count);
  
    // 提供时将 Symbol 作为 key
    provide(countSymbol, count);
    </script>
    ```

  - ```vue
    <script setup>
    import { inject } from "vue";
    import { countSymbol } from "./injectionSymbols";
  
    // 注入不含默认值的静态值
    const path = inject("path");
  
    // 注入响应式的值
    const count = inject("count");
  
    // 通过 Symbol 类型的 key 注入
    const count2 = inject(countSymbol);
  
    // 注入一个值，若为空则使用提供的默认值
    const bar = inject("path", "/default-path");
  
    // 注入一个值，若为空则使用提供的函数类型的默认值
    const fn = inject("function", () => {});
  
    // 注入一个值，若为空则使用提供的工厂函数
    const baz = inject("factory", () => new ExpensiveObject(), true);
    </script>
    ```

- defineExpose & ref

  使用 `<script setup>` 的组件是**默认关闭**的——即通过模板引用或者 `$parent` 链获取到的组件的公开实例，**不会**暴露任何在 `<script setup>` 中声明的绑定。

  可以通过 `defineExpose` 编译器宏来显式指定在 `<script setup>` 组件中要暴露出去的属性

  ```vue
  <script setup>
  import { ref } from "vue";

  const a = 1;
  const b = ref(2);

  defineExpose({
    a,
    b,
  });
  </script>
  ```

- pinia

## 二、重大改变

### 1.Teleport

它可以将一个组件内部的一部分模板“传送”到该组件的 DOM 结构外层的位置去。

`<Teleport>` 接收一个 `to` prop 来指定传送的目标。

```vue
<button @click="open = true">Open Modal</button>

<Teleport to="body">
  <div v-if="open" class="modal">
    <p>Hello from the modal!</p>
    <button @click="open = false">Close</button>
  </div>
</Teleport>
```

### 2.Supense

> 是一项实验性功能。它不一定会最终成为稳定功能，并且在稳定之前相关 API 也可能会发生变化。

自带两个 `slot` 分别为 `default、fallback`。当要加载的组件不满足状态时,`Suspense` 将回退到 `fallback`状态一直到加载的组件满足条件，才会进行渲染。

```vue
<Suspense>
  <!-- 具有深层异步依赖的组件 -->
  <Dashboard />

  <!-- 在 #fallback 插槽中显示 “正在加载中” -->
  <template #fallback>
    Loading...
  </template>
</Suspense>
```

### 3.Transition

- v-enter->v-enter-from
- v-leave->v-leave-from

```vue
<button @click="show = !show">Toggle</button>
<Transition>
  <p v-if="show">hello</p>
</Transition>
```

```css
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
```

### 4.Slot

具名插槽`slot`和作用域插槽`slot-scope`合并为`v-slot`

```vue
<!-- 父组件中使用 -->
<template v-slot:content="scoped">
  <div v-for="item in scoped.data">{{ item }}</div>
</template>

<!-- 也可以简写成： -->
<template #content="{ data }">
  <div v-for="item in data">{{ item }}</div>
</template>
```

### 5.v-model

#### 2.0

在 2.0`v-model`必须使用`value`的 prop，并且只能使用一个`v-model`，对于数据传递只能使用自定义属性和事件

```js
<ChildComponent v-model="pageTitle" />

<!-- 简写: -->

<ChildComponent
  :modelValue="pageTitle"
  @update:modelValue="pageTitle = $event"
/>
```

使用`v-bind.sync`

```vue
<ChildComponent :title.sync="pageTitle" />

this.$emit('update:title', newValue)
```

#### 3.0

在 3.x 中，自定义组件上的 `v-model` 相当于传递了 `modelValue` prop 并接收抛出的 `update:modelValue` 事件

```vue
<ChildComponent v-model="pageTitle" />

<!-- 简写: -->

<ChildComponent
  :modelValue="pageTitle"
  @update:modelValue="pageTitle = $event"
/>
```

### 6.自定义指令

API 已重命名，以便更好地与组件生命周期保持一致

- bind → **beforeMount**
- inserted → **mounted**
- beforeUpdate：新的！这是在元素本身更新之前调用的，很像组件生命周期钩子
- update → 移除！有太多的相似之处要更新，所以这是多余的，请改用 `updated`
- componentUpdated → **updated**
- beforeUnmount `新的`与组件生命周期钩子类似，它将在卸载元素之前调用。
- unbind -> **unmounted**

```vue
const app = createApp(App); // 创建自定义指令 app.directive('highlight',{ //
指令 也拥有一组生命周期钩子 // 1.在绑定元素的父组件挂载之前调用
beforeMount(el,binding,vnode){ el.style.background = binding.value; }, })
```

## 三、打包优化

## 1.组件的代码

对于自己编写的组件在页面加载时不用一同加载，而是触发条件之后出现，可进行异步加载

```vue
import { defineAsyncComponent } from 'vue'; export const modalConfig = {
ListAddModal: defineAsyncComponent(() =>
import('@r/components/operate/ListAddModal.vue')), UpdateModal:
defineAsyncComponent(() => import('@r/components/operate/UpdateModal.vue')) };
```

### 2.路由按需加载

直接加载的话，所有页面资源都构建在一个 js 文件中，按需加载后访问对应页面加载对应资源

```typescript
import {
  createRouter,
  RouteRecordRaw,
  Router,
  createWebHashHistory,
} from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    name: "songList",
    path: "/",
    component: () => import("@r/views/songList/songList.vue"),
  },
  {
    name: "songListDetail",
    path: "/songListDetail",
    component: () => import("@r/views/songList/songListDetail.vue"),
  },
  {
    name: "leaderBoard",
    path: "/leaderBoard",
    component: () => import("@r/views/leaderBoard/leaderBoard.vue"),
  },
  {
    name: "collect",
    path: "/collect",
    component: () => import("@r/views/collect/collect.vue"),
  },
  {
    name: "search",
    path: "/search",
    component: () => import("@r/views/search/search.vue"),
  },
  {
    name: "setting",
    path: "/setting",
    component: () => import("@r/views/setting/setting.vue"),
  },
];

const router: Router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});

export default router;
```

### 3.第三方包&自定义全局组件

#### 1.按需引入

对第三方包&自定义全局组件使用 unplugin-vue-components 进行按需引入

```
npm i unplugin-vue-components -D
```

vite.config

```typescript
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    Components({
      dirs: ['src/components'], // 配置需要默认导入的自定义组件文件夹，该文件夹下的所有组件都会自动 import
      resolvers: [AntDesignVueResolver({ importStyle: false, resolveIcons: true })],
      dts: true,
      deep: true, // 多级目录，需要深层搜索
      include: [/\.vue$/], // 包含文件
      exclude: [/[\\/]node_modules[\\/]/] // 排除目录
    })
  ]
}
```

- **importStyle** 指是否需要自动随引入加载对应的组件样式，某些二级组件（比如 DateRangePicker）没办法准确地识别正确路径，直接关闭
- **resolveIcons** 配置是否对 antd 的图标起作用

样式不生效安装 vite-plugin-style-import

```
npm i vite-plugin-style-import -D
```

```typescript
import { defineConfig } from "vite";
import styleImport, {
  AndDesignVueResolve,
  VantResolve,
  ElementPlusResolve,
  NutuiResolve,
  AntdResolve,
} from "vite-plugin-style-import";

export default defineConfig({
  plugins: [
    styleImport({
      resolves: [
        AndDesignVueResolve(),
        VantResolve(),
        ElementPlusResolve(),
        NutuiResolve(),
        AntdResolve(),
      ],
      // 自定义规则
      libs: [
        {
          libraryName: "ant-design-vue",
          esModule: true,
          resolveStyle: (name) => {
            return `ant-design-vue/es/${name}/style/index`;
          },
        },
      ],
    }),
  ],
  // 引用使用less的库要配置一下
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
});
```

#### 2.拆包

未拆包打包构建的资源所有的第三方包都在一个 js 文件中

```typescript
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes("node_modules")) {
            const moduleName = id.split("node_modules/")[1].split("/")[0];
            return moduleName;
          }
        },
      },
    },
  },
});
```

## 四、pinia

### 1.定义&解构

通过 defineStore 进行定义

```typescript
export const useSongListStore = defineStore("useSongListStore", () => {
  const sourceId = ref<string>(sources.sources[0].id);
  const tagId = ref<string>("");
  const sortId = ref<string>(sources[sourceId.value].config.sortList[0].id);

  const initlist: SKY.SongList.SongListSource = initList({
    limit: 30,
    list: [],
    pageSize: 1,
    source: "wy",
    total: 0,
  });

  const songList = ref<SKY.SongList.SongListSource>(initlist);

  const curListId = computed(() => {
    if (tagId.value) {
      return sourceId.value + "_" + sortId.value + "_" + tagId.value;
    }
    return sourceId.value + "_" + sortId.value;
  });

  const pageSize = ref<number>(1);

  return { songList, sourceId, sortId, tagId, pageSize, curListId };
});
```

如需在使用页面解构使用，需要用到 storeToRefs

```vue
import { storeToRefs } from 'pinia'; import { useSongListStore } from
'@r/store/songList'; const songListStore = useSongListStore(); const { songList,
sourceId, sortId, curListId, tagId, pageSize } = storeToRefs(songListStore);
```

### 2.在组件外使用 store

这有可能导致使用时 pinia 实例还未被激活出现报错，需将 pinia 实例手动导入

```typescript
import pinia from "@r/store";
import { storeToRefs } from "pinia";
import { usePlayStore } from "@r/store/play";

const playStore = usePlayStore(pinia); // 导入pinia实例
const { statulyric, curPlayInfo } = storeToRefs(playStore);
```

### 3.数据持久化

使用插件 pinia-plugin-persistedstate

```
npm i pinia-plugin-persistedstate -S
```

注册

```typescript
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

export default pinia;
```

使用时，只需要通过 persist: true 开启

```typescript
export const useSongListStore = defineStore(
  "useSongListStore",
  () => {
    const sourceId = ref<string>(sources.sources[0].id);
    const tagId = ref<string>("");
    const sortId = ref<string>(sources[sourceId.value].config.sortList[0].id);

    const initlist: SKY.SongList.SongListSource = initList({
      limit: 30,
      list: [],
      pageSize: 1,
      source: "wy",
      total: 0,
    });

    const songList = ref<SKY.SongList.SongListSource>(initlist);

    const curListId = computed(() => {
      if (tagId.value) {
        return sourceId.value + "_" + sortId.value + "_" + tagId.value;
      }
      return sourceId.value + "_" + sortId.value;
    });

    const pageSize = ref<number>(1);

    return { songList, sourceId, sortId, tagId, pageSize, curListId };
  },
  {
    persist: true,
  }
);
```

## 五、mixin

### 1.组合式函数

vue3.0 不建议使用 mixin，而是用组合式函数替代，例如获取鼠标位置：

```typescript
// mouse.ts
import { ref, onMounted, onUnmounted } from "vue";

// 按照惯例，组合式函数名以“use”开头
export function useMouse() {
  // 被组合式函数封装和管理的状态
  const x = ref(0);
  const y = ref(0);

  // 组合式函数可以随时更改其状态。
  function update(event) {
    x.value = event.pageX;
    y.value = event.pageY;
  }

  // 一个组合式函数也可以挂靠在所属组件的生命周期上
  // 来启动和卸载副作用
  onMounted(() => window.addEventListener("mousemove", update));
  onUnmounted(() => window.removeEventListener("mousemove", update));

  // 通过返回值暴露所管理的状态
  return { x, y };
}
```

### 2.第三方 hooks 库

1. **VueUse**
   - VueUse 是一个非常受欢迎的 Vue 3 Composition API 实用工具集合，提供了一系列实用的 hooks，可以简化常见的 Web 开发任务。它包括了大量的 hooks，如 useFetch, useDark, useFocus, useStorage 等等。
   - 项目地址: https://vueuse.org/
   - GitHub: https://github.com/vueuse/vueuse
2. **VueHooks Plus**
   - VueHooksPlus 是一个针对 Vue 3 的实用工具库，它提供了许多预定义的 hooks 用于处理常见的开发任务，使得开发 Vue 3 应用程序变得更加高效和简洁。
   - 项目地址: https://inhiblabcore.github.io/docs/hooks/
   - GitHub: https://github.com//InhiblabCore/vue-hooks-plus
3. **VueQuery**
   - VueQuery 是一个基于 Vue 3 的数据获取和缓存库，它提供了类似于 React Query 的功能，如自动缓存、数据无效化等。适用于需要频繁从网络获取数据的应用。
   - 项目地址: https://gitcode.com/gh_mirrors/vu/vue-query
