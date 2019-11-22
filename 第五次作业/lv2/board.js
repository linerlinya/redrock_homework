var publishNode = document.getElementsByClassName('submit')[0];
function publishMessage(){
    var messageTextNode = document.getElementsByClassName('messgeBoard')[0];
    var messageText = messageTextNode.value;
    if(messageText.length==0)
    {
        alert('留言信息不能为空');
        messageTextNode.focus();
    }
    else
    {
        var contentNumber = document.getElementsByClassName('content').length+1;
        var contentNode = document.getElementsByClassName('content')[0];
        var messageBoardNode = document.getElementsByClassName('content_head')[0].firstElementChild;
        var messageBoard = messageBoardNode.firstChild;
        messageBoard.nodeValue = '留言板'+'('+contentNumber+')';
        var newMessageNode = contentNode.cloneNode(true);
        var new_context_text = newMessageNode.getElementsByClassName('content_text')[0];
        var newText = document.createTextNode(messageText);
        new_context_text.replaceChild(newText,new_context_text.firstChild);
        var floorNumber = newMessageNode.getElementsByClassName('passername')[0].getElementsByTagName('span')[1];
        var test = document.createTextNode('第'+contentNumber+'楼');
        floorNumber.replaceChild(test,floorNumber.firstChild);
        var content_mainNode = document.getElementsByClassName('content_main')[0];
        content_mainNode.insertBefore(newMessageNode,content_mainNode.firstElementChild);
        messageTextNode.value = '';
    }
}
publishNode.onclick = publishMessage;