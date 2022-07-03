//0! >> 1
//1! >> 1
//2! >> 2 * 1! >> 2*1 
//3! >> 3 * 2! >> 3*2* 1
//4! >> 4 * 3! >> 4*3*2*1
//5! >> 5 * 4! >> 5*4*3*2*1 
//6! >> 6 * 5! >> 6*5*4*3*2*1

function factorial(num) {
    let fact = 1;
    if (num === 0 || num === 1) {
        return fact;
    } else {
        // while (num > 1) {
        //     // fact = num * (num - 1);
        //     // num--;
        //     fact *= num;
        //     num = num - 1;
        // }
        // return fact;
        return num * factorial(num - 1);
    }
}

console.log(factorial(5));