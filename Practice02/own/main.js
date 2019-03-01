var Directory = "images/"
var Source_title = "Source:"
var all_img = ["pizza01.jpg","friedchicken.jpg","frenchfries.jpg"]
var load_img = "loading.gif"
var all_source = ["https://img.buzzfeed.com/thumbnailer-prod-us-east-1/dc23cd051d2249a5903d25faf8eeee4c/BFV36537_CC2017_2IngredintDough4Ways-FB.jpg"
				,"http://i.epochtimes.com/assets/uploads/2016/12/Fotolia_56463275_Subscription_L-600x400.jpg"
				,"http://www.sakinahalalgrill.com/wp-content/uploads/2018/04/french-fries.jpg"]

let back_button = document.getElementById("back");
let next_button = document.getElementById("next");
var display = document.getElementById("display");
var source = document.getElementById("source");
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
	console.log(Pre_Back_Images);
	if (Pre_Back_Images !=-1)
	{
		var myWindow = window.open(Directory+all_img[Pre_Back_Images], "preview_window","resizable=1,height=200,width=200,top=300,left=100");
		myWindow.document.write("<head><title>PreView Window</title></head>");
	    setTimeout(function () { myWindow.close();}, 700);
	}

}


function preview_next(){
	if (Pre_Next_Images!=all_img.length)
	{
		var myWindow = window.open(Directory+all_img[Pre_Next_Images], "preview_window","resizable=1,height=200,width=200,top=300,left=950");
		myWindow.document.write("<head><title>PreView Window</title></head>")
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
			temp_img.src=Directory+all_img[Count_Images];
			source.innerText=Source_title+all_source[Count_Images];
		}
		else{
			Count_Images = 0;
			temp_img.src=Directory+all_img[0];
			source.innerText=Source_title+all_source[Count_Images];
			back_button.firstElementChild.setAttribute('class', "disabled");
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
			temp_img.src=Directory+all_img[Count_Images];
			source.innerText=Source_title+all_source[Count_Images];
		}
		else{
			Count_Images = all_img.length-1;
			temp_img.src=Directory+all_img[all_img.length-1];
			source.innerText=Source_title+all_source[Count_Images];
			next_button.firstElementChild.setAttribute('class', "disabled");
		}
		Pre_Back_Images = Count_Images-1;
		Pre_Next_Images = Count_Images+1;
		},300);
	}
}
