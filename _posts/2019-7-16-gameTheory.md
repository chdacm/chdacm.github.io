---
layout: post
title: 2019暑期集训第一讲：博弈论
---

主讲人：段英鹏
时间：7.17

# 简单博弈论

- ##### 本次简单博弈论讲解六个知识点：

  - 1：bash博弈；2：nim博弈；3：威佐夫博弈；5：Fibonacci博弈；6：sg函数；

- ##### 首先介绍博弈论问题有如下几个特点

  - 1：博弈模型为两人轮流决策的博弈。并且两人都使用最优策略来取得胜利。
    - 两个玩家，都会采取最优的决策，那么如果存在一个局面为必胜局面，某玩家位于此局面。只要自己无失误，则必胜。那么同样又一个局面为必败局面，某玩家位于此局面。只要对手无失误，则必败。
    - 那也就是说，针对这样的游戏，我们关注点应该在局面上。
  - 2：博弈是有限的。即无论两人如何决策，都会在有限步决出胜负。
  - 3：博弈是公平的。即两人进行决策的规则相同。

- ##### 相关概念：

  - 先手必胜状态：先手可以从这个状态走到某一个必败状态。
  - 先手必败状态：先手走不到任何一个必败状态。
  - 也就是说先手必胜状态，那么先手一定能采取某些操作，让后手面对必败态。如果是先手必败态，无论先手怎么操作，都无法让后手面对必败态。

## bash博弈

- 假设一堆石子有n个，每次最多取m个，甲乙两个玩家轮流取石子，最后把石子取完的人获胜，保证甲乙每一步的决策都是最优的，请问给定n和m，问甲胜还是乙胜。
  - 不妨假设刚刚开始`n = m + 1`，那么后手必胜，有如下结论：
    - 令 `n = ( m + 1 ) * r + s` 其中`(r > 1，0 <= s < m + 1)`。如果s=0的话，先手每次取k个，后手只要取(m+1-k)个即可，后手必赢。如果s!=0的话，先手者第一次取s个，后手第一次取k个，接下来先手只要取`(m + 1 - k)`个即可，先手必赢。
    - 所以只需考虑 是否为0就可以判定结果。余为0，先手必败，反之必胜。
- 例题：
  - hdu_2188
  - hdu_1846
  - hdu_1847

## Nim游戏

- 假设有n堆石子，每堆石子分别有$a_1, a_2,…,a_n$个,每次可以选择任意一堆且至少取1枚石子,
  甲乙两个玩家轮流取石子, 最后把石子取完的人获胜, 保证甲乙每一步的决策都是最优的, 甲为先手操作, 问甲胜还是乙胜。

- ##### 结论:

  - 设若$a_1\land a_2\land ...\land a_n$则先手必败, 反之必胜。 

- ##### 证明:

  - 1):考虑极端情况, 当$a_1, a_2,a_3...a_n$全为0时, res = 0, 此时先手无法操作, 先手必败。

  - 2):当$res = x ≠ 0$时,我们取$res$最高位$1$,设最高位$1$为第$k$位,则一定存在$a_i$第$k$位为$1$。对于此,我们可以反证, 若$a$中所有第$k$位全为$0$, 则$res$第$k$位也为$0$, 矛盾。

  - 所以我们让$a_i\land x, 我们可以得出$$a_i\land x < a_i $。那么我们完全可以从​$a_i$中拿走​$a_i\land x$, 即​$a_i  -a_i\land x>0$, 最后剩下​$a_i  -(a_i  -a_i\land x) = a_i\land x$; 

  - 此时后手的局面为$res = a_1  \land a_2\land ,…,\land a_i\land x,…,\land a_n=x\land x=0$

  - 即先手通过一定的操作让后手面对$res=0$的情况。

  - •3): 当$res = x = 0$且$a$不全为$0$时, 我们无法通过任何操作让下一个状态的$res$也为$0$。这一步的证明可以采用反证法。

    •若存在$a_i $拿走一定的石子变为$a_i^′$且res不变。

    •在目前状态$res= a_1\land a_2\land ,…,\land a_i\land ,…,\land a_n=0$设为①式。

    •在下个状态$res= a_1\land a_2\land ,…,\land a_i^′\land ,…,\land a_n=0$设为②式。

    •$①\land ② $= $0\land 0$  => $ a_i\land a_i^′  = 0$

    •即$a_i= a_i^′$, 与假设矛盾。

