class UserPwd {
    id: string;
    name: string;
    password: string;
    loginCount: number = 0;
    role: number = 0;
}
let list0: UserPwd[] = new Array(5);
let n: number = 0;
let obj = new UserPwd();
obj.id = String(n + 1);
obj.name = 'Tom';
obj.password = 'XXX';
obj.role = 9;
list0[n] = obj;
n = n + 1;

obj = new UserPwd();
obj.id = String(n + 1);
obj.name = 'Tae';
obj.password = 'ABA';
obj.role = 5;
list0[n] = obj;
n = n + 1;

let list: UserPwd[] = list0;
list[n - 1].name = 'CFour';
obj.role = 3;

let userList: UserPwd[] = new Array(n);
for (let i = 0; i < n; i++)
    userList[i] = list0[i];

list[0] = null;

console.log('n =', n);
console.log('list0 =', list0);
console.log('list =', list);
console.log('userList =', userList);