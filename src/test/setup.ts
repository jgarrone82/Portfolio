/// <reference types="vitest/globals" />
import '@testing-library/jest-dom'

// Mock IntersectionObserver — not available in jsdom
const mockIntersectionObserver = vi.fn()
mockIntersectionObserver.mockReturnValue({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
})
global.IntersectionObserver = mockIntersectionObserver

// Mock ResizeObserver — not available in jsdom
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))
