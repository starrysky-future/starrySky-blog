---
tag:
  - 哈希表
categories:
  - 算法
recommend: 1
---

# 1.有效的字母异位词

[力扣题目链接](https://leetcode.cn/problems/valid-anagram/)

## 题目

给定两个字符串 `*s*` 和 `*t*` ，编写一个函数来判断 `*t*` 是否是 `*s*` 的字母异位词。

**注意：**若 `*s*` 和 `*t*` 中每个字符出现的次数都相同，则称 `*s*` 和 `*t*` 互为字母异位词。

**示例 1:**

```
输入: s = "anagram", t = "nagaram"
输出: true
```

**示例 2:**

```
输入: s = "rat", t = "car"
输出: false
```

**提示:**

- `1 <= s.length, t.length <= 5 * 104`
- `s` 和 `t` 仅包含小写字母

## 代码

```js
var isAnagram = function (s, t) {
  const sLen = s.length;
  const tLen = t.length;
  if (sLen !== tLen) return false;
  const map = {};

  for (let i = 0; i < sLen; i++) {
    if (map[s[i]]) {
      map[s[i]] = map[s[i]] + 1;
    } else {
      map[s[i]] = 1;
    }
  }

  for (let i = 0; i < tLen; i++) {
    if (map[t[i]]) {
      map[t[i]] = map[t[i]] - 1;
    } else {
      return false;
    }
  }

  return true;
};
```
