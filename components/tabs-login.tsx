import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useState } from "react";
import { toast } from "sonner"
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export function TabsLogin() {
    const { data: session, status } = useSession();
    const [email, setEmail] = useState<string>("usuario.luigi@gmail.com");
    const [password, setPassword] = useState<string>("Abc1");
    const [code, setCode] = useState<string>("");
    const [tabsValue, setTabsValue] = useState<string>("check");
    const [errors, setErrors] = useState<string[]>([]);
    const router = useRouter();

    const [formverifyEmail, setFormVerifyEmail] = useState({ email: "" });

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormVerifyEmail({ ...formverifyEmail, email: event.target.value });
    };

    const verificationEmail = async () => {
        try {
            toast.loading("Cargando...");
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/verifyEmail`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(formverifyEmail),
            });
            if (!res.ok) {
                const errorData = await res.json();
                toast.error("Error", { description: errorData.message || "El email no se verificó correctamente" });
            } else {
              const resrData = await res.json();
              console.log(resrData);
              toast.success("Email verificado", { description: "Se verificó el email correctamente" });
              setTabsValue("login");
            }
        } catch (error) {
            toast.error("Error", { description: error.message || "El email no se verificó correctamente" });
            console.error("Error al verificar el email:", error);
        }
    };

    const handleSubmit = async () => {
      setErrors([]);
  
      const responseNextAuth = await signIn("credentials", {
        email,
        password,
        code,
        redirect: false,
      });
  
      if (responseNextAuth?.error) {
        setErrors(responseNextAuth.error.split(","));
        return;
      }
      console.log(responseNextAuth)
  
      router.push("/admin");
  
    };


  return (
    <Tabs value={tabsValue} className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="check">Verificar</TabsTrigger>
        <TabsTrigger value="login">Inicia sesión</TabsTrigger>
      </TabsList>
      <TabsContent value="check">
        <Card>
          <CardHeader>
            <CardTitle>Verificar</CardTitle>
            <CardDescription>
              Ingresar el correo electrónico para verificar si existe en la base de datos
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="email">Correo</Label>
              <Input id="email" defaultValue={email} onChange={handleEmailChange}/>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={verificationEmail}>Verificar</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="login">
        <Card>
          <CardHeader>
            <CardTitle>Inicia sesión</CardTitle>
            <CardDescription>
              Ingresar el correo electrónico, la contraseña y codigo de verificación
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="login-email">Email</Label>
              <Input disabled id="login-email" type="text" value={email} onChange={(event) => setEmail(event.target.value)}/>
            </div>
            <div className="space-y-1">
              <Label htmlFor="login-password">Contraseña</Label>
              <Input id="login-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)}/>
            </div>
            <div className="space-y-1">
              <Label htmlFor="login-code">Código de verificación</Label>
              <Input id="login-code" type="text" value={code} onChange={(event) => setCode(event.target.value)}/>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSubmit}>Inicia sesión</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
