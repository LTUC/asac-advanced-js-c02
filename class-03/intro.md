- data structures is not database

time space

big O

big O growth order "the lowest the better"

O(1) constant
O(log n) logarithmic
O(n) linear
O(n log n) linearithmic
O(n^2) quadratic
O(n^3) cubic
O(2^n) exponential
O(n!) factorial

examples

O(1):
the time taken is independent of the amount of data
let arr = [1,2,3,5,6,8,9,20];
let arr = [1,2,3,5,6,8,9,20,................];
arr[3];//>>> 5 O(1)
reading from an array
reading from an object
stack(push,pop)
queue(enqueue,dequeue)

O(log n):
binary search
let arr= [1,2,4,6,7,8,9,11,15,20,25,26,30,32,33,45]

search(45)
for(let i=0;i<arr.length,i++){
if (element === arr[i]){
console.log('yes')
}
}
14

binary search
1
1
1

O(n)
let arr = [1,2,4,6,7,8,9,11,15,20,25,26,30,32,33,45];
for(let i = 0 ; i<arr.length;i++){
console.log(arr[i]);
}

O(n log n)
merge sort ,quick sort

function nlogn(n){
let y=n;
while(n>1){ O(logn)
n= n/2;
for(let i = 0;i<=y;i++){ O(n)
console.log(i);
}
}
}
nlogn(20);

n 20 10 5
y 20
i 0
result 0 .... 20
result 0 .... 20

O(logn) \* O(n) ==> O(n logn)
