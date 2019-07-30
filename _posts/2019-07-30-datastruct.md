---
layout: post
title: 2019暑期集训第五讲：基础数据结构

---
# 数据结构基础

## 栈

### 1.定义

 	栈（Stack）又称堆栈，它是一种运算受限的线性表，其限制是仅允许在表的一端进行插入和删除运算。人们把此端称为栈顶，栈顶的第一个元素被称为栈顶元素，相对地，把另一端称为栈底。向一个栈插入新元素又称为进栈或入栈，它是把该元素放到栈顶元素的上面，使之成为新的栈顶元素；从一个栈删除元素又称为出栈或退栈，它是把栈顶元素删除掉，使其下面的相邻元素成为新的栈顶元素。 

### 2.栗子

​	放盘子，装东西....

### 3.实现

​	实现一般有两种：第一种用一个数组和一个变量（栈顶指针）来实现。第二种用STL自带的stack。

​	常规操作：

​	

```
#include<iostream>
#include<stack>
using namespace std;
stack<int> s;
int main()
{
	s.push(10);//入栈
	cout<<s.size()<<endl;//栈大小
	int t=s.top();//栈顶元素
	cout<<t<<endl;
	s.pop();//出栈
	if(s.empty())//判断栈是否为空
	{
		cout<<"empty"<<endl;
	}
	return 0;
}
```

### 队列

### 1.定义

​	队列是一种特殊的线性表，特殊之处在于它只允许在表的前端（front）进行删除操作，而在表的后端（rear）进行插入操作，和栈一样，队列是一种操作受限制的线性表。进行插入操作的端称为队尾，进行删除操作的端称为队头。 

### 2.例子

​	排队....

### 3.实现

​	和栈一样，一般同样有两种方法。第一种用一个数组和两个变量（分别表示队头和队尾）来模拟。第二种方法，同样利用STL的queue

```
#include<iostream>
#include<queue>
using namespace std;
queue<int> q;
int main()
{
	q.push(10);//入队
	q.push(20);
	cout<<q.size()<<endl;//队列大小
	int t=q.front();//队头
	cout<<t<<endl;
	t=q.back();//队尾
	cout<<t<<endl;
	q.pop();//出队
	if(q.empty())//判断队是否为空
	{
		cout<<"empty"<<endl;
	}
	return 0;
}
```

### 4.特殊

​	**双端队列：Deque是一种具有队列和栈的性质的数据结构.双端队列中的元素可以从两端弹出,其限定插入和删除操作在表的两端进行.** 

