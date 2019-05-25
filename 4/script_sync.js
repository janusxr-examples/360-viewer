var fade = false;
var isJanusweb = (typeof elation != 'undefined');
var opacity = 0;
var clicked = "-1";
var last_clicked = 'image_0';
var fade_speed = 0.5;
function setOpacity(perc)
{
	if (isJanusweb)
	{
		var t = room.objects['sky_1']._target;
		t.setOpacity(perc);
		t.objects['3d'].traverse(function(n) { if (n.material) { n.material.transparent = (perc < 1); } })
		if (perc > 0.0)
		{
			t.visible = true;
		}
		else
		{
			t.visible = false;
		}
	}
	else
	{
		room.objects['sky_1'].col.w = perc;
	}
	opacity = perc
}
room.init = function()
{
	if (!isJanusweb && room.objects['js_text'] && room.objects['js_text_container'])
	{
		room.objects['js_text'].rotate_deg_per_sec = "0";
		room.objects['js_text'].pos = Vector(0,0,0);
		room.objects['js_text_container'].rotate_deg_per_sec = "6";
		room.objects['js_text_container'].pos = Vector(0,6,0);
	}
}
room.update = function(dt)
{
	if (room.objects['js_text_sync'].text != last_clicked)
	{
		clicked = room.objects['js_text_sync'].text.substring(6,room.objects['js_text_sync'].text.length);
		last_clicked = 'image_'+clicked;
		fade = true;
		setOpacity(0);
	}
	else if (fade == true)
	{
		if (clicked != "-1")
		{
			room.objects['sky_1'].image_id = 'image_'+clicked;
			//print(clicked);
			clicked = "-1";
		}
		else
		{
			if (fade == true)
			{
				opacity += dt * 0.001 * fade_speed;
				setOpacity(Math.min(1,opacity));
			}
			if (fade == true && opacity >= 1.0)
			{
				fade = false;
				room.objects['sky_0'].image_id = room.objects['sky_1'].image_id;
				setOpacity(0);
			}
		}
	}
	/*else if (fade == false)
	{
		room.objects['js_text_sync'].text = 'image_'+getRandomIntInclusive(0,9);
		fade_speed = 0.1;
	}*/
}
room.onMouseDown = function()
{
	if (player.cursor_object.substring(0,8) == 'preview_')
	{
		num = player.cursor_object.substring(8,player.cursor_object.length)
		if (room.objects['js_text_sync'])
		{
			room.objects['js_text_sync'].text = 'image_'+num;
			room.objects['js_text_sync'].sync = true;
			fade_speed = 2.0;
		}
	}
}

function getRandomIntInclusive(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}