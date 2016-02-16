var easyvideo_widget_inter = easyvideo_widget_inter || ( function() {

		return {
			display : function() {
				
				var height = window.parent.innerHeight;
				
				var advertise = document.createElement('div');
				advertise.id = "tvBsvideos_inter";
				advertise.style.width = "100%";
				advertise.style.height = height;

				var slider_div = document.createElement('div');
				slider_div.id = "tvBsvideos_inter_main";
				slider_div.style.width = "100%";
				slider_div.style.height = "100%";


				current_iframe = document.createElement('iframe');
				current_iframe.setAttribute("id", "native-widget-inter");
				current_iframe.setAttribute("frameBorder", "0");
				current_iframe.setAttribute("width", "100%");
				current_iframe.setAttribute("height", height);
				
				current_iframe.setAttribute("background", "transparent");
				current_iframe.setAttribute("allowfullscreen", "true");
				current_iframe.setAttribute("webkitallowfullscreen", "true");
				current_iframe.setAttribute("mozallowfullscreen", "true");
				current_iframe.setAttribute("scrolling", "no");
				current_iframe.setAttribute("src", "http://contentvideo."+_siteid+".com/src/html/0.0.1/interstitial_html.htm");
				current_iframe.style.position = "fixed";
				current_iframe.style.zIndex = "4532340223449562139";

				slider_div.appendChild(current_iframe);
				advertise.appendChild(slider_div);
				
				
				document.body.insertBefore(advertise, document.body.firstChild);
				
				current_iframe.onload=function(){
					var value = "bsvideos:"+_pubkey+":"+_siteid;
					current_iframe.contentWindow.postMessage(value,"*");
				};
				
				
				var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
				var eventer = window[eventMethod];
				var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
				
				// Listen to message from child window
				eventer(messageEvent,function(e) {
					
				    
				    	
				    	if(e.data=="closeVideo"){
				    		advertise.style.height = "0px";
				    		advertise.innerHTML = "";
				    	}
				    
					    //run function//
				},false);
				
				
				
				
				

			}
		};
	}());
	
easyvideo_widget_inter.display();







