// mongo.js
const mongoose = require('mongoose');

const args = process.argv;

// Usage help
if (args.length < 3) {
  console.log('Usage:');
  console.log('  node mongo.js <password>                 # list all');
  console.log('  node mongo.js <password> <name> <number> # add entry');
  process.exit(1);
}

const password = args[2];
const name = args[3];
const number = args[4];

// 👉 Replace <your-cluster-url> and <your-db-name> with your Atlas details.
// Example cluster host often looks like: cluster0.abcde.mongodb.net
const url = `mongodb+srv://fullstackopen:${password}@cluster0.6ajlvxz.mongodb.net/phoneAPP?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set('strictQuery', false);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

(async () => {
  try {
    await mongoose.connect(url);

    // If only password -> list all
    if (args.length === 3) {
      const people = await Person.find({});
      console.log('phonebook:');
      people.forEach(p => {
        console.log(`${p.name} ${p.number}`);
      });
    }
    // If password + name + number -> add entry
    else if (args.length === 5) {
      const person = new Person({ name, number });
      await person.save();
      console.log(`added ${name} number ${number} to phonebook`);
    }
    // Anything else -> usage
    else {
      console.log('Invalid arguments.');
      console.log('Usage:');
      console.log('  node mongo.js <password>');
      console.log('  node mongo.js <password> <name> <number>');
    }
  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    await mongoose.connection.close();
  }
})();
