let isPhoneNumberReg = /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/

export function isPhoneNumber(phoneNumber:string){
  return isPhoneNumberReg.test(phoneNumber)
}