```
#include<cstdio>
#include<iostream>
#include<deque>
 
using namespace std;
int main()
{
	/*--1--*--*--定义初始化队列_使用赋值操作--*--*--*/ 
	deque<char> str(10,'A');//10个char型的A 
	deque<char> str1;
	str1=str;//重载赋值符号 
 
	/*--2 --*--*--定义迭代器，遍历_基础 队列str --*--*--*/ 
	deque<char>::iterator it;
	for(it=str1.begin();it!=str1.end();it++)//遍历 
		cout<<*it<<"  ";
	cout<<endl;
 
	/*--3--*--*--对容器 判空、清除、获取长度 --*--*--*/ 
	bool idempty=str1.empty();
	if(idempty)
		cout<<"YES"<<endl;
	else
		cout<<"NO"<<endl;
	int temp_len1 =str1.size();
		cout<<temp_len1<<"\n"; 
	str1.clear();//清空队列 
	if(str1.empty())
		cout<<"YES"<<"\n";
	else
		cout<<"NO"<<"\n";
 
/*-------以下-对容器中的元素--获取--修改--插入--删除--遍历---------------------*/
 
	/*--1--*--*--数组下标操作符重载 --*--*--*/
		deque<int>d1(10,1);//定义+初始化 
		int i1=d1[1];
		cout<<"i1="<<i1<<endl; 
		int first=d1[0];
		cout<<"first="<<first<<endl;
		first=d1.front();
		cout<<"first="<<first<<endl;
	/*--1'--*--*--获取和修改容器元素 --*--*--*/
		d1.at(3)=4;
		int i2=d1.at(3);
		cout<<"i2= "<<i2<<"\n";
	
	/*--2--*--*--尾部--插入元素，删除元素 --*--*--*/
	    deque<int>::iterator it1;//定义迭代器，注意迭代器的类型 
	    
		d1.push_back('C');//后进或删除 
		for(it1=d1.begin();it1<d1.begin()+11;it1++)
			cout<<" "<<*it1<<" ";
		cout<<"\n";
		d1.pop_back();
		
	/*--3--*--*--头部--插入元素，删除元素--*--*--*/
		d1.push_front(404);//注意这里符合栈 
		d1.push_front(666);
		d1.pop_front();
		for(it1=d1.begin();it1!=d1.end();it1++)
			cout<<" "<<*it1<<" "; 
		d1.push_front('45') ;
		cout<<"\n";
		
	/*--4--*--*--获取--头部和尾部元素 --*--*--*/
		int start1=d1.front();
		int end1=d1.back();
		cout<<"star1= "<<start1<<"\n"<<"end1= "<<end1<<"\n";	
		
	/*--5--*--*--任意位置--插入、删除元素--*--*--*/
		str1.insert(str1.begin()+4,'x');
		for(it=str1.begin();it!=str1.end();it++)
			cout<<*it<<" ";
	return 0;
}
```

### 5.应用

​	一般来说队列应用感觉更广一点，宽搜，spfa，树的层序遍历...

### 二叉堆

### 1.定义

​	二叉堆是一种支持插入，删除，查询最值的数据结构。是一棵满足堆性质的完全二叉树，书上的每一个节点带有一个权值。若树中的任意一个节点的权值都小于等于其父节点的权值，则称该二叉树满足大根堆性质。若任意一个节点的权值都大于等于其父节点的权值，则称该二叉树满足小根堆性质。

### 2.实现

​	一般来说，还是两种实现方式。第一种，数组模拟，根据二叉树的性质，父节点的编号等于子节点的编号/2，左孩子的节点等于父节点编号 * 2，右孩子的节点等于父节点编号 * 2+1。但是需要考虑还有三种基本操作要满足。即插入元素，移除堆顶，删除元素。

 	这里就手撕一下二叉堆的几个操作：

**插入元素：**

```
int heap[SIZE],n;

void up(int p)//向上调 
{
	while(p>1)
	{
		if(heap[p]>heap[p/2])//子节点>父节点，不满足大根堆的性质 
		{
			swap(heap[p],heap[p/2]);
			p/=2;
		}
		else
		{
			break;
		}
	}
}

void Insert(int val)
{
	heap[++n]=val;
	up(n);
}
```

**获取堆顶：**

```
int GetTop()
{
	return heap[1];
}
```

**移除堆顶：**

```
void down(int p)
{
	int s=p*2;//p的左孩子 
	while(s<=n)
	{
		if(s<n&&heap[s]<heap[s+1])	//先左右节点去较大值 
			s++;
		if(heap[s]>heap[p])//子节点>父节点，不满足大根堆性质 
		{
			swap(heap[s],heap[p]);
			p=s,s=p*2;
		}
		else
			break;
	}
}

void Extract()
{
	heap[1]=heap[n--];
	down(1);
}
```

**删除元素：**

```
void Remove(int k)//和移除堆顶类似，先heap[p]和heap[n]交换，然后n--，然后可能向上调整，可能向下调整，都跑一下。 
{
	heap[k]=heap[n--];
	up(k);
	down(k);
} 
```

第二种，你们懂得。STL~。优先队列，priority_queue（优先队列)。

### 链表

### 1.定义

​	可以支持在任意位置插入或删除，但只能按顺序依次访问其中的元素的一种数据结构。和数组可以鲜明对比：数组支持随机访问但不支持在任意位置插入或删除元素。

