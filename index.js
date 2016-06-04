var main = document.querySelector("#main");
//������/������<=����ͼ��/����ͼ��  ���ո�������
//����ֵ = �����ĸ�/����ͼ��
//������/������>����ͼ��/����ͼ�� ���տ�������
//����ֵ = �����Ŀ�/����ͼ��
var winW = window.innerWidth; /*�豸��  -- ������*/
var winH = window.innerHeight;/*�豸�� --  ������*/
var desW = 640;/*��Ƹ�� ---����ͼ��*/
var desH = 1136;/*��Ƹ�� --����ͼ��*/
if(winW/winH <=desW/desH){
    main.style.webkitTransform = "scale("+winH/desH+")";
}else{
    main.style.webkitTransform = "scale("+winW/desW+")"
}

var oLis = document.querySelectorAll("#main>ul>li");

[].forEach.call(oLis,function(curLi,index){
    curLi.index = index;
    curLi.addEventListener("touchstart",start,false);
    curLi.addEventListener("touchmove",move,false);
    curLi.addEventListener("touchend",end,false);
});

function start(e){
    //click���ʱ�ǻᴥ��touchstart ,�뿪ʱ�ᴥ��touchend�¼� ,touchmove�¼����ᱻ����
    this.startX = e.changedTouches[0].pageX;
    this.startY = e.changedTouches[0].pageY;

}
function move(e){
    e.preventDefault();//����ʱҳ�������Ĭ����Ϊ,��Ҫ��ֹĬ����Ϊ
    this.style.webkitTransition = "";
    var moveX = e.changedTouches[0].pageX;
    var moveY = e.changedTouches[0].pageY;
    var direction = swipeDirection(this.startX,this.startY,moveX,moveY);
    var index = this.index;
    var len = oLis.length;
    var movePos = moveY - this.startY; /*�ƶ��ľ���*/
    if(/^(Down|Up)$/.test(direction)){/*���»���*/
        this.flag = true ;//�ж��ǻ���
        //��ʼ��,ֻ�е�ǰ��������ʾ��,�����Ķ����� ,�Ƴ�����li������zIndex
        [].forEach.call(oLis,function(curLi,nIndex){
            if(index!=nIndex){
                curLi.style.display = "none";
            }
            curLi.className = "";
            curLi.firstElementChild.id = "";
        })

        //ͨ��direction�����һ�Ż�����һ�ŵ��������ƶ��ľ���
        if(direction == "Down"){
            this.prevsIndex = index == 0?len-1:index-1;
            var pos = -desH/2+movePos;
        }else if(direction == "Up"){
            this.prevsIndex = index == len-1?0:index+1;
            var pos = desH/2+movePos;
        }
        oLis[this.prevsIndex].style.display = "block";
        oLis[this.prevsIndex].className = "zIndex";
        oLis[this.prevsIndex].style.webkitTransform = "translate(0,"+pos+"px)";
        //���õ�ǰ����Ч��
        //Math.abs(movePos)/winH  ����ʱ��С����
        //1- Math.abs(movePos)/winH  ����ʱ�Ӵ�С
        this.style.webkitTransform = "scale("+(1-Math.abs(movePos)/winH*1/2)+") translate(0,"+movePos*2+"px)";

    }

}
function end(e){
    if(this.flag){
        //�ص���ʼλ��
        oLis[this.prevsIndex].style.webkitTransform = "translate(0,0)";
        oLis[this.prevsIndex].style.webkitTransition = "1s";
        var _this = this;
        oLis[this.prevsIndex].addEventListener('webkitTransitionEnd',function(e){
            //����Ч������֮�������һЩ����
            //�൱�������������
            this.style.webkitTransition = "";
            _this.style.webkitTransform = "translate(0,0)";
            this.firstElementChild.id = "side"+this.index;

        },false)
        this.flag = false;//�Ա���һ����ȥ�ж�

    }
}

function swipeDirection(startX,startY,moveX,moveY){
    //1.�ж������»��������һ� 2.�ٸ���changeX/changeY�ó������ķ���
    var changeX = moveX - startX;
    var changeY = moveY - startY;
    return  Math.abs(changeX)>Math.abs(changeY)?(changeX>0?"Right":"Left") : (changeY>0?"Down":"Up");
}
/**
 *
 * @param startX  ����ʱ������X����
 * @param startY  ����ʱ������y����
 * @param moveX   �ƶ�ʱ������X����
 * @param moveY  �ƶ�ʱ������Y����
 * @returns {boolean}  �ж��Ƿ񻬶�
 */
function isSwipe(startX,startY,moveX,moveY){
    var changeX = moveX - startX;
    var changeY = moveY - startY;
    return  Math.abs(changeX)>30 || Math.abs(changeY)>30
}
