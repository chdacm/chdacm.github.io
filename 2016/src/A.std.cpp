#include<iostream>
#include<cstdio>
#include<cmath>
using namespace std;
const long double pi=acos(-1.0);
long double x,y,t,ans,dh,r,tt;
int R,H,h1,h2,r1,r2,a1,a2,casenum,T;
long double calc1(long double left,long double right)
{
	long double mid1=left*2/3+right/3;
	long double mid2=left/3+right*2/3;
	long double tmp1=sqrt(r*r+R*R-2*r*R*cos(mid1))+sqrt(dh*dh+R*R*(t-mid1)*(t-mid1));
	long double tmp2=sqrt(r*r+R*R-2*r*R*cos(mid2))+sqrt(dh*dh+R*R*(t-mid2)*(t-mid2));
	if (right-left<1e-7)
	{
		return (tmp1+tmp2)/2;
	}
	if (tmp1<tmp2) return calc1(left,mid2);
	else return calc1(mid1,right);
}
long double solve1(long double left,long double right)
{
	long double mid1=left*2/3+right/3;
	long double mid2=left/3+right*2/3;
	long double tmp1=sqrt(r2*r2+R*R-2*r2*R*cos(mid1))+sqrt(dh*dh+R*R*(tt-mid1)*(tt-mid1));
	long double tmp2=sqrt(r2*r2+R*R-2*r2*R*cos(mid2))+sqrt(dh*dh+R*R*(tt-mid2)*(tt-mid2));
	if (right-left<1e-7)
	{
		return (tmp1+tmp2)/2;
	}
	if (tmp1<tmp2) return solve1(left,mid2);
	else return solve1(mid1,right);
}
long double calc2(long double left,long double right)
{
	long double x;
	long double mid1=left*2/3+right/3;
	long double mid2=left/3+right*2/3;
	tt=t-mid1;
	x=min(solve1(0,0),solve1(tt,tt));
	long double tmp1=sqrt(r1*r1+R*R-2*r1*R*cos(mid1))+min(solve1(0,tt),x);
	tt=t-mid2;
	x=min(solve1(0,0),solve1(tt,tt));
	long double tmp2=sqrt(r1*r1+R*R-2*r1*R*cos(mid2))+min(solve1(0,tt),x);
	if (right-left<1e-7)
	{
		return (tmp1+tmp2)/2;
	}
	if (tmp1<tmp2) return calc2(left,mid2);
	else return calc2(mid1,right);
}
long double solve2(long double left,long double right)
{
	long double mid1=left*2/3+right/3;
	long double mid2=left/3+right*2/3;
	long double tmp1=sqrt(2*R*R-2*R*R*cos(mid1))+sqrt(h2*h2+R*R*(tt-mid1)*(tt-mid1));
	long double tmp2=sqrt(2*R*R-2*R*R*cos(mid2))+sqrt(h2*h2+R*R*(tt-mid2)*(tt-mid2));
	if (right-left<1e-7)
	{
		return (tmp1+tmp2)/2;
	}
	if (tmp1<tmp2) return solve2(left,mid2);
	else return solve2(mid1,right);
}
long double calc3(long double left,long double right)
{
	long double x;
	long double mid1=left*2/3+right/3;
	long double mid2=left/3+right*2/3;
	tt=t-mid1;
	x=min(solve2(0,0),solve2(tt,tt));
	long double tmp1=sqrt(h1*h1+R*R*mid1*mid1)+min(solve2(0,tt),x);
	tt=t-mid2;
	x=min(solve2(0,0),solve2(tt,tt));
	long double tmp2=sqrt(h1*h1+R*R*mid2*mid2)+min(solve2(0,tt),x);
	if (right-left<1e-7)
	{
		return (tmp1+tmp2)/2;
	}
	if (tmp1<tmp2) return calc3(left,mid2);
	else return calc3(mid1,right);
}
int main()
{
	//freopen("G.in","r",stdin);
	//freopen("in","r",stdin);
	cin>>T;
	for (casenum=1;casenum<=T;casenum++)
	{
		cout<<"Case #"<<casenum<<": ";
		cin>>R>>H;
		cin>>h1>>a1>>r1;
		cin>>h2>>a2>>r2;
		dh=fabs(h1-h2);
		t=fabs(a1-a2);
		if (t>180) t=360-t;
		t=t/180*pi;
		if (r1==R&&r2==R)
		{
			ans=sqrt((R*t*R*t)+dh*dh);
			ans=min(ans,calc3(0,t));
			ans=min(ans,calc3(0,0));
			ans=min(ans,calc3(t,t));
			h1=H-h1;h2=H-h2;
			ans=min(ans,calc3(0,t));
			ans=min(ans,calc3(0,0));
			ans=min(ans,calc3(t,t));
			printf("%.2f\n",(double)ans);
			continue;
		}
		if ((r1<R&&r2==R)||(r1==R&&r2<R))
		{
			if (r1<R) r=r1;
			else r=r2;
			ans=calc1(0,t);
			ans=min(ans,calc1(0,0));
			ans=min(ans,calc1(t,t));
		}
		if (r1<R&&r2<R)
		{
			if (h1==h2) ans=sqrt(r1*r1+r2*r2-2*r1*r2*cos(t));
			else
			{
				ans=calc2(0,t);
				ans=min(ans,calc2(0,0));
				ans=min(ans,calc2(t,t));
			}
		}
		printf("%.2f\n",(double)ans);
	}

	return 0;
}
