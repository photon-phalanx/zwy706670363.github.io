'use strict';

(function(global){
	function Vue(data){
		this.data = data;
		if(!data.el){
			console.log('未绑定dom元素');
			return;
		}
		this.doc = document.querySelector(data.el);
		this.doc_innerHTML = this.doc.innerHTML;
		this.observer = new Observer(this.data,this.data.data,this);

		// 渲染HTML
		this.drawHTML(this.data);
	}

	Vue.prototype.drawHTML = function(data){
		if(!data.el){
			console.log('未绑定dom元素');
			return;
		}
		let html = this.doc_innerHTML;	// string
		let html_copy = html;
		let myRe = /{{\S+}}/g;		// 匹配出所有{{...}}
		let myArray;
		while((myArray = myRe.exec(html))!==null){

			let msg = myArray[0];	// {{user.name}}
			let objArr = /{{(.*?)}}/.exec(msg);	// user.name
			let value = getValue(data.data,objArr[1]); // youngwind

			html_copy = html_copy.replace(msg,value);

		}
		this.doc.innerHTML = html_copy;

		// 取值
		function getValue(obj,exp){
			const path = exp.split('.');
			let val = obj;
			path.forEach(k => val = val[k]);
			return val;
		}
	}
	global.Vue = Vue;


	// 观察者构造函数
	function Observer(data,obj,vue){

		this.obj = obj;
		this.walk(data,obj,vue);
	}
	// 递归思想
	Observer.prototype.walk = function(data,obj,vue){
		let val;
		for(let key in obj){
			
			if(obj.hasOwnProperty(key)){
				val = obj[key];
				// 判断是否遍历到最底层，如果没有，继续new Observer
				if(typeof(val) === 'object'){
					new Observer(data,val,vue);
				}
				this.convert(key,val,data,vue);
			}
		}
	}

	Observer.prototype.convert = function(key,val,data,vue){
		let self = this;
		Object.defineProperty(this.obj,key,{
			enumerable: true,
			configurable: true,
			get: function(){
				// console.log('你访问了' + key);
				return val;
			},
			set: function(newVal){
				// console.log('你设置了' + key  + ',新的值为' + newVal);
				if(newVal === val) return;
				val = newVal;
				vue.drawHTML(data);
			}
		});
	}

})(window);


// 测试
let app = new Vue({
  el: '#app',
  data: {
    user: {
      name: 'youngwind',
      age: 25
    },
    school: 'bupt',
    major: 'computer'
  }
});

app.data.data.user = {name: 'zhuwanying',age:24};

