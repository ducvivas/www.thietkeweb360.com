function slideFade(obj,auto,duration,start,fadeIn,fadeOut){
	this.start = start;
	this.initPro;
    this.interval = duration;
    this.obj = obj;
	this.auto = auto;
	this.fadeIn = fadeIn;
	this.fadeOut = fadeOut;
	this.slide_number = obj.find("ul.slider").find("li").length;
    this.startSlide = function(){
        initInterval(this);
    };
	if(this.auto==true){this.startSlide();}
    function initInterval(instance){
		instance.initPro = setInterval(function(){
			if(instance.start==instance.slide_number-1){
				instance.start = 0;
			}
			else{
				instance.start = instance.start + 1;
			}
			set_slide(instance,instance.start,instance.fadeIn,instance.fadeOut);
		},instance.interval);
		set_slide(instance,instance.start,instance.fadeIn,instance.fadeOut);
	}
	function set_slide(instance,index,fadeIn,fadeOut){
        instance.obj.find("ul.slider").find("li").fadeOut(fadeOut);
        instance.obj.find("ul.slider").find("li:eq("+index.toString()+")").fadeIn(fadeIn);
        instance.obj.find("ul.navigator").find("li").removeAttr("class");
        instance.obj.find("ul.navigator").find("li:eq("+index.toString()+")").attr("class","active");
    }
	var instance1 = this;
	this.obj.find("ul.navigator").find("li").click(function(){
		var index = instance1.obj.find("ul.navigator").find("li").index($(this));
		instance1.start = index;
		set_slide(instance1,index,instance1.fadeIn,instance1.fadeOut);
	});
	
	this.obj.find("ul.arrowLR").find("li.preArrow").click(function(){
		if(instance1.start==0){
			instance1.start=instance1.slide_number-1;
		}
		else{
			instance1.start=instance1.start-1;
		}
		set_slide(instance1,instance1.start,instance1.fadeIn,instance1.fadeOut);
	});
	this.obj.find("ul.arrowLR").find("li.nextArrow").click(function(){
		if(instance1.start==instance1.slide_number-1){
			instance1.start=0;
		}
		else{
			instance1.start=instance1.start+1;
		}
		set_slide(instance1,instance1.start,instance1.fadeIn,instance1.fadeOut);
	});
	
}
function slideLR(obj,autopPlay,duration,start){
	var current_slide = start;
	this.autopPlay = autopPlay;
	this.start = start;
	this.busy = false;
	this.initPro;
    this.interval = duration;
    this.obj = obj;
	this.width = obj.find(".preview_container").width();
	this.height = obj.find(".preview_container").height();
	this.slide_number = obj.find("ul.item").find("li").length;
	this.Initcomponent = function(){
		if(this.slide_number>0){
			//this.obj.find(".preview").find("ul").append("<li>" + this.obj.find(".container").find("li:eq(0)").html() + "</li>");
		}
	};
	this.startSlide = function(){
        initLR(this);
    };
	function initLR(instance){
		instance.initPro = setInterval(function(){
			if(instance.busy==false){
				instance.busy=true;
				if(instance.start==0){
					instance.start = instance.slide_number - 1;
				}
				else{
					instance.start = instance.start - 1;
				}
				set_slide("pre",instance,instance.start);
			}
		},instance.interval);
	}
	function set_slide(type,instance,index){
		var add_value = "<li>"+instance.obj.find("ul.item").find("li:eq("+index.toString()+")").html()+"</li>";
		if(type=="pre"){
			instance.obj.find("ul.preview").append(add_value);
			instance.obj.find("ul.preview").stop().animate({
                left: "-"+instance.width.toString()+"px"
            },1500,"linear",function(){
                instance.obj.find("ul.preview").find("li:eq(0)").remove();
                instance.obj.find("ul.preview").css("left","0px");
				instance.busy=false;
				//initLR(instance);
            });
		}
		else{
			instance.obj.find("ul.preview").prepend(add_value);
            instance.obj.find("ul.preview").css("left","-"+instance.width.toString()+"px");
            instance.obj.find("ul.preview").stop().animate({
                left: "0px"
            },1500,"linear",function(){
                instance.obj.find("ul.preview").find("li:eq(1)").remove();
				instance.busy=false;
				//initLR(instance);
            });
		}
	}
	if(this.autopPlay==true){this.startSlide();}
	var instance1 = this;
	this.obj.find(".button_bar").find("li.left").click(function(){
		if(instance1.busy==false){
			instance1.busy=true;
			clearInterval(instance1.initPro);
			if(instance1.start==0){
				instance1.start = instance1.slide_number-1;
			}
			else{
				instance1.start = instance1.start - 1;
			}
			set_slide("pre",instance1,instance1.start);
		}
	});
	this.obj.find(".button_bar").find("li.right").click(function(){
		if(instance1.busy==false){
			instance1.busy=true;
			clearInterval(instance1.initPro);
			if(instance1.start==instance1.slide_number-1){
				instance1.start = 0;
			}
			else{
				instance1.start = instance1.start + 1;
			}
			set_slide("next",instance1,instance1.start);
		}
	});
}