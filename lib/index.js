var ability = require('./ability')
  , helpers = require('./helpers');

exports = module.exports = createAbilities;

function createAbilities(abilities) {
	ability.abilities = abilities;
	return exports;
}
exports.add = function (schema) {
	createAbilities(schema);

}

exports.addHelpers = function(app) {
	helpers(app);
}



authorize = function(user, action, target) {
	// we're checking a role
	if (target == null) {
		return ability.can_role(user, action);				
	} else {
		// we're checking an ability
		return ability.can_ability(user, action, target);		
	}

}