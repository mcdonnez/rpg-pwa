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

	addItem(item, isProficient = false) {
		if (!item || item === '') {
			this.item = {};
		} else {
			this.item = item;
			this.item.isProficient = isProficient;
		}
	}

	addSkill(skill, isProficient = false) {
		this.skill = skill;
		this.skill.isProficient = isProficient;
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

	calculateBaseDice(score = 0) {
		if (isNaN(score)) {
			return [];
		}
		let dice = [];
		if (score < 13) {
			dice = dice.concat(scoreToDie[score]);
		} else {
			dice = dice.concat(scoreToDie[12]);
			let moreDice = this.calculateBaseDice(score - 12);
			dice = dice.concat(moreDice);
		}
		return dice;
	}

	calculateDice(aspect) {
		let abilityMatch = aspect.bonus.match(/d\:(\w+)/);
		if (abilityMatch) {
			let ability = abilityMatch[1] !== 'ability' ? abilityMatch[1] : this.skill.ability.toLowerCase();
			let dice = skillBonusToDie[Math.ceil(this.character[ability] / 2)];
			aspect.dice = dice;
			console.log(ability, dice, skillBonusToDie, this.character);
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
		let skillProficiency = this.skill.isProficient ? 2 : 0;
		let weaponProficiency = this.item.isProficient ? 2 : 0;
		let naturalAbility = this.character[ability] + skillProficiency + weaponProficiency;
		let bonusAspects = 0;
		let weaponBonus = this.item.bonus ? parseInt(this.item.bonus) : 0;
		let score = naturalAbility + bonusAspects + weaponBonus;
		let dice = this.calculateBaseDice(score);
		console.log(bonuses);
		let bonusDice = bonuses.map(bonus => bonus.dice).filter(dice => !!dice && dice.length > 0);
		dice = dice.concat(bonusDice);

		return {
			effort,
			dice,
			effects
		};
	}
}


export default TechniqueBuilder;
