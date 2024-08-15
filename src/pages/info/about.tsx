import { UserLayout } from "@components/templates/pageTemplate";
import { aboutImage } from "@utils/urls/files";

export default function About() {
  return (
    <UserLayout
      tabDescription="About us page"
      tabName="Admin Diagnostic | Features"
    >
      <div className="w-[70%] m-auto grid grid-cols-2 md:grid-cols-2 gap-8">
        <section className="flex flex-col justify-center my-20">
          <p className="font-light mt-2">ABOUT US!</p>
          <p className="text-3xl font-bold my-2">
            Helping Diagnostic Centers <br /> Manage and Share Reports with
            ease!
          </p>
          <p className="text-blue-400">
            Welcome to Omerald Diagnostic, we empower diagnostic centers to
            revolutionize their operations through seamless online management of
            test reports. We enable diagnostic centers to efficiently handle and
            share test reports with patients, maintain detailed records, and
            derive powerful insights that support early disease diagnosis and
            effective treatment.
          </p>
          <p className="font-bold my-4">What We Offer</p>
          <ul>
            <li className="my-2 font-light text-gray-500">
              <b className="font-bold text-gray-900">
                Efficient Test Report Management:
              </b>{" "}
              We offer robust systems that allow diagnostic centers to manage
              test reports online, ensuring accuracy and accessibility for
              healthcare professionals and patients.
            </li>
            <li className="my-2 font-light text-gray-500">
              <b className="font-bold text-gray-900">
                Secure Patient Data Sharing:
              </b>{" "}
              Through our platform, diagnostic centers can securely share test
              results with patients, facilitating informed decision-making and
              empowering individuals in their healthcare journey.
            </li>
            <li className="my-2 font-light text-gray-500">
              <b className="font-bold text-gray-900">Insightful Analytics:</b>{" "}
              We provide powerful analytics tools that generate actionable
              insights from diagnostic data, supporting healthcare professionals
              in making informed decisions for early disease detection and
              personalized treatment plans.
            </li>
          </ul>
        </section>
        <section className="flex items-center justify-center p-4">
          <img
            style={{ height: "90vh" }}
            src={aboutImage}
            alt="About Us"
            className="h-[90vh]"
          />
        </section>
      </div>
    </UserLayout>
  );
}
