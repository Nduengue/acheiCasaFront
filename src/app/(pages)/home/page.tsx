
'use client'

import React from 'react'
import "./home.css"
import casas from './obje';
import { Star } from 'lucide-react';
import Filter from '../../(components)/filter/filter'
import HouseCard from '@/app/(components)/houseCard/HouseCard';

const Home = () => {
      return (
        <section className="mx-auto px-4 py-8 mt-[98px]">
            <Filter visible={false} />
            <div id="home" className="grid grid-cols-1 relative gap-[35px] py-[30px]">
                {casas.map((casa) => (
                    <HouseCard object={casa} />
                ))}
            </div>
        </section>
    );
}

export default Home
