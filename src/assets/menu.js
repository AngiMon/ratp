var menuMin, items, y, size;

function Loaded()
{
	
	menuMin = document.getElementById('menuMin');
	items = document.getElementsByClassName('items');
	menuMin.addEventListener('click', onClickMenu);
	window.addEventListener('resize', Resize);
	y = 0;	
}

function onClickMenu()
{
	y += 1;
	if(y == 2)
	{
		y = 0;
		onClickItem();
		return;

	}
	for(var i = 0; i < items.length; i++)
	{
		if(y == 3)
		{
			items[i].style = "display: inline-block";
		}
		else
		{
			items[i].style = "display: block";
			items[i].addEventListener('click', onClickItem);
		}
	}
	
}
function onClickItem()
{console.log(size);
	if(size < 995)
	{
		for(var i = 0; i < items.length; i++)
		{
			items[i].style = "display: none";
		}
	}
	
}
function Resize()
{
	y = 0;
	size = window.innerWidth;
	console.log(size);
	if(size >= 995)
	{
		y = 2;
		onClickMenu();
	}
	else if(size < 995)
	{
		onClickItem();
	}
}



document.addEventListener('DOMContentLoaded', Loaded);