class TechniqueBuilder {
	constructor(character) {
		this.character = character;
		this.item = {};
		this.aspects = {};
		this.extensions = {};
	}

	addItem(item) {
		this.item = item;
	}

	addSkill(skill) {
		this.skill = skill;
	}

	addAspect(aspect) {
		this.aspects[aspect.name] = aspect;
	}

	removeAspect(aspect) {
		delete this.aspects[aspect.name];
	}

	addExtension(extension) {
		this.extensions[extension.name] = extension;
	}

	removeExtension(extension) {
		delete this.extensions[extension.name];
	}

	replaceAbilityScore(aspect) {
		let abilityMatch = aspect.bonus.match(/d\:(\w+)/);
		if (abilityMatch) {
			let ability = abilityMatch[1] !== 'ability' ? abilityMatch[1] : this.skill.ability.toLowerCase();
			aspect.bonus = aspect.bonus.replace(':' + abilityMatch[1], this.character[ability]);
		}
		return aspect;
	}

	get result() {
		let effort = 1 + Object.keys(this.aspects).length + Object.keys(this.extensions).length;
		let bonuses = [];
		let effects = [];
		Object.values(this.aspects).forEach(aspect => {
			if (aspect.bonus !== '') {
				bonuses.push(this.replaceAbilityScore(aspect));
			}
			if (aspect.effect !== '') {
				effects.push(this.replaceAbilityScore(aspect));
			}
		});
		Object.values(this.extensions).forEach(extension => {
			if (extension.bonus !== '') {
				bonuses.push(this.replaceAbilityScore(extension));
			}
			if (extension.effect !== '') {
				effects.push(this.replaceAbilityScore(extension));
			}
		});

		return {
			effort,
			bonuses,
			effects
		};
	}
}


export default TechniqueBuilder;
