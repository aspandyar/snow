import { describe, expect, it } from 'vitest'
import { Vector3 } from 'three'

describe('оснастка', () => {
  it('three загружается в тестовом окружении и считает длину вектора', () => {
    const вектор = new Vector3(3, 4, 0)
    expect(вектор.length()).toBe(5)
  })

  it('нормализация даёт единичную длину', () => {
    const вектор = new Vector3(3, 4, 0).normalize()
    expect(вектор.length()).toBeCloseTo(1, 12)
  })
})
