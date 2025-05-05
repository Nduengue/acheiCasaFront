"use client";

import { useState, useEffect } from "react";
import { HiOutlineLockClosed, HiOutlineMail } from "react-icons/hi";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

import { login } from "../../services/authService";
import LoginButton from "./(loginComponents)/LoginButton";
import LoginInput from "./(loginComponents)/LoginInput";
import CloseButton from "./(loginComponents)/CloseButton";
import LoginBar from './(loginComponents)/LoginBar';
import ButtonComponent from '@/app/(components)/Buttons/ButtonComponent';
import RegisterForm from "./../register/registerForm";

interface LoginFormProps {
  localState?: boolean;
  onClose?: () => void;
}

export default function LoginForm({ localState, onClose }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/home");
    } else {
      setLoading(false);
    }
  }, []);

  const handleSubmit = async () => {
    setError("");

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!email.match(emailPattern)) {
      toast.error("Por favor, insira um email válido.");
      return;
    }

    if (password.length < 6) {
      toast.error("A senha precisa ter pelo menos 6 caracteres.");
      return;
    }

    try {
      const { token } = await login({ email, password });
      localStorage.setItem("token", token);
      toast.success("Login Feito com sucesso.");
      router.push("/home");
    } catch {
      toast.error("Login falhou. Verifique as credenciais.");
    }
  };

  const closeForm = () => {
    if (localState) {
      router.push("/");
    } else {
      onClose?.();
    }
  };

  const openRegister = () => {
    setShowRegisterModal(true);
  };

  const closeRegister = () => {
    setShowRegisterModal(false);
  };

  if (loading) return null;

  return (
    <div className="relative">
      <ToastContainer />
      <div className="bg-white shadow-lg rounded-2xl p-6 w-96 z-10 relative">
        <CloseButton onClose={closeForm} />
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
        <ButtonComponent text="Entrar" onClick={handleSubmit} />

        <button onClick={openRegister} className="text-left text-sm text-gray-500 mt-2">
          Novo usuário? <span className="text-red-500 font-bold cursor-pointer">Cadastre-se</span>
        </button>

        <LoginBar />
        <LoginButton text="Continuar com o Google" icon={FaGoogle} onClick={() => alert("Login com Google")} />
        <LoginButton text="Continuar com o Facebook" icon={FaFacebook} onClick={() => alert("Login com Facebook")} />
      </div>

      {showRegisterModal && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/10 bg-opacity-50">
          <div className="">
            <RegisterForm onClose={closeRegister} />
          </div>
        </div>
      )}
    </div>
  );
}
