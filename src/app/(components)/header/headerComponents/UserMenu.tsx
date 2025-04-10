"use client";
import { useState, useEffect } from "react";
import { UserRound, Bell, GitCompareArrows, House, MessageSquareMore, Power, Settings, LayoutDashboard, Menu } from 'lucide-react';
import Link from "next/link";
import users from '../../../objects/obje'; 
import ListButtonLink from '../../Buttons/ListButtonLink';
import "./style.css"

export default function UserMenu() {
  // Estado para controlar a visibilidade do side menu
  const [menuOpen, setMenuOpen] = useState(false);
  // Estado para controlar a animação
  const [menuVisible, setMenuVisible] = useState(false);

  // Função para alternar a visibilidade do menu com animação
  function toggleMenu() {
    if (menuOpen) {
      // Fecha o menu com animação
      setMenuVisible(false);
      // Aguarda a animação terminar antes de remover o menu do DOM
      setTimeout(() => {
        setMenuOpen(false);
      }, 300); // Tempo igual à duração da transição
    } else {
      // Abre o menu
      setMenuOpen(true);
      // Pequeno timeout para garantir que o DOM tenha sido atualizado
      setTimeout(() => {
        setMenuVisible(true);
      }, 10);
    }
  }

  // Detecta o tamanho da tela para determinar se o menu deve estar sempre visível
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    // Verifica o tamanho inicial da tela
    const checkScreenSize = () => {
      const largeScreen = window.innerWidth >= 1024; // lg breakpoint (geralmente 1024px)
      setIsLargeScreen(largeScreen);
      
      // Em telas grandes, o menu deve estar sempre visível
      if (largeScreen) {
        setMenuOpen(true);
        setMenuVisible(true);
      }
    };

    // Executa a verificação inicial
    checkScreenSize();

    // Adiciona um listener para redimensionamento
    window.addEventListener('resize', checkScreenSize);

    // Limpeza ao desmontar o componente
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  const [activeLink, setActiveLink] = useState<string>('');

  const handleClick = (href: string): void => {
    setActiveLink(href);
  };
  

  return (
    <div className="relative">
      {/* Área dos ícones */}
      <div className="menu-area flex items-center gap-1 md:gap-4 p-[0.1em] md:p-[0.8em] shadow-md shadow-black/10 rounded-[30px] z-50">
        <button 
          className="menu-icon flex items-center justify-center p-2 rounded-full hover:bg-gray-100 transition cursor-pointer lg:hidden"
          onClick={toggleMenu} // Altera a visibilidade do menu ao clicar
        >
          <Menu className="text-red-500 w-6 h-6" />
        </button>
        <Link href="/profile" className="user-icon flex items-center justify-center p-2 rounded-full hover:bg-gray-100 transition hidden lg:block" aria-label="Área do Usuário">
          <UserRound className="text-red-500 w-6 h-6" />
        </Link>
      </div>

      {/* Menu com animação de slide */}
      {(menuOpen || isLargeScreen) && (
        <div 
          id="sideMenu" 
          className={`
            fixed z-50 bg-white shadow-[2px_0_10px_rgba(0,0,0,0.1)] 
            left-[0px] top-[79px] md:top-[114px] lg:top-[126px] bottom-0 
            p-4 w-[244px] text-[#999999] lg:rounded-[0px_20px_20px_0px] 
            border border-[#D9D9D9] lg:fixed lg:left-0 lg:bottom-[26px] 
            transition-all duration-300 ease-in-out
            ${menuVisible || isLargeScreen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}
          `}
        >
          {/* Botão de fechar o menu (apenas em telas menores) */}
          {!isLargeScreen && (
            <button 
              className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-100 text-gray-500"
              onClick={toggleMenu}
              aria-label="Fechar menu"
            >
              ×
            </button>
          )}

          {users.map((user) => (
            <div key={user.id} className="mt-[1em]">
              <figure className='w-[80px] h-[80px] lg:w-[110px] lg:h-[110px] rounded-full p-[5px] bg-[#FF453A] shadow-[0_0_10px_rgba(0,0,0,0.1)] overflow-hidden mx-auto select-none'>
                <img src={user.image} alt={user.name} className="w-full h-full object-cover rounded-full select-none" />
              </figure>
              <div>
                <p className="font-bold text-[14px] lg:text-[16px] leading-none tracking-none text-center mt-[1em] text-[#000000] select-none">{user.name}</p>
                <p className="font-normal text-[12px] leading-none tracking-none text-center text-[#999999] mt-[0.4em] select-none">{user.role}</p>
              </div>
            </div>
          ))}

          <div className='mt-2'>
            <ListButtonLink
              text='Dashboard'
              hrefLink='/dashboard'
              total=""
              active={activeLink === '/dashboard'}
              icon={LayoutDashboard}
              onClick={() => handleClick('/dashboard')}
            />
          </div>

          <nav className="mt-3">
            <ul className="space-y-2">
              <li>
                <ListButtonLink
                text='Início'
                hrefLink='/'
                total=""
                active={activeLink === '/'}
                icon={House}
                onClick={() => handleClick('/')}
              />
              </li>
              <li>
                <ListButtonLink
                text='Mensagem'
                hrefLink='/message'
                total=""
                active={activeLink === '/message'}
                icon={MessageSquareMore}
                onClick={() => handleClick('/message')}
              />
              </li>
              <li>
                <ListButtonLink
                text='Comparar'
                hrefLink='/compare'
                total=""
                active={activeLink === '/compare'}
                icon={GitCompareArrows}
                onClick={() => handleClick('/compare')}
              />
              </li>
              <li>
                <ListButtonLink
                text='Notificações'
                hrefLink='/notification'
                total="+9"
                active={activeLink === '/notification'}
                icon={Bell}
                onClick={() => handleClick('/notification')}
              />
              </li>
              <li>
                <ListButtonLink
                text='Definições'
                hrefLink='/settings'
                total=""
                active={activeLink === '/settings'}
                icon={Settings}
                onClick={() => handleClick('/settings')}
              />
              </li>
              <li>
                <ListButtonLink
                text='Sair'
                hrefLink='#'
                total=""
                active={activeLink === '#'}
                icon={Power}
                onClick={() => handleClick('#')}
              />
              </li>
            </ul>
          </nav>
        </div>
      )}
      
      {/* Overlay para fechar o menu ao clicar fora (apenas em telas menores) */}
      {menuOpen && !isLargeScreen && (
        <div 
        className={`fixed top-[79px] md:top-[114px] left-0 right-0 bottom-0 bg-black/20 transition-opacity duration-300 ${menuVisible ? 'opacity-100' : 'opacity-0'}`}
        onClick={toggleMenu}
        aria-hidden="true"
      />
      )}
    </div>
  );
}