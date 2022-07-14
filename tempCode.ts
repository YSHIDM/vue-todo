const a = {
  a: [1,2,3,4],
  b: [5,6,7,8]
}
const aa = a.a
a.a[1] = 6
console.log('aa :>>', aa)
console.log(a.a)