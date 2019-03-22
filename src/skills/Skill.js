class Skill {
	constructor(options) {
		this.name = options.name || '';
		this.numericalBonus = options.numericalBonus || 0;
		this.effect = options.effect || '';
	}
}

export default Skill;
