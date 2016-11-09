$(function(){
	var menu=$(".menu");
	var audio=$("#audio")[0];
	var play = $("#play");
	var current=$("#current-time");
	var duration=$("#duration");
	var PI=$("#p-i");
	var progress=$("#progress");
	var vol=$("#volume")
	var VI=$("#v-i")
	var mute=$("#mute");
	var touxiang=$(".touxiang");
	menu.on("touchstart",function(){
		$(".bofaliebiao").addClass("active2")
	})
	$(".hui").on("touchstart",function(){
		$(".bofaliebiao").removeClass("active2")
	})
	var currentIndex=0;
    var musics=[
    {
    	name:"尘埃",
    	author:"徐魏洲",
    	src:"yl/尘埃.mp3",
    	tu:"img/10.jpg"
    	},
    {
    	name:"你还要我怎样",
    	author:"薛之谦",
    	src:"yl/你还要我怎样.mp3",
    	tu:"img/7.jpg"
    	},
    {
    	name:"小幸运",
    	author:"田馥雅",
    	src:"yl/小幸运.mp3",
    	tu:"img/9.jpg"
    	}
    ]
	function render(){
		$("#lists").empty();
		$.each(musics,function(i,v){
			var c=(i===currentIndex)? "active" : "";
			$("<li class='"+c+"'><span class='sings'>"+v.name+"</span><span class='singer'>"+v.author+"</span><div class='delete'></div></li>").appendTo("#lists")
		})
	}
     $("#lists").on("touchend","li",function(){
            var index=$(this).index();
            currentIndex=index;
            audio.src=musics[currentIndex].src;
            $(".bofaliebiao").removeClass("active2");
            render();
        })
        render();
    
    $(".suiji").on("touchend",function(){
    	audio.src=musics[r].src;
    	console.log(musics[r])
        $(".bofaliebiao").removeClass("active2");
        render();
    })
     $(".laba").on("touchend",function(){
        $(".kang").toggleClass("active5");
    })
    console.log($(".suiji"));
    function prev(){
            currentIndex-=1;
            if(currentIndex===-1){
                currentIndex=musics.length-1;
            }
            audio.src=musics[currentIndex].src;
            render();
        }
        function next(){
            currentIndex+=1;
            if(currentIndex===musics.length){
                currentIndex=0;
            }
            audio.src=musics[currentIndex].src;
            render();
        }
        $(".prev") .on("touchend",prev); 
        $(".next") .on("touchend",next); 
        render();
    
	
	
	//时间
	function format(v){
		v=Math.floor (v);
		var s = v % 60;
		s=(s<10)?("0"+s):s;
		var m=Math.floor(v/60);
		return m + ":" + s;
	}

	//播放与暂停
	play.on("touchend",function(){
		if(audio.paused){
			audio.play();
		}else{
			audio.pause();
		}
	})
	$(audio).on("play",function(){
        play.css("background","url(img/pause.png)")
        play.css("background-size","cover")
	})	
	$(audio).on("pause",function(){
         play.css("background","url(img/play.png)")
         play.css("background-size","cover")
	})


//	音乐
	$(audio).on("canplay",function(){
		duration.html(format(audio.duration));
	})

	$(audio).on("timeupdate",function(){
		current.html(format(audio.currentTime));
		var left=progress.width() * audio.currentTime / audio.duration 
		- PI.width() / 2;
		PI.css('left',left);
	})
		//音乐拖拽
	PI.on("touchend",false);
        progress.on("touchend",function(e){
            var offsetx=e.originalEvent.changedTouches[0].clientX;
            audio.currentTime=offsetx / $(this).width() * audio.duration;
//          console.log(offsetx / $(this).width() * audio.duration)
        })
    PI.on("touchstart",function(e){ 
    $(document).on('touchmove',function(e){
        var left=e.originalEvent.changedTouches[0].clientX - progress.position().left;
        var c=left / progress.width() * audio.duration;
        if(c>=audio.duration||c<=0){
            return;
        }
        audio.currentTime=c;
    })
    return false;
    });
    $(document).on("touchend",function(){
        $(document).off("touchmove");
    })
//添加
    $('.listss').on("touchend",'div',function(){
        console.log(1)
        var d=$(this).attr("data-v");
        musics.push(JSON.parse(d));
        render();
    })
    $(".jia").on("touchend",function(){
    	$(".tianjialiebiao").addClass("active3")
    })
    $(".down").on("touchend",function(){
    	$(".tianjialiebiao").removeClass("active3")
    })
//  shanchu
	$("#lists").on("touchend",".delete",function(){
	    
	    var li=$(this).closest("li");
	    var index=li.index();
	    musics.splice(index,1);
	    console.log(li)
	    if(index===currentIndex){
	        if(musics[currentIndex]){
	            audio.src=musics[currentIndex].src;
	        }else{
	            audio.src="";
	        }
	    }else if(index>currentIndex){
	        //不用管
	    }else if(index<currentIndex){
	        currentIndex-=1;
	    }
	    render();
	})
//	xin
    var xin=$(".xin")
    $(".like").on("touchend",function(){
    	xin.toggleClass("active4");
    	console.log(xin)
    })
//音量
    var mute=$(".mute");
    VI.on("touchend",false)
	vol.on("touchend",function(e){
		audio.volume=e.offsetX/vol.width();
		mute.removeAttr("data-v");
	})
	
	mute.on("click",function(){
		if($(this).attr("data-v")){
			audio.volume=$(this).attr("data-v");
			$(this).removeAttr("data-v");
		}else{
			$(this).attr("data-v",audio.volume)
			audio.volume = 0;
		}
	})
	
	
	$(audio).on('volumechange',function(){
		VI.css('left',vol.width()* audio.volume-VI.width()/2);
	})
    //拖拽
   
    VI.on("mousedown",function(e){
        var r=VI.width()/2;
        var offsetx=e.originalEvent.changedTouches[0].clientX;
        var start=r-e.offsetx;
        $(document).on("mousemove",function(e){
            var m=e.originalEvent.changedTouches[0].clientX;
            var left=m-volune.position().left+start;
            var c=left/volune.width();
            if(c>1||c<0){
                return;
            }
            audio.volume= c;
        });
        return false;
    })
    $(document).on("mouseup",function(){
        $(document).off("mousemove");
    })
    //事件
	$(audio).on("volumechange",function(){
       
            console.log('volumechange')
        })
        $(audio).on("loadstart",function(){
        	var r= Math.floor((Math.random()*musics.length));
            $(".sings1").html(musics[currentIndex].name)
            $(".singer1").html(musics[currentIndex].author);
            touxiang.css("background","url("+musics[currentIndex].tu+")")
            console.log('loadstart'); console.log(musics[currentIndex].tu)
        })
       
        $(audio).on("progress",function(){
            console.log('lprogress')
            
        })
        $(audio).on("canplay",function(){
            audio.play();
            console.log('canplay')
            
        })
        $(audio).on("play",function(){
            console.log('play')
        })
        $(audio).on("pause",function(){
            console.log('pause')
        })
        $(audio).on("ended",function(){
            next();
            console.log('ended')
        })
        $(audio).on("timeupdate",function(){
            console.log('timeupdate')
                
        })
})
