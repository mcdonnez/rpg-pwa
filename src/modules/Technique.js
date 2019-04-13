let scoreToDie = {
	1: ['d2'],
	2: ['d2', 'd2'],
	3: ['d2', 'd4'],
	4: ['d4', 'd4'],
	5: ['d4', 'd6'],
	6: ['d6', 'd6'],
	7: ['d6', 'd8'],
	8: ['d8', 'd8'],
	9: ['d8', 'd10'],
	10: ['d10', 'd10'],
	11: ['d10', 'd12'],
	12: ['d12', 'd12']
};

let skillBonusToDie = {
	1: ['d2'],
	2: ['d4'],
	3: ['d6'],
	4: ['d8'],
	5: ['d10'],
	6: ['d12']
};

class TechniqueBuilder {
	constructor(character) {
		this.character = character;
		this.item = {};
		this.skill = {};
		this.aspects = {};
		this.extensions = {};
		this.ability = '';
	}

	addItem(item) {
		this.item = item;
	}

	addSkill(skill) {
		this.skill = skill;
	}

	addAspect(aspect) {
		this.aspects[aspect.name] = this.calculateDice(aspect);
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

	calculateDice(aspect) {
		let abilityMatch = aspect.bonus.match(/d\:(\w+)/);
		if (abilityMatch) {
			let ability = abilityMatch[1] !== 'ability' ? abilityMatch[1] : this.skill.ability.toLowerCase();
			let dice = skillBonusToDie[this.character[ability] / 2];
			aspect.dice = dice;
		}
		return aspect;
	}

	get result() {
		let effort = 1 + Object.keys(this.aspects).length + Object.keys(this.extensions).length;
		let bonuses = [];
		let effects = [];
		Object.values(this.aspects).forEach(aspect => {
			if (aspect.bonus !== '') {
				bonuses.push(this.calculateDice(aspect));
			}
			if (aspect.effect !== '') {
				effects.push(this.calculateDice(aspect));
			}
		});
		Object.values(this.extensions).forEach(extension => {
			if (extension.bonus !== '') {
				bonuses.push(this.calculateDice(extension));
			}
			if (extension.effect !== '') {
				effects.push(this.calculateDice(extension));
			}
		});

		let ability = this.skill.ability ? this.skill.ability.toLowerCase() : '';
		// Ability (physical/mental/wielding average) + Key ability / 2
		let score = Math.ceil((this.character[ability] + this.character.physicalAbility + this.character.mentalAbility + this.character.wieldingAbility) / 2);
		let dice = skillBonusToDie[score] || [];
		let bonusDice = bonuses.map(bonus => bonus.dice).filter(dice => dice.length > 0);
		dice = dice.concat(bonusDice);

		return {
			effort,
			dice,
			effects
		};
	}
}


export default TechniqueBuilder;
