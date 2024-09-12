---
tag:
  - 二叉树
categories:
  - 算法
recommend: 1
---

# 1.二叉树理论基础

### 1.二叉树的种类

题目中二叉树的两种主要的形式：满二叉树和完全二叉树

#### 满二叉树

满二叉树：如果一棵二叉树只有度为 0 的结点和度为 2 的结点，并且度为 0 的结点在同一层上，则这棵二叉树为满二叉树。

深度为 k，有 2^k - 1 个节点

![binaryTree_full](/arithmetic/binaryTree_full.png)

### 完全二叉树

完全二叉树：在完全二叉树中，除了最底层节点可能没填满外，其余每层节点数都达到最大值，并且最下面一层的节点都集中在该层最左边的若干位置。若最底层为第 h 层（h 从 1 开始），则该层包含 1~ 2^(h-1) 个节点。

![binaryTree_complete](/arithmetic/binaryTree_complete.png)

### 二叉搜索树

**二叉搜索树是一个有序树**。

- 若它的左子树不空，则左子树上所有结点的值均小于它的根结点的值；
- 若它的右子树不空，则右子树上所有结点的值均大于它的根结点的值；
- 它的左、右子树也分别为二叉排序树

![binaryTree_search](/arithmetic/binaryTree_search.png)

### 平衡二叉搜索树

平衡二叉搜索树：又被称为 AVL（Adelson-Velsky and Landis）树，且具有以下性质：它是一棵空树或它的左右两个子树的高度差的绝对值不超过 1，并且左右两个子树都是一棵平衡二叉树。

![binaryTree_searchBalance](/arithmetic/binaryTree_searchBalance.png)
