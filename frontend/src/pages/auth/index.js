import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authState } from "@/recoil/atom";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { toast } from "sonner";

const LoginPage = () => {
  const [auth, setAuth] = useRecoilState(authState);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (auth.isAuthenticated) {
      router.push("/");
    }
  }, [auth]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        email,
        name,
      })
      .then((res) => {
        if (res.data.user) {
          localStorage.setItem("user", JSON.stringify(res.data.user));
          setAuth({
            isAuthenticated: true,
            user: res.data.user,
          });
        }
        toast.success("Logged in successfully!");
        router.push("/");
      })
      .catch((res) => {
        toast.error(res.response.data, {
          description: "Error logging in. Please try valid credentials.",
        });
      });
  };

  return (
    <div className="flex items-center justify-center py-52 bg-gray-100">
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Enter details to use the Task Management.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="mb-4">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={handleNameChange}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign In
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default LoginPage;
