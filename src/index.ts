import { sha256, hashToPoint, ptToHex, randomBytes32, ecExponent, ecInverse } from './utils'

// const USER_KEY = 'da84824fe6f7d66bccc6fd25115d6a9ff31f3fbf4d13233ea5615aec4d376b09';
const SERVER_KEY = '3f00799a9dc52245ed89be9a9ae817acae7c1131e624b23ea60f8d5cbd856c91';


const createShard = (password: string) => {
  const hashpw = sha256(password)
  const point = hashToPoint(hashpw)

  const rand = randomBytes32()
  const randInv = ecInverse(rand)

  const alpha = ecExponent(ptToHex(point), rand)
  const resp = serverTransform(ptToHex(alpha))

  const beta = ecExponent(resp, randInv.toString('hex'))
  const rw = sha256(hashpw.concat(ptToHex(beta)))
  return rw
}

const serverTransform = (alpha: string): string => {
  const beta = ecExponent(alpha, SERVER_KEY)
  return ptToHex(beta)
}

console.log(createShard('password'))
