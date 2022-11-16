"use strict";
var Role;
(function (Role) {
    Role[Role["ADMIN"] = 0] = "ADMIN";
    Role[Role["READ_ONLY"] = 1] = "READ_ONLY";
    Role[Role["AUTHOR"] = 2] = "AUTHOR";
})(Role || (Role = {}));
const person = {
    name: 'Keisuke',
    age: 25,
    hobbies: ['sports', 'cooking'],
    role: Role.ADMIN,
};
let favoritehobbies;
favoritehobbies = ['sports'];
for (const hobby of person.hobbies) {
    console.log(hobby);
}
if (person.role === Role.ADMIN) {
    console.log('管理者ユーザ');
}
//# sourceMappingURL=objs-arrays-enum.js.map