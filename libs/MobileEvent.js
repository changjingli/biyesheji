;

(function($){
	$.fn.extend({
		/*
		 * 鼠标事件与Touch事件的注册，并返回事件对象
		 * Jquery中 up 是e.originalEvent.changedTouches[0]; 
		 * Jquery中 Dnwo 是e.originalEvent.targetTouches[0]; 
		 * Jquery中Move 是e.originalEvent.touches[0]; 
		 * 
		 * $("body").zdw_addEvent("mousemove",function(e){
				console.log(e.zdwX+"-------"+e.zdwY)
			})
		 * 
		 */
		zdw_addEvent:function(_MouseEvent,_EventFunction){
			var CurDom = this;
			var ME;//保存事件类型
			
			var isSupport = $.isSupportMobile();//判断是否为移动端浏览器
			//alert(isSupport)
			addEventName();
			var FN = function(event){
				var e = event|| window.event;
				stopDefault(e);

				switch (ME){
					case "touchstart":
						var touch =e.originalEvent.targetTouches[0]; 
						e.zdwX = touch.clientX;
						e.zdwY = touch.clientY;
						break;
					case "touchmove":
						var touch =e.originalEvent.touches[0]; 
						e.zdwX = touch.clientX;
						e.zdwY = touch.clientY;
						break;
					case "touchend":
						var touch =e.originalEvent.changedTouches[0]; 
						e.zdwX = touch.clientX;
						e.zdwY = touch.clientY;
						break;
					default:
						e.zdwX = e.clientX;
						e.zdwY = e.clientY;
						break;
				}

				_EventFunction(e);
			};
			$(CurDom).bind(ME,FN);
			
			
			
			
			
			
			
			//阻止浏览器默认方法
			function stopDefault(e){
	  			var e = e || window.event;
				 if(e.preventDefault){
	 				e.preventDefault();
				 }else{
	 				e.returnValue=false;
	 			 }
			}


			//判断浏览器应该执行什么事件类型
			function addEventName(){
				switch (_MouseEvent){
					case "mousedown":
						if(isSupport){
							ME = "touchstart";
						}else{
							ME = "mousedown";
						}
					break;
					case "mouseup":
						if(isSupport){
							ME = "touchend";
						}else{
							ME = "mouseup";
						}
					break;
					case "mousemove":
						if(isSupport){
							ME = "touchmove";
						}else{
							ME = "mousemove";
						}
					break;
				default:
						ME = _MouseEvent;
					break;
				}
			}

			return this



		}
	})
	
	
	//是否支持移动端
	/**
	 * 是否支持移动端，如果支持，返回true
	 */
	$.isSupportMobile = function(){
		var  navi = navigator.userAgent.toLowerCase();
		var touchDevice = /ipad|iphone|android|windows phone|blackberry/;
		var isSupport = false;
		if(navi.match(touchDevice)!=null){
			isSupport = true;
		}else{
			isSupport = false;
		}
		return isSupport;
	}
})(jQuery)
