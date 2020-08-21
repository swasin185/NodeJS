class UserPwd {
	id: string;
	name: string;
	password: string;
	role: number = 9;
	logCnt: number = 0;
}

const fileName = 'password.json';
const fs = require("fs");

var userData = readFile();

console.log(userData);

writeFile(userData);

function readFile(): UserPwd[] {
	let readData = fs.readFileSync(fileName, 'utf-8');
	return JSON.parse(readData);
}

function writeFile(data: UserPwd[]): void {
	fs.writeFileSync(fileName, JSON.stringify(data));
}