import React, { FC } from 'react'
import { LogoProps } from 'utils/types/atoms/atoms'
import { logoUrl } from '@utils'
import Image from 'next/image'

const Logo: FC<LogoProps> = ({ width = 500, height = 500 }) => (
	<img
        src={logoUrl}
        // alt="Omerald Logo"
        // width={width}
        // height={height}
        // blurDataURL={logoUrl}
        // placeholder="blur" 
        className="w-[50px] sm:w-[70px]"
    />
)

export default Logo
