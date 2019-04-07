import extensions from '../skills/extensions';
import skills from '../skills';
import aspects from '../skills/aspects';
import armors from '../armors';
import weapons from '../weapons';

class Character {
	constructor(options = {}) {
		this.name = options.name || 'Base Character';
		this.id = options.id || 'custom';
		this.description = options.description;
		this.fortitude = options.fortitude || 0;
		this.resolve = options.resolve || 0;

		this.size = options.size || 0;
		this.bulk = options.bulk || 0;
		this.burden = options.burden || 0;


		this.coordination = options.coordination || 0;
		this.perception = options.perception || 0;
		this.speed = options.speed || 0;
		this.strength = options.strength || 0;


		this.education = options.education || 0;
		this.intellect = options.intellect || 0;
		this.insight = options.insight || 0;
		this.wit = options.wit || 0;


		this.entropy = 0;
		this.focus = 0;
		this.spirit = 0;
		this.truth = 0;

		this.weapons = (options.weapons || []).map(weapon => weapons[weapon]);
		this.armors = (options.armors || []).map(armor => armors[armor]);
		this.skills = (options.skills || []).map(skill => ({
			name: skill.skill,
			ability: skills[skill.skill] ? skills[skill.skill].ability : 'n/a',
			aspects: skill.aspects.map(aspect => aspects[aspect])
		}));
		this.extensions = (options.extensions || []).map(extension => extensions[extension]);

		this.movement = this.size + this.speed - this.burden / 2;
		this.calculateAbilities();
	}

	calculateAbilities() {
		this.physicalAbility = Math.ceil(((this.coordination || 0) + (this.perception || 0) + (this.speed || 0) + (this.strength || 0)) / 4);
		this.mentalAbility = Math.ceil(((this.education || 0) + (this.intellect || 0) + (this.insight || 0) + (this.wit || 0)) / 4);
		this.wieldingAbility = Math.ceil(((this.entropy || 0) + (this.focus || 0) + (this.spirit || 0) + (this.truth || 0)) / 4);
	}
}

export default Character;
