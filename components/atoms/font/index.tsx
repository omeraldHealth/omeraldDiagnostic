import { FontTextProp, NavTextProps } from '@utils'
import React, { FC } from 'react'
import { BodyStyled_1, BodyStyled_2, HeaderStyled_1, TitleTextStyled } from './font.style'

export const CopyRightFont: FC<NavTextProps> = ({children}: NavTextProps) => (
	<p className={"font-md text-base leading-[26px]"}>{children}</p>
)

export const FooterHeaderFont: FC<NavTextProps> = ({children}: NavTextProps) => (
	<p className={"font-sm text-xl"}>{children}</p>
)

export const FooterLinkFont: FC<NavTextProps> = ({children}: NavTextProps) => (
	<p className={"font-sm text-md text-[#181433] my-4"}>{children}</p>
)

export const TitleText: FC<FontTextProp> = ({style,children}: FontTextProp) => (
	<p className={`${style}`}><TitleTextStyled>{children}</TitleTextStyled></p>
)

export const HeaderText_1: FC<FontTextProp> = ({style,children}: FontTextProp) => (
	<p className={`${style}`}><HeaderStyled_1>{children}</HeaderStyled_1></p>
)

export const BodyText_1: FC<FontTextProp> = ({style,children}: FontTextProp) => (
	<p className={`${style}`}><BodyStyled_1>{children}</BodyStyled_1></p>
)

export const BodyText_2: FC<FontTextProp> = ({style,children}: FontTextProp) => (
	<p className={`${style}`}><BodyStyled_2>{children}</BodyStyled_2></p>
)