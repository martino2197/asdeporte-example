import { NextPage } from "next";
import { useSession, signIn, signOut } from "next-auth/react";

const HomePage: NextPage = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Cargando...</p>;
  }

  if (session) {
    return (
      <div>
        <h1>Bienvenido, {session.user?.name || session.user?.email}!</h1>
        <button onClick={() => signOut()}>Cerrar sesión</button>
      </div>
    );
  }

  return (
    <div>
      <h1>No estás autenticado</h1>
      {/* Ejemplo: puedes especificar el proveedor (google, github, etc.) */}
      <button onClick={() => signIn("google")}>
        Iniciar sesión con Google
      </button>
      {/* O dejarlo vacío para que NextAuth te muestre lista de proveedores */}
      {/* <button onClick={() => signIn()}>Iniciar sesión</button> */}
    </div>
  );
};

export default HomePage;