### 2.实现

​	一般来说，三种实现，两种是自己写的，第一种，动态分配内存，指针等实现。第二种，结构体数组模拟。第三种，STL的list。

这里只给出第一种和第二种的实现代码。

```
struct node
{
	int value;//数据 
	node *prev,*next;//指针 
};

node *head,*tail;
void initialize()//新建链表
{
	head=new node();
	tail=new node();
	head->next=tail;
	tail->prev=head;
}

void insert(node *p,int val)//在p后插入包含数据val的新节点 
{
	q=new node();
	q->value=val;
	p->next->prev=q;
	q->next=p->next;
	p->next=q;
	q->prev=p;
} 

void remove(node *p)//删除p 
{
	p->prev->next=p->next;
	p->next->prev=p->prev;
	delete p;
}

void recycle()//链表内存回收 
{
	while(head!=tail)
	{
		head=head->next;
		delete head->prev;
	}
	delete tail;
}
```

第二种：

```
struct Node
{
	int value;
	int prev,next;
}node[SIZE];
int head,tail,tot;
int initialize()
{
	tot=2;
	head=1,tail=2;
	node[head].next=tail;
	node[tail].prev=head;
}

int insert(int p,int val)
{
	q=++tot;
	node[q].value=val;
	node[node[p].next].prev=q;
	node[q].next=node[p].next;
	node[p].next=q;
	node[q].prev=p;
}

void remove(int p)
{
	node[node[p].prev].next=node[p].next;
	node[node[p].next].prev=node[p].prev;
}

void clear()//数组模拟链表清空 
{
	memset(node,0,sizeof(node));
	head=tail=tot=0;
}
```

### 单调栈

### 1.定义

单调栈是指一个栈内部的元素是具有严格单调性的一种数据结构，分为单调递增栈和单调递减栈。 

### 2.性质

1.满足从栈顶到栈底的元素具有严格的单调性

2.满足栈的后进先出特性越靠近栈底的元素越早进栈

### 3.例题

## [Feel Good](https://vjudge.net/problem/POJ-2796)

题意：一个长度为n的序列，对于一个区间中的value为这个区间的最小值乘上这个区间的所有数的和 ，求所有value里面的最大值。

思路：将序列中的每一个元素假定为最小值，向左右扩展，求出每一个元素能到达的l,r,用一个单调递增栈维护即可。对于每一个新元素a[i]，当前值小于等于栈顶元素，表示以栈顶元素为最小值的区间的右端是i，栈顶元素a[j]出栈 ， 由于是单调递增栈，新的栈顶元素a[k]必然小于a[j]，故需要更新新的栈顶元素的，右端值，新元素的左端的值也要更新为a[j]的左端，一直重复操作直到栈顶元素大于新元素，这样这个栈的每一个元素出栈时其左右区间必然是刚好最大的以该元素为最小值的区间。时间复杂度O(n)。

```c++
#include<cstdio>
#include<cstring>
#include<iostream>
using namespace std;
const int maxn = 100010;
typedef long long int ll ;
struct node
{
    int l , r ;
    ll num ;
}s[maxn] ;
ll a[maxn] ;
ll sum[maxn] ;
ll ans ;
int ans_l , ans_r ;
void update(int top)
{
    int l = s[top].l , r = s[top].r ;
    if((sum[r] - sum[l-1])*s[top].num > ans)
    {
        ans = (sum[r] - sum[l-1])*s[top].num ;
        ans_l = l ;
        ans_r = r ;
    }
    if(top > 0)
    	s[top-1].r = s[top].r ;
}
int main()
{
    int n ;
    while(cin>>n)
    {
        ans = -1;
        int top = -1 ;
        sum[0] = 0 ;
        for(int i = 1 ;i <= n ;i++)
        {
            scanf("%I64d" , &a[i]) ;
            sum[i] = sum[i-1]+a[i];//前缀和 
        }
        for(int i = 1;i <= n;i++)
        {
            node v = {i , i ,a[i]};
            while(top != -1 && s[top].num >= a[i])//栈顶小，满足单调递增栈 
            {
                update(top) ;
                v.l = s[top].l ;
                top-- ;
            }
            s[++top].l = v.l ;//入栈 
            s[top].r = v.r ;
            s[top].num = v.num ;
        }
        while(top != -1)//如果最后栈非空，一边出栈，一边更新值。 
        {
            update(top);
            top-- ;
        }
        printf("%I64d\n" , ans) ;
        printf("%d %d\n",ans_l , ans_r) ;
    }
    return 0 ;
}
```

