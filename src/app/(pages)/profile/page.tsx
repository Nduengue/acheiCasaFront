"use client";

import users from '../../objects/obje'; 
import React, { useState, useEffect } from 'react';
import ShowInformation from './(ProfileComponents)/ShowInformation';
import Title from './(ProfileComponents)/Title';
import MenuProfile from './(ProfileComponents)/MenuProfile';
import EditButon from './(ProfileComponents)/EditButton';
import ProfileContainer from './(ProfileComponents)/ProfileContainer'
import Loader from '@/app/(components)/Loader/loader'

export default function Profile(){
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const timer = setTimeout(() => {
        setLoading(false)
        }, 1500)

        return () => clearTimeout(timer)
    }, [])

    if (loading) return <Loader />
    return (
        <section className="mx-auto px-4 py-8 mt-[98px]">
            <MenuProfile profile={true} anuncio={false} history={false} favorite={false} title='Editar Perfil' />
            <div>
                <ProfileContainer marginTop={0}>
                    {users.map((user) => (
                    <div key={user.id} className="flex items-center justify-start gap-4">
                        <figure className='w-[130px] h-[130px] rounded-full p-[5px] bg-[#FF453A] shadow-[0_0_10px_rgba(0,0,0,0.1)] overflow-hidden select-none'>
                            <img src={user.image} alt={user.name} className="w-full h-full object-cover rounded-full select-none" />
                        </figure>
                        <div>
                            <p className="font-bold text-2xl leading-none tracking-normal  text-[#000000] select-none">{user.name}</p>
                            <p className='my-[5px] font-normal text-base leading-none tracking-normal text-[#999999] select-none'>{user.role}</p>
                            <p className='font-normal italic text-[13px] leading-none tracking-normal text-[#999999] select-none'>{user.address}</p>
                        </div>
                    </div>
                    ))}
                    <EditButon />
                </ProfileContainer>
                <ProfileContainer marginTop={0}>
                    <div className=''>
                        <Title text='Informações Pessoais' />
                        <div className='grid grid-cols-2 gap-[45px] mt-4'>
                            <ShowInformation keyText='Primeiro Nome' keyValue={users[0].firstName} />
                            <ShowInformation keyText='Segundo Nome' keyValue={users[0].lastName} />
                            <ShowInformation keyText='Endereço de E-mail' keyValue={users[0].email} />
                            <ShowInformation keyText='N° de Telefone' keyValue={users[0].phone} />
                            <ShowInformation keyText='Biografia' keyValue={users[0].bio} />
                        </div>
                    </div>
                    <EditButon />
                </ProfileContainer>
                <ProfileContainer marginTop={0}>
                    <div className=''>
                        <Title text='Endereço' />
                        <div className='grid grid-cols-2 gap-[45px] mt-4'>
                            <ShowInformation keyText='Primeiro Nome' keyValue={users[0].country} />
                            <ShowInformation keyText='Segundo Nome' keyValue={users[0].province} />
                            <ShowInformation keyText='Endereço de E-mail' keyValue={users[0].city} />
                            <ShowInformation keyText='N° de Telefone' keyValue={users[0].postalCode} />
                        </div>
                    </div>
                    <EditButon />
                </ProfileContainer>
            </div>
        </section>
    )
}