import ArmingSword from './ArmingSword';
import weapons from './weapons.json';

let weaponsMap = weapons.reduce((weaponsMap, weapon) => {
	weaponsMap[weapon.name] = weapon;
	return weaponsMap;
}, {});

export default {
	ArmingSword,
	...weaponsMap
};