### 那么问题来了，有正有负怎么办？？

[https://nanti.jisuanke.com/t/38228](https://nanti.jisuanke.com/t/38228%E5%8D%97%E6%98%8C%E7%BD%91%E7%BB%9C%E9%82%80%E8%AF%B7%E8%B5%9B%E9%A2%98%EF%BC%8C%E5%8D%95%E8%B0%83%E6%A0%88%E7%BB%B4%E6%8A%A4%EF%BC%8CI%E9%A2%98%E5%8F%98%E7%A7%8D) 南昌网络邀请赛~

题意几乎一样，只是序列中的元素可正可负，怎么处理？

思路：正数同理，负数的话，让左边界到当前元素的值尽可能大，右边界到当前元素的值尽可能小。那么右-左最小，得出的值最大。

## [Largest Rectangle in a Histogram](https://vjudge.net/problem/POJ-2559)

 题意：柱状图是由一些宽度相等的长方形下端对齐后横向排列得到的图形。现在有n个宽度为1，
高度分别为h1,h2...,hn的长方形从左到右依次排列组成的柱状图。问里面包含的长方形的最大面积是多少.

分析：可以枚举每一个长方形的高度，作为组合后的长方形的高度。那么我们需要找到这个长方形，然后求出能够向左右两边延伸的长度。找左右边界的时候，需要用到单调栈。

```c++
#include <cstdio>
#include <iostream>
#include <algorithm>
#include <cstring>
#include <stack>
using namespace std;
typedef long long LL;
const int MAXN=1e5+100;
LL ll [MAXN];
LL rr[MAXN];
LL a[MAXN];
LL n;
LL maxx;
int main()
{
  	int k;
    while(scanf("%lld",&n)&&n)
    {
     	maxx=0;
     	stack<int> S;
     	for(int i=1;i<=n;i++)
     		scanf("%lld",&a[i]);
    
     	for(int i=1;i<=n;i++)
     	{
         	if(S.empty())
        	{
           		ll[i]=1;//左界 
           		S.push(i);
        	}
        	else
        	{
            	k=S.top();
           		while(a[k]>=a[i])//单调栈，单调递减栈 
           		{
              		rr[k]=i;//k的右界就是下标i 
              		S.pop();
              		if(S.empty())
              			break;
              		k=S.top();
           		}
            	if(S.empty())//如果栈空了，当前元素左界就是1，即最小 
            		ll[i]=1;
            	else//不然就是栈顶+1，栈中存的都是下标 
            		ll[i]=k+1;
            	S.push(i);
        	}
     	}
    
        while(!S.empty())//当栈不为空时，因为是单调递减栈，所以剩下的元素的右界都是n+1(其实是n但是后面减的时候方便而已) 
        {
           	k=S.top();
           	rr[k]=n+1;
           	S.pop();
        }
       	for(int i=1;i<=n;i++)//扫一遍最大值即可 
        	maxx=max(maxx,a[i]*(rr[i]-ll[i]));
       	printf("%lld\n",maxx);
    }
    return 0;
}
```

### 总结

​	如果当前值是最小值，用一个单调递增栈维护，如果当前值是最大值，用一个单调递减栈维护。

### 单调队列

### 1.定义

单调队列是指一个队列内部的元素具有严格单调性的一种数据结构，分为单调递增队列和单调递减队列。 

### 2.性质

1.单调队列必须满足从队头到队尾的严格单调性。

2.排在队列前面的比排在队列后面的要先进队。

### 3.例题

## [Sliding Window](https://vjudge.net/problem/POJ-2823)

 题意：给定一个大小已知的数组以及一个大小已知的滑动窗口，窗口每个时刻向后移动一位，求出每个时刻窗口中数字的最大值和最小值。

分析：

求最大值：建立一个单调递减队列，元素从左到右依次入队，入队之前必须从队列尾部开始删除那些比当前入队元素小或者相等的元素，直到遇到一个比当前入队元素大的元素，或者队列为空为止。若此时队列的大小超过窗口值，则从队头删除元素，直到队列大小小入窗口值为止。然后把当前元素插入队尾。
求最小值：建立一个单调递增队列，元素从左到右依次入队，入队之前必须从队列发问开始删除那些比当前入队元素大或者相等的元素，直到遇到一个比当前入队元素小的元素，或者队列为空为止。若此时队列的大小超过窗口值，则从队头删除元素，直到队列大小小入窗口值为止。然后把当前元素插入队尾。
设窗口大小为k，本题解法为建立两个单调队列，先从原数组中取前k个元素按上述要求入队，然后获取队头元素，再把下一个元素放入队中，再获取头元素，这样一直到最后一个元素为止。最后把答案从头到尾依次输出即可。

```c++
#include <iostream>
#include <cstdio>
using namespace std; 
const int N = 1000005;
 
struct Elem
{
	int val;
	int pos;
};
 
Elem maxque[N];
Elem minque[N];
int maxhead, minhead, maxtail, mintail;
int maxans[N];
int minans[N];
int cur;
 
int main()
{
	int n, w, num;
	scanf("%d%d", &n, &w);
	minhead = mintail = 0;
	maxhead = maxtail = 0;
	cur = 0;
	for (int i = 0; i < w; ++i)//0-w，第一个窗口的情况 
	{
		scanf("%d", &num);
		
		while (minhead < mintail && minque[mintail - 1].val >= num) //单调递增队列，非空并且队尾的值大于当前值，出队 
		{
			--mintail;
		}
		minque[mintail].val = num;
		minque[mintail].pos = i;
		++mintail;
 
		while (maxhead < maxtail && maxque[maxtail - 1].val <= num) //单调递减队列，非空并且队伍的值小于当前值，出队 
		{
			--maxtail;
		}
		maxque[maxtail].val = num;
		maxque[maxtail].pos = i;
		++maxtail;
	}
	for (int i = w; i < n; ++i)
	{
		minans[cur] = minque[minhead].val;//记录答案 
		maxans[cur] = maxque[maxhead].val;
		++cur;
 
		scanf("%d", &num);
 
		while (minhead < mintail && i - minque[minhead].pos >= w) //队列非空并且当前元素位置-队列头的位置大于滑窗大小，队头元素出队 
		{
			++minhead;
		}
		while (minhead < mintail && minque[mintail - 1].val >= num) //队列非空并且队尾元素大于当前值，出队 
		{
			--mintail;
		}
		minque[mintail].val = num;
		minque[mintail].pos = i;
		++mintail;
		
		while (maxhead < maxtail && i - maxque[maxhead].pos >= w) //同上 
		{
			++maxhead;
		}
		while (maxhead < maxtail && maxque[maxtail - 1].val <= num) 
		{
			--maxtail;
		}
		maxque[maxtail].val = num;
		maxque[maxtail].pos = i;
		++maxtail;
	}
	minans[cur] = minque[minhead].val;
	maxans[cur] = maxque[maxhead].val;
	++cur;
	
	for (int i = 0; i < cur; ++i)
	{
		if (i > 0) 
			putchar(' ');
		printf("%d", minans[i]);
	}
	printf("\n");
	for (int i = 0; i < cur; ++i)
	{
		if (i > 0) 
			putchar(' ');
		printf("%d", maxans[i]);
	}
	printf("\n");
	return 0;
}
```

​	此题为单调队列模板题，需要思考一下为什么求最大值要单调递减队列，求最小值需要单调递增队列？？

​	不难理解，因为是用队头去获取区间的值，单调递减队列队头必定区间最大，单调递增队列必定区间最小。

## [Fence](https://vjudge.net/problem/POJ-1821)

 	题意：K个人对N块木板涂色，每个人初始站在一块木板前（不重复），每人最多只能涂包含所站木板的连续l个木板或一个木板也不涂。给出每人最多涂的木块数l,涂一快木板的工钱p，站的木板s。求这群人最多共获得多少工钱。

​	分析：dp   `[i][j]`表示前i个人对前j块木板操作的最大收益。
	核心状态转移方程：`dp[i][j]=max(dp[i][j-1],dp[i-1][k]+P[i].p*(j-k),dp[i-1][j])`  

​                                      `max(0,P[i].s-P[i].l)<=k<min(P[i].s-1,j)` 

​	显然直接做就是枚举i,j,k。观察   ` dp[i-1][k]+P[i].p*(j-k)=(dp[i-1][k]-P[i].p*k)+P[i].p*j`
在枚举k的时候,P[i].p*j的值已经确定不用考虑，只需要找出使 `(dp[i-1][k]-P[i].p*k)` 最大的k就行了，又观察到这个式子的值不与j相关，也就是说在枚举k之前我们就可以通过某种方法找出这个k，即：构造递减的 单调队列 维护k值。

```c++
#include<cstdio>
#include<algorithm>
#include<cstring>
#include<iostream>
using namespace std;
int dp[110][16050];

struct person
{
    int l,p,s;//最多涂的砖块数，涂一块获得的钱，位置 
}P[110];
int cmp(person p1,person p2)
{
    return p1.s<p2.s;
}
 
int Q[16050];
int main()
{
    int N,K;
    while(scanf("%d%d",&N,&K)!=EOF)//n块砖，k个人 
    {
        for(int i=1;i<=K;i++)
            scanf("%d%d%d",&P[i].l,&P[i].p,&P[i].s);
        sort(P+1,P+K+1,cmp);
 
        int front,rear;
        memset(dp,0,sizeof(dp));
        int ans=0;
        for(int i=1;i<=K;i++)
        {
            front=0;rear=1;
            Q[0]=max(P[i].s-P[i].l,0);
            for(int j=1;j<=N;j++)
            {
                dp[i][j]=max(dp[i][j-1],dp[i-1][j]);
                if(j>=P[i].s+P[i].l)//这些木块涂不了
                    continue;
                while(front<rear&&Q[front]+P[i].l<j)//队中的k过小，出队
                    front++;
                if(j<P[i].s)//符合k的取值范围即可以考虑入队，不能超过当前人的位置 
                {
                    int temp=dp[i-1][j]-j*P[i].p;
                    while(front<rear&&dp[i-1][Q[rear-1]]-Q[rear-1]*P[i].p<temp)//更优的k出现，队尾出队
                        rear--;
                    Q[rear++]=j;
                    continue;//第i个人无法涂这些木块
                }
                dp[i][j]=max(dp[i][j],dp[i-1][Q[front]]+P[i].p*(j-Q[front]));
            }
        }
        printf("%d\n",dp[K][N]);
    }
    return 0;
}
```

再看一道

## [Dividing the Path](https://vjudge.net/problem/POJ-2373)

 	题意：在长为L的草地上装喷水头，喷水头的喷洒半径为[a,b]，要求草地的每个整点被且只被一个喷水头覆盖

有N个特殊区间，要求只能被某一个喷水头完整地覆盖，而不能由多个喷水头分段覆盖，求喷水头的最小数目

​	注意：喷水头只能建在整数点上

​	分析：dp[i] 表示区间[0,i]完全被覆盖的最少喷水头数目。dp[i]=min(dp[j]+1)   j∈[i-2*b,i-2*a]，若i处于某个特殊区间内部，则dp[i]=inf，dp[0]=0,dp[i]=min{dp[i-2*b]....dp[i-2*a]}； 

​	注意：因为喷水头只能建在整数点上，当i为奇数时，区间[0,i]一共有偶数个点，喷水头不可能建在整数点上

所以只有i为偶数时才是有用的。

​	

```c++
#include<cstdio>
#include<cstring>
#include<iostream>
#include<algorithm>

using namespace std;

int a,b;

int dp[1000005];
bool all[1000005];

struct node
{
    int l,r;
}e[1001];

int q[1000005];
int h,t;//双指针,head,tail 

void read(int &x)
{
    x=0; char c=getchar();
    while(!isdigit(c)) c=getchar(); 
    while(isdigit(c)) { x=x*10+c-'0'; c=getchar(); }
}

bool cmp(node p,node q)
{
    if(p.l!=q.l) 
		return p.l<q.l;
    return p.r<q.r;
}

void up(int i)//i是偶数 ，单调递增队列 
{
    while(h<t && i-q[h]>2*b) //队列非空，超出了喷水头射程，队头出队 
		h++;
    if(h<t && i-q[h]>=2*a)
    {
        dp[i]=dp[q[h]]+1;
        while(h<t && dp[i]<dp[q[t-1]]) //到i用的喷水头更少则更新答案 
			t--;
        q[t++]=i;
    }
}

int main()
{
    int n,l;//n个特殊区间，l长的草坪。喷水头的射程a,b。 
    read(n); read(l);
    read(a); read(b);//a<=b
    for(int i=1;i<=n;++i) //特殊区间的左界右界
		read(e[i].l),read(e[i].r); 
    sort(e+1,e+n+1,cmp);
    memset(dp,63,sizeof(dp));//0x3f3f3f3f
    int INF=dp[0];
    //cout<<INF<<endl;
    dp[0]=0;
    q[t++]=0;//队列里面放个0 
    int now=1;
    int i=1;
    while(i<=l)
    {
        if(now<=n && e[now].l<i)
        {
            if(e[now].r>i) i=e[now].r;//这里没问题，要保证特殊区间只能被一个喷水头完整的覆盖，因此i直接到右界，继续往后扫即可，如果最后发现所有队头+射程都达不到，就真的不行了 
            now++;
            continue;
        }
        if(!(i&1))//必须是偶数才行，奇数的话有偶数个点（加0点），就不行。 
			up(i);
        i++;
    }
    if(dp[l]==INF) 
		printf("-1");
    else 
		printf("%d",dp[l]);
	return 0; 
}
```

### 总结

单调队列优化dp
单调队列可以有两个操作：
1、插入一个新的元素，该元素从队尾开始向队首进行搜索，找到合适的位置插入之，如果该位置原本有元素，则替换它。
2、在过程中从队首删除不符合当前要求的元素。单调队列实现起来可简单，可复杂。简单的一个数组，一个head，一个tail指针就搞定。复杂的用双向链表实现。

用处：
1、保存最优解，次优解，ect。
2、利用单调队列对dp方程进行优化，可将O(n)复杂度降至O(1)。也就是说，将原本会超时的N维dp降优化至N-1维，以求通过。这也是我想记录的重点。

是不是任何DP都可以利用单调队列进行优化呢？答案是否定的。

记住！只有形如 dp[i]=max/min (f[k]) + g[i]  （k<i && g[i]是与k无关的变量）才能用到单调队列进行优化。（降维实质：把状态转移方程分为两部分：只与k有关，只与i有关。 与k有关的状态在前i-1次压入que，i有关的是此次状态转移所需的g[i]）。
优化的对象就是f[k]。