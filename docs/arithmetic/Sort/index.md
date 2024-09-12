---
tag:
  - 排序
categories:
  - 算法
recommend: 1
---

# 1.快速排序

## 思路

快速排序：通过一趟排序将要排序的数据分割成独立的两部分，其中一部分的所有数据比另一部分的所有数据要小，再按这种方法对这两部分数据分别进行快速排序，整个排序过程可以递归进行，使整个数据变成有序序列。

实现步骤：

- 选择一个基准元素`target`（一般选择第一个数）
- 将比`target`小的元素移动到数组左边，比`target`大的元素移动到数组右边
- 分别对`target`左侧和右侧的元素进行快速排序

## 代码

```js
function quickSort(arr, left, right) {
  if (left >= right) return;

  let l = left;
  let r = right;
  let target = arr[left];

  while (l < r) {
    while (l < r && arr[r] >= target) {
      r--;
    }
    arr[l] = arr[r];
    while (l < r && arr[l] < target) {
      l++;
    }
    arr[r] = arr[l];
  }

  arr[l] = target;
  quickSort(arr, left, l - 1);
  quickSort(arr, l + 1, right);

  return arr;
}
```
