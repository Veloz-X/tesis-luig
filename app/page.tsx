"use client";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SendHorizonal } from "lucide-react";
import Image from "next/image";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LoginButton } from "@/components/auth/login-button";
import { TabsLogin } from "@/components/tabs-login";

export default function Home() {
  const { data: session, status } = useSession();
  const [errors, setErrors] = useState<string[]>([]);
  const [email, setEmail] = useState<string>("usuario.luigi@gmail.com");
  const [password, setPassword] = useState<string>("Abc123");
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors([]);

    const responseNextAuth = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (responseNextAuth?.error) {
      setErrors(responseNextAuth.error.split(","));
      return;
    }
    console.log(responseNextAuth)

    // router.push("/admin");

  };
  return (
    <div className="flex flex-col items-center justify-center h-screen">

      <SpeedInsights />

      <div className="mb-4">
        <Image src="/ups-logo.png" width={200} height={150} alt="ups-logo" />
      </div>

      <div className="text-center my-4 text-2xl font-bold w-1/2 mx-auto flex ">
          ANÁLISIS DE TÉCNICAS Y ESTRATEGIAS DE SEGURIDAD EN DISPOSITIVOS IOT
          PARA PROTEGER LOS DATOS TRANSMITIDOS
      </div>
      <div>
        <TabsLogin />
        <div className="text-center py-4 font-semibold">
            <div className="text-sm">Ing. Luigi Emanuel Bohorquez Reyes</div>
            <div className="text-sm">Ing. Kristy Johely Alcivar Alvarado</div>
          </div>
      </div>

      {errors.length > 0 && (
        <div className="hidden">
          {errors.map((error) =>
            toast.error(`Error`, {
              action: {
                label: "Cerrar",
                onClick: () => console.log("Cerrar"),
              },
              description: `${error}`,
            })
          )}
        </div>
      )}
    </div>
  );
}
