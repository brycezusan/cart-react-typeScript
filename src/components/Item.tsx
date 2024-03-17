import type {CartItem} from "../types/index"

type ItemProps ={
  cart:CartItem,
  disminuirCantidad:(id:number)=>void
  aumentarCantidad:(id:number)=>void
  eliminarItem:(id:number)=>void
}

export default function Item({ cart , disminuirCantidad , aumentarCantidad , eliminarItem} :ItemProps) {
  const {image , name , price , cantidad , id} = cart
  return (
    <tr>
      <td>
        <img
          className="img-fluid"
          src={`/img/${image}.jpg`}
          alt="imagen guitarra"
        />
      </td>
      <td>{name}</td>
      <td className="fw-bold">${price}</td>
      <td className="flex align-items-start gap-4">
        <button  
          onClick={()=>disminuirCantidad(id)}
          type="button" className="btn btn-dark">
          -
        </button>
        {cantidad}
        <button 
          onClick={()=>aumentarCantidad(id)}
          type="button" className="btn btn-dark">
          +
        </button>
      </td>
      <td>
        <button 
        onClick={()=>eliminarItem(id)}
        className="btn btn-danger" type="button">
          X
        </button>
      </td>
    </tr>
  );
}
