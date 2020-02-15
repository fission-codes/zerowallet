
import { sha256, hexToBN, randomBytes32, ecExponent, ecInverse } from './utils'

// const USER_KEY = 'da84824fe6f7d66bccc6fd25115d6a9ff31f3fbf4d13233ea5615aec4d376b09';
const SERVER_KEY = '3f00799a9dc52245ed89be9a9ae817acae7c1131e624b23ea60f8d5cbd856c91';

// const ecInverseTwo = (key: string) => {
//   var privateKey = BigInteger.fromHex(key)
//   var privateKeyInv = privateKey.modInverse(ecparams.n.toDERInteger());
//   return privateKeyInv.toString('hex');
// }


// const ecExponentTwo = (gx: string, expo: string) => {
//   var exponent = BigInteger.fromHex(expo);
//   var xpt = BigInteger.fromHex(gx);
//   var pt = ecparams.pointFromX(true,xpt as any);
//   var curvePt = pt.multiply(exponent);

//   return String(curvePt.affineX)
// }

// const rand = randomBytes32()
// const randInv = ecInverseTwo(rand)

// const test = ecExponentTwo(ecExponentTwo(SERVER_KEY, rand), randInv)

// console.log('input: ', SERVER_KEY)
// console.log('output: ', test)
// testThing()


function createShard(password: string) {
  const hashpw = '9b445f63f74e4704b0241a1bf236a10031f673b5f919f64319ec62ffb6b63baf'

  const rand = randomBytes32()
  const randInv = ecInverse(rand)


  const test = ecExponent(ecExponent(hashpw, rand), randInv)


  const alpha = ecExponent(hashpw, rand)
  const resp = serverTransform(alpha)

  const beta = ecExponent(resp, randInv)
  const rw = sha256(hashpw.concat(beta))
  console.log('hashpw: ', hashpw)
  console.log('hashpw.length: ', hashpw.length)
  console.log('test: ', test)
  console.log('rand: ', rand)
  console.log('randInv: ', randInv)
  console.log('alpha: ', alpha)
  console.log('beta: ', beta)
  console.log('rw: ', rw)
  return rw
}

function serverTransform(alpha: string): string {
  return ecExponent(alpha, SERVER_KEY)
  // return ptToHex(beta)
}

createShard('password')
