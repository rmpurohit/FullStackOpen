const object1 = {
    name: 'Arto Hellas',
    age: 35,
    education: 'PhD',
  }
  
  const object2 = {
    name: 'Full Stack web application development',
    level: 'intermediate studies',
    size: 5,
  }
  
  const object3 = {
    name: {
      first: 'Dan',
      last: 'Abramov',
    },
    grades: [2, 3, 5, 3],
    department: 'Stanford University',
  }

  console.log("obj1 =======> ",object1)
  console.log("obj2 =======> ",object2)
  console.log("obj3 =======> ",object3)

console.log(object1.name)         // Arto Hellas is printed
const fieldName = 'age'
console.log(object1[fieldName])    // 35 is printed

object1.address = 'Helsinki'
object1['secret number'] = 12341

console.log(object1.address)
console.log(object1['secret number'])