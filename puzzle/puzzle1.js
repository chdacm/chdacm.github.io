var time=0;

var pause=true;

var set_timer;

var d=new Array(10);

var d_direct=new Array(
        [0],
        [2,4],
        [1,3,5],
        [2,6],
        [1,5,7],
        [2,4,6,8],
        [3,5,9],
        [4,8],
        [5,7,9],
        [6,8]
    );

var d_posXY=new Array(
        [0],
        [0,0],
        [100,0],
        [200,0],
        [0,100],
        [100,100],
        [200,100],
        [0,200],
        [100,200],
        [200,200]
    );

d[1]=1;d[2]=2;d[3]=3;d[4]=4;d[5]=5;d[6]=6;d[7]=7;d[8]=8;d[9]=0;

function finish()
{
  var finish_flag=true;
  for(var k=1; k<9; ++k){
      if( d[k] != k){
          finish_flag=false;
          document.getElementById("win").innerHTML="未完成";
          return ;
      }
  }

  if(finish_flag==true){
      if(!pause)
          start();
      document.getElementById("win").innerHTML="完成";
  }
}


function move(id){
    var i=1;
    for(i=1; i<10; ++i){
        if( d[i] == id )
            break;
    }
    var target_d=0;

    target_d=whereCanTo(i);

    if( target_d != 0){
        d[i]=0;
        d[target_d]=id;
        document.getElementById("d"+id).style.left=d_posXY[target_d][0]+"px";
        document.getElementById("d"+id).style.top=d_posXY[target_d][1]+"px";

    }
    finish();

  }

function whereCanTo(cur_div){

    var j=0;
    var move_flag=false;
    for(j=0; j<d_direct[cur_div].length; ++j){

        if( d[ d_direct[cur_div][j] ] == 0 ){
            move_flag=true;
            break;
        }
    }
    if(move_flag == true){
        return d_direct[cur_div][j];
    }else{
        return 0;
    }
}

function timer(){
    time+=1;
    var min=parseInt(time/60);
    var sec=time%60;
    document.getElementById("timer").innerHTML=min+"分"+sec+"秒";
}


function start(){
    if(pause){
        document.getElementById("start").innerHTML="暂停";
        pause=false;
        set_timer=setInterval(timer,1000);

    }else{
        document.getElementById("start").innerHTML="开始";
        pause=true;
        clearInterval(set_timer);
    }
}


function reset(){
    time=0;
    random_d();
    while(!solve()) random_d();
    document.getElementById("win").innerHTML="未完成";
    show_d();
    if(pause)
        start();
}

function random_d(){
    for(var i=9; i>1; --i){
        var to=parseInt(Math.random()*(i-1)+1);
        var tem=d[to];
        d[to]=d[i];
        d[i]=tem;
    }

}

function show_d(){
  for(var i=1;i<=8;++i){
      for(var j=1;j<=9;++j){
        if(d[j]==i){
          document.getElementById("d"+i).style.left=d_posXY[j][0]+"px";
          document.getElementById("d"+i).style.top=d_posXY[j][1]+"px";
        }
      }
  }
}

//逆序不变才能保证有解
function solve(){
    var ret=0;
    for(var i=1;i<=9;++i)
    for(var j=1;j<i;++j){
      if(d[j]>d[i] && d[i])
        ret++;
    }
    return !(ret%2);
}



function main(){
  var stx,sty;
  var vis=[];
  var a=[];
  var ok=0;
  var m=[];
  var fx=[-1,1,0,0];
  var fy=[0,0,-1,1];
  var ans=['u','d','l','r'];
  var deep=0;

  function Astar(){
    var h=0;
    for(var i=1;i<=3;++i)
    for(var j=1;j<=3;++j)
    if(a[i][j]!=0){
      var tx=parseInt((a[i][j]-1)/3);
      var ty=(a[i][j]-1)%3;
      h+=(Math.abs(i-tx-1)+Math.abs(j-ty-1));
    }
    return h;
  }

  function zt()
  {
    var s="";
    for(var i=1;i<=3;++i)
    for(var j=1;j<=3;++j)
      s+=a[i][j];
    return s;
  }

  function autoMove(c)
  {
    var nx=stx;
    var ny=sty;
    var nblock=(stx-1)*3+sty;
    switch(c){
      case 'u':nx=stx-1;break;
      case 'd':nx=stx+1;break;
      case 'l':ny=sty-1;break;
      case 'r':ny=sty+1;break;
    }
    var cblock=(nx-1)*3+ny;
    document.getElementById("d"+d[cblock]).style.left=d_posXY[nblock][0]+"px";
    document.getElementById("d"+d[cblock]).style.top=d_posXY[nblock][1]+"px";
    stx=nx;
    sty=ny;
    d[nblock]=d[cblock];
    d[cblock]=0;
  }


  function IDAstar(x,y,step)
  {
    if(ok) return;
    var h=Astar();
    if(!h && zt()==123456780){
      for(var i=0;i<step;++i){
        //  autoMove(ans[m[i]]);
        (function(i){
          setTimeout(function(){
            autoMove(ans[m[i]]);
          },i*200);
        })(i);
      }
      ok=1;
      start();
      document.getElementById("win").innerHTML="完成";
      return;
    }
    if(step+h > deep) return;
    var now=zt();
    if(vis[now]) return;
    vis[now]=1;
    for(var i=0;i<4&&!ok;++i){
      var nex=x+fx[i],ney=y+fy[i];
      if(nex>=1 && nex<=3 && ney>=1 && ney<=3){
        m[step]=i;
        var temp=parseInt(a[x][y]);
        a[x][y]=a[nex][ney];
        a[nex][ney]=temp;
        IDAstar(nex,ney,step+1);
        if(ok) return;
        temp=a[x][y];
        a[x][y]=a[nex][ney];
        a[nex][ney]=temp;
        m[step]=null;
      }
    }
    return;
  }

  for(var i=1;i<=3;++i) a[i]=new Array();
  for(var i=1;i<=3;++i)
  for(var j=1;j<=3;++j){
    a[i][j]=d[(i-1)*3+j];
    if(a[i][j]==0){stx=i;sty=j;}
  }

  while(!ok){
    vis=[];
    IDAstar(stx,sty,0);
    deep++;
  }
  return 0;
}

function show_ACMQQ()
{
    document.getElementById("author").innerHTML = "QQ群:658850543";
}

window.onload=function(){
    reset();
}
