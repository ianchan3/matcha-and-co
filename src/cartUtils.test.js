import { describe, it, expect } from 'vitest';
import { addToCart, removeFromCart, increaseCartQty, decreaseCartQty } from './cartUtils';

const item1 = { id: '1', name: 'Matcha Latte', priceCents: 999 };
const item2 = { id: '2', name: 'Strawberry Matcha', priceCents: 999 };

describe('addToCart', () => {
  it('adds a new item', () => {
    const result = addToCart([], item1, 1);
    expect(result).toHaveLength(1);
    expect(result[0].qty).toBe(1);
  });

  it('merges qty for existing item', () => {
    const cart = [{ ...item1, qty: 2 }];
    const result = addToCart(cart, item1, 3);
    expect(result).toHaveLength(1);
    expect(result[0].qty).toBe(5);
  });

  it('adds a second distinct item', () => {
    const cart = [{ ...item1, qty: 1 }];
    const result = addToCart(cart, item2, 1);
    expect(result).toHaveLength(2);
  });
});

describe('removeFromCart', () => {
  it('removes item at index', () => {
    const cart = [{ ...item1, qty: 1 }, { ...item2, qty: 1 }];
    const result = removeFromCart(cart, 0);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('2');
  });
});

describe('increaseCartQty', () => {
  it('increases qty at index', () => {
    const cart = [{ ...item1, qty: 1 }];
    expect(increaseCartQty(cart, 0)[0].qty).toBe(2);
  });
});

describe('decreaseCartQty', () => {
  it('decreases qty at index', () => {
    const cart = [{ ...item1, qty: 3 }];
    expect(decreaseCartQty(cart, 0)[0].qty).toBe(2);
  });
});
