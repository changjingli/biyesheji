$(function() {
	var count = 0;
	var rect1, rect2, rect3, rect4;
	var initPosition = [{
		x: 124.05,
		y: 90.25
	}, {
		x: 353.65,
		y: 101.25
	}, {
		x: 154.55,
		y: 140.3
	}, {
		x: 391.15,
		y: 156.05
	}];

	var rightPositon = [{
		x: 300.05,
		y: 333.25
	}, {
		x: 347.65,
		y: 278.25
	}, {
		x: 309.55,
		y: 390.3
	}, {
		x: 341.15,
		y: 225.05
	}];

	Snap.load("svg/test.svg", function(svg) {
		this.append(svg.node);

		initTest();
		mainFuns();
		resetFuns();

	}, $("#step2"));

	function initTest() {

		rect1 = Snap("svg").paper.path("M165 323 L439 323 L439 340 L165 340").attr("fill", "none");
		rect2 = Snap("svg").paper.path("M257 268 L439 267 L439 288 L257 288").attr("fill", "none");
		rect3 = Snap("svg").paper.path("M185 378 L439 378 L438 396 L185 396").attr("fill", "none");
		rect4 = Snap("svg").paper.path("M239 215 L439 215 L439 233 L239 233").attr("fill", "none");

	}

	function mainFuns() {
		var isDown = false,
			isMove = false,
			id;

		$("#o1, #o2, #o3, #o4").zdw_addEvent("mousedown", function(evt) {
			if (firstIN) {
				offset = $("#step2").offset();
				firstIN = false;
			}
			console.log(offset);
			console.log(evt.zdwX, evt.zdwY);

			isDown = true;
			id = evt.currentTarget.id;
		});
		$("#step2").zdw_addEvent("mousemove", function(evt) {
			if (!isDown) return;
			isMove = true;
			var x = (evt.zdwX - offset.left) / scale,
				y = (evt.zdwY - offset.top) / scale;
			console.log(x, y, evt.zdwX - offset.left, evt.zdwY - offset.top, scale)
			Snap("#" + id).transform(new Snap.Matrix().translate(x, y));

		});

		$(window).zdw_addEvent("mouseup", function(evt) {
			if (!isMove) return;

			isDown = isMove = false;
			var num = id[1];

			if (Snap.path.isBBoxIntersect(Snap("#" + id).getBBox(), eval('rect' + num).getBBox())) {
				count++;
				$("#o" + id).unbind();
				$("#trueAudio")[0].play();
				Snap("#o" + num).transform(new Snap.Matrix().translate(rightPositon[num - 1].x, rightPositon[num - 1].y));

				count === 4 && $("#allokAudio")[0].play();

			} else {
				$("#wrongAudio")[0].play();
				Snap("#o" + num).transform(new Snap.Matrix().translate(initPosition[num - 1].x, initPosition[num - 1].y));
			}

		});
	}

	function resetFuns() {
		$("#resetBtn").zdw_addEvent("mousedown", function() {
				$("#resetBtn").fadeTo(0, 0);
			})
			.zdw_addEvent("mouseup", function() {
				$("#resetBtn").fadeTo(0, 1);
				count = 0;

				for (var i = 1; i < 5; i += 1) {
					Snap("#o" + i).transform(new Snap.Matrix().translate(initPosition[i - 1].x, initPosition[i - 1].y));
				}

				$(window).unbind();

				mainFuns();
			});
	}

});