import extensions from './extensions.json';

export default extensions.reduce((extensionMap, aspect) => {
	extensionMap[aspect.name] = aspect;
	return extensionMap;
}, {});
