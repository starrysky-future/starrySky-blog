---
tag:
  - 数组
categories:
  - 算法
recommend: 1
---

# 1.合并区间

[力扣题目链接](https://leetcode.cn/problems/merge-intervals/)

## 题目

以数组 `intervals` 表示若干个区间的集合，其中单个区间为 `intervals[i] = [starti, endi]` 。请你合并所有重叠的区间，并返回 _一个不重叠的区间数组，该数组需恰好覆盖输入中的所有区间_ 。

**示例 1：**

```
输入：intervals = [[1,3],[2,6],[8,10],[15,18]]
输出：[[1,6],[8,10],[15,18]]
解释：区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6].
```

**示例 2：**

```
输入：intervals = [[1,4],[4,5]]
输出：[[1,5]]
解释：区间 [1,4] 和 [4,5] 可被视为重叠区间。
```

**提示：**

- `1 <= intervals.length <= 104`
- `intervals[i].length == 2`
- `0 <= starti <= endi <= 104`

## 思路

1. 对数组索引 0 位置进行升序排序，取出第一个数组 pre
2. 用第一个数组[1]与后续数组[0]进行比较，大于等于就合并，区间最大值为第一个数组[1]与后续数组[1]，赋值给 pre
3. 小于，代表区间不重叠，放入 res
4. 最后一个区间在循环后放入

## 代码

```js
var merge = function (intervals) {
  intervals.sort((a, b) => a[0] - b[0]);

  const res = [];

  let pre = intervals[0];

  for (let i = 1; i < intervals.length; i++) {
    const cur = intervals[i];
    if (pre[1] >= cur[0]) {
      pre[1] = Math.max(pre[1], cur[1]);
    } else {
      res.push(pre);
      pre = cur;
    }
  }

  res.push(pre);

  return res;
};
```
