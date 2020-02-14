import crypto from 'crypto'
import elliptic from 'elliptic'
import BigNum from 'bn.js'

const CURVE = 'curve25519'
const ec = new elliptic.ec(CURVE)

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

export function ecInverse(key: string) {
  const privateKey = hexToBN(key);
  if(!ec.n) {
    throw new Error("Bad curve");
  }
  return privateKey.invm(ec.n);
}

export function ecExponent(gx: string, expo: string) {
  const pt = hashToPoint(gx)
  const exponent = hexToBN(expo);
  return pt.mul(exponent);
}

export function hashToPoint(hash: string) {
  return ec.keyFromPublic(hash).getPublic()
}

export default {
  sha256,
  randomBytes32,
  hexToBN,
  ptToHex,
  ecInverse,
  ecExponent,
  hashToPoint,
}
