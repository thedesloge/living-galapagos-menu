  	//START DYLAN CODE
  	$(document).ready( function () {
			jQuery.fx.interval = 40;
			var froogaloop;
			
			var open = true;
			var isPlaying = false;
			
			function slideClosed(){
				$("#slidemenu").animate({"left": "-100%"}, 300, function(){
			        $("#sidebar-div").css("width","0%");
				});
			}
			function slideOpen(){
				console.log("openning");
			    $("#sidebar-div").css("width","17.38%");
				$("#slidemenu").animate({"left": "0%"}, 300, function(){});
			}
			
			//----------------------------------------------------------------SLIDING MENU

			
			//lists active div for sliding decisions
			//var activeDiv="#scroll-cat1";
			var activeDiv="";
			
			// makes activeDiv open
			$(activeDiv).css("left","0%");
			
			//Loop that counts icons for future loop usage &AND& sets mouseover function. Also gets icon position to set menu position
			$(".icon").each( function(index) {
				totalIcons = index;
				var iconID = $(this).attr("id").replace("icon-", "");
				var topDistance = $(this).position().top;
				$("#scroll-"+iconID).css("margin-top",topDistance);
				$(this).mouseover(function(){
					onIconMouseover(index, totalIcons, iconID, topDistance);		
				});
			});
				
			//Function that makes the corresponding div appear
			function onIconMouseover(index, totalIcons, iconID, topDistance){
			//	froogaloop.api('pause');
				var lastActive=activeDiv;
				activeDiv="#scroll-"+iconID;
				if (activeDiv != lastActive){
					$(lastActive).stop();
					drawIn(lastActive, index);
				}
			}
			
							
			//function to animate div after it comes into view
			function drawIn(selector){
				if (!isPlaying){
					console.log("animation when not playing");
					$("#sidebar-div").css("width","17.38%");
					$("#slidemenu").css("left", "0%");
					
					$(selector).animate({"left": "-100%"}, 300, function(){
						drawOut(activeDiv);
						getVars();
					});
				} else{
					console.log("playing is true");
					$(selector).css("left","-100%");
					drawOut(activeDiv);
				}
			}
							
			//function animates div as it comes out to view &AND& sets last animated
			function drawOut(selector){
				//$(activeDiv).css("top","0");
				$(selector).animate({"left": "0px"}, 300);
				
			}
			
			//----------------------------------------------------------------SCROLLS MENU
			
			//Determines values for scroll usage: The height of the container and scroller and the overall travel-distance needed
			var divPosition = parseInt($(activeDiv).css("margin-top"));	
			var scrollHeight = $(activeDiv).height()+(divPosition);
			var containerHeight = $("#sidebar-div").height()
			var scrollDistance = (scrollHeight-containerHeight);

			function getVars(){
				divPosition = parseInt($(activeDiv).css("margin-top"));	
				scrollHeight = $(activeDiv).height()+(divPosition);
				containerHeight = $("#sidebar-div").height()
				scrollDistance = (scrollHeight-containerHeight);
				//alert("divPosition: "+divPosition + " scrollHeight: "+scrollHeight + " activeDiv height: " + $(activeDiv).height() + " containerHeight: " + containerHeight + "scrollDistance: " + scrollDistance);
			}
			
			//Loop that 1) Finds both scrollbuttons 2)Gives the up-btn and down-btn different parameters to pass into 3) the makeScroll function
			$(".scroll-btn").each( function(){
				var scrollID = $(this).attr("id");
				//var topPosition = (scrollID=="up-btn") ? 0 : -scrollDistance;			
				var direction = (scrollID=="up-btn") ? "up" : "down";				
				makeScroll(this, direction, scrollID);
			});

			//Takes the buttons' information as passed into it and assigns a mouse-over animation/stop
			function makeScroll(activeBtn, direction, scrollID){
				$(activeBtn).mouseenter( function() {
					var topPosition = (scrollID=="up-btn") ? 0 : -scrollDistance;	
					if(scrollDistance > 0){
						$(activeDiv).animate({top: topPosition}, getScrollSpeed(direction)*3);
					}
				}).mouseout( function(){
					$(activeDiv).stop();
				});
			}

			//Calculates how fast the scroller needs to move based on its position and the direction moving
			function getScrollSpeed(direction) {
				scrollPosition = ($(activeDiv).position().top);
				scrollSpeed = (scrollPosition+scrollDistance);
				var speed = (direction=="up") ? scrollDistance-scrollSpeed : scrollSpeed
				return speed*2;
			};
			
			//----------------------------------------------------------------FROOGALOOP
			

                    var player = document.getElementById("player_1");
                    $f(player).addEvent('ready', ready);

                function addEvent(element, eventName, callback) {
                    if (element.addEventListener) {
                        element.addEventListener(eventName, callback, false);
                    }
                    else {
                        element.attachEvent(eventName, callback, false);
                    }
                }

                function ready(player_id) {
                    // Keep a reference to Froogaloop for this player
                    var container = document.getElementById(player_id).parentNode.parentNode;
                    froogaloop = $f(player_id);
                    var apiConsole = container.querySelector('.console .output');

                    function setupSimpleButtons() {
                     /*   var buttons = container.querySelector('div dl.simple'),
                            playBtn = buttons.querySelector('.play'),
                            pauseBtn = buttons.querySelector('.pause');

                        // Call play when play button clicked
                        addEvent(playBtn, 'click', function() {
                            froogaloop.api('play');
                        }, false);

                        // Call pause when pause button clicked
                        addEvent(pauseBtn, 'click', function() {
                            froogaloop.api('pause');
                        }, false);*/

                    }
					
					//PROBLEM: PLAY WORKS, MENU SLIDES. 1ST PAUSE WORKS, MENU SLIDES BACK. THEN 2ND PLAY FUCKS UP BECAUSE ISPLAYING IS NOW TRUE. CHANGING TRUE IN "ONPAUSE" LAUNCHES INFINITE LOOP BETWEEN PLAY AND PAUSE BECAUSE IT CHECKS ONPAUSE...

                    function setupEventListeners() {

                        function onPlay() {
                            froogaloop.addEvent('play', function(data) {
								if (!isPlaying){
									$(".dim").css("display","block");
									$(".dim").animate({ opacity: "1.0" }, 800);;
									isPlaying = true;
									//makePause(false);
									$("#slidemenu").animate({"left": "-100%"}, 300, function(){
										$("#sidebar-div").css("width","0%");
										froogaloop.api('play');
									});
								}
								console.log('play event');
								
                            });
                        }
						
						function makePause(truth){
							if(truth){
								isPlaying = false;	
								$(".dim").animate({ opacity: "0.0" }, 800, function() {
									$(".dim").css("display","none");
								});
							}
						}

                        function onPause() {
                            froogaloop.addEvent('pause', function(data) {
								slideOpen();
                                console.log('pause event');
								makePause(true);
                            });
                        }

                        function onFinish() {
                            froogaloop.addEvent('finish', function(data) {
								//Add onFinish stuff
                                console.log('finish');
                            });
                        }

                        // Calls the change event if the option is checked
                        // (this makes sure the checked events get attached on page load as well as on changed)
                        onPlay();
                        onPause();
                        onFinish();
                        
                    }

                    setupSimpleButtons();
                    setupEventListeners();
                    

                    console.log(player_id + ' ready!');
                }
                

		});
	    //END DYLAN CODE