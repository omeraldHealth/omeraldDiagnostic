import React, { Fragment } from 'react'
import PageLayout from '@components/organism/layout/pageLayout'
import { BottomBanner } from '@components/organism/landing/bottomBanner'
import { BlogContainer } from '@components/organism/landing/blogContainer'

export function LandingPage() {
	return (
        <PageLayout>
            <Fragment>
                <BlogContainer/>
                <BottomBanner/>
            </Fragment>
        </PageLayout>
    )
}

