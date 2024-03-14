"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const encrypt_1 = require("./encrypt");
const word = 'Hello word';
const key = 'gjdfoK7aF2PAb8edPY9FbeHHVA9y0VMUJZsaTpV5b3bJCXJ8SSzTnc3YjkdiF9tk5TmlSSM8SZPd9a1ZmtNA';
const new_text = (0, encrypt_1.encryptData)(word, key);
console.log(new_text);
const decrypt_text = (0, encrypt_1.decryptData)('61f7835500ce9cc2642f2371a88ef98a:7761c5cc292968596f0ea123182b4373', key);
console.log(decrypt_text);
//# sourceMappingURL=test.js.map