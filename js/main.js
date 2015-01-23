$(document).ready(function() {

	/*
	*	GENERAL
	*/

	var extended = 0;
	var ratio = 1920/1080;

	$('.traits').off('click');
	$('.traits').on('click', function() {
		if(extended == 0) {
			$('#navigation .menu_mobile').slideDown();
			extended = 1;
		} else {
			$('#navigation .menu_mobile').slideUp();
			extended = 0;
		}
	});

	if($('#home').length != 0) {
		$('.link_home').addClass('link_active');

	} else if($('#blindtest').length != 0) {
		$('.link_blindtest').addClass('link_active');

	} else if($('#gallery').length != 0) {
		$('.link_gallery').addClass('link_active');

	} else if($('#contact').length != 0) {
		$('.link_contact').addClass('link_active');

	} else if($('#calendar').length != 0) {
		$('.link_calendar').addClass('link_active');

	}

	

	/*
	*	HOME
	*/

	if($('#home').length != 0 && $(window).width() < 1000) {
		$('.device').height(($(window).width() / ratio)+50);
	}

	$(window).resize(function() {
		if($('#home').length != 0 && $(window).width() < 1000) {
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
	});

	$('.block_blindtest .question button').on('click', function() {

		if($(this).parent().hasClass('question5')) { // Si il s'agit de la dernière question

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
				$('.what_answer img').attr('src', '');
				$('.block_blindtest .question'+window.current_question).hide();
				$('.result_blindtest').text('Votre score est de '+window.score+' points sur 5!');
			}, 2500);

		} else {

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
				$('.what_answer img').attr('src', '');
				$('.block_blindtest .question'+window.current_question).hide();
				window.current_question++;
				$('.block_blindtest .question'+window.current_question).show();

				if(window.current_question === 2) {
					$('.picture_blindtest img').attr('src', 'img/dog.jpg');
				} else if(window.current_question === 3) {
					$('.picture_blindtest img').attr('src', 'img/californie.jpg');
				} else if(window.current_question === 4) {
					$('.picture_blindtest img').attr('src', 'img/pokerface.jpg');
				} else if(window.current_question === 5) {
					$('.picture_blindtest img').attr('src', 'img/token.jpg');
				}

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
			$('.gallery li:visible').each(function() {
				$(this).attr('data-id')
			});
		}
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
