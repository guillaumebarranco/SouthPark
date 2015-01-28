$(document).ready(function() {

	/*
	*	GENERAL
	*/

	var extended = 0;
	var ratio = 1920/1080;

	$('.traits').off('click');
	$('.traits').on('click', function() {
		if(extended === 0) {
			$('#navigation .menu_mobile').slideDown();
			extended = 1;
		} else {
			$('#navigation .menu_mobile').slideUp();
			extended = 0;
		}
	});

	if($('#home').length !== 0) {
		$('.link_home').addClass('link_active');

	} else if($('#blindtest').length !== 0) {
		$('.link_blindtest').addClass('link_active');

	} else if($('#gallery').length !== 0) {
		$('.link_gallery').addClass('link_active');

	} else if($('#contact').length !== 0) {
		$('.link_contact').addClass('link_active');

	} else if($('#calendar').length !== 0) {
		$('.link_calendar').addClass('link_active');

	}

	/*
	*	HOME
	*/

	if($('#home').length !== 0 && $(window).width() < 1000) {
		$('.device').height(($(window).width() / ratio)+50);
	}

	$(window).resize(function() {
		if($('#home').length !== 0 && $(window).width() < 1000) {
			$('.device').height(($(window).width() / ratio)+50);
		}
	});

	$('.choose_perso li').click(function() {
		var color = $(this).attr('data-color');
		var border;

		if(color === 'blue') {
			border = '#4a6398';
		} else if(color === 'red') {
			border = '#c50a36';
		} else if(color === 'green') {
			border = '#1fb22c';
		} else if(color === 'orange') {
			border = '#da5a00';
		}

		$('.bg_perso').hide();

		$('.persos').css('border-color', border);
		$('.choose_perso li').css('border-color', border);

		$('.bg_'+color).show();
	});


	/*
	*	BLINDTEST
	*/

	$('.launch_blindtest').on('click', function() {
		$(this).hide();
		$('.block_blindtest, .block_blindtest .question1').show();
		window.current_question = 1;
		window.score = 0;

		$('.picture_blindtest img').attr('src', 'img/quandunami.jpg');
		$('.pause_player').show();
		$('.audio_player').trigger('play');
	});

	var audio_playing = true;

	$('.pause_player').on('click', function() {
		if(audio_playing === true) {
			$('.audio_player').trigger('pause');
			$(this).addClass('play_button');
			$(this).removeClass('pause_button');
			audio_playing = false;
		} else if(audio_playing === false){
			$('.audio_player').trigger('play');
			$(this).removeClass('play_button');
			$(this).addClass('pause_button');
			audio_playing = true;
		}
	});

	$('.block_blindtest .question button').on('click', function() {
		$('.audio_player').trigger('pause');
		$(this).removeClass('play_button');

		if($(this).parent().hasClass('question5')) { // Si il s'agit de la dernière question

			$('.what_answer').show();

			if($(this).hasClass('good_answer')) {
				$('.what_answer img').attr('src', 'img/good_answer.png');
				$('.block_blindtest .question'+window.current_question+' button').css('background', 'red');
				$(this).css('background', 'green');
				window.score++;
			} else {
				$('.what_answer img').attr('src', 'img/bad_answer.png');
				$('.block_blindtest .question'+window.current_question+' button').css('background', 'red');
				$('.block_blindtest .question'+window.current_question+' button.good_answer').css('background', 'green');
			}

			setTimeout(function() {
				$('.pause_player').removeClass('play_button');
				$('.pause_player').addClass('pause_button');
				audio_playing = true;
				$('.what_answer').hide();
				$('.what_answer img').attr('src', '');
				$('.block_blindtest .question'+window.current_question).hide();

				var text_result;

				if(window.score === 0) {
					text_result = 'Tu ferais mieux de rentrer à ta maison.';
				} else if(window.score === 1) {
					text_result = 'Mouais. Tu as le niveau d\'un Chinpokomon au maximum.';
				} else if(window.score === 2) {
					text_result = 'Pas terrible. Tu peux faire partie des lapins de Pâques, éventuellement.';
				} else if(window.score === 3) {
					text_result = 'Tu te débrouilles bien ! Je t\'appelerai pour diriger la Scientologie.';
				} else if(window.score === 4) {
					text_result = 'Pas mal ! Mais il serait peut-être temps de sortir au lieu de regarder la télé !';
				} else if(window.score === 5) {
					text_result = 'T\'es fier de toi hein ? De toute façon t\'as triché.';
				}


				$('.blindtest_sentence').append(text_result);

				if(window.score < 2) {
					$('.result_blindtest .score').text(window.score+' point');
				} else {
					$('.result_blindtest .score').text(window.score+' points');
				}
				
				$('.result_blindtest').show();
			}, 2500);

		} else {
			
			$('.what_answer').show();

			if($(this).hasClass('good_answer')) {
				$('.what_answer img').attr('src', 'img/good_answer.png');
				$('.block_blindtest .question'+window.current_question+' button').css('background', 'red');
				$(this).css('background', 'green');
				window.score++;
			} else {
				$('.what_answer img').attr('src', 'img/bad_answer.png');
				$('.block_blindtest .question'+window.current_question+' button').css('background', 'red');
				$('.block_blindtest .question'+window.current_question+' button.good_answer').css('background', 'green');
			}

			setTimeout(function() {
				$('.pause_player').removeClass('play_button');
				$('.pause_player').addClass('pause_button');
				audio_playing = true;
				$('.what_answer').hide();
				$('.what_answer img').attr('src', '');
				$('.block_blindtest .question'+window.current_question).hide();
				window.current_question++;
				$('.block_blindtest .question'+window.current_question).show();

				if(window.current_question === 2) {
					$('.picture_blindtest img').attr('src', 'img/dog.jpg');
					$('.audio_player').attr('src', 'music/dog.mp3');
				} else if(window.current_question === 3) {
					$('.picture_blindtest img').attr('src', 'img/californie.jpg');
					$('.audio_player').attr('src', 'music/californie.mp3');
				} else if(window.current_question === 4) {
					$('.picture_blindtest img').attr('src', 'img/pokerface.jpg');
					$('.audio_player').attr('src', 'music/pokerface.mp3');
				} else if(window.current_question === 5) {
					$('.picture_blindtest img').attr('src', 'img/token.jpg');
					$('.audio_player').attr('src', 'music/token.mp3');
				}
				$('.audio_player').trigger('play');

			}, 2500);
		}
	});

	/*
	*	GALLERY
	*/
	
	$('select[name=filter]').change(function() {
		$('.gallery li').hide();
		if($(this).val() === 'all') {
			$('.gallery li').show();
		} else {
			$('.gallery li[data-filter='+$(this).val()+']').show();
		}
		
	});

	$('select[name=sort]').change(function() {
		if($(this).val() === 'nb_persos') {
			$('.gallery').css('height', $('.gallery').height() + 'px');
			$('.gallery li:visible').css('position', 'absolute');

			var left = 124;
			var top = 0;
			var data_nb;

			for (var i = 0; i < 20; i++) {
				$('.gallery li:visible[data-sortperso='+i+']').each(function() {
					$(this).css('left', left+'px');
					$(this).css('top', top+'px');
					left = left + 510;
					if(left > $('.gallery').height()) {
						left = 124;
						top = top + 290;
					}
				});
			}

		} else if($(this).val() === 'none') {
			$('.gallery').css('height', 'auto');
			$('.gallery li:visible').css('position', 'relative');
			$('.gallery li:visible').css('top', '0px');
			$('.gallery li:visible').css('left', '0px');
		}
	});


	/*
	*	CALENDRIER MOBILE
	*/

	$('.info_btn_m').on('click', function () {
    $(this).closest("div").next('.detail_m').slideToggle();

	});

	$('.info_btn_m').on('click', function () {
		$(this).children('#slide_info_btn').toggleClass("rotate");
	});

	/*
	*	CONTACT
	*/

	var check_no = 0;

	$('input[name=member]').on('change', function() {
		if($(this).val() == "0") {
			$('.coon img').attr('src', 'img/coonanger.png');
			check_no = 1;
		}

		if($(this).val() == "1" && check_no === 1) {
			$('.coon img').attr('src', 'img/coonrassured.png');
		}
	});

	$('form').on('submit', function(e) {
		e.preventDefault();

		var check = true;

		var name = $('input[name=name]');
		var secret = $('input[name=secret]');
		var text = $('textarea[name=text]');
		var member = $('input[name=member]');

		if(
			(name === null && name === '') ||
			(text === null && text === '') ||
			(member === null && member === '')
		)
		{
			check = false;
		}

		if(check === true) {
			$('.content_form form').hide();
			$('.content_form .validation').show();
		}


	});

	/*
	*	POPUP CALENDRIER
	*/

						   		   
	$('a.poplight').on('click', function() {
		var popID = $(this).data('rel');
		var popWidth = $(this).data('width');

		$('#' + popID).fadeIn().css({ 'width': popWidth}).prepend('<a href="#" class="close"><img src="img/close_calendar.png" class="btn_close" title="Close Window" alt="Close" /></a>');
		
		var popMargTop = ($('#' + popID).height() + 80) / 2;
		var popMargLeft = ($('#' + popID).width() + 80) / 2;
		
		$('#' + popID).css({ 
			'margin-top' : -popMargTop,
			'margin-left' : -popMargLeft
		});
		
		$('body').append('<div id="overlay"></div>');
		$('#overlay').css({'filter' : 'alpha(opacity=80)'}).fadeIn();
		
		return false;
	});
	
	
	$('body').on('click', 'a.close, #overlay', function() {
		$('#overlay , .popup').fadeOut(function() {
			$('#overlay, a.close').remove();  
		});
		
		return false;
	});

});
