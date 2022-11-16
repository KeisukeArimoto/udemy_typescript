// const person: {
//     name: string;
//     age: number;
//     hobbies: string[];
//     role: [number, string];
// } = {
//     name: 'Keisuke',
//     age: 25,
//     hobbies: ['sports', 'cooking'],
//     role: [2, 'author'],
// }

// person.role.push('auth')
// person.role[1] = 10

// person.role = [0, 'admin', 'user']

enum Role {
    ADMIN, READ_ONLY, AUTHOR
}

const person = {
    name: 'Keisuke',
    age: 25,
    hobbies: ['sports', 'cooking'],
    role: Role.ADMIN,
}

let favoritehobbies: string[];
favoritehobbies = ['sports'];

for (const hobby of person.hobbies) {
    console.log(hobby);
}

if (person.role === Role.ADMIN) {
    console.log('管理者ユーザ');
}