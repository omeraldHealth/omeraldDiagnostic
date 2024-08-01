
import { useRouter } from 'next/router';

const dcOptions = ['DC1', 'DC2', 'DC3'];

const SelectedDC = () => {
  const router = useRouter()

  const toggleModal = () => {
    localStorage.setItem("diagnosticCenter", "null");
    localStorage.setItem("selectedDc", "null")
    router.push("/chooseDc")
  };


  return (
    <div className="flex items-center">
      <button
        className="p-2 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 focus:outline-none"
        onClick={toggleModal}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9a7 7 0 00-14 0v2a7 7 0 007 7h0a7 7 0 007-7v-2z"
          />
        </svg>
      </button>
    </div>
  );
};

export default SelectedDC;
