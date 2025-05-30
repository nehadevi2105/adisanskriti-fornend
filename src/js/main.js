(function (e, o, a) {
	(e.resizeAction = function (i, n) {
		var t = !0;
		e(window).on("resize", function () {
			i.call(this)
				? t && (n.call(this, t), (t = !t))
				: t || (n.call(this, t), (t = !t));
		});
	}),
		(o.behaviors.toggleGrid = {
			attach: function (i, n) {
				e(".view-style a.style-btn", i).click(function (t) {
					t.preventDefault(),
						e(this).hasClass("line")
							? e(this).closest(".view").addClass("style-line")
							: e(this).closest(".view").removeClass("style-line");
				});
			},
		}),
		(o.behaviors.mobileMenu = {
			attach: function (i, n) {
				e(once("click", ".mobile-menu-btn", i)).on("click", function () {
					e("body", i).toggleClass("menu-open"),
						e(".mobile-header-wrapper").slideToggle();
				});
			},
		}),
		(o.behaviors.toggleFeed = {
			attach: function (i, n) {
				e(".feed-link", i).on("click", function () {
					e("body", i).addClass("open-feed"), window.scrollTo({ top: 0 });
				});
			},
		}),
		(o.behaviors.toggleGrid = {
			attach: function (i, n) {
				const t = e("body", i);
				e(".show-filter", i).on("click", function (s) {
					s.preventDefault(),
						t.addClass("open-filter"),
						window.scrollTo({ top: 0 }),
						e(".catalog-filter").fadeIn();
				}),
					e(".close-btn", i).on("click", function () {
						t.hasClass("open-filter") && e(".catalog-filter").fadeOut(),
							t.removeClass("open-feed open-filter");
					});
			},
		}),
		(o.behaviors.catalogFilters = {
			attach: function (i) {
				e(once("click", ".apply-catalog-filters", i)).on("click", function () {
					var n = e("#catalog-filter-parent .close-btn:visible");
					n.length !== 0 && n.click();
				});
			},
		}),
		(o.behaviors.socialFeed = {
			attach: function (i, n) {
				const t = e("body");
				if (e(i).hasClass("dashboard")) {
					const s = e(i);
					s.on("click", ".feed-link", function () {
						t.addClass("open-feed"), window.scrollTo({ top: 0 });
					}),
						s.on("click", ".close-btn", function () {
							t.removeClass("open-feed");
						});
				}
			},
		}),
		(o.behaviors.activitiesListDropdown = {
			attach: function (i, n) {
				e(".opigno-lp-step-module", i).on(
					"click",
					".module-title",
					function () {
						const t = e(this);
						t.toggleClass("open"),
							t.siblings(".passed-activities").slideToggle(),
							t.siblings(".activities-list").slideToggle();
					},
				),
					e(".show-activity-list", i).on("click", function () {
						window.innerWidth <= 991 &&
							(e(this).fadeOut(function () {
								e(this).siblings(".opigno-lp-step-activity", i).fadeIn();
							}),
							e(
								".lp_progress_wrapper, .opigno_activity__wrapper",
								i,
							).fadeOut());
					});
			},
		}),
		(o.behaviors.expandInnerTable = {
			attach: function (i, n) {
				e(once("click", ".details-btn", i)).on("click", function (t) {
					t.preventDefault(),
						e(this)
							.toggleClass("active")
							.closest("tr")
							.next()
							.find(".inner-table")
							.slideToggle();
				});
			},
		}),
		(o.behaviors.frontpageSlider = {
			attach: function (i, n) {
				if (e("body.anonymous-slider", i).length) {
					let t = 0,
						s = 0;
					e(".anonymous-slider .slider-item", i)
						.not(`:eq(${t})`)
						.addClass("hide")
						.hide(),
						e(".anonymous-slider .slider-item", i).each(function () {
							e(this).attr("data-id", t), (t += 1);
						}),
						setInterval(() => {
							(s = s < t - 1 ? (s += 1) : (s = 0)),
								e(`.anonymous-slider .slider-item:not([data-id="${s}"])`)
									.addClass("hide")
									.fadeOut("slow"),
								e(`.anonymous-slider .slider-item[data-id="${s}"]`)
									.removeClass("hide")
									.fadeIn("slow");
						}, 2e3);
				}
			},
		}),
		(o.behaviors.anonymousUserForms = {
			attach: function (i, n) {
				e("body.anonymous-slider").length &&
					e(once("click", "#user-sidebar .switch-link a", i)).click(
						function (t) {
							const s = e(this).attr("href");
							e(`.form-wrapper[data-target="${s}"]`, i).length &&
								(t.preventDefault(),
								e(".form-wrapper[data-target]", i)
									.not(`.form-wrapper[data-target="${s}"]`)
									.hide(),
								e(`.form-wrapper[data-target="${s}"]`, i).show());
						},
					);
			},
		}),
		(o.behaviors.messges = {
			attach: function (i, n) {
				const t = e(".private-message-thread-messages", i);
				i === document && t.scrollTop(t.prop("scrollHeight")),
					e(".show-message-list", i).on("click", function (s) {
						s.preventDefault(), e("body", i).toggleClass("open-message-list");
					});
			},
		}),
		(o.behaviors.activateSelectpicker = {
			attach: function (i) {
				e(".selectpicker", i).each(function () {
					e(this).hasClass("processed") ||
						(e(this).selectpicker(), e(this).addClass("processed"));
				});
			},
		}),
		(o.behaviors.yourCommunities = {
			attach: function (i, n) {
				e(".your-community", i).on("click", ".content-box__title", function () {
					window.innerWidth < 1200 &&
						e(this)
							.toggleClass("expanded")
							.next(".communities-list")
							.slideToggle();
				});
			},
		}),
		e.resizeAction(
			function () {
				return window.innerWidth > 991;
			},
			function (i) {
				i &&
					(e("body").removeClass("open-filter menu-open open-message-list"),
					e(
						".mobile-header-wrapper, .catalog-filter, .opigno-lp-step-activity, .lp_progress_wrapper, .opigno_activity__wrapper",
					).removeAttr("style"));
			},
		),
		e.resizeAction(
			function () {
				return window.innerWidth >= 1200;
			},
			function (i) {
				i &&
					(e(".your-community .content-box__title").removeClass("expanded"),
					e(".communities-list").removeAttr("style"));
			},
		);
})(jQuery);