- 综上所述, 当$a$不全为$0$时, 任意一个$res != 0$的局面, 先手可以通过一定的操作让后手面对$res = 0$的局面。

- 对于任意一个$res = 0$的局面, 先手无法通过任何操作让后手面对$res = 0$的局面。

- 得出结论, 当$res = 0$时先手必败, 反之必胜。

## Nim博弈拓展-台阶Nim

- 问题描述: 有一个$n$级台阶的楼梯, 每级台阶上有若干个石子, 其中第i级台阶上有$a_i$个石子$(i≥1)$。两位玩家路轮流操作, 每次操作可以从任意一级台阶上拿若干个石子放到下一级台阶上(不能不拿)。

- 已经拿到地面的石子不能再拿, 最后无法进行操作的人视为失败。

- 问如果两人都采取最优策略, 先手是否必胜.

- ##### 结论

  - $res= a_1\land a_3\land a_5\land ,…,\land a_n=0$(当然这里的n是奇数)先手必败, 反之先手必胜。

- ##### 证明

- 1): 考虑极端情况, 当$a_1, a_3,…,a_n$全为0时, $res = 0$, 此时先手只能将偶数级台阶往下搬, 后手只需要将先手从偶数级台阶上搬下来的石子全部搬到下一级偶数级台阶, 先手必败。

- 2): 当$res = x ≠ 0$时, 通过经典Nim游戏的证明, 我们知道一定有一种方法搬一定的石子到下一级让后手面对res为0的局面。

- 3):当$res = x = 0$且$a$不全为$0$时, 我们无法通过任何操作让下一个状态的$res$也为$0$。

- 即对于$res$不为$0$的情况, 先手总能通过一定的操作让后手面对$res$为$0$的情况,。

- 然而$res$为$0$时, 先手无论做什么操作都无法让后手面对$res$为$0$的情况。

- 那么此刻我们就将题目转化为在奇数台阶上的经典Nim游戏。

- ###### 思考题:

- 为什么不用$res= a_2\land a_4\land a_6\land ,…,\land a_n=0$(n为偶数)来判定胜负？

  - 因为当先手搬去一定的石子让后手面对$res=0$的情况, 后手可以搬去一号台阶的石子到地面让先手重新面对$res=0$的情况

- ##### 例题:

  - hdu_1850(经典Nim)

  - ```c++
    #include<bits/stdc++.h>
    using namespace std;
    const int maxn = 100 + 10;
    int n, a[maxn], res;
    int main()
    {
        while(cin >> n)
        {
            if(!n) break;
            res = 0;
            for(int i = 1; i <= n; i++)
            {
                cin >> a[i];
                res ^= a[i];
            }
            if(res == 0) puts("0");
            else
            {
                int ans = 0;
                for(int i = 1; i <= n; i++)
                {
                    if((res ^ a[i]) < a[i]) ans ++;
                }
                cout << ans << endl;
            }
        }
        return 0;
    }
    ```

  - hdu_1730(经典Nim)

  - ```c++
    #include<bits/stdc++.h>
    using namespace std;
    int main()
    {
        int n, m;
        while(cin >> n >> m)
        {
            int res = 0;
            for(int i = 1; i <= n; i++)
            {
                int a, b; cin >> a >> b;
                res = res ^ (abs(a - b) - 1);
            }
            if(res == 0) puts("BAD LUCK!");
            else puts("I WIN!");
        }
    }
    ```

  - poj_1704(台阶Nim)

  - ```c++
    #include<iostream>
    #include<cstdio>
    #include<algorithm>
    #include<cstring>
    using namespace std;
    const int maxn = 1000 + 10;
    int a[maxn], d[maxn];
    int main()
    {
        int T; cin >> T;
        while(T--)
        {
            int n; cin >> n;
            for(int i = 1; i <= n; i++) scanf("%d", &a[i]);
            sort(a + 1, a + 1 + n);
            for(int i = 1; i <= n; i++)
                d[i] = a[i] - a[i - 1] - 1;
            int res = 0;
            for(int i = n; i > 0; i -= 2)
                res ^= d[i];
            if(res) puts("Georgia will win");
            else puts("Bob will win");
        }
        return 0;
    }
    ```

  - hdu_4315(台阶Nim)

  - ```c++
    #include<bits/stdc++.h>
    using namespace std;
    const int maxn = 1e3 + 10;
    int a[maxn];
    int n, k;
    int main()
    {
        while(cin >> n >> k)
        {
            memset(a, 0, sizeof a);
            for(int i = 1; i <= n; i++) scanf("%d", &a[i]);
            if(k == 1) puts("Alice");
            else
            {
                int res = 0;
                if(n & 1)
                {
                    if(k == 2) res ^= a[1] - 1;
                    else res ^= a[1];
                    for(int i = 3; i <= n; i += 2)
                        res ^= a[i] - a[i - 1] - 1;
                }
                else
                {
                    for(int i = 2; i <= n; i += 2)
                        res ^= a[i] - a[i - 1] - 1;
                }
                if(res) puts("Alice");
                else puts("Bob");
            }
        }
        return 0;
    }
    ```

