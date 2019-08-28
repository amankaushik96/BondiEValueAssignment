import axios from 'axios';

export default axios.create({
	baseURL: 'http://localhost:8080/api/account',
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
		'Acces-Control-Allow-Origin': '*',
		'Acces-Control-Allow-Credentials': true
	}
});
