import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Custom404() {
  const router = useRouter();

  useEffect(() => {
    router.push("/");
  }, []);
  
  
  return (
    <div className="w-full flex flex-col items-center">
      <img className='rotateSide h-44 w-44 sm:h-88 sm:w-88 object-contain rounded-lg pt-2 lg:pt-7' src="https://media.giphy.com/media/Z7JC6ctdyu6iwOzIIj/giphy.gif" alt="crazy-paint" />
      <p className="font-semibold">
        Redirecting to home page...
      </p>
    </div>
    )
}