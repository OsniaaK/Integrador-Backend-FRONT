import style from "./styledCart.module.css";
import useCart from "../../context/useCart";
import { useLocation } from "react-router";
import { useEffect, useRef } from "react";
export const CartGeneral = ({ cartButtonRef }) => {
  const cartRef = useRef(null);
  const { open, toggle, items, remove, addQuantity, reduceQuantity, clear } =
    useCart();
  const { pathname } = useLocation();
  useEffect(() => {
    if (open) return toggle();
  }, [pathname]);

  const delAll = (e) => {
    e.preventDefault();
    clear();
    setTimeout(() => {
      toggle();
    }, 700);
  };

  const deleteItem = (item) => {
    if (item.cantidad == 1) {
      remove(item);
    } else {
      reduceQuantity(item);
    }
  };
  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event) => {
      if (
        cartRef.current &&
        !cartRef.current.contains(event.target) &&
        cartButtonRef.current &&
        !cartButtonRef.current.contains(event.target)
      ) {
        toggle();
      }
    };

    document.body.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.body.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, toggle, cartButtonRef]);

  useEffect(() => {
    if (open) {
      document.body.classList.add("body-blur");
    } else {
      document.body.classList.remove("body-blur");
    }
    return () => document.body.classList.remove("body-blur");
  }, [open]);

  const totalPrice = items
    .reduce((acc, item) => {
      const hasDiscount = !!item.discount;
      const price = hasDiscount
        ? item.price * (1 - item.discount / 100)
        : item.price;
      return acc + price * item.cantidad;
    }, 0)
    .toFixed(2);

  return (
    <section
      ref={cartRef}
      id={style.cartMenu}
      className={`${open ? style.active : ""}`}
    >
      <h2>Tu carrito 😎</h2>
      {items.length == 0 ? (
        <p>El carrito está vacío :(</p>
      ) : (
        <>
          <button onClick={delAll} id={style.clearAll}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 6h18" />
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
              <line x1="10" x2="10" y1="11" y2="17" />
              <line x1="14" x2="14" y1="11" y2="17" />
            </svg>
            <small>Borrar Todo</small>
          </button>
          <ul>
            {items.map((item) => (
              <li key={item.id}>
                <picture>
                  <img src={item.image} alt="Producto 1" />
                </picture>
                <article>
                  <span>
                    <h3>{item.title}</h3>
                    <p>
                      <span
                        style={
                          item.discount
                            ? { textDecoration: "line-through" }
                            : {}
                        }
                      >
                        ${item.price}
                      </span>
                      {item.discount && (
                        <strong style={{ marginLeft: 8 }}>
                          ${(item.price * (1 - item.discount / 100)).toFixed(2)}
                        </strong>
                      )}
                    </p>
                  </span>
                  <form action="">
                    <button type="button" onClick={() => deleteItem(item)}>
                      -
                    </button>
                    <span>{item.cantidad}</span>
                    <button type="button" onClick={() => addQuantity(item)}>
                      +
                    </button>
                  </form>
                </article>
              </li>
            ))}
          </ul>
          <article>
            <h3>
              Total: <span>${totalPrice}</span>
            </h3>
            <button onClick={delAll} id={style.checkout}>
              Proceder al pago
            </button>
          </article>
        </>
      )}
    </section>
  );
};
