function main() {

  	var mainviewImg = new Image();
	// mainviewImg.src = 'https://mdn.mozillademos.org/files/5395/backdrop.png'
	mainviewImg.src = 'img/img_small.jpg'
  	mainviewImg.addEventListener('load', function() {
		var maincanvas = $("#mainview")[0]
		var ctx = maincanvas.getContext('2d');
		ctx.drawImage(mainviewImg, 0, 0, 2244, 540);
	}, false);

	var clicking = false;
	var previousX;
	var heading = 0;
	// var previousY;

	var picheading = 0;
    var picFullWidth = 2244;
    var picViewWidth = 1122;
    var picClipPos = 0;
	var maincanvas = $("#mainview")[0]
	var ctx = maincanvas.getContext('2d');

	$("#mainview").mousedown(function(event) {
	    event.preventDefault();
	    previousX = event.clientX;
	    // previousY = event.clientY;
	    clicking = true;
	    $('.testi').show()
	});

	$(document).mouseup(function() {
	    clicking = false;
	    $('.testi').hide()
	});

	$("#mainview").mousemove(function(event) {
	    if (clicking) {
	        event.preventDefault();
	        if (previousX - event.offsetX > 0) {
	        	heading = heading - 1;
	        } else if (previousX - event.offsetX < 0) {
	        	heading = heading + 1;
	        }
	        if (heading >= 360) {
	        	heading = 0;
	        } else if (heading < 0) {
	        	heading = 359;
	        }

	        picStartPos = heading * (picFullWidth/360);
	        picClipPos = (360 - heading) * (picFullWidth/360)
	        mainPicWidth = picFullWidth - picStartPos;

	        // draw main image
	        ctx.drawImage(mainviewImg,
	        	0, 0, 2244, 540,
	        	picStartPos, 0, 2244, 540);

	        ctx.drawImage(mainviewImg,
	        	picClipPos, 0, 2244, 540,
	        	0, 0, 2244, 540);

	        previousX = event.offsetX;
	        $('#heading').text("Heading: " + heading)
	        $('#picheading').text("Picheading: " + picStartPos)
	    }
	});

	$("#horizon").mouseleave(function(event) {
    	clicking = false;
    });
}

// function drawmainview(mainviewImg) {
// 	$(this).drawImage(mainviewImg, 0, 0);
// }

$(document).ready(main);
