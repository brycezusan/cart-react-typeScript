import { useState, useEffect, useMemo } from "react";
import { db } from "../data/index";
import type { CartItem , Guitar , GuitarID } from "../types";

function useCart() {
  const initialCart = ():CartItem[] => {
    const storage = localStorage.getItem("cart");

    return storage ? JSON.parse(storage) : [];
  };

  const [guitarras] = useState(db);
  const [carrito, setCarrito] = useState(initialCart);

  const MAX_VALUE = 5;
  const MIN_VALUE = 1;

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(carrito));
  }, [carrito]);

  const isValid = carrito.length > 0;

  const cuentaTotal = useMemo(()=>carrito.reduce((acum , valor)=> acum + (valor.price * valor.cantidad),0),[carrito])

  const agregarCarrito = (objeto:Guitar) => {
    const { id } = objeto;
    const agregado = carrito.find((cart) => cart.id === id);

    if (agregado) {
      //actualizamos la cantidad
      const newCarrito = carrito.map((car) => {
        if (car.id === id) {
          car.cantidad++;
        }
        return car;
      });

      setCarrito(newCarrito);
    } else {
      const newItem : CartItem = {...objeto , cantidad:1}
      setCarrito((prevState) => [...prevState, newItem]);
    }

  };

  const vaciarCarrito = () => setCarrito([]);

  const aumentarCantidad = (id:GuitarID) => {
    const index = carrito.findIndex((cart) => cart.id === id);
    const newCart = [...carrito];
    if (index >= 0) {
      if (newCart[index].cantidad < MAX_VALUE) {
        newCart[index].cantidad++;
      }
    }
    setCarrito(newCart);
  };

  const disminuirCantidad = (id:GuitarID) => {
    const newCarrito = carrito.map((cart) => {
      if (cart.id === id && cart.cantidad > MIN_VALUE) {
        return {
          ...cart,
          cantidad: cart.cantidad - 1,
        };
      }
      return cart;
    });

    setCarrito(newCarrito);
  };

  const eliminarItem = (id:GuitarID) => {
    const newCarrito = carrito.filter((cart) => cart.id !== id);
    setCarrito(newCarrito);
  };

  return {
    carrito,
    guitarras,
    isValid,
    cuentaTotal,
    agregarCarrito,
    vaciarCarrito,
    aumentarCantidad,
    disminuirCantidad,
    eliminarItem,
  };
}

export default useCart;
