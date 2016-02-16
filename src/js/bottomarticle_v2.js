var easyvideo_widget_article_bottom = easyvideo_widget_article_bottom || ( function() {

		return {
			display : function() {
				
				var height = "225px";
				var width = "400px";
				
				var advertise = document.createElement('div');
				advertise.id = "tvBsvideos_article_bottom";
				advertise.style.position = "fixed";
				advertise.style.bottom = "0px";
				advertise.style.right = "38px";
				advertise.style.zIndex = "2147483647";
				advertise.style.webkitTransition = "bottom 0.8s";
				advertise.style.transition = "bottom 0.8s";
				advertise.style.height = height;
				advertise.style.width = width;
				advertise.style.backgroundColor = "transparent";

				var close_div = document.createElement('div');
				close_div.id = "tvBsvideos_close";
				close_div.style.position = "absolute";
				close_div.style.textAlign = "center";
				close_div.style.width = "30px";
				close_div.style.height = "30px";
				close_div.style.right = "-15px";
				close_div.style.top = "-15px";
				close_div.style.cursor = "pointer";
				close_div.style.display = "none";
				close_div.style.zIndex = "100000000";
				
				
				
				var close_button = document.createElement("IMG");
				close_button.src = "http://tv.bsvideos.com/images/close.png";
				
				close_div.appendChild(close_button);
				
				current_iframe = document.createElement('iframe');
				current_iframe.setAttribute("id", "native-widget33");
				current_iframe.setAttribute("frameBorder", "0");
				current_iframe.setAttribute("width", width);
				current_iframe.setAttribute("height", height);
				//current_iframe.setAttribute("minwidth", "0px !important");
				//current_iframe.setAttribute("minheight", "0px !important");
				current_iframe.setAttribute("background", "transparent");
				current_iframe.setAttribute("allowfullscreen", "true");
				current_iframe.setAttribute("webkitallowfullscreen", "true");
				current_iframe.setAttribute("mozallowfullscreen", "true");
				current_iframe.setAttribute("scrolling", "no");
				current_iframe.setAttribute("src", "http://contentvideo."+_siteid+".com/src/html/0.0.1/bottomarticle_html.htm");
				current_iframe.style.position = "absolute";
				
				advertise.appendChild(close_div);
				advertise.appendChild(current_iframe);
				
				
				document.body.insertBefore(advertise, document.body.firstChild);
				
				close_div.onclick=function(){
					advertise.style.height = "0px";
				    advertise.innerHTML = "";
				};
				
				current_iframe.onload=function(){
					var value = "bsvideos:"+_pubkey+":"+_siteid;
					current_iframe.contentWindow.postMessage(value,"*");
				};
				
				
				var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
				var eventer = window[eventMethod];
				var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
				
				// Listen to message from child window
				eventer(messageEvent,function(e) {
				    	
				    	if(e.data=="showCloseButton"){
				    		close_div.style.display = "block";
				    	}
				    	if(e.data=="closeVideo"){
				    		advertise.style.height = "0px";
				    		advertise.innerHTML = "";
				    	}
				   
					    //run function//
				},false);

			}
		};
	}());
easyvideo_widget_article_bottom.display();







