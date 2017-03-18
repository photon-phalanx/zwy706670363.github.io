


(function(global){
	'use strict';

	function Audio(ele,musicArray,loveMusic){
		this.ele = ele;
		this.index = 0;
		this.init();
	}
	Audio.prototype.init = function(){
		let source = document.createElement('source');
		let seed = new Date().getTime();
		this.index = Math.floor(Math.random(seed) * musicArray.length);

		source.src = 'app/sources/' + musicArray[this.index].name + '.mp3';
		source.type = 'audio/mpeg';
		this.ele.appendChild(source);
		$('.music-title').text(musicArray[this.index].name);

		this.play();
		let self = this;

		// 监听timeupdate事件
		this.ele.addEventListener('timeupdate',function(){
			let width = self.ele.currentTime / self.ele.duration *100 + '%';
			$('#player-progress').css('width',width);
			let start = Math.floor(self.ele.currentTime / 60) + ':'+Math.floor(self.ele.currentTime % 60);
			let end = Math.floor(self.ele.duration / 60) + ':'+Math.floor(self.ele.duration % 60);

			$('#current').text(start);
			$('#duration').text(end);
		});

		// 监听ended事件
		this.ele.addEventListener('ended', function(){
			let source = document.querySelector('#audio source');
			let nextIndex = Math.floor(Math.random(seed) * musicArray.length);
			while(self.index === nextIndex){
				nextIndex = Math.floor(Math.random(seed) * musicArray.length);
			}

			self.index = nextIndex;

			if(!source){
				source = document.createElement('source');
				source.type = 'audio/mpeg';
				self.ele.appendChild(source);
				source.src = 'app/sources/' + musicArray[nextIndex].name + '.mp3';
			}
			source.src = 'app/sources/' + musicArray[nextIndex].name + '.mp3';
			$('.music-title').text(musicArray[nextIndex].name);

			self.load();
		});
	}

	// 上一首
	Audio.prototype.prev = function(){
		let source = document.querySelector('#audio source');

		if(this.index === 0){
			this.index = musicArray.length -1;
		}else{
			index = this.index - 1;
		}
		if(!source){
			source = document.createElement('source');
			source.type = 'audio/mpeg';
			this.ele.appendChild(source);
			source.src = 'app/sources/' + musicArray[this.index].name + '.mp3';
		}
		source.src = 'app/sources/' + musicArray[this.index].name + '.mp3';
		$('.music-title').text(musicArray[this.index].name);
		this.load();

	}

	// 下一首
	Audio.prototype.next = function(){
		let source = document.querySelector('#audio source');
		
		if(this.index === musicArray.length -1){
			this.index = 0;
		}else{
			this.index = this.index + 1;
		}

		console.log(this.index);
		if(!source){
			source = document.createElement('source');
			source.type = 'audio/mpeg';
			this.ele.appendChild(source);
			source.src = 'app/sources/' + musicArray[this.index].name + '.mp3';
		}
		source.src = 'app/sources/' + musicArray[this.index].name + '.mp3';
		$('.music-title').text(musicArray[this.index].name);
		this.load();
	}

	// 重新加载播放
	Audio.prototype.load = function(){
		this.ele.load();
		this.ele.play();
	}
	// 播放
	Audio.prototype.play = function() {
		this.ele.play();
	}

	// 暂停
	Audio.prototype.pause = function(){
		this.ele.pause();
	}

	// 快进
	Audio.prototype.stepForward = function(){
		this.pause();
		this.ele.currentTime += 1;	// 快进1s
		if(this.ele.currentTime > this.ele.duration){
			this.ele.currentTime = 0;
		}
		this.play();
	}

	// 快退
	Audio.prototype.stepBackward = function(){
		this.pause();
		this.ele.currentTime -= 1;	// 快退1s
		if(this.ele.currentTime < this.ele.startTime){
			this.ele.currentTime = 0;
		}
		this.play();
	}

	// true 处于暂停播放中, false表示媒体正在播放
	Audio.prototype.isPaused = function(){
		return this.ele.paused;
	}

	// 获取播放进度
	Audio.prototype.getProgress = function(){

	}
	Audio.prototype.getCurrentTime = function(){
		let second = Math.floor(this.ele.currentTime);
		return second;
	}
	// 获取总时间
	Audio.prototype.getDuration = function(){
		let second = Math.floor(this.ele.duration);
		return second;
	}
	// 切换静音状态
	Audio.prototype.toggleMuted = function(){ 
		this.ele.muted = !this.ele.muted;
	}
	// 是否静音
	Audio.prototype.isMuted = function(){
		return this.ele.muted;
	}

	global.Audio = Audio;

})(window);

 // $('[data-toggle="tooltip"]').tooltip();

// 曲库
let musicArray = [
	{ name: '会过去的' },
	{ name: '勇气' },
	{ name: '可惜不是你' },
	{ name: '暖暖' },
	{ name: '漂洋过海来看你' },
	{ name: '爱久见人心' }
];
// 喜欢的歌曲
let loveMusic = [];

let audio = new Audio(document.querySelector('#audio'),musicArray,loveMusic);

// 暂停键/播放键
$('#pause').on('click',function(){
	if(audio.isPaused()){
		audio.play();
		$('#pause span').removeClass('glyphicon glyphicon-play').addClass('glyphicon glyphicon-pause');

	}else{
		audio.pause();
		$('#pause span').removeClass('glyphicon glyphicon-pause').addClass('glyphicon glyphicon-play');

	}

});

// 标记喜欢
$('#heart').on('click',function(){


	if($('#heart span').css('color')!='red'){
		$('#heart span').css('color','red');
	}else{
		$('#heart span').css('color','#333');
	}
});

// 音量
$('#volume').on('click',function(){
	audio.toggleMuted();

	if(audio.isMuted()){
		$('#volume span').removeClass('glyphicon glyphicon-volume-up').addClass('glyphicon glyphicon-volume-off');
	}else{
		$('#volume span').removeClass('glyphicon glyphicon-volume-off').addClass('glyphicon glyphicon-volume-up');

	}
});

// 快退
$('#step-backward').on('click',function(){
	audio.stepBackward();
});

// 快进
$('#step-forward').on('click',function(){
	audio.stepForward();
});

// 下一首
$('#forward').on('click',function(){
	audio.next();
});

// 上一首
$('#backward').on('click',function(){
	audio.prev();
});