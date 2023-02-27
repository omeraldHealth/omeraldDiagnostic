import { PageLayout } from '@components/organism'
import React from 'react'
import Allowed from 'utils/permissions'

export function PageTemplate({ children }:any) {
	return (
		<Allowed>
        <PageLayout>
			{children}
		</PageLayout>
		</Allowed>
	)
}

