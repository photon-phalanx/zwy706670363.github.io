'use strict';

(function(global){
	function Vue(data){
		this.data = data;
		// 渲染HTML
		this.drawHTML(data);
	}

	Vue.prototype.drawHTML = function(data){

		let dom = document.querySelector(data.el);
		let html = dom.innerHTML;	// string
		let html_copy = html;
		let myRe = /{{\S+}}/g;		// 匹配出所有{{...}}
		let myArray;
		while((myArray = myRe.exec(html))!==null){

			let msg = myArray[0];	// {{user.name}}
			let objArr = /{{(.*?)}}/.exec(msg);	// user.name
			let value = getValue(data.data,objArr[1]); // youngwind

			html_copy = html_copy.replace(msg,value);

		}
		document.querySelector(data.el).innerHTML = html_copy;

		// 取值
		function getValue(data,exp){
			const path = exp.split('.');
			let val = data;
			path.forEach(k => val = val[k]);
			return val;
		}
	}
	global.Vue = Vue;
})(window);


// 测试
let app = new Vue({
  el: '#app',
  data: {
    user: {
      name: 'wanyingzhu',
      age: 24
    }
  }
});