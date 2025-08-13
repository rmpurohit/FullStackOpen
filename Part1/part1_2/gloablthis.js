/*
As mentioned, the value of this in JavaScript is defined based on how the method is being called. 
When setTimeout is calling the method, 
it is the JavaScript engine that actually calls the method and, 
at that point, this refers to the global object.
*/
const arto = {
    name: 'Arto Hellas',
    greet: function() {
      console.log('hello, my name is ' + this.name)
    },
  }
  
  setTimeout(arto.greet, 1000)
  

  // preserving original this 
  setTimeout(arto.greet.bind(arto), 1000)