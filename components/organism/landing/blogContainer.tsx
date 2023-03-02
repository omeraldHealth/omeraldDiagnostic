import { SignInButton } from '@components/atoms/button/button'
import { HeaderText_2 } from '@components/atoms/font'
import React  from 'react'

export type BlogDataType = {
    "title":string,
    "description":string
    "url":string
    "date":string
}

const blogs : BlogDataType[] = [
    {   
        "title":"Believing neglected so so allowance existence departure.",
        "description":"Blessing welcomed ladyship she met humoured sir breeding her. Six curiosity day assurance bed necessary.",
        "url":"https://omerald-prod.s3.ap-south-1.amazonaws.com/images/Olive%20Oil%20and%20Turmeric_1654279005.webp",
        "date":"08-11-2021"
    },
    {   
        "title":"In design active temper be uneasy. Thirty for remove plenty regard you.",
        "description":"Yet preference connection unpleasant yet melancholy but end appearance. And excellence partiality estimating terminated day everything.",
        "url":"https://omerald-prod.s3.ap-south-1.amazonaws.com/images/glowing%20skin2_1653733484.webp",
        "date":"08-11-2021"
    }
]

const sideBlogs : BlogDataType[] = [
    {   
        "title":"Believing neglected so so allowance existence departure.",
        "description":"Blessing welcomed ladyship she met humoured sir breeding her. Six curiosity day assurance bed necessary.",
        "url":"https://omerald-prod.s3.ap-south-1.amazonaws.com/images/Olive%20Oil%20and%20Turmeric_1654279005.webp",
        "date":"08-11-2021"
    },
    {   
        "title":"In design active temper be uneasy. Thirty for remove plenty regard you.",
        "description":"Yet preference connection unpleasant yet melancholy but end appearance. And excellence partiality estimating terminated day everything.",
        "url":"https://omerald-prod.s3.ap-south-1.amazonaws.com/images/glowing%20skin2_1653733484.webp",
        "date":"08-11-2021"
    },
    {   
        "title":"Believing neglected so so allowance existence departure.",
        "description":"Blessing welcomed ladyship she met humoured sir breeding her. Six curiosity day assurance bed necessary.",
        "url":"https://omerald-prod.s3.ap-south-1.amazonaws.com/images/Olive%20Oil%20and%20Turmeric_1654279005.webp",
        "date":"08-11-2021"
    },
    {   
        "title":"In design active temper be uneasy. Thirty for remove plenty regard you.",
        "description":"Yet preference connection unpleasant yet melancholy but end appearance. And excellence partiality estimating terminated day everything.",
        "url":"https://omerald-prod.s3.ap-south-1.amazonaws.com/images/glowing%20skin2_1653733484.webp",
        "date":"08-11-2021"
    }
]

export function BlogContainer() {
	return (
        <div className='w-[100%] h-auto bg-white px-[4%] lg:px-[10%] py-10'>
            {/* Header */}
            <section className='flex justify-between my-10'>
                <HeaderText_2 style=''>Our Latest Blog Posts</HeaderText_2>
                <a href={"https://blog.omerald.com/articles"} target="_blank">
                    <SignInButton style={"w-[30vw] sm:w-[20vw] lg:w-[14vw] text-slate-300"}>{"See All Blog posts"}</SignInButton></a>
            </section>
            <section className='lg:flex gap-2 2xl:gap-20'>
                <section className='sm:flex my-10 lg:my-0 col-span-2  gap-2 2xl:gap-20'>
                {
                    blogs?.map((blog,index) => {
                        return <section key={index} className='blog w-[370px] shadow-lg p-4'>
                            <img src={blog.url} className='w-[100%] h-[270px] rounded-md shadow-md' alt='blogBanner' />
                            <p className='my-4 text-gray-500'>{blog.date} <span>{" Category"}</span></p>
                            <p className='my-4 font-bold'>{blog.title} <span>{" Category"}</span></p>
                            <p className='my-4 font-light text-gray-500'>{blog.description} <span>{" Category"}</span></p>
                        </section>
                    })
                }
                </section>
                <section>
                    {
                        sideBlogs?.map((blog,index) => {
                            return<> <section key={index} className='blog min-w-[370px] w-auto mb-6 flex shadow-lg rounded-md px-2'>
                                <img src={blog.url} className='w-[120px] h-[80px] rounded-md shadow-md self-center' alt='blogBanner' />
                                <span className='ml-4'>
                                    <p className='mb-4 text-gray-500'>{blog.date} <span>{" Category"}</span></p>
                                    <p className='mb-4 font-bold'>{blog.title} <span>{" Category"}</span></p>
                                </span>
                            </section>
                            <hr className='my-4'/>
                            </>
                        })
                    }
                </section>
            </section>
        </div>
    )
}

