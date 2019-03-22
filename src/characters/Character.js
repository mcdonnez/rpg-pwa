class Character {
	constructor(options) {
		this.name = options.name || 'Base Character',
		this.fortitude = options.fortitude || 0;
		this.resolve = options.resolve || 0;
		this.resilience = options.resilience || 0;
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

		this.weapon = options.weapon;
		this.armorArray = options.armors;
		this.aspectArray = options.aspects;
		this.ext = options.ext;

		this.movement = this.size + this.speed - this.burden / 2;
		this.physicalAbility = Math.ceil((this.coordination + this.perception + this.speed + this.strength) / 4);
		this.mentalAbility = Math.ceil((this.education + this.intellect + this.insight + this.wit) / 4);
		this.wieldingAbility = Math.ceil((this.entropy + this.focus + this.spirit + this.truth) / 4);
	}


}

export default Character;
