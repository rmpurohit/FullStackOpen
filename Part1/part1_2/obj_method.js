const arto = {
    name: 'Arto Hellas',
    age: 35,
    education: 'PhD',
    greet: function() {
      console.log('hello, my name is ' + this.name)
    },
  }
  
  arto.greet()  // "hello, my name is Arto Hellas" gets printed