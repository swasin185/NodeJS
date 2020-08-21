var a: number;     //  a[?]
var b: number;     //  a[?]    b[?]
var x: number;     //  a[?]    b[?]    x[?]

// ? == null, undefined

a = 1;              //  a[1]    b[?]    x[?]
b = 2;              //  a[1]    b[2]    x[?]

x = a;              //  a[1]    b[2]    x[1]
a = b;              //  a[2]    b[2]    x[1]
b = x;              //  a[2]    b[1]    x[1]

console.log(' a[', a, '] b[', b, '] x[', x, ']');







var A: Number;     //  A->?
var B: Number;     //  A->?    B->?
var X: Number;     //  A->?    B->?    X->?

A = new Number(1);  //  A->[1]    B->?      X->?
B = new Number(2);  //  A->[1]    B->[2]    X->?

X = A;              //  A->[1]<-X    B->[2]  
A = B;              //     [1]<-X    B->[2]<-A  
B = X;              //  B->[1]<-X       [2]<-A

console.log(' A->', A, ' B->', B, '<-X');