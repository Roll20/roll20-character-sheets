// ==ClosureCompiler==
// @output_file_name default.js
// @compilation_level SIMPLE_OPTIMIZATIONS
// ==/ClosureCompiler==

//starchildren sheetworkers

on("change:body", function () {
	getAttrs (["Body"], function(values) {
		var body = values.body
		var trauma
		var injury
		var blackout
		var overkill
		if (body == "Ace") {
			trauma = 3
			injury = 3
			blackout = 3
			overkill =3
		} else if (body == 2) {
			trauma = 3
			injury = 5
			blackout = 18
			overkill = 33
		} else if (body == 3) {
			trauma = 6
			injury = 7
			blackout = 21
			overkill = 26
		} else if (body == 4) {
			trauma = 6
			injury = 9
			blackout = 24
			overkill = 39
		} else if (body == 5) {
			trauma = 9
			injury = 11
			blackout = 27
			overkill = 42
		} else if (body == 6) {
			trauma = 9
			injury = 13
			blackout = 30
			overkill = 45
		} else if (body == 7) {
			trauma = 12
			injury = 15
			blackout = 33
			overkill = 48
		} else if (body == 8) {
			trauma = 12
			injury = 17
			blackout = 36
			overkill = 51
		} else if (body == 9) {
			trauma = 15
			injury = 19
			blackout = 39
			overkill = 54
		} else if (body == 10) {
			trauma = 15
			injury = 21
			blackout = 42
			overkill = 57
		} else if (body == "Jack") {
			trauma = 18
			injury = 23
			blackout = 45
			overkill = 60
		} else if (body == "King") {
			trauma = 18
			injury = 25
			blackout = 48
			overkill = 63
		} else if (body == "Queen") {
			trauma = 21
			injury = 27
			blackout = 51
			overkill = 66								
		} else {
			trauma = 0
			injury = 0
			blackout = 0
			overkill = 0
		} setAttrs ({trauma:trauma, injury:injury, blackout:blackout, overkill:overkill});

		});
	});

on("change:speed", function () {
	getAttrs(["Speed"], function(values) {
		var speed = values.speed
		var action_cards
		var walking
		var running
		if (speed == "Jack") {
			action_cards = 4
			walking = 5
			running = 10
		} else if (speed == "King") {
			action_cards = 4
			walking = 5
			running = 10
		} else if (speed == "Queen") {
			action_cards = 5
			walking = 5.5
			running = 11
		} else if (speed == 10) {
			action_cards = 4
			walking = 4.5
			running = 9
		} else if (speed == 9) {
			action_cards = 3
			walking = 4.5
			running = 9
		} else if (speed == 8) {
			action_cards = 3
			walking = 4
			running = 8
		} else if (speed == 7) {
			action_cards = 3
			walking = 4
			running = 8
		} else if (speed == 6) {
			action_cards = 2
			walking = 4
			running = 8
		} else if (speed == 5) {
			action_cards = 2
			walking = 3.5
			running = 7
		} else if (speed == 4) {
			action_cards = 2
			walking = 3.5
			running = 7
		} else if (speed == 3) {
			action_cards = 1
			walking = 3
			running = 6
		} else if (speed == 2) {
			action_cards = 1
			walking = 3
			running = 6
		} else if (speed == "Ace") {
			action_cards = 1
			walking = 2.5
			running = 5
		} else {
			action_cards = 0
			walking = 0
			running = 0
		} setAttrs ({action_cards:action_cards, walking:walking, running:running});
  });
});