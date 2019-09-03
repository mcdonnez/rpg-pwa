import axios from 'axios';
let data = {};
export let ready = init();

async function init() {
	let response = await axios.get('/api/data');
	Object.keys(response.data).forEach(key => {
		data[key] = response.data[key];
	});
	ready = true;
}

export default {
	...data
};
