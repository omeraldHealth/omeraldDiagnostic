import React from 'react';
import { SignInButton } from '@components/atoms/buttons/button';
import { HeaderText_2 } from '@components/atoms/font';
import { blogs, sideBlogs } from '@utils/static/static';

interface Blog {
  url: string;
  date: string;
  title: string;
  description: string;
}

/**
 * BlogContainer component to display latest blog posts.
 * @returns {React.ReactElement} - The rendered BlogContainer component.
 */
export function BlogContainer(): React.ReactElement {
  return (
    <div className='w-[100%] h-auto bg-white px-[4%] lg:px-[10%] py-10'>
      {/* Header */}
      <section className='flex justify-between my-10'>
        <HeaderText_2 style=''>Our Latest Blog Posts</HeaderText_2>
        <a href={'https://blog.omerald.com/articles'} target='_blank'>
          <SignInButton style={'w-[30vw] sm:w-[20vw] lg:w-[14vw] text-slate-300'}>{"See All Blog posts"}</SignInButton>
        </a>
      </section>
      <section className='lg:flex gap-2 2xl:gap-20'>
        <section className='sm:flex my-10 lg:my-0 col-span-2 gap-2 2xl:gap-20'>
          {blogs?.map((blog: Blog, index: number) => (
            <section key={index} className='blog w-[370px] shadow-lg p-4'>
              <img src={blog.url} className='w-[100%] h-[270px] rounded-md shadow-md' alt='blogBanner' />
              <p className='my-4 text-gray-500'>{blog.date} <span>{" Category"}</span></p>
              <p className='my-4 font-bold'>{blog.title} <span>{" Category"}</span></p>
              <p className='my-4 font-light text-gray-500'>{blog.description} <span>{" Category"}</span></p>
            </section>
          ))}
        </section>
        <section>
          {sideBlogs?.map((blog: Blog, index: number) => (
            <React.Fragment key={index}>
              <section className='blog min-w-[370px] w-auto mb-6 flex shadow-lg rounded-md px-2'>
                <img src={blog.url} className='w-[120px] h-[80px] rounded-md shadow-md self-center' alt='blogBanner' />
                <span className='ml-4'>
                  <p className='mb-4 text-gray-500'>{blog.date} <span>{" Category"}</span></p>
                  <p className='mb-4 font-bold'>{blog.title} <span>{" Category"}</span></p>
                </span>
              </section>
              <hr className='my-4' />
            </React.Fragment>
          ))}
        </section>
      </section>
    </div>
  );
}
