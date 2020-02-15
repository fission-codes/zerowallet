import crypto from 'crypto'
import elliptic from 'elliptic'
import BigNum from 'bn.js'

const CURVE = 'secp256k1'
const ec = new elliptic.ec(CURVE)

// const keypair = ec.genKeyPair()
// const pub = keypair.getPublic().getX().toString('hex')
// console.log('public: ', pub)
// const decoded = ec.curve.pointFromX(pub)
// console.log('decoded: ', decoded)

export function sha256(str: string): string {
  return crypto.createHash('sha256').update(str).digest('hex');
}

export function randomBytes32(): string {
  const rand = elliptic.rand(32)
  return elliptic.utils.toHex(rand)
}

export function hexToBN(hex: string) {
  return new BigNum(hex, 16);
}

export function ptToHex(pt: any){
  return pt.getX().toString('hex')
}

export function hexToPt(hash: string) {
  return ec.curve.pointFromX(hash, 'hex')
}

export function ecInverse(key: string): string {
  const privateKey = hexToBN(key)
  if(!ec.n) {
    throw new Error("Bad curve");
  }
  return privateKey.invm(ec.curve.n).toString('hex');
}

export function ecExponent(hexPt: string, expo: string) {
  const pt = hexToPt(hexPt)
  const exponent = hexToBN(expo);
  const val = pt.mul(exponent)
  return ptToHex(val)
}

// export function testThing() {
//   const value = randomBytes32()
//   const valueBN = hexToBN(value)
//   const rand = randomBytes32()
//   const randInv = ecInverse(rand)
//   const randBN = hexToBN(rand)
//   const randInvBN = hexToBN(randInv)

//   const result = valueBN.mul(randBN).mod(ec.curve.n).mul(randInvBN).mod(ec.curve.n)
//   console.log('value: ', value)
//   console.log("RESULT: ", result.toString('hex'))
// }

export default {
  sha256,
  randomBytes32,
  hexToBN,
  ptToHex,
  ecInverse,
  ecExponent,
  hexToPt,
}
