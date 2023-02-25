import { NavTextProps } from '@utils'
import React, { FC } from 'react'

export const CopyRightFont: FC<NavTextProps> = ({children}: NavTextProps) => (
	<p className={"font-md text-base leading-[26px]"}>{children}</p>
)


export const FooterHeaderFont: FC<NavTextProps> = ({children}: NavTextProps) => (
	<p className={"font-sm text-xl"}>{children}</p>
)

export const FooterLinkFont: FC<NavTextProps> = ({children}: NavTextProps) => (
	<p className={"font-sm text-md text-[#181433] my-4"}>{children}</p>
)
