export function addToCart(cart, item, qty) {
  const qtyNum = Number(qty) || 1;
  const existingItem = cart.find((x) => x.id === item.id);
  if (existingItem) {
    return cart.map((x) => x.id === item.id ? { ...x, qty: x.qty + qtyNum } : x);
  }
  return [...cart, { ...item, qty: qtyNum }];
}

export function removeFromCart(cart, indexToRemove) {
  return cart.filter((_, index) => index !== indexToRemove);
}

export function increaseCartQty(cart, index) {
  return cart.map((item, i) => i === index ? { ...item, qty: item.qty + 1 } : item);
}

export function decreaseCartQty(cart, index) {
  return cart.map((item, i) => i === index ? { ...item, qty: item.qty - 1 } : item);
}
