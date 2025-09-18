import { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react";

const Cart = createContext(null);

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(
    () => JSON.parse(localStorage.getItem("cart")) || []
  );
  const [open, setOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const toggle = useCallback(() => setOpen(o => !o), []);

  const addItem = useCallback((product = {}) => {
    setItems(currentItems => {
      const itemInCart = currentItems.find(item => item.id === product.id);
      if (itemInCart) {
        return currentItems.map(item =>
          item.id === product.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }
      return [...currentItems, { ...product, cantidad: 1 }];
    });
  }, []);

  const remove = useCallback((current = {}) => {
    setItems(currentItems => currentItems.filter(item => item.id !== current.id));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const addQuantity = useCallback((product = {}) => {
    setItems(currentItems =>
      currentItems.map(item =>
        item.id === product.id
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      )
    );
  }, []);

  const reduceQuantity = useCallback((product = {}) => {
    setItems(currentItems =>
      currentItems
        .map(item => {
          if (item.id === product.id) {
            return { ...item, cantidad: item.cantidad - 1 };
          }
          return item;
        })
        .filter(item => item.cantidad > 0)
    );
  }, []);

  const value = useMemo(() => ({
    items,
    open,
    toggle,
    addItem,
    remove,
    clear,
    addQuantity,
    reduceQuantity,
  }), [items, open, toggle, addItem, remove, clear, addQuantity, reduceQuantity]);

  return (
    <Cart.Provider value={value}>
      {children}
    </Cart.Provider>
  );
};

const useCart = () => {
    const context = useContext(Cart);
    if (context === undefined) {
        throw new Error('useCart debe ser usado dentro de un CartProvider');
    }
    return context;
};

export default useCart;
