import { PageLayout } from '@components/organism'
import React from 'react'

export function PageTemplate({ children }:any) {
	return (
        <PageLayout>
			{children}
		</PageLayout>
	)
}

