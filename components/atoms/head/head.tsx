import React, { FC } from 'react'
import NextHead from 'next/head'
import { HeadProps } from 'utils/types/atoms/atoms'
import { logoUrl } from 'utils/urls/files'

const Head: FC<HeadProps> = ({ title = 'Omerald Diagnostic', description = 'Helping diagnostic centers manage and share reports', url = '', ogImage = logoUrl }) => (
	<NextHead>
		<meta charSet='UTF-8' />
		<title>{title}</title>
		<meta name='description' content={description} />
		<meta name='viewport' content='width=device-width, initial-scale=1' />
		<link rel='icon' sizes='192x192' href='/static/touch-icon.png' />
		<link rel='apple-touch-icon' href='/static/touch-icon.png' />
		<link rel='mask-icon' href='/static/favicon-mask.svg' color='#49B882' />
		<link rel='icon' href={ogImage} />
		<meta property='og:url' content={url} />
		<meta property='og:title' content={title} />
		<meta property='og:description' content={description} />
		<meta name='twitter:site' content={url} />
		<meta name='twitter:card' content='summary_large_image' />
		<meta name='twitter:image' content={ogImage} />
		<meta property='og:image' content={ogImage} />
		<meta property='og:image:width' content='1200' />
		<meta property='og:image:height' content='630' />
	</NextHead>
)

export default Head
