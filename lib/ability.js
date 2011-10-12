exports = module.exports = Ability;


function Ability(ability) {

	this.abilities = ability;

	return this;
}

exports.can_role = function(user, action) {
	return false;
}

exports.can_ability = function(user, action, target) {
	role = null;
	if (user) {
		role = user.role;
	}
	if (role == null) {
		role = 'default';
	}
	for (var i in abilities[role]) {
		var obj = abilities[role][i];
		for (var ability in obj) {
			console.log(obj[ability]);			
		}
	}
	if ('all' in abilities[role]) {
		return true;
	} else if (action in abilities[role]) {
		return true;
	}
	return false;
}