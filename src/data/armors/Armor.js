class Armor {
	constructor(options) {
		this.name = options.name || '';
		this.bonus = options.bonus || 0;
		this.spread = options.spread || 0;
		this.block = options.block || 0;
		this.hardened = options.hardened || 0;
		this.burden = options.burden || 0;
	}
}

export default Armor;
