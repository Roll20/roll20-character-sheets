const parseValues = (values, stat, type='int') => {
	if (type === 'int') return parseInt(values[stat])||0;
	else if (type === 'float') return parseFloat(values[stat])||0;
	else return values[stat];
}
on("change:brace1 change:brace2 change:brace3", () => {
	getAttrs(["brace1", "brace2", "brace3"], (values) => {
		setAttrs({
			'brace': parseValues(values, 'brace1') + parseValues(values, 'brace2') + parseValues(values, 'brace3')
		});
	});
});
on("change:break1 change:break2 change:break3", () => {
	getAttrs(["break1", "break2", "break3"], (values) => {
		setAttrs({
			'break': parseValues(values, 'break1') + parseValues(values, 'break2') + parseValues(values, 'break3')
		});
	});
});
on("change:concoct1 change:concoct2 change:concoct3", () => {
	getAttrs(["concoct1", "concoct2", "concoct3"], (values) => {
		setAttrs({
			'concoct': parseValues(values, 'concoct1') + parseValues(values, 'concoct2') + parseValues(values, 'concoct3')
		});
	});
});
on("change:cook1 change:cook2 change:cook3", () => {
	getAttrs(["cook1", "cook2", "cook3"], (values) => {
		setAttrs({
			'cook': parseValues(values, 'cook1') + parseValues(values, 'cook2') + parseValues(values, 'cook3')
		});
	});
});
on("change:delve1 change:delve2 change:delve3", () => {
	getAttrs(["delve1", "delve2", "delve3"], (values) => {
		setAttrs({
			'delve': parseValues(values, 'delve1') + parseValues(values, 'delve2') + parseValues(values, 'delve3')
		});
	});
});
on("change:flourish1 change:flourish2 change:flourish3", () => {
	getAttrs(["flourish1", "flourish2", "flourish3"], (values) => {
		setAttrs({
			'flourish': parseValues(values, 'flourish1') + parseValues(values, 'flourish2') + parseValues(values, 'flourish3')
		});
	});
});
on("change:hack1 change:hack2 change:hack3", () => {
	getAttrs(["hack1", "hack2", "hack3"], (values) => {
		setAttrs({
			'hack': parseValues(values, 'hack1') + parseValues(values, 'hack2') + parseValues(values, 'hack3')
		});
	});
});
on("change:harvest1 change:harvest2 change:harvest3", () => {
	getAttrs(["harvest1", "harvest2", "harvest3"], (values) => {
		setAttrs({
			'harvest': parseValues(values, 'harvest1') + parseValues(values, 'harvest2') + parseValues(values, 'harvest3')
		});
	});
});
on("change:hunt1 change:hunt2 change:hunt3", () => {
	getAttrs(["hunt1", "hunt2", "hunt3"], (values) => {
		setAttrs({
			'hunt': parseValues(values, 'hunt1') + parseValues(values, 'hunt2') + parseValues(values, 'hunt3')
		});
	});
});
on("change:outwit1 change:outwit2 change:outwit3", () => {
	getAttrs(["outwit1", "outwit2", "outwit3"], (values) => {
		setAttrs({
			'outwit': parseValues(values, 'outwit1') + parseValues(values, 'outwit2') + parseValues(values, 'outwit3')
		});
	});
});
on("change:rattle1 change:rattle2 change:rattle3", () => {
	getAttrs(["rattle1", "rattle2", "rattle3"], (values) => {
		setAttrs({
			'rattle': parseValues(values, 'rattle1') + parseValues(values, 'rattle2') + parseValues(values, 'rattle3')
		});
	});
});
on("change:scavenge1 change:scavenge2 change:scavenge3", () => {
	getAttrs(["scavenge1", "scavenge2", "scavenge3"], (values) => {
		setAttrs({
			'scavenge': parseValues(values, 'scavenge1') + parseValues(values, 'scavenge2') + parseValues(values, 'scavenge3')
		});
	});
});
on("change:sense1 change:sense2 change:sense3", () => {
	getAttrs(["sense1", "sense2", "sense3"], (values) => {
		setAttrs({
			'sense': parseValues(values, 'sense1') + parseValues(values, 'sense2') + parseValues(values, 'sense3')
		});
	});
});
on("change:study1 change:study2 change:study3", () => {
	getAttrs(["study1", "study2", "study3"], (values) => {
		setAttrs({
			'study': parseValues(values, 'study1') + parseValues(values, 'study2') + parseValues(values, 'study3')
		});
	});
});
on("change:sway1 change:sway2 change:sway3", () => {
	getAttrs(["sway1", "sway2", "sway3"], (values) => {
		setAttrs({
			'sway': parseValues(values, 'sway1') + parseValues(values, 'sway2') + parseValues(values, 'sway3')
		});
	});
});
on("change:tend1 change:tend2 change:tend3", () => {
	getAttrs(["tend1", "tend2", "tend3"], (values) => {
		setAttrs({
			'tend': parseValues(values, 'tend1') + parseValues(values, 'tend2') + parseValues(values, 'tend3')
		});
	});
});
on("change:vault1 change:vault2 change:vault3", () => {
	getAttrs(["vault1", "vault2", "vault3"], (values) => {
		var newVal = parseValues(values, 'vault1') + parseValues(values, 'vault2') + parseValues(values, 'vault3');
		console.log(`Valut: ${newVal}`);
		setAttrs({
			'vault': newVal
		});
	});
});
on("change:wavewalk1 change:wavewalk2 change:wavewalk3", () => {
	getAttrs(["wavewalk1", "wavewalk2", "wavewalk3"], (values) => {
		setAttrs({
			'wavewalk': parseValues(values, 'wavewalk1') + parseValues(values, 'wavewalk2') + parseValues(values, 'wavewalk3')
		});
	});
});
// This sets the burn on all aspects with the same number
// The $20query isn't good for repeating things
// Will have to look into how the 5e does adv/disadv to see if I can get something
// like that to work here but for normal/burn
//$20('.repitem .aspect_container .burnable').on('click', (e) => {
//	console.log(e);
//	const burn = e.shiftKey ? 'burn' : '';
//	console.log(burn);
//	var attr = e.htmlAttributes.name.replace('attr_', '');
//	getAttrs([attr], (values) => {
//		var is_checked = parseValues(values, attr) == 1;
//		console.log(parseValues(values, attr))
//		console.log(is_checked);
//		if (is_checked) {
//			$20(`.${attr}`).addClass(burn);
//		} else {
//			$20(`.${attr}`).removeClass('burn');
//		}
//	})
//})
$20('.header .tab_button').on('click', (e) => {
	const tab = e.htmlAttributes['data-tab'];
	$20('div[data-tab]').removeClass('active');
	$20(`div[data-tab=${tab}]`).addClass('active');
});