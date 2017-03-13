/*
 *  假设传入参数只考虑对象，不考虑数组
 */
'use strict'

// 观察者构造函数
function Observer(data){
	this.data = data;
	this.walk(data);

	// 保存回调函数
	this.events = {};

	// 取消冒泡
	this.cancelBubble = true;
}

// 此函数用于遍历对象的各个属性
Observer.prototype.walk = function(data,path){
	let val;
	for(let key in data){
		// for ... in 循环会把对象原型链上的所有可枚举属性都循环出来
		// 而我们只需要对象本身拥有的属性，因此要用hasOwnProperty进行过滤
		if(data.hasOwnProperty(key)){
			val = data[key];
			
			this.convert(data,key,val,path);
		}
	}
}

// 此函数用于深层次遍历，并记录路径，运用递归思想
Observer.prototype.observer = function(val,path){
	if(!val ||typeof val !== 'object') return;
	if(path){
		path = path + '.';
	}

	this.walk(val,path);
}
Observer.prototype.convert = function(obj,key,val,path){
	if(!path){
		path = key;
	}else{
		path = path + key;
	}

	this.observer(val, path);

	let self = this;
	Object.defineProperty(obj,key,{
		enumerable: true,
		configurable: true,
		get: function(){
			console.log('你访问了' + key);
			return val;
		},
		set: function(newVal){
			console.log('你设置了' + key  + ',新的值为' + newVal);

			if(newVal === val) return;
			val = newVal;

			// 通知上一层
			if(!self.cancelBubble){
				self.$notify(path || key);
			}

			if(typeof val === 'object'){
				self.observer(val, path);
			}
		}
	});
}

Observer.prototype.$watch = function(attr,callback,cancelBubble){
	if(typeof callback !== 'function'){
		console.log('You should pass a function as  callback');
		return;
	}

	if(this.events[attr]){
		this.events[attr].push(callback);
	}else{
		this.events[attr] = [];
		this.events[attr].push(callback);
	}

	this.cancelBubble = cancelBubble;
}

Observer.prototype.$notify = function(path){
	console.log(path);

	const keys = path.split('.');	// [name,firstName]
	const paths = keys.map((key,index) => {	
		if(index === 0){
			return key;
		}else{
			let str = '';
			while(index--) str = keys[index] + '.' + str;
			return str + key;
		}
	});
	paths.forEach((path) =>{	// [name,name.firstName]
		const fns = this.events[path];
		if(fns && fns.length){
			fns.forEach(fn => fn &&fn(this.$getValue(path)));
		}
	});

}

Observer.prototype.$getValue = function(exp){
	const path = exp.split('.');
	let val = this.data;
	path.forEach( k => val = val[k]);
	return val;
}


window.Observer = Observer;
// 测试
let app2 = new Observer({
    name: {
        firstName: 'wanying',
        lastName: 'zhu'
    },
    // age: 24
});

app2.$watch('name', function(newName) {
    console.log('我的姓名发生了变化，可能是姓氏变了，也可能是名字变了。')
},false);	// false冒泡

app2.data.name.firstName = 'hahaha';
// 输出：我的姓名发生了变化，可能是姓氏变了，也可能是名字变了。
app2.data.name.lastName = 'blablabla';
// 输出：我的姓名发生了变化，可能是姓氏变了，也可能是名字变了。
