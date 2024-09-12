---
tag:
  - 链表
categories:
  - 算法
recommend: 1
---

# 1.移除链表元素

[力扣题目链接](https://leetcode.cn/problems/remove-linked-list-elements/)

## 题目

给你一个链表的头节点 `head` 和一个整数 `val` ，请你删除链表中所有满足 `Node.val == val` 的节点，并返回 **新的头节点** 。

**示例 1：**

![img](https://assets.leetcode.com/uploads/2021/03/06/removelinked-list.jpg)

```
输入：head = [1,2,6,3,4,5,6], val = 6
输出：[1,2,3,4,5]
```

**示例 2：**

```
输入：head = [], val = 1
输出：[]
```

**示例 3：**

```
输入：head = [7,7,7,7], val = 7
输出：[]
```

**提示：**

- 列表中的节点数目在范围 `[0, 104]` 内
- `1 <= Node.val <= 50`
- `0 <= val <= 50`

## 思路

链表移除操作，就是让节点 next 指针直接指向下下一个节点就可以了，对于头节点可以进行设置一个虚拟头节点在进行删除操作

## 代码

```js
var removeElements = function (head, val) {
  let newhead = (phead = new ListNode(0, head));
  while (phead && phead.next) {
    if (phead.next.val === val) {
      phead.next = phead.next.next;
    } else {
      phead = phead.next;
    }
  }

  return newhead.next;
};
```
