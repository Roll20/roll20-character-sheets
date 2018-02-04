const attribute_types = data.attribute_types;
const ability_types = data.ability_types;
const attributes = [].concat(...attribute_types.map(x => data[x]))
const abilities = [].concat(...ability_types.map(x => data[x]))
const disciplines = data.disciplines;
const backgrounds = data.backgrounds;
const virtues = data.virtues;
const clan_disciplines = data.clan_disciplines;

console.log('reading data from JSON');
console.log('attribute_types', attribute_types);
console.log('ability_types', ability_types);
console.log('attributes', attributes);
console.log('abilities', abilities);
console.log('disciplines', disciplines);
console.log('backgrounds', backgrounds);
console.log('virtues', virtues);
console.log('clan_disciplines', clan_disciplines);

const properties = [].concat(attributes, abilities,
		disciplines, backgrounds, virtues);
const discipline_names = disciplines.map(x => x + "_name");
const prop_base = properties.map(x => x + "_base");
const prop_free = properties.map(x => x + "_free");
const prop_xp = properties.map(x => x + "_xp");
const xp_deps = [].concat(prop_base, prop_free, prop_xp, ["clan"]);

// change arg lists
function list_changed(l) {
	var out = l.map(x => "change:" + x).join(" ");
	return out;
}

function xpCost(b, f, xp, k, new_cost) {
	var cost = 0;
	if (xp > 0) {
		cost += k*(b + f - 1)*xp + k*xp*(xp + 1)/2;
		if ((b + f) == 0) {
			cost += new_cost;
		}
	}
	return cost;
};

function update_free_spent() {
	getAttrs(xp_deps, function(v) {
		var cost = 0;
		var lists = [attributes, abilities, disciplines,
			backgrounds, virtues];
		var types = ["attribute", "ability", "discipline", "background", "virtue"];
		for (l in lists) {
			for (x in lists[l]) { 
				var name = lists[l][x];
				var type = types[l];
				var f = parseInt(v[name + "_free"], 10);
				cost += f*data.free_cost[type];
			};
		};
		setAttrs({
			free_spent: cost
		});
	});
}

function update_xp_spent() {
	getAttrs(xp_deps, function(v) {
		//console.log("updating xp spent");
		var cost = 0;
		var lists = [attributes, abilities, disciplines,
			backgrounds, virtues];
		var types = ["attribute", "ability", "discipline", "background", "virtue"];
		for (l in lists) {
			for (x in lists[l]) { 
				var name = lists[l][x];
				var b = parseInt(v[name + "_base"], 10);
				var f = parseInt(v[name + "_free"], 10);
				var xp = parseInt(v[name + "_xp"], 10);

				// get parameters
				var type = types[l];
				var k = data.mult_xp_cost[type];
				if (k == undefined) {
					console.error("undefined k for type", type);
					return 0;
				};
				var new_cost = data.new_xp_cost[type];
				if (new_cost == undefined) {
					console.error("undefined new_cost for type", type);
					return 0;
				};

				var delta_cost = xpCost(b, f, xp, k, new_cost);
				cost += delta_cost
			};
		};
		setAttrs({
			xp_spent: cost
		});
	});
};

on("sheet:opened", function() {
	console.log("sheet opened");
	//getAttrs(["strength"], function(v) {
		//if (v.strength != undefined) {
			//console.log("deleting strength");
			//setAttrs({
				//strength_base: v.strength,
				//strength: undefined
			//});
		//};
	//});
});

on(list_changed(prop_free), function(){
	console.log("free change");
	update_free_spent();
});

on(list_changed(prop_xp), function(){
	console.log("xp change");
});

on(list_changed(prop_base), function(){
	console.log("base change");
});

on(list_changed(xp_deps), function(){
	console.log("xp deps change");
	update_xp_spent();
});

on("change:clan", function(){
	console.log("clan change");
	// initialize to clan disciplines
	getAttrs([].concat(discipline_names, ["clan"]), function(v) {
		d_set = {}
		for(d in discipline_names) {
			var discipline_name = v[discipline_names[d]]
			console.log("discipline name", discipline_names[d], discipline_name);
			if (d < clan_disciplines[v.clan].length) {
				clan_discipline = clan_disciplines[v.clan][d];
				d_set[discipline_names[d]] = clan_discipline;
			}
		}
		setAttrs(d_set);
	});
});
