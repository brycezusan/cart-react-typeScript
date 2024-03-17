import Header from "./components/Header";
import Footer from "./components/Footer";
import Guitarra from "./components/Guitarra";
import useCart from "./hooks/useCart";

function App() {
  const {
    carrito,
    guitarras,
    isValid,
    cuentaTotal,
    agregarCarrito,
    vaciarCarrito,
    aumentarCantidad,
    disminuirCantidad,
    eliminarItem,
  } = useCart();

  return (
    <>
      <Header
        carrito={carrito}
        vaciarCarrito={vaciarCarrito}
        aumentarCantidad={aumentarCantidad}
        disminuirCantidad={disminuirCantidad}
        eliminarItem={eliminarItem}
        isValid={isValid}
        cuentaTotal={cuentaTotal}
      />
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {guitarras?.map((guitar) => (
            <Guitarra
              key={guitar.id}
              guitar = {guitar}
              agregarCarrito={agregarCarrito}
            />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;
