const t = [1, 2, 3]

const m1 = t.map(value => value * 2)
console.log(m1)   // [2, 4, 6] is printed

const m2 = t.map(value => '<li>' + value + '</li>')
console.log(m2)  
// [ '<li>1</li>', '<li>2</li>', '<li>3</li>' ] is printed

const a = [1, 2, 3, 4, 5]

const [first, second, ...rest] = a

console.log(first, second)  // 1 2 is printed
console.log(rest)          // [3, 4, 5] is printed