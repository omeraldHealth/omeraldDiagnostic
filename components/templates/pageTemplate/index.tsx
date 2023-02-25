import { PageLayout } from '@components/organism'
import { PageTemplateProps } from '@utils'
import React from 'react'

export function PageTemplate({ children }:any) {
	return (
        <PageLayout>{children}</PageLayout>
	)
}

