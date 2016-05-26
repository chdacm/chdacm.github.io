/* ***********************************************
MYID	: Chen Fan
LANG	: G++
PROG	: HE
************************************************ */

#include <iostream>
#include <cstdio>
#include <cstring>
#include <algorithm>

using namespace std;

int main()
{
	//freopen("sample.in","r",stdin);
	//freopen("HE.in","r",stdin);
	//freopen("HE.out","w",stdout);

	int T=1;

	int comment=0;
	// 0 -- normal
	// 1 -- //
	// 2 -- /*--*/
	char now,last;
	int blank=0,alreadyout=0;

	scanf("%c",&last);
	while(scanf("%c",&now)!=EOF)
	{
		bool out=true;
		switch(last)
		{
			case '/':
				if (comment==0)
					if (now=='/') 
					comment=1;
					else if (now=='*') 
					{
						comment=2;
						now='\0';
					}
				break;
			case '*':
				if (comment==2&&now=='/')
				{
					comment=0;
					out=false;
					now=getchar();
				}
				break;
			case '\n':
				if (comment==1) comment=0;
				if (!alreadyout) out=false;
				alreadyout=0;
				blank=0;
				break;
			case ' ':
				if (comment==0) blank++;
		}
		if (comment==0&&out&&last!=' ')
		{
			for (int i=1;i<=blank;i++) printf(" ");
			blank=0;
			printf("%c",last);
			if (last!='\n') alreadyout++;
		}
		
		last=now;
	}
	
	printf("%c",now);

	return 0;
}
