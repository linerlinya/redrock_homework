function promise2(url,type,find){
    return new Promise((resolve,reject)=>{
        type = type.toUpperCase();
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            if(xhr.readyState==4){
                if(xhr.status>=200&&xhr.status<300||xhr.status==304){
                    resolve(xhr);
                }
                else{
                    reject(xhr);
                }
              }        
        }
        if(type==='GET'){
            url = addURLAddress(url,find);
            xhr.open(type,url);
            xhr.send(null);
        }
        else{
            xhr.open(type,url);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
            xhr.send(find);
        }
    })
}
function changeSongListBackground(){
    var oldsongList = document.getElementsByClassName('songList')[0].getElementsByTagName('li');
    var i;
    for(i=0;i<oldsongList.length;i++)
    {
        if((i+1)%2==0)
        {
            oldsongList[i].style.backgroundColor = '#fafafa';
        }
    }
}
function addURLParam(url, name, value) {
          url += (url.indexOf("?") == -1 ? "?" : "&");     
          url += encodeURIComponent(name) + "=" + encodeURIComponent(value);     
          return url; 
        } 
function addURLAddress(url,key){
    url += key+'/1/10';
    return url;
}
function changeSongList(newSongList){
    var oldsongList = document.getElementsByClassName('songList')[0].getElementsByTagName('li');
    var i;
    for(i=1;i<oldsongList.length;i++)
    {
        var singer1 = newSongList.data.songList[i-1].singer[0].singerName;
        var songName = newSongList.data.songList[i-1].songName;
        oldsongList[i].getElementsByTagName('span')[1].innerText = singer1;
        oldsongList[i].getElementsByTagName('span')[0].innerText = songName;
    }
}
function searchButton(){
    var search_input_text = this.previousElementSibling.value;
    var url = 'https://music.niubishanshan.top/api/v2/music/search/';
    if(search_input_text.length==0)
    {
        alert('搜索内容不能为空');
    }
    else
    {
        promise2(url,'get',search_input_text)
        .then(result=>{
            let json = JSON.parse(result.responseText);
            changeSongList(json);
        })
        .catch(err=>{
            console.log('Request was not successful:'+err.status);
        })
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
        promise2(url,'get',search_input_text)
        .then(result=>{
            let json = JSON.parse(result.responseText);
            changeSongList(json);
        })
        .catch(err=>{
            console.log('Request was not successful:'+err.status);
        })
    }
    }
}
changeSongListBackground();
var submitNode = document.getElementsByClassName('search_input_submit')[0];
submitNode.addEventListener('click',searchButton);
var search_input_Node = document.getElementsByClassName('search_input_input')[0];
search_input_Node.addEventListener('keyup',searchEnter)
