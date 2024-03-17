import { CartItem } from "../types";
import Item from "./Item";

type HeaderProps={
  carrito:CartItem[],
  vaciarCarrito: ()=>void,
  aumentarCantidad:(id:number)=>void
  disminuirCantidad:(id:number)=>void
  eliminarItem:(id:number)=>void
  isValid:boolean,
  cuentaTotal:number
}

export default function Header({
  carrito,
  vaciarCarrito,
  aumentarCantidad,
  disminuirCantidad,
  eliminarItem,
  isValid, 
  cuentaTotal
}:HeaderProps) {

  return (
    <header className="py-5 header">
      <div className="container-xl">
        <div className="row justify-content-center justify-content-md-between">
          <div className="col-8 col-md-3">
            <a href="index.html">
              <img
                className="img-fluid"
                src="/img/logo.svg"
                alt="imagen logo"
              />
            </a>
          </div>
          <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
            <div className="carrito">
              <img
                className="img-fluid"
                src="/img/carrito.png"
                alt="imagen carrito"
              />

              <div id="carrito" className="bg-white p-3">
                {!isValid ? (
                  <p className="text-center">El carrito esta vacio</p>
                ) : (
                  <>
                    <table className="w-100 table">
                      <thead>
                        <tr>
                          <th>Imagen</th>
                          <th>Nombre</th>
                          <th>Precio</th>
                          <th>Cantidad</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {carrito?.map((cart) => (
                          <Item
                            key={cart.id}
                            cart={cart}
                            aumentarCantidad={aumentarCantidad}
                            disminuirCantidad={disminuirCantidad}
                            eliminarItem={eliminarItem}
                          />
                        ))}
                      </tbody>
                    </table>
                    <p className="text-end">
                      Total pagar: <span className="fw-bold">${cuentaTotal}</span>
                    </p>
                    <button
                      onClick={vaciarCarrito}
                      className="btn btn-dark w-100 mt-3 p-2"
                    >
                      Vaciar Carrito
                    </button>
                  </>
                )}
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
