class LunBoTu{
  constructor(ulNode, cLNode, cRNode, time,cNode){
    this.changeImgUl = ulNode||null;
    this.changeControlL = cLNode||null;
    this.changeControlR = cRNode||null;
    this.autoChangeTime = time||null;
    this.circleList = cNode||null;
    this.changeNum = 0;
    this.count = 1;
    this.timeId = null;
    this.containerSize = {};
  }
  run() {
    this.init();
    this.autoChangeFunc = this.autoChange.bind(this);
    this.timeId = setInterval(this.autoChangeFunc, this.autoChangeTime);
    this.changeControlL.addEventListener('click', {
      that: this,
      handleEvent: this.handleChange
    })
    this.changeControlR.addEventListener('click', {
      that: this,
      handleEvent: this.handleChange
    })
  }
  init() {
    this.changeNum = this.changeImgUl.getElementsByTagName('li').length;
    this.containerSize.width = Number.parseInt(window.getComputedStyle(this.changeImgUl.parentElement).width);
    this.containerSize.totalWidth = this.containerSize.width*this.changeNum;
  }
  autoChange() {
    this.count++;
    if(this.count>this.changeNum) {
      this.count = 1;
    } 
    if(this.count===1) {
      this.circleList.getElementsByTagName('i')[3].classList.remove('focusCircle');
    } else {
      this.circleList.getElementsByTagName('i')[this.count-2].classList.remove('focusCircle')
    }
    this.circleList.getElementsByTagName('i')[this.count-1].classList.add('focusCircle');
    this.changeImgUl.style.marginLeft ='-' + (this.count-1) * this.containerSize.width + 'px';
  }
  handleChange(event) {
    if(event.target.dataset.lr==='l') {
      clearInterval(this.that.timeId);
      this.that.circleList.getElementsByTagName('i')[this.that.count-1].classList.remove('focusCircle')
      if(this.that.count===1) {
        this.that.count = 4;
      } else {
        this.that.count--;
      }
      this.that.circleList.getElementsByTagName('i')[this.that.count-1].classList.add('focusCircle');
      this.that.changeImgUl.style.marginLeft ='-' + (this.that.count-1) * this.that.containerSize.width + 'px';
      this.that.timeId = setInterval(this.that.autoChangeFunc, this.that.autoChangeTime);
    } else {
      clearInterval(this.that.timeId);
      this.that.circleList.getElementsByTagName('i')[this.that.count-1].classList.remove('focusCircle')
      if(this.that.count===4) {
        this.that.count = 1;
      } else {
        this.that.count++;
      }
      this.that.circleList.getElementsByTagName('i')[this.that.count-1].classList.add('focusCircle');
      this.that.changeImgUl.style.marginLeft ='-' + (this.that.count-1) * this.that.containerSize.width + 'px';
      this.that.timeId = setInterval(this.that.autoChangeFunc, this.that.autoChangeTime);
    }
  }
}
let LunBoTuCompent = new LunBoTu(document.getElementsByClassName('lunbotu')[0],
                                 document.getElementsByClassName('lunbotuControlLeft')[0],
                                 document.getElementsByClassName('lunbotuControlRight')[0],
                                 2000,
                                 document.getElementsByClassName('circleList')[0]);
LunBoTuCompent.run();
//懒加载
class LazyLoad{
  constructor(nodeList) {
    this.nodeList = nodeList||null;
    this.nodeListLength = this.nodeList.length;
    this.viewHeight = document.documentElement.clientHeight;
  }
  inSight(node) {
    return node.getBoundingClientRect().top<this.viewHeight;
  }
  loadImg(node) {
    if(!node.dataset.ok) {
      node.dataset.ok = true;
      let itemList = node.getElementsByTagName('div');
      for(let i=0;i<itemList.length;i++) {
        itemList[i].style.backgroundImage = 'url('+itemList[i].dataset.ooriginal+')';
      }
    }
  }
  checkImgs() {
    for(let i=0;i<this.nodeListLength;i++) {
      if(this.inSight(this.nodeList[i])) {
        this.loadImg(this.nodeList[i]);
      }
    }
  }
  run() {
    this.checkFunc = this.checkImgs.bind(this);
    window.addEventListener('scroll', this.checkFunc);
  }
}
let lazyLoadComponent = new LazyLoad(document.getElementsByClassName('content3MainItem'));
lazyLoadComponent.run();
//topback
let topNode = document.getElementsByClassName('returnTop')[0];
topNode.addEventListener('click', function() {
  window.scrollTo(0,0);
})