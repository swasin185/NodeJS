import { WSASERVICE_NOT_FOUND } from "constants";

class UserPwd {
	id: string;
	name: string;
	password: string;
	level: number = 0;
	logCnt: number = 0;
}
//-----------------------------------------------------------------------------
const prompts = require('prompt-sync')({ sigint: true });
const fileName = 'password.json';
const fs = require("fs");
function readFile(): UserPwd[] {
	try {
		let readData = fs.readFileSync(fileName, 'utf-8');
		return JSON.parse(readData);
	} catch (error) {
		return [];
	}
}
function writeFile(data: UserPwd[]): void {
	fs.writeFileSync(fileName, JSON.stringify(data));
}

function checkUserPwd(users: UserPwd[], uid: string, pwd: string): UserPwd {
	let user: UserPwd;
	let i = findUser(users, uid);
	if (i != -1 && users[i].password == pwd) {
		user = users[i];
		user.logCnt++;
	}
	return user;
}
function findUser(users: UserPwd[], uid: string): number {
	let found = -1;
	for (let i = 0; i < users.length && found == -1; i++)
		if (users[i].id == uid) found = i;
	return found;
}
function showMenu(users: UserPwd[]): string {
	let allusers: string = '';
	for (let u of users)
		allusers += '[' + u.id + ']';
	console.log('--------------------');
	console.log('users=', allusers);
	console.log('1 New User');
	console.log('2 Edit User');
	console.log('3 Delete User');
	console.log('4 Save & Exit');
	let menu = prompts('menu:');
	return menu;
}
function insertUser(users: UserPwd[]) {
	let newUser = new UserPwd();
	newUser.id = prompts('new user id :');
	newUser.name = prompts(newUser.id + ' name :');
	newUser.password = prompts(newUser.id + ' password :', { echo: '*' });
	newUser.level = Number(prompts(newUser.id + ' level :'));
	users[users.length] = newUser;
}
function changeUser(users: UserPwd[]) {
	let u = prompts('change user:');
	let i = findUser(users, u);
	if (i != -1) {
		let changeUser = users[i];
		changeUser.name = prompts(changeUser.id + ' name :');
		changeUser.password = prompts(changeUser.id + ' password :', { echo: '*' });
		changeUser.level = Number(prompts(changeUser.id + ' level :'));
	} else {
		console.log('user not found!');
	}
}
function deleteUser(users: UserPwd[], loginUser: UserPwd): UserPwd[] {
	let u = prompts('delete user:');
	let updateUsers: UserPwd[] = users;
	if (loginUser.id != u) {
		let i = findUser(users, u);
		if (i != -1) {
			updateUsers = new Array(users.length - 1);
			let k = 0;
			for (let j = 0; j < users.length; j++)
				if (j != i)
					updateUsers[k++] = users[j];
		} else {
			console.log('user not found!');
		}
	} else {
		console.log('can not delete login user!');
	}
	return updateUsers;
}

//-----------------------------------------------------------------------------
var userData: UserPwd[] = readFile();
let loginUser: UserPwd;
if (userData.length == 0) {
	loginUser = new UserPwd();
	loginUser.id = 'admin';
	loginUser.name = 'Tom';
	loginUser.password = 'abc123';
	loginUser.level = 9;
	userData[userData.length] = loginUser;
}

let uid: string;
let pwd: string;
while (loginUser == undefined) {
	uid = prompts('user: ');
	pwd = prompts('password: ', { echo: '*' })
	loginUser = checkUserPwd(userData, uid, pwd);
}
let menu = '0';
while (menu < '4') {
	menu = showMenu(userData);
	if (menu == '1')
		insertUser(userData);
	if (menu == '2')
		changeUser(userData);
	if (menu == '3')
		userData = deleteUser(userData, loginUser);
}
writeFile(userData);