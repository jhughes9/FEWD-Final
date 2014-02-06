var container = document.querySelector('#container');//masonry container
var msnry = new Masonry(container,{itemSelector:'#container div'});//initialize masonry
function Shuffle(o) {
	for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
};//for randomizing order
var divs = [];
var clicks = [];
var clickNum = 0;
var round = 3;
var encouragement = ['GREAT','SUPER','FANTASTIC','NICE','EXCELLENT','FABULOUS'];
divs = $( "#container div" ).toArray();//create array of divs
Shuffle(divs);//shuffle array of divs
$(divs).each(function( index ) {
		  $(this).addClass("box" + index);//give a unique class to each div
		  var rgb1 = Math.floor(Math.random()*200+30); //not 0-255 to avoid colors too close to black or white
		  var rgb2 = Math.floor(Math.random()*200+30);
		  var rgb3 = Math.floor(Math.random()*200+30);
		  $(this).css("background-color","rgb("+rgb1+","+rgb2+","+rgb3+")");//set random background color for each div
});
var divClasses = [];
$( "#play" ).click(function() {
	$(divs.slice(0,round)).each(function( index ) {
	divClasses[index] = $(divs[index]).attr('class');//set an array length for the current round/difficulty
	});
	$(divs.slice(0,round)).each(function( index ) {
		$(divs.slice(0,round)).each(function( index ) {
		  var that = this;
		    setTimeout( function(){//flash div
		      $(that).css("opacity","1");
		    },(index+1)*500);
		    setTimeout( function(){//unflash div
		      $(that).css("opacity","0.5");
		    },(index+1)*500+250);
		});
	});
});
$( "#container div" ).click(function() {
	clicks[clickNum] = $(this).attr('class');//every time a div is clicked, add it to this array
	clickNum++;
	if(clickNum==round){//check if the user has clicked enough divs to end the round
		if(clicks.toString()==divClasses.toString()){//check if the original array matches the array of user clicks
			if(round==16){//perform winning actions if the arrays match and we're on the final round
				$('#message').html('WINNER!');
				$('#message').css("opacity","1");
				$('#message').css("font-size","170px");
				setTimeout( function(){
		    	location.reload();//refresh the page
		   		},2000);
			}else{//if it's not the final round, show an encouragement message
				$('#message').html(encouragement[Math.floor(Math.random()*5)]);
				$('#message').css("opacity","1");
				$('#message').css("font-size","170px");
				setTimeout( function(){
			    $('#message').css("opacity","0");
			    $('#message').css("font-size","1px");
			    },500);
				round++;
				clicks.length = 0;
				clickNum = 0;
				$('#play').html("Next");
				}
		} else{//if the arrays do not match, perform loser actions
			$('#message').css("color","red");
			$('#message').html('LOSER');
			$('#message').css("opacity","1");
			$('#message').css("font-size","170px");
			setTimeout( function(){
		    location.reload();//refresh the page
		    },500);
		}
	}
});