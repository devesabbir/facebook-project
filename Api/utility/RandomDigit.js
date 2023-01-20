/**
 * Random Digit Generator
 * @param {*} digit 
 * @returns 
 */

export const RandomDigit = (digit)  => {
    return 'FB-' + Math.random().toString().substring(2,digit+2)
}




           
  