"use client";

import { useState, useEffect } from "react";
/* import { useEffect } from "react"; */
import { HiOutlineLockClosed, HiOutlineMail } from "react-icons/hi";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useRouter } from "next/navigation";
import { login } from "../../services/authService";

import LoginButton from "./(loginComponents)/LoginButton"
import LoginInput from "./(loginComponents)/LoginInput";
import CloseButton from "./(loginComponents)/CloseButton";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/home");
    }
  }, []);
  
  const handleGoogleLogin = () => {
    alert("Login com Google");
  };

  const handleFacebookLogin = () => {
    alert("Login com Facebook");
  };

  const handleSubmit = async () => {
    setError("");

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!email.match(emailPattern)) {
      setError("Por favor, insira um email válido.");
      toast.error("Por favor, insira um email válido.");
      return;
    }

    if (password.length < 6) {
      toast.error("A senha precisa ter pelo menos 6 caracteres.");
      return;
    }

    try {
      const { token, data } = await login({ email, password });
      localStorage.setItem("token", token);
      toast.success('Login Feito com sucesso.')
      router.push("/home");
    } catch (error) {
      toast.error("Login falhou. Verifique as credenciais.");
      setError("Login falhou. Verifique as credenciais.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <ToastContainer />
      <div className="bg-red rounded-2xl shadow-lg p-6 w-96">
        <CloseButton onClose={() => alert("Deseja fechar ?")} />
        <h2 className="text-red-500 font-bold text-center pb-3 mb-1 text-lg">Entre ou cadastrar-se</h2>
        <div className="flex-1 border-t p-1 w-90 border-gray-300"></div>
        <p className="text-gray-700 font-semibold text-md mt-1">Bem-vindo ao Achei!</p>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        <LoginInput
          type="email"
          placeholder="manuel@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          Icon={HiOutlineMail}
        />

        <LoginInput
          type="password"
          placeholder="**********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          Icon={HiOutlineLockClosed}
        />

        <p className="text-right text-sm text-gray-500 mt-2 cursor-pointer">Esqueci a minha palavra-passe</p>

        <button
          onClick={handleSubmit}
          className="w-full bg-red-500 text-white py-2 rounded-lg mt-4 font-semibold cursor-pointer hover:bg-red-600"
        >
          Entrar
        </button>

        <p className="text-left text-sm text-gray-500 mt-2">
          Novo usuário? <span className="text-red-500 font-bold cursor-pointer">Cadastre-se</span>
        </p>

        <div className="flex items-center my-4">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="mx-4 text-gray-500">ou</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        <LoginButton text="Continuar com o Google" icon={FaGoogle} onClick={handleGoogleLogin} />
        <LoginButton text="Continuar com o Facebook" icon={FaFacebook} onClick={handleFacebookLogin} />
      </div>
    </div>
  );
}
