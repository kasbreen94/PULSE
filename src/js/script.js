// Slider

const slider = tns({
	container: '.carousel__inner',
	items: 1,
	slideBy: 'page',
	controls: false,
	navPosition: 'bottom'
});

document.querySelector('.prev').addEventListener('click', function () {
	slider.goTo('prev');
});

document.querySelector('.next').addEventListener('click', function () {
	slider.goTo('next');
});

// Catalog tabs

$(document).ready(function() {
	$('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
		$(this)
			.addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
			.closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
	});

// Catalog card

	function toggleSlide(item) {
		$(item).each(function(i) {
			$(this).on('click', function(e) {
				e.preventDefault();
				$('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
				$('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
			})
		});
	};

	toggleSlide('.catalog-item__link');
	toggleSlide('.catalog-item__back');

// Modal

	$('[data-modal=consultation]').on('click', function() {
		$('.overlay, #consultation').fadeIn('slow');
	});
	$('.modal__close').on('click', function() {
		$(".overlay, #consultation, #thanks, #order").fadeOut('slow');
	});

// Buy

	$(".button_mini").each(function(i) {
		$(this).on('click', function() {
			$('#order .modal__descr').text($(".catalog-item__subtitle").eq(i).text());
			$('.overlay, #order').fadeIn('slow');
		})
	});

// Validation

	function valideForms(form) {
		$(form).validate({
			rules: {
				name: "required",
				phone: "required",
				email: {
					required: true,
					email: true
				}
			},
			messages: {
				name: "Пожалуйста, введите свое имя",
				phone: "Пожалуйста, введите свой номер телефона",
				email: {
					required: "Пожалуйста, введите свой email адрес",
					email: "Не правильно введен email адрес"
				}
			}
		});
	};

	valideForms('#consultation-form');
	valideForms('#consultation form');
	valideForms('#order form');

// mask phone

	$('input[name=phone]').mask("+7 (999) 999-99-99")

// sending the form to the mail

	$('form').submit(function(e) {
		e.preventDefault();

		if (!$(this).valid()) {
			return;
		}

		$.ajax({
			type: "POST",
			url: "mailer/smart.php",
			data: $(this).serialize()
		}).done(function() {
			$(this).find("input").val("");
			$('#consultation, #order').fadeOut()
			$('.overlay, #thanks').fadeIn('slow');

			$('form').trigger('reset')
		});
		return false;
	});

	// Smooth scroll and pageup

	$(window).scroll(function() {
		if ($(this).scrollTop() > 695) {
			$('.pageup').fadeIn();
		} else {
			$('.pageup').fadeOut();
		}
	});

	// wow animated
	new WOW().init();
});