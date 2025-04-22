import Dropdown from '@/Components/Dropdown';

export default function ProfileDropdown({ user }) {
  return (
    <div className="relative ml-3">
      <Dropdown>
        <Dropdown.Trigger>
          <span className="inline-flex rounded-md">
            <button
              type="button"
              className="inline-flex items-center rounded-md border border-transparent bg-white dark:bg-gray-800 px-3 py-2 text-sm font-medium leading-4 text-gray-500 dark:text-gray-300 transition duration-150 ease-in-out hover:text-gray-700 dark:hover:text-gray-200 focus:outline-none"
            >
              {user?.name 
                                ?.split(' ')
                                ?.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                                ?.join(' ') || 'Guest' 
                            }
              <svg
                className="-me-0.5 ms-2 h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </span>
        </Dropdown.Trigger>
        <Dropdown.Content>
          <Dropdown.Link
            href={route('profile.edit')}
          >
            Profile
          </Dropdown.Link>
          <Dropdown.Link
            href={route('logout')}
            method="post"
            as="button"
          >
            Log Out
          </Dropdown.Link>
        </Dropdown.Content>
      </Dropdown>
    </div>
  );
}