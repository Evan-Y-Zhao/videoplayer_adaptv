var easyvideo_widget = easyvideo_widget || ( function() {

		return {
			display : function() {

				var parent_div;
				var parent_iframe;
				var arrFrames = parent.document.getElementsByTagName("IFRAME");
				var id = '';
				for (var i = 0; i < arrFrames.length; i++) {
					if (arrFrames[i].contentWindow === window) {
						parent_iframe = arrFrames[i];
						parent_div = arrFrames[i].parentNode.parentNode;
					};
				}

				var x = document.createElement("div");
				x.id = 'tvBsvideos_ebuzzing';

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
				current_iframe.setAttribute("id", "native-widget-inarticle");
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
									current_iframe.setAttribute("src", "http://tv.bsvideos.com/html/0.0.1/inarticle_html.htm");

				var top = parent_div.offsetTop - 500;

				var videoshow = 1;

				parent.window.addEventListener("scroll", function() {

					if (parent.document.body.scrollTop == 0) {
						var value = parent.document.documentElement.scrollTop;
					} else {
						var value = parent.document.body.scrollTop;
					}

					if (value >= top && videoshow == 1) {
						x.style.overflow = "hidden";
						x.style.height = "0px";
						x.style.margin = "auto";
						x.style.transition = "height 1s ease-out";
						parent_iframe.setAttribute("width", "100%");
						parent_iframe.setAttribute("height", "0px");
						parent_iframe.style.bottom = "0px";
						parent_iframe.style.transition = "height 1s ease-out";
						parent_iframe.style.backgroundColor = "transparent";
						parent_iframe.style.right = "38px";
						x.appendChild(advertise);
						slider_div.appendChild(current_iframe);
						x.appendChild(slider_div);
						document.body.insertBefore(x, document.body.firstChild);
						current_iframe.onload = function() {
							
							
							var width = parent_div.offsetWidth;
						
							var h = width * 9 / 16;
							var h_x = h + 40;

							advertise.style.display = "block";

							current_iframe.setAttribute("width", "100% !important");
							current_iframe.setAttribute("height", "100% !important");

							slider_div.style.height = h + "px";
							slider_div.style.overflow = "hidden";
							slider_div.style.margin = "auto";

							x.style.height = h_x + "px";
							parent_iframe.setAttribute("height", h_x+"px");
							
							var value = "bsvideos:" + _pubkey;
							current_iframe.contentWindow.postMessage(value, "*");
						};
						videoshow = 0;
					}
				});

				var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
				var eventer = window[eventMethod];
				var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";

				// Listen to message from child window
				eventer(messageEvent, function(e) {

					if (e.data == "closeVideo") {
						parent_div.style.height = "0px";
						parent_div.innerHTML = "";
					} else if (e.data == "showCloseButton") {
						close_div.style.display = "block";
					}

					//run function//
				}, false);

			}
		};
	}());
easyvideo_widget.display();