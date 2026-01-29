import { describe, test, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ParamEditor } from './App'

describe('ParamEditor Component', () => {
  const testParams = [
    { id: 1, name: 'Назначение', type: 'string' as const },
    { id: 2, name: 'Длина', type: 'string' as const },
  ]

  const testModel = {
    paramValues: [
      { paramId: 1, value: 'Повседневное' },
      { paramId: 2, value: 'Макси' },
    ],
    colors: [
      { id: 1, name: 'Красный' },
      { id: 2, name: 'Синий' },
    ],
  }

  // Тест 1: Отображение полей по params
  test('отображает все поля по переданным params', () => {
    render(<ParamEditor params={testParams} model={testModel} />)
    
    expect(screen.getByText('Назначение')).toBeInTheDocument()
    expect(screen.getByText('Длина')).toBeInTheDocument()
    
    const inputs = screen.getAllByRole('textbox')
    expect(inputs).toHaveLength(2)
  })

  // Тест 2: Корректная инициализация из model.paramValues
  test('инициализирует значения из model.paramValues', () => {
    render(<ParamEditor params={testParams} model={testModel} />)
    
    const inputs = screen.getAllByRole('textbox') as HTMLInputElement[]
    expect(inputs[0].value).toBe('Повседневное')
    expect(inputs[1].value).toBe('Макси')
  })

  // Тест 3: Редактирование значений
  test('позволяет редактировать значения', () => {
    render(<ParamEditor params={testParams} model={testModel} />)
    
    const firstInput = screen.getAllByRole('textbox')[0]
    fireEvent.change(firstInput, { target: { value: 'вечернее' } })
    
    expect(firstInput).toHaveValue('вечернее')
  })
})