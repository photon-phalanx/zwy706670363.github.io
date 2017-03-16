
(function(){
	let ulEle = document.querySelectorAll('.target')[0];
	let count = 1;

		
	setInterval(() => {

		let deg = -60 * count;
		ulEle.style.transform = "rotateY(" + deg + "deg)";
		
		if (ulEle.className === "target") {
			ulEle.className = "target rotate";
		} else {
			ulEle.className = "target";
			count += 1;
		}
	}, 2000);
})();

		   