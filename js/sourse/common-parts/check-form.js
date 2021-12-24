		// check email
		var r = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
		var mailInput;
		var mailFlag = 1;
		var isEmpty = false;
		function checkMail(elThis) {
				mailInput = elThis.val();

				if (!r.test(mailInput)) {
						isEmpty = false;
						elThis.addClass("mail-error");

				} else {
						isEmpty = true;
						elThis.removeClass("mail-error")
				}
		}

		$(".check-mail").on("keyup", function () {
				checkMail($(this));

				if (mailInput.length == 0) {
						$(this).removeClass("mail-error")
				}
		});
		// check email

		// check require

		$(".btn-send").on("click", function (e) {
		
				isEmpty = false;

				checkMail($(this).parents(".form").find(".check-mail"));

				$(this).parents(".form").find(".require").each(function () {

						if ($(this).attr("type") == "checkbox") {
								if (!$(this).is(":checked")) {
										$(this).parent().addClass("input-error");
										isEmpty = true;
								}
						}
						if ($(this).is(".style-select")) {

								if ($(this).prev().attr("data-val") == 0) {

										$(this).prev().addClass("input-error");
										isEmpty = true;
								}
						}

						if ($(this).attr("type") == "file") {
								$(this).next().addClass("input-error");
								isEmpty = true;
						}

						if (!$(this).val()) {
								isEmpty = true;
								$(this).addClass("input-error");
						}
				});

				setTimeout(function () {
						$(".input-error").removeClass("input-error");
				}, 3000);

				if (isEmpty == true) {
						e.preventDefault();
				};
		});

		// check require