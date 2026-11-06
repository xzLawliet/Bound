import { describe, it, expect } from 'vitest'
import { ARCHITECTURE_COPY } from './App'
import { CONTRACT_ID, EXPLORER_URL, nearToYocto, yoctoToNear, formatNear } from './near'

describe('active account target', () => {
  it('names the xzlawliet guardian exactly', () => {
    expect(CONTRACT_ID).toBe('guardian.xzlawliet.testnet')
    expect(EXPLORER_URL).toBe(
      'https://explorer.testnet.near.org/accounts/guardian.xzlawliet.testnet',
    )
  })
})

describe('yocto helpers', () => {
  it('converts NEAR to yocto', () => {
    expect(nearToYocto(0.1)).toBe('100000000000000000000000')
    expect(nearToYocto(0.25)).toBe('250000000000000000000000')
    expect(nearToYocto(0.3)).toBe('300000000000000000000000')
    expect(nearToYocto(1)).toBe('1000000000000000000000000')
    expect(nearToYocto('0.1')).toBe('100000000000000000000000')
    expect(nearToYocto('0.000000000000000000000001')).toBe('1')
    expect(nearToYocto('1.000000000000000000000000')).toBe('1000000000000000000000000')
  })

  it('rejects values that would round or change sign', () => {
    expect(() => nearToYocto('-0.1')).toThrow(/decimal/)
    expect(() => nearToYocto('1.2.3')).toThrow(/decimal/)
    expect(() => nearToYocto('1e-7')).toThrow(/decimal/)
    expect(() => nearToYocto('0.1000000000000000000000001')).toThrow(/24/)
    expect(() => nearToYocto(0.0000001)).toThrow(/decimal string/)
    expect(nearToYocto('0.30000000000000004')).not.toBe(nearToYocto('0.3'))
  })

  it('converts yocto to NEAR display without rounding up', () => {
    expect(yoctoToNear('250000000000000000000000')).toBe('0.25')
    expect(yoctoToNear('500000000000000000000000')).toBe('0.5')
    expect(formatNear('100000000000000000000000')).toBe('0.1 Ⓝ')
    expect(formatNear('250000000000000000000000')).toBe('0.25 Ⓝ')
    expect(formatNear('500000000000000000000000')).toBe('0.5 Ⓝ')
    expect(formatNear('0')).toBe('0 Ⓝ')
    expect(yoctoToNear('1', 4)).toBe('0')
    expect(yoctoToNear('90000000000000000000', 4)).toBe('0')
    expect(yoctoToNear('1', 24)).toBe('0.000000000000000000000001')
  })

  it('shows a positive amount below 0.0001 NEAR in full', () => {
    expect(formatNear('1')).toBe('0.000000000000000000000001 Ⓝ')
    expect(formatNear('90000000000000000000')).toBe('0.00009 Ⓝ')
    expect(formatNear('10000000000000000000')).toBe('0.00001 Ⓝ')
  })
})

describe('public claim copy', () => {
  it('keeps the active guardian and states the receiver whitelist', () => {
    expect(ARCHITECTURE_COPY.intro).toContain('guardian.xzlawliet.testnet')
    expect(ARCHITECTURE_COPY.intro).toContain('full-access key')
    expect(ARCHITECTURE_COPY.guardian).toContain('Any account may call spend')
    expect(ARCHITECTURE_COPY.vendor).toContain('names receivers')
    expect(ARCHITECTURE_COPY.vendor).not.toMatch(/owner withdraw/i)
    expect(ARCHITECTURE_COPY.agent).toContain('agent2.xzlawliet.testnet')
  })
})
