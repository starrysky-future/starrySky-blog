---
tag:
  - 单调栈
categories:
  - 算法
recommend: 1
---

# 1.每日温度

[力扣题目链接](https://leetcode.cn/problems/daily-temperatures/)

## 题目

给定一个整数数组 `temperatures` ，表示每天的温度，返回一个数组 `answer` ，其中 `answer[i]` 是指对于第 `i` 天，下一个更高温度出现在几天后。如果气温在这之后都不会升高，请在该位置用 `0` 来代替。

**示例 1:**

```
输入: temperatures = [73,74,75,71,69,72,76,73]
输出: [1,1,4,2,1,1,0,0]
```

**示例 2:**

```
输入: temperatures = [30,40,50,60]
输出: [1,1,1,0]
```

**示例 3:**

```
输入: temperatures = [30,60,90]
输出: [1,1,0]
```

**提示：**

- `1 <= temperatures.length <= 105`
- `30 <= temperatures[i] <= 100`

## 思路

1. 使用一个单调递增栈存储最大温度所指向的索引
2. 当遇到比栈顶索引温度高的元素，将栈顶索引弹出，当前循索引 - 栈顶索引 = 更高温度的天数

## 代码

```js
var dailyTemperatures = function (temperatures) {
  const n = temperatures.length;
  const stack = [];
  const res = new Array(n).fill(0);
  stack.push(0);
  for (let i = 1; i < n; i++) {
    while (
      stack.length &&
      temperatures[i] > temperatures[stack[stack.length - 1]]
    ) {
      const top = stack.pop();
      res[top] = i - top;
    }

    stack.push(i);
  }

  return res;
};
```
