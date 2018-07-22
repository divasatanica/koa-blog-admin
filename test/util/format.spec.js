import {isEmptyStr, isMail, isUserName} from '../../src/util/format'

describe('util.format.isEmptyStr', function () {
  it('should return false', function () {
    expect(isEmptyStr('coma')).to.be.equal(false)
    expect(isEmptyStr('co ma')).to.be.equal(false)
    expect(isEmptyStr(' ')).to.be.equal(false)
  })
  it('should return true while empty', function () {
    expect(isEmptyStr('')).to.be.equal(true)
  })
  it('shoud return true while the input ain\'t string type', function () {
    expect(isEmptyStr(0)).to.be.equal(true)
    expect(isEmptyStr(12)).to.be.equal(true)
    expect(isEmptyStr([])).to.be.equal(true)
    expect(isEmptyStr({})).to.be.equal(true)
    expect(isEmptyStr(undefined)).to.be.equal(true)
    expect(isEmptyStr(null)).to.be.equal(true)
    expect(isEmptyStr(NaN)).to.be.equal(true)
  })
})

describe('util.format.isMail', function () {
  it('should return true', function () {
    expect(isMail('jayhebes@vip.qq.com')).to.be.equal(true)
    expect(isMail('541199811@vip.qq.com')).to.be.equal(true)
    expect(isMail('coma-desperado@gmail.com')).to.be.equal(true)
  })
  it('should return false while the input ain\'t legal mail', function () {
    expect(isMail('jayhebescom')).to.be.equal(false)
    expect(isMail('541.qq.com')).to.be.equal(false)
    expect(isMail('')).to.be.equal(false)
    expect(isMail(' ')).to.be.equal(false)
    expect(isMail('54119@9811@vip.qq.com')).to.be.equal(false) 
  })
  it('should return false while the input ain\'t string type', function () {
    expect(isMail(123)).to.be.equal(false)
    expect(isMail([])).to.be.equal(false)
    expect(isMail({})).to.be.equal(false)
    expect(isMail(null)).to.be.equal(false)
    expect(isMail(undefined)).to.be.equal(false)
    expect(isMail(null)).to.be.equal(false)
    expect(isMail(NaN)).to.be.equal(false)
  })
})

describe('util.format.isUsername', function () {
  it('should return true', function () {
    expect(isUserName('a__1002')).to.be.equal(true)
    expect(isUserName('a__10021da')).to.be.equal(true)
    expect(isUserName('aafs002')).to.be.equal(true)
  })
  it('should return false while the input is empty', function () {
    expect(isUserName('')).to.be.equal(false)
    expect(isUserName(' ')).to.be.equal(false)
  })
  it('should return false while the input is too long', function () {
    expect(isUserName('afasfafafafafasfasfasfafaf=15151')).to.be.equal(false)
    expect(isUserName('afasfafafafafasfasfasfasf%$##afaf=15151')).to.be.equal(false)
  })
  it('should return false while the input contents illegal character', function () {
    expect(isUserName('afasfaffa$!$!')).to.be.equal(false)
    expect(isUserName('1234sfaff')).to.be.equal(false)
  })
  it('should return false while the input ain\'t string type', function () {
    expect(isUserName(null)).to.be.equal(false)
    expect(isUserName(undefined)).to.be.equal(false)
    expect(isUserName(NaN)).to.be.equal(false)
  })
})