## Wythoff 游戏 (威佐夫博弈)

- 两堆石子各有若干个, 两人轮流从一堆取至少一个石子或从两堆取同样多的物品, 最后一名取完石子者胜利。

- ##### 结论:

  - 当两堆石子各有$n$和$m$个且不妨设$n<m$。
  - 当$(m-n)  \frac{√5+1}{2}=n$时, 先手必败。

- ##### 证明

- •首先考虑最(zhao)极(gui)端(lv)的情况, (0, 0), (1, 2), (3, 5)局面为先手必败局面。而且这样的数字对被称为奇异局势。

- 奇异局势的定义如下：

  - 设数字对为$[a(i), b(i)]$
  - 1:$ a(0) = b(0) = 0$; 
  - 2: $a(k)$是前面数字对中未出现的最小的自然数, 且$a(k)+k=b(k)$。

- 接下来我们看奇异局势的几个性质:

  - 性质1: 任何自然数都包含在一个且仅有一个奇异局势中。

  - 性质2: 任意操作都能将奇异局势转变为非奇异局势.

  - 性质3: 采取适当的方法, 可将非奇异局势转变为奇异局势。

    证明略

- ##### 结论：奇异局势必败

  - 接下来我们看详细证明：
  - 首先要明白Betty定理: $\frac{1}{a}+\frac{1}{b}=1$,($a, b$为无理数), 则有集合$P{[at]}$和集合$Q{[bt]}$会不重复的覆盖掉所有正整数。($t$为任意正整数, $[]$运算为取整数运算)(Betty证明略)
  - 奇异局势有如下命题：
    - (1): $a(n+1)$是前$n$组必败态中出现的最小正整数；
      - 如果$a(n+1$)不是前$n$组未出现的必败态中最小的正整数，则可以$a(n+1)$走到$a$更小的状态, 与我们寻找必败态的方式矛盾。
    - (2):$ a(k)=b(k)+k$
      - 归纳法:$ (0,0)$为必败态;若前k个必败态为$(a(k),b(k)+k)$, 证:下一个必败态为$(a(k+1),a(k+1)+k+1)$。
      - 从$k+1$出发, 一共可能走向三类状态, 从左边拿一些, 从右边拿一些，从两边拿一样多的石子。
        - 情况1: $a$少了, 由命题$1$可知, 比$a$小的任意一个必败态都出现过, 所以后手可以从$b$中取一定量的石子让先手重新面临必败态。
        - 情况2: 与情况1类似
        - 情况3: 同时拿走一定的石子, 假设拿完之后变为$(a(m), a(m)+k+1)$, 后手只需拿走一定数量的石子让先手面对$(a(m), a(m) + m)$这样的局面。
      - 所以成立
  - 接下来我们用Betty定理来求出a, b差值与a的关系
  - 我们知道$a+n=b$
  - $at=[αt], bt=[βt]$
  - 则有at+t=[(α+1)t] =[βt]
  - $\frac{1}{α+1}+\frac{1}{α}=1$推出$α^2-α-1=0$
  - 解方程得$α=\frac{√5+1}{2}$
  - 即我们找到了必败态的通式, 即$α∗(b-a)=a$

