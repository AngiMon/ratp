var menuMin, items, y, size;

function Loaded()
{
	
	menuMin = document.getElementById('menuMin');
	items = document.getElementsByClassName('items');
	Resize();
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
	

	if(y == 3)
	{
		for(var i = 0; i < items.length; i++)
		{
			items[i].classList.remove('none');
			if(!items[i].classList.contains('inline'))
			{
				items[i].classList.add('inline');
				items[i].classList.remove('block');
			}
			y=0;
		}
			
	}
	else
	{
		for(var i = 0; i < items.length; i++)
		{
			if(!items[i].classList.contains('block'))
			{
				items[i].classList.remove('inline');
				items[i].classList.add('block');
			}
			items[i].addEventListener('click', onClickItem);
		}
	}
	
}
function onClickItem()
{
	if(size < 995)
	{
		for(var i = 0; i < items.length; i++)
		{
			items[i].classList.add('none');
			items[i].classList.remove('block');
		}
	}
}
function Resize()
{
	y = 0;
	size = window.innerWidth;

	if(size > 995)
	{
		y = 2;
		onClickMenu();
	}
	else if(size <= 995)
	{
		onClickItem();
	}
}



document.addEventListener('DOMContentLoaded', Loaded);