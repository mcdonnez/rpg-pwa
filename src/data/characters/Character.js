import extensions from '../skills/extensions';
import skills from '../skills';
import aspects from '../skills/aspects';
import armors from '../armors';
import weapons from '../weapons';
import {evaluate} from 'mathjs';
// Character Builder
// * Stats
// * Skills
// 	* Aspects
// 		* Aspects
// * Items
// * Extensions

// Save Character / Load Character

class Character {
	constructor(options = {}, content = {}, savedSettings = {}) {
		// Sort through stats and find calculated ones then setup formulas
		// add skills and aspects and extensions
		this.name = options.name || 'Base Character';
		this.id = options.id || 'custom';
		this.description = options.description;

		this.stats = options.stats.reduce((map, stat) => {
			stat.value = 0;
			map[stat.ID] = stat;
			return map;
		});
		options.stats.forEach(stat => {
			if (stat.Score !== '') {
				this.stats[stat.ID].calculated = true;
			}
		});
		let calculatedStats = this._getCalculatedAbilities();
		// Find dependent stats
		calculatedStats.forEach((stat) => {
			let dependantStats = stat.Score.match(/[A-Za-z]+/g);
			dependantStats.forEach(depStat => {
				if (!this.stats[depStat.ID]) {
					return alert(`Missing stat ${depStat.ID} in formula ${stat.ID}`);
				}
				this.stats[depStat.ID].dependant = true;
			});
			this.stats[stat.ID].dependantStats = dependantStats.map(stat => stat.ID);
			return stats;
		}, {});

		// this.items = (options.items || []).map(item => content[item]);
		// this.skills = (options.skills || []).map(skill => content[skill]);
		// this.extensions = (options.extensions || []).map(extension => content[extension]);

		this.calculateAbilities();
	}

	_getCalculatedAbilities() {
		return Object.values(this.stats).map(stat => stat.calculated);
	}



	// stats
	// calculated stats
	// add/remove skills
	// 	add/remove aspects to skills
	// items
	// Extensions

	// save/load existing characters

	calculateAbilities() {
		let calculatedStats = this._getCalculatedAbilities();
		calculatedStats.forEach((calcStat) => {
			let expression = calcStat.dependantStats.reduce((expression, depStat) => {
				return expression.replace(depStat, this.stats[depStat.ID].value);
			}, calcStat.Score);
			this.stats[calcStat.ID].value = Math.ceil(evaluate(expression));
		});
	}
}

export default Character;
