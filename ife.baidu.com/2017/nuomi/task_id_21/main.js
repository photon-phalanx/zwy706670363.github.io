/*
 *  假设传入参数只考虑对象，不考虑数组
 */


// 观察者构造函数
function Observer(data){
	this.data = data;
	this.walk(data);
	this.eventCustom = new Event();
}

// 此函数用于深层次遍历对象的各个属性
// 采用的是递归的思想
// 因为我们要为对象的每一个属性绑定getter和setter
var array = [];
Observer.prototype.walk = function(obj){
	let val;
	for(let key in obj){
		// for ... in 循环会把对象原型链上的所有可枚举属性都循环出来
		// 而我们只需要对象本身拥有的属性，因此要用hasOwnProperty进行过滤
		if(obj.hasOwnProperty(key)){
			val = obj[key];
			// 判断是否遍历到最底层，如果没有，继续new Observer
			if(typeof(val) === 'object'){
				new Observer(val);
			}
			array.push(key);
			this.convert(key,val);
		}
	}
}

Observer.prototype.convert = function(key,val){

	let self = this;
	Object.defineProperty(this.data,key,{
		enumerable: true,
		configurable: true,
		get: function(){
			console.log('你访问了' + key);
			return val;
		},
		set: function(newVal){
			console.log('你设置了' + key  + ',新的值为' + newVal);
			
			// 触发$watch函数,冒泡到父属性上
			self.eventCustom.emit(key,val,newVal);

			if(newVal === val) return;
			val = newVal;

			if(typeof newVal === 'object'){
				new Observer(val);
			}
		}
	});
}

Observer.prototype.$watch = function(attr,callback){
	this.eventCustom.on(attr,callback);
}

// 实现事件

function Event(){
	this.events = {};
}
// 订阅事件
Event.prototype.on = function(attr,callback){
	if(this.events[attr]){
		this.events[attr].push(callback);
	}else{
		this.events[attr] = [callback];	// 支持绑定多个回调函数
	}
}
// 取消订阅
Event.prototype.off = function(attr){
	for(let key in this.events){
		if(this.events.hasOwnProperty(key) && key === attr){
			delete this.events[key];
		}
	}
}
// 发布
Event.prototype.emit = function(attr,...args){
	this.events[attr] && this.events[attr].forEach(function(item){
		item(...args);
	})
}

// 测试
let app2 = new Observer({
    name: {
        firstName: 'wanying',
        lastName: 'zhu'
    },
    age: 24
});
console.log(array);

app2.$watch('name', function(newName) {
    console.log('我的姓名发生了变化，可能是姓氏变了，也可能是名字变了。')
});
app2.data.name.firstName = 'hahaha';
// 输出：我的姓名发生了变化，可能是姓氏变了，也可能是名字变了。
app2.data.name.lastName = 'blablabla';
// 输出：我的姓名发生了变化，可能是姓氏变了，也可能是名字变了。
