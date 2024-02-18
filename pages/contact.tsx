import { UserLayout } from '../components/templates/pageTemplate'
import { Support } from '../components/organism/settingsTabs/support'

export default function Contact() {
  return (
    <UserLayout tabName="Admin Omerald | Contact">
      <section className="max-w-[60%] m-auto h-auto my-40 sm:my-20 2xl:my-0 xl:h-[60vh] text-center">
          <p className="underline font-bold text-md my-10">Contact Us With Your Query</p>
          <Support/>
      </section>
    </UserLayout>
  )
}
