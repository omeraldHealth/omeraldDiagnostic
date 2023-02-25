import { BottomBanner, PageLayout } from '@components/organism'
import React, { Fragment } from 'react'

export function PageTemplate({ children }:any) {
	return (
        <PageLayout>
			<Fragment>
				<BottomBanner/>
			</Fragment>
		</PageLayout>
	)
}

