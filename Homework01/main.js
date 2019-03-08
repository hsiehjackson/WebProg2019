const input = document.getElementById("todo-input");
const todoCount = document.getElementById("todo-count");
const todoitems = [];
var display_state = 0;

input.addEventListener('keyup', event => {
	const value = event.target.value.trim();
	var date = document.getElementById("todo-input-time").value;
	if (date == ""){date="no date";}
	if (event.keyCode === 13 &&  value!== ''){
		const newItem = new createItem(todoitems.length,value,date);
		if (todoitems.length == 0){
			const footerNode = document.getElementById("todo_footer");
			footerNode.removeAttribute("style");
			const listNode = document.createElement("ul");		
			listNode.setAttribute("class","todo-app__list");
			listNode.setAttribute("id","list")
			todoitems.push(newItem);
			//listNode.appendChild(newItem.node);
			input.parentNode.appendChild(listNode);
		}
		else{
			const listNode = document.getElementById("list");
			todoitems.push(newItem);
			//listNode.appendChild(newItem.node);
		}
		event.target.value = "";
		document.getElementById("todo-input-time").value="";
		todoitems.sort(function(a,b){return a.time- b.time});
		todoitems.forEach(function(item, index) {
  		item.node.getElementsByTagName("h1")[0].setAttribute("id","text"+index);
  		item.node.getElementsByTagName("img")[0].setAttribute("id","img"+index);
  		item.node.getElementsByTagName("input")[0].setAttribute("id",index);
  		item.node.getElementsByTagName("label")[0].setAttribute("for",index);
		});
	display_count();
	display_clear();
	display_item();
	}
});

function createItem(id, name, date) {
	const itemNode = document.createElement("li");
	itemNode.setAttribute("class","todo-app__item");
	
	const checkbox = document.createElement("div");
	checkbox.setAttribute("class","todo-app__checkbox");
	
	const checkinput = document.createElement("input");
	checkinput.setAttribute("id", id);
	checkinput.setAttribute("type","checkbox");
	checkinput.setAttribute("onClick", "clickcomplete()");
	
	const checklabel = document.createElement("label");	
	checklabel.setAttribute("for",id);
	
	const image = document.createElement("img");
	image.setAttribute("class","todo-app__item-x");
	image.setAttribute("src","./img/x.png");
	image.setAttribute("onClick", "clickdelete()");
	image.setAttribute("id","img"+id);

	const text = document.createElement("h1");
	text.setAttribute("class","todo-app__item-detail");
	text.setAttribute("id","text"+id);
	text.innerHTML = name;

	const time = document.createElement("P");
	time.setAttribute("class","todo-app__item-time");
	time.innerHTML = date;

	checkbox.appendChild(checkinput);
	checkbox.appendChild(checklabel);
	itemNode.appendChild(checkbox);
	itemNode.appendChild(time);
	itemNode.appendChild(text);
	itemNode.appendChild(image);

	if (date=="no date")
		var d = new Date("2100-01-01");
	else
		var d = new Date(date);
	const newItem = {node: itemNode, isComplete: false, time:d};
	return newItem;
}

function checkempty(){
	if (todoitems.length==0){
		const display_node = document.getElementById("list");
		display_node.parentNode.removeChild(display_node);
		const footerNode = document.getElementById("todo_footer");
		footerNode.style['visibility'] = "hidden";
	}
}

function clickcomplete() {
	const checkid = event.srcElement.id;
	const textnode = document.getElementById("text" + checkid);
	const checkcomplete = todoitems[parseInt(checkid)].isComplete;
	if (checkcomplete)
	{
		textnode.style["textDecoration"] = "";
		textnode.style["opacity"] = 1;
		todoitems[parseInt(checkid)].isComplete = false;
	}
	else
	{
		textnode.style["textDecoration"] = "line-through";
		textnode.style["opacity"] = 0.5;
		todoitems[parseInt(checkid)].isComplete = true;
	}
	display_count();
	display_clear();
	display_item();
}