- ##### 例题

  - hdu_2177

  - ```c++
    #include<bits/stdc++.h>
    using namespace std;
    int n, m;
    
    bool check(int n, int m)
    {
        int x = min(n, m), y = max(n, m);
        double c = (sqrt(5.00000) + 1) / 2;
        double d = (double)(y - x);
        if(x == int(c*d)) return 1; // 必败
        return 0;
    }
    
    void work()
    {
        if(n > m) swap(n, m); // (n, m)
        //第一个模块 我们能一起减去让他成为必败态
        {
            int tem = m - n;
            double c = (sqrt(5.00000) + 1) / 2;
            int a = double(tem) * c;
            int b = a + tem;
            if(n - a == m - b) cout << a << " " << b << endl;
        }
        //第二个模块 我们求出当前n的奇异局势, 如果m比他大 拿走就行
        //如果m比他小我们求出(x, n) 然后拿走m
        {
            double c = (sqrt(5.00000) + 1) / 2;
            int x = n;
            double d = x / c;
            int y = n + d;
            if(m > y) cout << x << " " << y << endl;
            else
            {
                double x = double(n) * 2 / (sqrt(5.000000) + 1);
                cout << int(x) << " " << n << endl;
            }
        }
    }
    
    int main()
    {
        while(cin >> n >> m)
        {
            if(!(n + m)) break;
            if(check(n, m)) puts("0");
            else
            {
                puts("1");
                work();
            }
        }
        return 0;
    }
    
    ```

  - 

- 

## 斐波那契博弈(Fibonacci Nim Game)

- 一堆石子有$n$个,两人轮流取.先取者第1次可以取任意多个，但不能全部取完。以后每次取的石子数不能超过上次取子数的$2$倍。取完者胜。给定$n$,问先手必胜还是必败。

- ##### 结论：

  - 当$n$为$fibonacci$数的时候,先手必败

- ##### 证明：

  - 采用归纳法证明:

  - 首先: 将$n$记为$f(i)$；

  - 我们考虑最极端的情况当$n=1$时, 先手无法全部取完, 必败; $n=2$时, 先手只能取一枚石子, 必败。同时对于任意一个$n$先手都不能取$n/3$以上的石子, 因为这样先手也将必败。

  - 假设$i≤k$时, 结论成立, 当$i=k+1$时,$ f(i)=f(k)+f(k-1)$

    首先我们明确, 对于$fibonacci$数列, 有如下几个不等式：

    - $1: f(k-1)<2f(k)<f(k+1):$
    - $2: 3f(k-1)>f(k+1)$
    - $3:4f(k-1)<3f(k)$
    - $4: 2f(k-1)>f(k)$

  - 我们可以将$f(i)$分解为$f(k)$和$f(k-1)$两堆石子。基于第一个不等式, 我们得知先手无法一次拿完所有的$f(k-1)$。同时基于假设, 在f(k-1)中先手必败, 则后手将取完所有石子余下$f(k)$个石子。

  - 对于余下的$f(k)$个石子, 由不等式三可以得出先手无法全部拿光$f(k)$, 根据假设可知$f(k)$先手必败, 所以总局面先手必败。

  - 当$n$不为$fibonacci$数时, 根据$Zeckendorf$定理(齐肯多夫定理)**(任意一个数字都可表示为若干个不连续的斐波那契数之和)**, 先手可取一定的石子让后手面对$fibonacci$数

- 例题：

  - hdu_2516

  - ```c++
    #include<bits/stdc++.h>
    using namespace std;
    typedef long long ll;
    unordered_map<int, int> mp;
    ll f[50];
    void fib()
    {
        f[0] = f[1] = 1;
        for(int i = 2; i <= 50; i++)
        {
            f[i] = f[i - 1] + f[i - 2];
            mp[f[i]]++;
        }
    }
    
    int main()
    {
        int n;fib();
        while(cin >> n)
        {
            if(n == 0)break;
            if(!mp[n]) puts("First win");
            else puts("Second win"); //如果是fibonacci数, 则先手必败
        }
        return 0;
    }
    
    ```

  - 

## SG函数

- ##### $mex$运算:

  - 定义$mex(S)$为不属于集合S的最小非负整数运算。
  - •举个栗子: $S={1, 2, 3}, mex(s) = 0$;

- ##### SG函数:

  - •SG函数: 设对于每个节点x, 设从x出发有k条有向边分别到达节点$y_1 ,y_2,…,y_k$, 定义SG(x)函数为后继节点$y_1 ,y_2,…,y_k$的$SG$函数值构成的集合再执行$mex$运算的结果。
  - 特别的, 整个有向图$G$的$SG$函数被定义为有向图起点$s$的$SG$函数值, 即$SG(G)=SG(s)$
  - 有向图终点的$SG$函数为$0$。

