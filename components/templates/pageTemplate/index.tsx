import { PageLayout } from '@components/organism'
import React from 'react'
import Allowed from 'utils/permissions/permissions'

export function PageTemplate({ children }:any) {
	return (
			<PageLayout>
				{children}
			</PageLayout>
	)
}

