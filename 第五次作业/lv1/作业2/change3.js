function lunbo(imgCssrule,biaoqian,tables,tableCssrule,buttons){
    let seconds = 0;
    function change(){
        tables[seconds].classList.remove(tableCssrule);
        tables[seconds].style.color = '#' + 424242;
        if(seconds==tables.length-1)
        {
            seconds = 0;
        }
        else
        {
            seconds++;
        }
        imgCssrule.style.left = -820 * seconds + 'px';
        tables[seconds].classList.add(tableCssrule);
    }
    function mouseClick(e){
        e = e||window.event;
        var targets = e.target;
        tables[seconds].classList.remove(tableCssrule);
        tables[seconds].style.color = '#' + 424242;
        var find = this.firstElementChild;
        seconds = 0;
        while(find!=targets)
        {
            seconds++;
            find = find.nextElementSibling;
        }
        tables[seconds].classList.add(tableCssrule);
        if((seconds+1)%2)
        tables[seconds].style.color = 'red';
        else
        tables[seconds].style.color = 'green';
        imgCssrule.style.left = -820 * seconds + 'px';
        window.clearInterval(clocks);
        clocks = window.setInterval(change,3000);
    }
    addEvent(biaoqian,'click',mouseClick);
    clocks = window.setInterval(change,3000);
}
function addEvent(object1,type,handle){
    if(object1.addEventListener)
        object1.addEventListener(type,handle,false);
    else if(object1.attachEvent)
        object1.attachEvent('on'+type,function(){
            handle.call(this);
        });
    else
        object1['on'+type] = handle;
}
let stylesheet1 = document.styleSheets[0];
let cssRule3 = stylesheet1.cssRules[3];
let ele = document.getElementsByClassName('list');
let ul = document.getElementsByClassName('title')[0];
let div = document.getElementById('haha');
lunbo(cssRule3,ul,ele,'selector',div);