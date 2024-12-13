import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useShoppingCart } from "../../hooks";
import { TrashIcon } from "../icons";
import EmptyShoppingCart from "./empty-shopping-cart";

export default function ShoppingCart() {
  const { products, removeProduct, totalAmount, clearShoppingCart } =
    useShoppingCart();
  const navigate = useNavigate(); // Hook para navegar a otras rutas
  const apiUrlUSERNAME = import.meta.env.VITE_APP_API_URL_USERNAME;
  const [user, setUser] = useState({});
  const params = new URLSearchParams(window.location.search);
  
  const role = params.get("role");
  const token = params.get("token");
  const username = params.get("username");
        useEffect(() => {
      if (token && username) {
      fetchUserName();
    }
      }, [role, token, username]);

      const fetchUserName = async () => {
    try {
      const response = await fetch(`${apiUrlUSERNAME}?username=${username}`);
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        setUser(data[0]);
      } else {
        setUser({});
      }
    } catch (error) {
      console.error("Error al obtener la información del usuario", error);
    }
  };


  if (products.length === 0) return <EmptyShoppingCart />;
  return (
    <div className="bg-white p-4 rounded-lg border shadow-lg">
      {/* Productos en el carrito */}
      <div className="grid gap-y-3 py-3">
        {products.map((product) => (
          <div
            key={product.product_id}
            className="flex gap-x-4 items-center"
          >
            <img src={product.image_url} alt={product.name} className="w-12" />
            <h5 className="w-32 text-ellipsis truncate font-medium">
              {product.name}
            </h5>
            <span className="text-sm">
              {product.quantity} x ${product.price.toFixed(2)}
            </span>
            <span className="ml-auto font-bold">
              $ {(product.quantity * product.price).toFixed(2)}
            </span>
            <div>
              <button
                className="bg-red-600 hover:bg-red-800 text-white hover:text-slate-200 rounded-full p-2"
                onClick={() => removeProduct(product.product_id)}
              >
                <TrashIcon />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="flex justify-between pt-2 border-t">
        <span className="font-medium text-xl">Total:</span>
        <span className="font-medium text-xl">$ {totalAmount.toFixed(2)}</span>
      </div>

      {/* Botones */}
      <button
        className="w-full bg-black text-white px-4 py-2 mt-2 rounded-lg hover:bg-red-600"
        onClick={clearShoppingCart}
      >
        Vaciar carrito
      </button>

      <button
        className="w-full bg-black text-white px-4 py-2 mt-2 rounded-lg"
        onClick={() => navigate("/cart", { state: { products, totalAmount } })}
      >
        Ver Carrito
      </button>
    </div>
  );
}
