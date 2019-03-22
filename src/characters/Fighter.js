import Character from './Character';
// // Tanky Fighter
// let armingSword = Weapon(name: "Arming Sword", skill: "Advanced Blades", keyAbility: "Coordination", bonus: 5, spread: 1, reach: 3, burden: 2, effect: "")
// let plateHalfArmor = Armor(name:"Plate (Half Coverage)", bonus: 5,spread: 1, block: 0, hardened: 3, burden: 5)

// let tankyFighterProficientAspect = SkillAspect(name: "Proficient", numericalBonus: "d8", effect: "")

// let expertArmingSwordAspect = SkillAspect(name: "Expert (Arming Sword)", numericalBonus: "d8", effect: "")

// let helpfulParry = SkillAspect(name: "Helpful Parry", numericalBonus: "", effect: "if enemy attacking ally and ally being attacked are both within reach, you can roll parry and add it to ally's defense[once per moment]")

// let tankyFighter = Character(name: "Tanky Fighter", fortitude: 5, resolve: 3, size: 7, bulk: 6, burden: 12,
// 					   coordination:4, perception: 3, speed: 3, strength: 5,
// 					   education: 2, intellect: 2, insight: 3, wit: 2,
// 					   entropy: 0, focus: 0, spirit: 0, truth: 0,
// 					   weapon: armingSword, armor: [plateHalfArmor, chainHalfArmor],
// 					   aspects: [tankyFighterProficientAspect, preciseAspect, reliableAspect, expertArmingSwordAspect],
// 					   ext: helpfulParry)

// charactersDict[tankyFighter.name] = tankyFighter

class Fighter extends Character {
	constructor(options = {}) {
		options = {
			name: 'Tanky Fighter',
			fortitude: 5,
			resolve: 3,
			size: 7,
			bulk: 6,
			burden: 12,
			coordination: 4,
			perception: 3,
			speed: 3,
			strength: 5,
			education: 2,
			intellect: 2,
			insight: 3,
			wit: 2,
			entropy: 0,
			focus: 0,
			spirit: 0,
			truth: 0,
			weapon: 'armingSword',
			armors: ['plateHalfArmor', 'chainHalfArmor'],
			aspects: ['tankyFighterProficientAspect', 'preciseAspect', 'reliableAspect', 'expertArmingSwordAspect'],
			ext: 'helpfulParry',
			...options
		};
		super(options);
	}
}

export default Fighter;
