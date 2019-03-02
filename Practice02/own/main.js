var Directory = "images/"
var Source_title = "Source:"
var all_img = ["images/pizza01.jpg","images/friedchicken.jpg","images/frenchfries.jpg"
				,"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
				,"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"]
var preview_img = ["pizza01.jpg","friedchicken.jpg","frenchfries.jpg","BigBuckBunny.jpg","ElephantsDream.jpg"]
var load_img = "loading.gif"
var all_source = ["https://img.buzzfeed.com/thumbnailer-prod-us-east-1/dc23cd051d2249a5903d25faf8eeee4c/BFV36537_CC2017_2IngredintDough4Ways-FB.jpg"
				,"http://i.epochtimes.com/assets/uploads/2016/12/Fotolia_56463275_Subscription_L-600x400.jpg"
				,"http://www.sakinahalalgrill.com/wp-content/uploads/2018/04/french-fries.jpg"
				,"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
				,"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"]

let back_button = document.getElementById("back");
let next_button = document.getElementById("next");
var display = document.getElementById("display");
var source = document.getElementById("source");
var video = false;
var Count_Images = 0;
var Pre_Back_Images=-1;
var Pre_Next_Images=1;
var temp_img = new Image();

temp_img.onload = function(){
    display.src = this.src;   
};

var back = back_move;
var next = next_move;
//keycode left(37);right(39)
back_button.onclick = back;
next_button.onclick = next;
back_button.onmouseover =  preview_back;
next_button.onmouseover =  preview_next;

document.onkeydown = check_key;

function check_key(e){
	switch (e.key){
	case "ArrowLeft":
		back();
		break;
	case "ArrowRight":
		next();
		break;
	}
}


function preview_back(){
	if (Pre_Back_Images !=-1)
	{
		var myWindow = window.open(Directory+preview_img[Pre_Back_Images], "preview_window","resizable=1,height=200,width=200,top=300,left=100");
		//myWindow.document.write("<head><title>PreView Window</title></head>");
	    setTimeout(function () { myWindow.close();}, 700);
	}

}

function preview_next(){
	if (Pre_Next_Images!=preview_img.length)
	{
		var myWindow = window.open(Directory+preview_img[Pre_Next_Images], "preview_window","resizable=1,height=200,width=200,top=300,left=950");
		//myWindow.document.write("<head><title>PreView Window</title></head>")
	    setTimeout(function () { myWindow.close();}, 700);
	}

}

function back_move() {
	if (Count_Images != 0)
	{
		display.src=Directory+load_img;
		source.innerText="";
		Count_Images--;
		setTimeout(function()
		{
		if (next_button.firstElementChild.classList.length!=0){
			next_button.firstElementChild.classList.remove("disabled")
		}
		if (Count_Images > 0){
			temp_img.src=all_img[Count_Images];
			source.innerText=Source_title+all_source[Count_Images];
		}
		else{
			Count_Images = 0;
			temp_img.src=all_img[0];
			source.innerText=Source_title+all_source[Count_Images];
			back_button.firstElementChild.setAttribute('class', "disabled");
		}
		console.log(temp_img.onload())
		var string_arr = temp_img.src.split("")
		if (video==true && string_arr[string_arr.length-1]=="g") 
		{
			video2img(display,temp_img.src);
			display = document.getElementById("display");			
			video = false;
		}
		Pre_Back_Images = Count_Images-1;
		Pre_Next_Images = Count_Images+1;
		},300);
	}
}

function next_move() {
	if (Count_Images!=all_img.length-1)
	{
		display.src=Directory+load_img;
		source.innerText="";
		Count_Images++;
		setTimeout(function()
		{
		if (back_button.firstElementChild.classList.length!=0){
			back_button.firstElementChild.classList.remove("disabled");
		}
		if (Count_Images < all_img.length-1){
			temp_img.src=all_img[Count_Images];
			source.innerText=Source_title+all_source[Count_Images];
		}
		else{
			Count_Images = all_img.length-1;
			temp_img.src=all_img[all_img.length-1];
			source.innerText=Source_title+all_source[Count_Images];
			next_button.firstElementChild.setAttribute('class', "disabled");
		}
		var string_arr = temp_img.src.split("")
		if (string_arr[string_arr.length-1]=="4") 
		{
			img2video(display, all_img[Count_Images]);
			display = document.getElementById("display");
			video = true;
		}
		Pre_Back_Images = Count_Images-1;
		Pre_Next_Images = Count_Images+1;
		},300);
	}
}

function img2video(node, src) {
    const newElem = document.createElement("video");
    newElem.setAttribute("controls",true);
    newElem.setAttribute("src",src);
    newElem.setAttribute("type","video/mp4");
    newElem.setAttribute("id","display");
    newElem.setAttribute("autoplay",true);
    node.parentNode.replaceChild(newElem, node);
}

function video2img(node, src) {
    const newElem = document.createElement("img");
    newElem.setAttribute("src",src);
    newElem.setAttribute("id","display");
    node.parentNode.replaceChild(newElem, node);
}
