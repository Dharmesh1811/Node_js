function data() {
    let data = [

        { id: 1, category: 'vegetables', name: 'Carrot' },
        { id: 2, category: 'vegetables', name: 'Potato' },
        { id: 3, category: 'vegetables', name: 'Cauliflower' },
        { id: 4, category: 'vegetables', name: 'Broccoli' },
        { id: 5, category: 'vegetables', name: 'Tomato' },
        { id: 6, category: 'vegetables', name: 'Spinach' },
        { id: 7, category: 'vegetables', name: 'Cauliflower' },
        { id: 8, category: 'vegetables', name: 'Potato' },
        { id: 9, category: 'vegetables', name: 'Cabbage' },
        { id: 10, category: 'vegetables', name: 'Peas' },
        { id: 11, category: 'fruits', name: 'apple' },
        { id: 12, category: 'fruits', name: 'Banana' },
        { id: 13, category: 'fruits', name: 'Mango' },
        { id: 14, category: 'fruits', name: 'Orange' },
        { id: 15, category: 'fruits', name: 'Grapes' },
        { id: 16, category: 'fruits', name: 'Pineapple' },
        { id: 17, category: 'fruits', name: 'Strawberry' },
        { id: 18, category: 'fruits', name: 'Watermelon' },
        { id: 19, category: 'fruits', name: 'Peach' },
        { id: 20, category: 'fruits', name: 'Kiwi' },
    ]
    return data;
}

// let y = data();

// filelist = y.filter((item,index) => {
//     if(item.category === "vegetables"){
//         return item
//     }
// })
// console.log(filelist)



// filelist = y.filter((item, index) => {
//     return item.category === 'fruits' && item.name === 'Orange'
// }).map((item) => {
//     return item.id
// }
// );
// console.log(filelist);


let itemdata = data();

let fruits = itemdata.filter(item => item.category === "fruits").map(item => item.name)
let vegetables = itemdata.filter(item => item.category === "vegetables").map(item => item.name)
let xyz ={
    fruits: fruits.join(','),
    vegetables: vegetables.join(',')
}

const http = require('node:http');

// Create a local server to receive data from
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    data: xyz
  }));
});

server.listen(8000);