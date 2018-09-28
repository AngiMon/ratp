// datepicker
var off = document.getElementById('off');

$.fn.datepicker.defaults.format = "dd/mm/yyyy";
$.fn.datepicker.defaults.todayHighlight = true;

//position of the footer
var heightWin, height, header, footer, main;

function Footer()
{
	heightWin = window.innerHeight;
	main = document.getElementById("main");
	header = document.getElementById("header");
	footer = document.getElementById("footer");
	height =  heightWin - footer.offsetHeight - header.offsetHeight;
	main.style.minHeight = height +"px";
}

document.addEventListener("DOMContentLoaded", Footer);
window.addEventListener("resize", Footer);


//sort animation
var down, up, parent, next, allD, allU;

function Sort(e)
{
	allD = document.getElementsByClassName('down');
	allU = document.getElementsByClassName('up');
	down = e.getElementsByClassName('down')[0];
	up = e.getElementsByClassName('up')[0]

	Array.from(allD).forEach(function(element)
	{
		element.classList.add('show');
		element.classList.remove('hide');	
	})
	Array.from(allU).forEach(function(element)
	{
		element.classList.add('hide');
		element.classList.remove('show');
	})

	if(down != undefined)
	{
		if(down.classList.contains("show"))
		{
			down.classList.remove('show');
			down.classList.add('hide');
			up.classList.add('show');
			up.classList.remove('hide');
		}
		else
		{
			down.classList.add('show');
			down.classList.remove('hide');
			up.classList.remove('show');
			up.classList.add('hide');
		}
	}
}

