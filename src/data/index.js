import axios from 'axios';
let data = {};

async function init() {
	let response = await axios.get('/api/data');
	Object.keys(response.data).forEach(key => {
		data[key] = response.data[key];
	});
}

export let dataReady = init();
export default data;
