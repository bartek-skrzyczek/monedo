var app = {
	init: function() {
		this.slider();
		this.scrolling();
		this.menu_fixed();
		this.menu_link();
	},
	slider: function() {
		var container = document.querySelector('.slider'),
			container_cols = container.querySelectorAll('.col');


			if ($(window).width() >= 1024) {
			
				$('div.col').on('mouseover', '.content', function(ev) {

					var current_slide = this.querySelector('div[data-href]').dataset.href; 
					
					for (var i=0; i < container_cols.length; i++) {
						container.classList.remove('slide'+[i+1]);
						container_cols[i].classList.remove('active');
						container_cols[i].querySelector('.content').classList.remove('displayNone');
						container_cols[i].querySelector('.content-slide').classList.add('displayNone');
						container_cols[i].classList.add('reset');
					}

					container.classList.add('slide'+[current_slide]);
					container_cols[current_slide-1].classList.add('active');
					container_cols[current_slide-1].querySelector('.content').classList.add('displayNone');
					container_cols[current_slide-1].querySelector('.content-slide').classList.remove('displayNone');

				});
			}
			// click, touchevent
			$('div.col').on('click', '.content', function(ev) {

				var current_slide = this.querySelector('div[data-href]').dataset.href;
				
				for (var i=0; i < container_cols.length; i++) {
					container.classList.remove('slide'+[i+1]);
					container_cols[i].classList.remove('active');
					container_cols[i].querySelector('.content').classList.remove('displayNone');
					container_cols[i].querySelector('.content-slide').classList.add('displayNone');
					container_cols[i].classList.add('reset');
				}

				container.classList.add('slide'+[current_slide]);
				container_cols[current_slide-1].classList.add('active');
				container_cols[current_slide-1].querySelector('.content').classList.add('displayNone');
				container_cols[current_slide-1].querySelector('.content-slide').classList.remove('displayNone');

			});

			$('div.button.close').on('click', function() {
				var tmp_current_cols = $(this).attr('data-href');
					
				console.log('tmp', tmp_current_cols);

					container.classList.remove('slide'+[tmp_current_cols]);
					container_cols[tmp_current_cols-1].classList.remove('active');
					container_cols[tmp_current_cols-1].querySelector('.content').classList.remove('displayNone');
					container_cols[tmp_current_cols-1].querySelector('.content-slide').classList.add('displayNone');
			
			});
	},
	scrolling: function() {
		$('a[href^="#"]').on('click',function (e) {
		    e.preventDefault();

		    var target = this.hash;
		    var $target = $(target);

		    if (target === '') {
		    	$('html, body').stop().animate({
		        'scrollTop': '0px'
			    }, 500, 'linear', function () {
		        	window.location.hash = target;
		    	});
		    } else {
			    $('html, body').stop().animate({
			        'scrollTop': $target.offset().top
			    }, 500, 'linear', function () {
			        window.location.hash = target;
			    });
		    }
		});
	},
	menu_fixed: function() {
		var header = document.querySelector('header'),
			header_height = header.offsetHeight,
			doc_offsetTop = document.documentElement.scrollTop || document.body.scrollTop,
			section = document.querySelectorAll('section'),
			burger = header.querySelector('i[data-burger="menu"');

		
		function sticky_menu(val) {
			if (val) {
				header.classList ? 
				header.classList.add('sticky') : header.className += "sticky";
				section[0].style.marginTop = header_height+'px';

			} else {
				header.classList ? 
				header.classList.remove('sticky') : header.className -= "sticky";
				section[0].style.marginTop = '0px';
			}
		}
		if (doc_offsetTop !== 0) {
			sticky_menu(true);
		}
		document.addEventListener('scroll', function(ev) {
		 	var evt = window.event || ev,
				delta = evt.detail ? evt.detail*(-120) : evt.wheelDelta,
				doc_offsetTop = document.documentElement.scrollTop || document.body.scrollTop;

			if (doc_offsetTop <= 500) {
				sticky_menu(false); 
			} else {
				sticky_menu(true);
			}
		});

		burger.addEventListener('click', function() {
			$(this).parent().toggleClass('dropped');
		})
	},
	menu_link: function() {
		var header = document.querySelector('header'),
			links = document.querySelector('nav').querySelectorAll('a[data-link]');

			for (var i=0; i < links.length; i++) {
				links[i].addEventListener('click', function(ev) {
				
					var current_slide = $(this).attr('data-link'),
						container = document.querySelector('.slider'),
						container_cols = container.querySelectorAll('.col');
					



					for (var i=0; i < container_cols.length; i++) {
						container.classList.remove('slide'+[i+1]);
						container_cols[i].classList.remove('active');
						container_cols[i].querySelector('.content').classList.remove('displayNone');
						container_cols[i].querySelector('.content-slide').classList.add('displayNone');
						container_cols[i].classList.add('reset');
					}

					var elementOffset = $('.slider .col').eq(current_slide-1),
						content = 		elementOffset.find('.content-slide').height();
					    header = 		$('header').height(),
					    distance      = (elementOffset.offset().top - content + header + 50);

					$('nav').removeClass('dropped');

					$('html, body').stop().animate({
						'scrollTop': ( distance - $('#products .header').height() - 200 ) 
					}, 500, 'linear');


					container.classList.add('slide'+[current_slide]);
					container_cols[current_slide-1].classList.add('active');
					container_cols[current_slide-1].querySelector('.content').classList.add('displayNone');
					container_cols[current_slide-1].querySelector('.content-slide').classList.remove('displayNone');

					


				});
			}
	}
}

app.init();