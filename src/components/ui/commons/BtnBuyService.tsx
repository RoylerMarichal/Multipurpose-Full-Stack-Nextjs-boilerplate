import { currentUser } from "@clerk/nextjs";
import Link from "next/link";

async function BtnBuyService() {
  const user = await currentUser();
 

  return (
    <div className="flex space-x-3">
      <Link
        href="home/services/buy-service"
        className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-primary shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        Contratar ahora
      </Link>

      <Link
        href={user ? "/home" : "https://accounts.hostingclan.com/sign-up"}
        className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-gray-100 shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        Acceder a mi cuenta
      </Link>
    </div>
  );
}

export default BtnBuyService;
