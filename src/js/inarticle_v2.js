var easyvideo_widget_inarticle = easyvideo_widget_inarticle || ( function() {

		return {
			display : function() {

					
					var x = document.getElementById("tvBsvideos");

					var advertise = document.createElement('div');
					advertise.style.textAlign = "center";
					advertise.style.fontSize = "10px";
					advertise.style.color = "rgb(136, 136, 136)";
					advertise.style.paddingTop = "10px";
					advertise.style.paddingBottom = "5px";
					advertise.style.display = "none";
					advertise.id = "tvBsvideos_adTitile";
					advertise.innerHTML = "ADVERTISEMENT";

					var slider_div = document.createElement('div');
					slider_div.id = "tvBsvideos_main";

					current_iframe = document.createElement('iframe');
					current_iframe.setAttribute("id", "native-widget");
					current_iframe.setAttribute("frameBorder", "0");
					current_iframe.setAttribute("width", "0px");
					current_iframe.setAttribute("minwidth", "0px !important");
					current_iframe.setAttribute("minheight", "0px !important");
					current_iframe.setAttribute("height", "0px");
					current_iframe.setAttribute("margin", "100% !important");
					current_iframe.setAttribute("background", "transparent");
					current_iframe.setAttribute("allowfullscreen", "true");
					current_iframe.setAttribute("webkitallowfullscreen", "true");
					current_iframe.setAttribute("mozallowfullscreen", "true");
					current_iframe.setAttribute("scrolling", "no");
					current_iframe.setAttribute("src", "http://contentvideo."+_siteid+".com/src/html/0.0.1/inarticle_html.htm");

					var top = document.getElementById('tvBsvideos').offsetTop - 500;
					
					videoshow = 1;
					
					window.addEventListener("scroll", function() {

						if (document.body.scrollTop == 0) {
							var value = document.documentElement.scrollTop;
						} else {
							var value = document.body.scrollTop;
						}

						if (value >= top && videoshow == 1) {
							x.style.overflow = "hidden";
							x.style.height = "0px";
							x.style.margin = "auto";
							x.style.transition = "height 1s ease-out";
							x.appendChild(advertise);
							slider_div.appendChild(current_iframe);
							x.appendChild(slider_div);
							videoshow = 0;
						}
					});
					
					
					current_iframe.onload=function(){
						console.log("show video zzz...");
							
						var width = document.getElementById("tvBsvideos").offsetWidth;
						
						var h = width * 9 / 16;
						var h_x = h+40;
						
							
						advertise.style.display = "block";

						current_iframe.setAttribute("width", "100% !important");
						current_iframe.setAttribute("height", "100% !important");

						slider_div.style.height = h+"px";
						slider_div.style.overflow = "hidden";
						slider_div.style.margin = "auto";

						x.style.height = h_x+"px";
						
						
						var value = "bsvideos:"+_pubkey+":"+_siteid;
						current_iframe.contentWindow.postMessage(value,"*");
					};
					
					var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
					var eventer = window[eventMethod];
					var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";

					// Listen to message from child window
					eventer(messageEvent, function(e) {

						if (e.data == "closeVideo") {
							x.style.height = "0px";
							x.innerHTML = "";
						} 
						//run function//
					}, false);

				
			}
		};
	}());
easyvideo_widget_inarticle.display();