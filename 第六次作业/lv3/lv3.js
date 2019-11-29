function Ajax(url,method,headers,time){
    this.url = url;
    this.method = method||'GET';
    this.headers = headers;
    this.xhr = new XMLHttpRequest();
    this.time = time;
}
Ajax.prototype = {
    constructor: Ajax,
    afterSuccess: function(response){
        var newSongList = JSON.parse(response);
        console.log(newSongList);
        var oldsongList = document.getElementsByClassName('songList')[0].getElementsByTagName('li');
        var i;
        for(i=1;i<oldsongList.length;i++)
        {
            var singer1 = newSongList.data.songList[i-1].singer[0].singerName;
            var songName = newSongList.data.songList[i-1].songName;
            oldsongList[i].getElementsByTagName('span')[1].innerText = singer1;
            oldsongList[i].getElementsByTagName('span')[0].innerText = songName;
        }
    },
    afterError: function(status){
        console.log('Request was not successful:'+status);      
    },
    beforeSuccess: function(){
        console.log('lodding!Please wait for a moment');
    },
    submitMessageOpen: function(){
        if(typeof this.url!='string')
        {
            alert('this.url was not a normal url');
        }
        else
        {
            var object = this;
            object.xhr.onreadystatechange = function(){
                if(object.xhr.readyState==4)
                {
                    try{
                        if(object.xhr.status>=200&&object.xhr.status<300||object.xhr.status==304)
                        {
                            console.log('Resquest was successful');
                            object.afterSuccess(object.xhr.responseText);
                        }
                        else
                        {
                            object.afterError(object.xhr.status);
                        }
                    }
                    catch(error){
    
                    }
                }
                else{
                    object.beforeSuccess();
                }
            }
            this.xhr.open(this.method,this.url);
            if(typeof this.time=='number')
            {
                this.xhr.ontimeout = function(){
                    alert("Request did not return in a second."); 
                }
            }
        }
    },
    submitMessageSend: function(data){
        if(typeof data!='undefined'){
            this.xhr.send(data);
        }
        else{
            this.xhr.send(null);
        }
    }
}
function addURLAddress(url,key){
    url += key+'/1/10';
    return url;
}
var submitNode = document.getElementsByClassName('search_input_submit')[0];
submitNode.addEventListener('click',searchButton);
var search_input_Node = document.getElementsByClassName('search_input_input')[0];
search_input_Node.addEventListener('keyup',searchEnter)
function searchButton(){
    var search_input_text = this.previousElementSibling.value;
    var url = 'https://music.niubishanshan.top/api/v2/music/search/';
    if(search_input_text.length==0)
    {
        alert('搜索内容不能为空');
    }
    else
    {
        url = addURLAddress(url,search_input_text);
        var ajax = new Ajax(url);
        console.log(ajax);
        ajax.submitMessageOpen();
        ajax.submitMessageSend();
    }
}
function searchEnter(event){
    if(event.keyCode===13){
    var search_input_text = this.value;
    var url = 'https://music.niubishanshan.top/api/v2/music/search/';
    if(search_input_text.length==0)
    {
        alert('搜索内容不能为空');
    }
    else{
        url = addURLAddress(url,search_input_text);
        var ajax = new Ajax(url);
        ajax.submitMessageOpen();
        ajax.submitMessageSend();
    }
    }
}
