/*
 *  假设传入参数只考虑对象，不考虑数组
 */


// 观察者构造函数
function Observer(data){
	this.data = data;
	this.walk(data);
}

// let p = Observer.prototype;

// 此函数用于深层次遍历对象的各个属性
// 采用的是递归的思想
// 因为我们要为对象的每一个属性绑定getter和setter

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
			this.convert(key,val);
		}
	}
}

Observer.prototype.convert = function(key,val){
	Object.defineProperty(this.data,key,{
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
		}
	});
}

let data = {
	user: {
		name: 'zhuwanying',
		age: '24',
	},
	address: {
		city: 'beijing'
	}
}

// add 是生成的对象，他自身属性有data,walk
// 在add被实例化时，add.[[Prototype]]指向了Observer.prototype
// 即设置add.[[Prototype]] = Observer.prototype
let add = new Observer(data);

console.log(data);
