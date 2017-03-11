'use strict'


// 自定义事件

var test = document.getElementById('test');

// 创建事件

var event = document.createEvent('Event');

// 定义事件类型,定义事件名称为"customEvent"

event.initEvent('customEvent',true,true);

// 监听事件

test.addEventListener('customEvent',function(){
	console.log('test');
},false);

// 触发事件

test.dispatchEvent(event);