function clickdelete(){
	const name = event.srcElement.id.split("");
	const checkid = name.splice(3,name.length-3).join();
	todoitems.splice(parseInt(checkid),1);
	todoitems.forEach(function(item, index) {
  		item.node.getElementsByTagName("h1")[0].setAttribute("id","text"+index);
  		item.node.getElementsByTagName("img")[0].setAttribute("id","img"+index);
  		item.node.getElementsByTagName("input")[0].setAttribute("id",index);
  		item.node.getElementsByTagName("label")[0].setAttribute("for",index);
	});
	display_count();
	checkempty();
	display_item();
}

function clickclean(){
	for (var n=todoitems.length-1; n>-1; n--){
		if (todoitems[n].isComplete){
			todoitems.splice(n,1);
		}
	}
	todoitems.forEach(function(item, index) {
  		item.node.getElementsByTagName("h1")[0].setAttribute("id","text"+index);
  		item.node.getElementsByTagName("img")[0].setAttribute("id","img"+index);
  		item.node.getElementsByTagName("input")[0].setAttribute("id",index);
  		item.node.getElementsByTagName("label")[0].setAttribute("for",index);
	});
	display_clear();
	checkempty();
	display_item();
}

function clickswitch(){
	const name = event.srcElement.id;
	const all_button = document.getElementById("all");
	const active_button = document.getElementById("active");
	const completed_button = document.getElementById("completed");
	
	if (name=="all"){
		all_button.removeAttribute("onClick");
		all_button.innerHTML = "<button>All</button>";
		if (display_state==1){
			active_button.setAttribute("onClick","clickswitch()");
			active_button.innerHTML = "Active";
		}
		if (display_state==2){
			completed_button.setAttribute("onClick","clickswitch()");
			completed_button.innerHTML = "Completed";
		}
		display_state=0;
	}
	else if (name=="active"){
		active_button.removeAttribute("onClick");
		active.innerHTML = "<button>Active</button>";
		if (display_state==0){
			all_button.setAttribute("onClick","clickswitch()");
			all_button.innerHTML = "All";
		}
		if (display_state==2){
			completed_button.setAttribute("onClick","clickswitch()");
			completed_button.innerHTML = "Completed";
		}
		display_state=1;
	}
	else if (name=="completed"){
		completed_button.removeAttribute("onClick");
		completed_button.innerHTML = "<button>Completed</button>"
		if (display_state==0){
			all_button.setAttribute("onClick","clickswitch()");
			all_button.innerHTML = "All";
		}
		if (display_state==1){
			active_button.setAttribute("onClick","clickswitch()");
			active_button.innerHTML = "Active";
		}
		display_state=2;
	}
	display_item();

}

function display_item(){
	var allitem= [];
	if (display_state==0){
		allitem = todoitems;
	}
	else if (display_state==1){
		allitem = todoitems.filter(ele => !ele.isComplete);
	}
	else if (display_state==2){
		allitem = todoitems.filter(ele => ele.isComplete);
	}
	if (todoitems.length!=0){
		const display_node = document.getElementById("list");
		display_node.innerHTML = "";
		if (allitem.length!=0){
			for (var x=0; x<allitem.length; x++){
				display_node.appendChild(allitem[x].node);
			}
		}
	}

}


function display_clear(){
	const cleannode = document.getElementById("clean");
	if (todoitems.some(ele => ele.isComplete)){
		cleannode.removeAttribute("style");
		cleannode.setAttribute("onClick","clickclean()");
	}
	else{
		cleannode.style['visibility'] = "hidden";
		cleannode.removeAttribute("onClick");
	}	
}

function display_count(){
	todoCount.innerHTML = todoitems.filter(ele => !ele.isComplete).length + " left";
}

function getDate(){
	var Today = new Date();
	const m = Today.getMonth()+1;
	const d = Today.getDate();
	const h = Today.getHours();
	const min = Today.getMinutes();
	var time = m+"/"+d+" "+h+":"+min;
	return time
}

function sortDate(){

}