var image = [];
image.push("./images/pizza01.jpg");
image.push("./images/pizza03.jpg");
image.push("./images/pizza02.jpg");
var count = 0;
var sources =[]
sources.push("https://pse.is/DUU4C");
sources.push("https://pse.is/FUMV7");
sources.push("https://pse.is/FGSZ5");

var loading = "./images/loading.gif";
//var load = document.getElementById("display");
//load.onlad = loaded;

function previous(e){
	if (count > 1){
		count -= 1;
		process();
		b2.classList.remove('disabled')
	}else if(count==1){
		count -= 1;
		process();
		b1.classList.add('disabled')
	}
}

function next(e){	
	if (count < 1){
		count += 1;
		process();
		b1.classList.remove('disabled')
	}else if(count == 1){
		count += 1;
		process();
		b2.classList.add('disabled')
	}
	
}

function process(e){
	display.src = loading;
		var download = new Image();
		download.onload = function(){
			display.src = this.src;//display.src = image[count];//image[count];
		};
		download.src = image[count];
		source.innerHTML=sources[count];
}