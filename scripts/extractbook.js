var images = $(".readerImg");
var srcList = [];
var i = 0;

setInterval(function(){
    if(images.length > i){
        srcList.push(images[i].src);
        var link = document.createElement("a");
        link.id=i;
        link.download = images[i].src;
        link.href = images[i].src;
        link.click();
        i++;
    }
},1500);