- ##### 结论:

  - •先手必败, 则该局面对应$SG$函数$=0$。反之必胜。

- ##### 简单证明：

  - 考虑极端情况: 若某个结点棋子不能移动, 即当前处于终点无法移动, 此时$SG$值为$0$, 对应必败状态。
  - 若某个结点的后继节点的$SG=0$, 则在后继节点$mex$运算后该节点的值大于$0$ 这等价于一个局面后面存在必败局面, 则当前局面为必胜局面。
  - 若某个节点所有后继节点的$SG≠0$, 在$mex$运算后, 该节点的$SG$值为$0$, 即某一个局面后继节点全部为必胜局面, 则当前局面为必败局面。

- ##### 推广：

  - 当然我们有时候面对的不止是一个有向图上的博弈, 可能是多个图上的博弈。
  - •对于多个有向图: 令$res=SG(s_1 )\land SG(s_2 )\land … \land SG(s_n);$
  - 若$res=0$, 则总局面必败。
  - 若$res≠0$, 则总局面必胜。
  - 证明与经典$Nim$游戏类似, 不在赘述。

- ##### 例题

  - ```c++
    #include<bits/stdc++.h>
    using namespace std;
    const int maxn = 1e3 + 10;
    int n, num;
    int sg[maxn];
    
    int head[maxn], ver[maxn], nex[maxn], tot;
    void add(int x, int y)
    {
        ver[++tot] = y; nex[tot] = head[x]; head[x] = tot;
    }
    
    int GetSg(int x)
    {
        if(sg[x] != -1) return sg[x];
        bool vis[maxn];
        memset(vis, 0, sizeof(vis));
        for(int i = head[x]; i; i = nex[i]) // 扫描所有出边
        {
            int y = ver[i];
            sg[y] = GetSg(y);
            vis[sg[y]] = 1; //所有出边的sg函数值
        }
        for(int i = 0; i < n; i++)
            if(!vis[i]) return sg[x] = i; // mex运算
        return 0;
    }
    
    void init()
    {
        memset(head, 0, sizeof(head));
        memset(nex, 0, sizeof nex);
        memset(ver, 0, sizeof ver);
        memset(sg, -1, sizeof sg);
        tot = 0;
    }
    
    int main()
    {
        while(cin >> n)
        {
            init();
            for(int i = 0; i < n; i++)
            {
                cin >> num;
                while(num--)
                {
                    int x; scanf("%d", &x);
                    add(i, x);
                }
            }
            while(cin >> num)
            {
                if(!num) break;
                int res = 0;
                while(num--)
                {
                    int x; scanf("%d", &x);
                    res ^= GetSg(x);
                }
                if(res) puts("WIN");
                else puts("LOSE");
            }
        }
        return 0;
    }
    
    ```

  - hdu_1536

    ```
    #include<bits/stdc++.h>
    using namespace std;
    const int maxn = 1e4 + 10;
    int s[maxn], sg[maxn];
    int k;
    
    void init()
    {
        memset(sg, -1, sizeof(sg));
    }
    
    int GetSg(int x)
    {
        if(sg[x] != -1) return sg[x];
        bool vis[maxn]; memset(vis, 0, sizeof(vis));
        for(int i = 1; i <= k; i++)
            if(x >= s[i])
            {
                sg[x - s[i]] = GetSg(x - s[i]);
                vis[sg[x - s[i]]] = 1;
            }
        for(int i = 0; ; i++)
            if(!vis[i]) return sg[x] = i;
        return 0;
    
    }
    
    int main()
    {
        ios::sync_with_stdio(false);
        while(cin >> k)
        {
            init();
            if(k == 0) break;
            for(int i = 1; i <= k; i++) cin >> s[i];
            int num; cin >> num;
            while(num--)
            {
                int x, res = 0; cin >> x;
                for(int i = 1; i <= x; i++)
                {
                    int y; cin >> y;
                    res ^= GetSg(y);
                }
                if(res) cout << "W";
                else cout << "L";
            }
            cout << endl;
        }
        return 0;
    }
    
    ```

    
