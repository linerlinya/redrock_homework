function fetchs(urls,methods,header,data){
    var req = new Request(urls);
    req.url = urls;
    req.method = methods;
    if(typeof header!=undefined){
        req.headers = header;
    }
    if(typeof data!=undefined){
        req.body = JSON.stringify(data);
    }
    fetch(req)
    .then((response)=>{
        if(response.ok===true){
            return response.json();
        }
        else{
            console.log(response.status);
        }
    })
    .then(result=>{
        changeSongList(result);
    })
    .catch(error=>{
        console.log(error);
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
        url = addURLAddress(url,search_input_text);
        fetchs(url,'get');
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
        fetchs(url,'get');
    }
    }
}
changeSongListBackground();
var submitNode = document.getElementsByClassName('search_input_submit')[0];
submitNode.addEventListener('click',searchButton);
var search_input_Node = document.getElementsByClassName('search_input_input')[0];
search_input_Node.addEventListener('keyup',searchEnter)
