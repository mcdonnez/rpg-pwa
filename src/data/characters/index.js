import Character from './Character';
import characters from './characters.json';

let characterMap = characters.reduce((characterMap, character) => {
	characterMap[character.id] = new Character(character);
	return characterMap;
}, {
	custom: new Character()
});

export default characterMap;
