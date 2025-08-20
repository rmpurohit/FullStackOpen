const multiplicatorcli = (a: number, b: number, printText: string) => {
    console.log(printText,  a * b);
  }
  
  const a: number = Number(process.argv[2])
  const b: number = Number(process.argv[3])
  multiplicatorcli(a, b, `Multiplied ${a} and ${b}, the result is:`);