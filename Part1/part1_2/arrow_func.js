const sum = (p1, p2) => {
    console.log(p1)
    console.log(p2)
    return p1 + p2
  }

console.log(sum(1,2))


const square = p => {
    console.log(p)
    return p * p
  }


console.log(square(4))

const cube = p => p * p * p

console.log(cube(3))

const t = [1, 2, 3]
const tSquared = t.map(p => p * p)
// tSquared is now [1, 4, 9]

console.log(tSquared)

