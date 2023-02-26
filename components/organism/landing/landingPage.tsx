import React, { Fragment } from 'react'
import PageLayout from '@components/organism/layout/pageLayout'
import { BottomBanner } from '@components/organism/landing/bottomBanner'
import { BlogContainer } from '@components/organism/landing/blogContainer'
import { ContactContainer } from '@components/organism/landing/contactContainer'
import { Testimonial } from '@components/organism/landing/testimonial'
import { Advertisement } from '@components/organism/landing/advertisement'
import { HelpYourBusiness } from '@components/organism/landing/helpYourBusiness'
import { LandingBanner } from '@components/organism/landing/landingBanner'
import { Partners } from '@components/organism/landing/partners'
import { HowItWorks } from '@components/organism/landing/howItWorks'

export function LandingPage() {
	return (
        <PageLayout>
            <div >
                <LandingBanner/>
                <hr/>
                <Partners/>
                <hr/>
                <HowItWorks/>
                <HelpYourBusiness/>
                <Advertisement/>
                <Testimonial/>
                <ContactContainer/>
                <BlogContainer/>
                <BottomBanner/>
            </div>
        </PageLayout>
    )
}

