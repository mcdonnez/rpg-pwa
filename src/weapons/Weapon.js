class Weapon {
	constructor(options) {
		this.name = options.name || '';
		this.skill = options.skill || '';
		this.keyAbility = options.keyAbility || '';
		this.bonus = options.bonus || 0;
		this.spread = options.spread || 0;
		this.reach = options.reach || 0;
		this.burden = options.burden || 0;
		this.effect = options.effect || '';
	}
}

export default Weapon;
