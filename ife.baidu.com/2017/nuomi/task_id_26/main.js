// 1.直接设置元素的oncontextmenu属性 
document.querySelector('body').oncontextmenu = (e) => {
	// 页面屏蔽右键菜单
	return false;
}

// 2.addEventListener 监听
document.querySelector('#menu').addEventListener('contextmenu',(e) => {
	document.querySelector('#pop-menu').style.display = "block";
	var e = e||window.event;

	// 菜单宽高
	var obj = document.querySelector('#pop-menu');
	var objWidth = obj.clientWidth + 2;
	var objHeight = obj.clientHeight + 2;

	// 容器总宽度
	var clientWidth = document.querySelector('#container').clientWidth;
	var clientHeight = document.querySelector('#container').clientHeight;

	// 偏移
	var offsetLeft = document.querySelector('#menu').offsetLeft;
	var offsetTop = document.querySelector('#menu').offsetTop;

	/**** 设置弹出菜单位置 ****/
	// left
	if( e.clientX > clientWidth - objWidth){
		document.querySelector('#pop-menu').style.left  = e.clientX- offsetLeft - objWidth + 'px';
	}else{
		document.querySelector('#pop-menu').style.left  = e.clientX - offsetLeft + 'px';
	}
	// top
	if(e.clientY > clientHeight - objHeight){
		document.querySelector('#pop-menu').style.top  = e.clientY- offsetTop - objHeight + 'px';
	}else{
		document.querySelector('#pop-menu').style.top  = e.clientY - offsetTop + 'px';
	}

});

// 单击非菜单区域，菜单隐藏
document.querySelector('#menu').addEventListener('click',(e) => {
	document.querySelector('#pop-menu').style.display = "none";	
});


document.querySelector('body').addEventListener('click',(e) => {
	document.querySelector('#pop-menu').style.display = "none";	
});