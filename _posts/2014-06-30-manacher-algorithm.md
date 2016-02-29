---
layout: post
title: Manacher's algorithm
categories: [algorithm]
tags: [algorithm,icpc]
---

Manacher's algorithm 以$O(n)$的线性时间求一个字符串的最大回文子串。  

### 1. 预处理

一个最棘手的问题是需要考虑最长回文子串的长度为奇数和偶数的情况。  
我们通过在任意两个字符之间填充 `` # `` 的方法， 将原字符串 $S$ 转化为辅助字符串 $T$，具体例子如下：

> S = a b a a b a
T = # a # b # a # a # b # a #

转化后便可不必再考虑奇偶问题，同时辅助字符串的长度也变为奇数。  
**转化后字符串$T$的长度为奇数**：  
在长度为奇数的字符串之间(包括外侧)，有偶数个位置；在长度为偶数的字符串之间(包括外侧)，  
有奇数个位置，所有这样处理之后，字符串的长度都会变为奇数。事实上，公式$2 \times len + 1$ 已经说明预处理之后的字符串长度必为奇数。  
**奇回文串和偶回文串一起处理**：  
以字符 `` # `` 为中点位置，处理的就是偶回文串的情况，  
以其他字符为中点位置，处理的就是奇回文串的情况。  



为了避免出现数组访问越界的边界问题，我们将字符串$T$的首部再添加一个原字符串$S$中没有出现的字符，最后处理完的字符串如下：  

> S = a b a a b a  
T = &nbsp;&nbsp;&nbsp;# a # b # a # a # b # a #  
T = $ # a # b # a # a # b # a #  

这样，预处理工作完成，下面进入manacher算法的核心部分。  

### 2. manacher's algorithm  

这里，定义一个数组$p[]$ 和 两个变量 $r$ 和 $c$。  
$p[i]$表示以位置$i$为中点的最大回文子串的长度。  
$r$ 表示当前所有检测过的位置所能到达的最右端。  
$c$ 为与 $r$ 对应的 $i$ 的位置，与 $r$ 同时更新，实际上 $c+p[i]=r$ 。  

回忆下一个$O(n^2)$的做法：  
从左到右对字符串进行扫描，以每个位置为中点，向两边扩张，并记录最大长度和相应的位置（对于偶数，类似的再处理一遍即可）。  
这种算法的空间复杂度为$O(1)$，是很优秀的，但是，对于每一个位置，都从长度为0开始向两边扩展，这是导致时间复杂度高的一个最主要的原因。  
  
而manacher算法则是额外使用一个$p[]$数组记录最大回文子串的长度，  
因存在对称关系，数组$p[]$的值能够被充分利用，部分$p[i]$的值可以在$O(1)$的时间确定。  
从而使得算法的复杂度降为$O(n)$。  
这种思路类似于KMP算法，充分利用前面已经匹配过的有用信息。  


如何计算数组$p[]$的值呢？ 我们分**两种情况：**  

${i}'$ 代表 $i$ 关于中心 $c$ 的对称点，计算公式为 ${i}'=2 \times c - i$  

$$
\begin{cases}
 & \text{ if } (i < r ) \;
     \begin{cases}
      \text{ if } (r-i>p[{i}']) \; \text{then}\; p[i]=p[{i}'] \\ 
      \text{ otherwise } p[i]= r-i \\ 
    \end{cases} \\ \\
 & \text{ otherwise } p[i]= 0
\end{cases} 
$$

至于为什么是两种情况，请看下面的参考文献，这里图我就不摆了。  

这样我们可以轻松得到P数组的值  
  
> T = $ # a # b # a # a # b # a #  
P = 0 0 1 0 3 0 1 6 1 0 3 0 1 0  

容易看出，$p[7] = 6$是数组$p[]$中的的最大值，这正是原字符串$S$的最长回文子串的长度。这样，在线性时间处理完$P[]$数组之后，最大回文子串就找到，若还需要输出字符串，那只需要再做一些细节处理即可。  


### 3. 核心代码

{% highlight c++ %}
void manacher(char* s)
{
    int c = 0, r = 0, len = strlen(s);
    p[0] = 0;
    for( int i = 1; i < len ; ++i ) {
        if( r > i ) p[i] = min( p[ 2 * c - i ], r - i );
        else p[i] = 0;
        while( i < len && s[i + 1 + p[i]] == s[i - 1 - p[i]] ) p[i]++;
        if( i + p[i] > r ) {
            r = i + p[i];
            c = i;
        }
    }
}
{% endhighlight %}


### 4. 算法复杂度

从代码可以看出。  
$\text{manacher}$算法只需要线性扫描一遍预处理后的字符串。  
对$p[]$数组的处理  
1. $\text{ if } (i < r ) \;\;O(1)$ 时间可以确定  
2. $\text{ otherwise } O(n)$匹配，但是在情况2下，每次扫描都是从$r+1$开始的，且$r$自身的变化情况是单调递增的，这样可以保证，字符串T中的每个字符最多被访问2次，所以，该算法的时间复杂度是线性$O(n)$，事实上，$\text{while}$循环执行的总次数是线性次的。  

### 5. 参考文献

> [Manacher's algorithm: 最长回文子串算法][1]  
[Longest Palindromic Substring Part II][2]  
[Manacher's ALGORITHM: ][3]  
练习见 [原博客][4]  


  [1]: http://www.cnblogs.com/egust/p/4580299.html
  [2]: http://articles.leetcode.com/2011/11/longest-palindromic-substring-part-ii.html
  [3]: http://www.felix021.com/blog/read.php?2040
  [4]: http://www.cnblogs.com/BigBallon/p/3816890.html