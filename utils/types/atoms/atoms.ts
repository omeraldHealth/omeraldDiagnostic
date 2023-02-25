import { ReactNode } from "react"

export interface HeadProps {
	title?: string
	description?: string
	url?: string
	ogImage?: string
}

export interface PageTemplateProps {
	navigation: ReactNode
	footer: ReactNode
    children: ReactNode
}