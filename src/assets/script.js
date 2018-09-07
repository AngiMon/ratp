var off = document.getElementById('off');

$.fn.datepicker.defaults.format = "dd/mm/yyyy";
$.fn.datepicker.defaults.todayHighlight = true;

//position of the footer
var heightWin, height, header, footer, main;

function Footer()
{
	console.log('height');
	heightWin = window.innerHeight;
	main = document.getElementById("main");
	header = document.getElementById("header");
	footer = document.getElementById("footer");
	height =  heightWin - footer.offsetHeight - header.offsetHeight;
	main.style.minHeight = height +"px";
}

document.addEventListener("DOMContentLoaded", Footer);
window.addEventListener("resize", Footer);
