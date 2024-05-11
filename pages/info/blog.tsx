import { UserLayout } from '@components/templates/pageTemplate'
import { Button } from 'antd'
import Link from 'next/link'

export default function Blog() {
  return (
    <UserLayout tabName="Admin Omerald | Features">
      <section className="max-w-[100%] h-auto my-32 sm:my-20 my-8 2xl:my-4 xl:min-h-[60vh] text-center">
            <p className='text-2xl font-bold my-20'>Blogs Coming Soon!</p>
            <Link href={"/"}>
                <Button>Visit Home</Button>
            </Link>
      </section>
    </UserLayout>
  )
}
