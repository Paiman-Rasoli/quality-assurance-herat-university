import { Fragment, useState } from "react";
import jwtDecoder from "jwt-decode";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { NavLink, Outlet } from "react-router-dom";
import {
  Bars3BottomLeftIcon,
  BellIcon,
  CalendarIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const navigation = [
  { name: "خانه", href: "", icon: HomeIcon, current: true },
  {
    name: "کاربران",
    href: "user",
    icon: UsersIcon,
    current: false,
    isPrivate: true,
    children: [
      { name: "لیست کاربران", href: "users", current: false },
      { name: "افزودن کاربر جدید", href: "add-users", current: false },
    ],
  },
  {
    name: "ثبت و تعریف",
    href: "database",
    icon: FolderIcon,
    isPrivate: false,
    current: false,
    children: [
      { name: "فاکولته", href: "faculty", isPrivate: true, current: true },
      {
        name: "دیپارتمنت",
        href: "department",
        isPrivate: false,
        current: false,
      },
      { name: "استاد", href: "teacher", isPrivate: false, current: false },
      { name: "مضمون", href: "subject", isPrivate: false, current: false },
      { name: "فورم", href: "form", isPrivate: false, current: false },
      { name: "سوال", href: "question", isPrivate: false, current: false },
    ],
  },
  {
    name: "گزارشات",
    href: "report",
    icon: CalendarIcon,
    current: false,
    isPrivate: false,
    children: [
      { name: "فاکولته ها", href: "total", isPrivate: true, current: false },
      {
        name: "دیپارتمنت",
        href: "department",
        isPrivate: false,
        current: false,
      },
      { name: "استاد", href: "teacher", isPrivate: false, current: false },
      { name: "مضمون", href: "subject", isPrivate: false, current: false },
    ],
  },
];

const userNavigation = [
  { name: "پروفایل", href: "/profile" },
  { name: "ایجاد حساب جدید", href: "user/add-users", isPrivate: true },
  { name: "خروج", href: "/" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Layout() {
  const [currentRoute, setCurrentRoute] = useState("/");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const token = sessionStorage.getItem("token");
  const { user } = jwtDecoder(token);
  // console.log("user-layout", user);

  return (
    <>
      <div className="font-vazirBold" dir="rtl">
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 md:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex font-vazirBold">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                {/* className="flex flex-grow flex-col overflow-y-auto border-l shadow border-gray-200 bg-white pt-5 pb-4" */}
                <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col border-l shadow border-gray-200 bg-white pt-5 pb-4">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                      <button
                        type="button"
                        className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">بستن مینو کناری</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex flex-shrink-0 items-center px-4">
                    <img
                      className="h-8 w-auto"
                      src="/logo.png"
                      alt="Herat Uni"
                    />
                  </div>
                  <div className="mt-5 h-0 flex-1 overflow-y-auto" dir="rtl">
                    <nav className="space-y-1 px-2 overflow-y-hidden" dir="rtl">
                      {navigation.map((item) =>
                        !item.children ? (
                          <div key={item.name}>
                            <NavLink
                              to={item.href}
                              className={classNames(
                                item?.isPrivate && !user.level && "hidden",
                                item.href === currentRoute
                                  ? "bg-gray-100 text-gray-900"
                                  : "bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                                "group w-full flex items-center pr-2 py-2 text-sm font-medium rounded-md"
                              )}
                            >
                              <item.icon
                                className={classNames(
                                  item.href === currentRoute
                                    ? "text-gray-500"
                                    : "text-gray-400 group-hover:text-gray-500",
                                  "ml-3 flex-shrink-0 h-6 w-6"
                                )}
                                aria-hidden="true"
                              />
                              {item.name}
                            </NavLink>
                          </div>
                        ) : (
                          <Disclosure
                            as="div"
                            key={item.name}
                            className="space-y-1"
                          >
                            {({ open }) => (
                              <>
                                <Disclosure.Button
                                  className={classNames(
                                    item?.isPrivate && !user.level && "hidden",
                                    item.href === currentRoute
                                      ? "bg-gray-100 text-gray-900"
                                      : "bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                                    "group w-full flex items-center pr-2 pl-1 py-2 text-right text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                  )}
                                >
                                  <item.icon
                                    className="ml-3 h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                    aria-hidden="true"
                                  />
                                  <span className="flex-1">{item.name}</span>
                                  <svg
                                    className={classNames(
                                      open
                                        ? "text-gray-400 rotate-90"
                                        : "text-gray-300 rotate-180",
                                      "ml-3 h-5 w-5 flex-shrink-0 transform transition-all duration-300 ease-in-out group-hover:text-gray-400"
                                    )}
                                    viewBox="0 0 20 20"
                                    aria-hidden="true"
                                  >
                                    <path
                                      d="M6 6L14 10L6 14V6Z"
                                      fill="currentColor"
                                    />
                                  </svg>
                                </Disclosure.Button>
                                <Disclosure.Panel className="space-y-1">
                                  {item.children.map((subItem) => (
                                    <NavLink
                                      key={subItem.name}
                                      to={`${item.href}/${subItem.href}`}
                                      className={classNames(
                                        subItem?.isPrivate &&
                                          !user.level &&
                                          "hidden",
                                        "group flex w-full items-center rounded-md py-2 pr-11 pl-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                      )}
                                    >
                                      {subItem.name}
                                    </NavLink>
                                  ))}
                                </Disclosure.Panel>
                              </>
                            )}
                          </Disclosure>
                        )
                      )}
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div
            className="flex flex-grow flex-col overflow-y-auto border-l shadow border-gray-200 bg-white pt-5 pb-4"
            dir="rtl"
          >
            <div className="flex flex-shrink-0 items-center px-4">
              <img className="h-8 w-auto" src="/logo.png" alt="Your Company" />
            </div>
            <div className="mt-5 flex flex-1 flex-col">
              <nav className="flex-1 space-y-1 px-2 pb-4" dir="rtl">
                {navigation.map((item) =>
                  !item.children ? (
                    <div key={item.name}>
                      <NavLink
                        to={item.href}
                        className={classNames(
                          item?.isPrivate && !user.level && "hidden",
                          item.href === currentRoute
                            ? "bg-gray-100 text-gray-900"
                            : "bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:scale-y-105 hover:scale-x-95",
                          "group w-full flex items-center pr-2 py-2 text-sm font-medium rounded-md"
                        )}
                      >
                        <item.icon
                          className={classNames(
                            item.href === currentRoute
                              ? "text-gray-500"
                              : "text-gray-400 group-hover:text-gray-500 hover:scale-y-105 hover:scale-x-95",
                            "ml-3 flex-shrink-0 h-6 w-6"
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                      </NavLink>
                    </div>
                  ) : (
                    <Disclosure as="div" key={item.name} className="space-y-1">
                      {({ open }) => (
                        <>
                          <Disclosure.Button
                            className={classNames(
                              item.isPrivate && !user.level && "hidden",
                              item.href === currentRoute
                                ? "bg-gray-100 text-gray-900"
                                : "bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:scale-y-105 hover:scale-x-95",
                              "group w-full flex items-center pr-2 pl-1 py-2 text-right text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            )}
                          >
                            <item.icon
                              className="ml-3 h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500 hover:scale-y-105 hover:scale-x-95"
                              aria-hidden="true"
                            />
                            <span className="flex-1">{item.name}</span>
                            <svg
                              className={classNames(
                                open
                                  ? "text-gray-400 rotate-90"
                                  : "text-gray-300 rotate-180",
                                "mr-3 h-5 w-5 flex-shrink-0 transform transition-all duration-300 ease-in-out group-hover:text-gray-400"
                              )}
                              viewBox="0 0 20 20"
                              aria-hidden="true"
                            >
                              <path
                                d="M6 6L14 10L6 14V6Z"
                                fill="currentColor"
                              />
                            </svg>
                          </Disclosure.Button>
                          <Disclosure.Panel className="space-y-1">
                            {item.children.map((subItem) => (
                              <NavLink
                                key={subItem.name}
                                to={`${item.href}/${subItem.href}`}
                                className={classNames(
                                  subItem.isPrivate && !user.level
                                    ? "hidden"
                                    : "group flex w-full items-center rounded-md py-2 pr-11 pl-2 text-sm font-medium text-gray-600 hover:bg-cyan-100 hover:text-gray-900"
                                )}
                              >
                                {subItem.name}
                              </NavLink>
                            ))}
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  )
                )}
              </nav>
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col md:pr-64">
          <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow">
            <button
              type="button"
              className="border-l border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500 md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">مینو کناری</span>
              <Bars3BottomLeftIcon className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="flex flex-1 justify-between px-4">
              <div className="flex flex-1">
                <form className="flex w-full md:ml-0" action="#" method="GET">
                  <label htmlFor="search-field" className="sr-only">
                    جستجو
                  </label>
                  <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
                      <MagnifyingGlassIcon
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                    </div>
                    <input
                      id="search-field"
                      className="block h-full w-full border-transparent py-2 pr-8 pl-3 text-gray-900 placeholder-gray-500 focus:border-transparent focus:placeholder-gray-400 focus:outline-none focus:ring-0 sm:text-sm"
                      placeholder="جستجو"
                      type="search"
                      name="search"
                    />
                  </div>
                </form>
              </div>
              <div className="mr-4 flex items-center md:mr-6">
                <button
                  type="button"
                  className="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                >
                  <span className="sr-only"> نمایش اعلانات</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="relative mr-3">
                  <div>
                    <Menu.Button className="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2">
                      <span className="sr-only">مینو کاربران</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="/icons/userIcon.svg"
                        alt="user"
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute left-0 z-10 mt-2 w-48 origin-top-left rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {userNavigation.map((item) => (
                        <Menu.Item key={item.name}>
                          {({ active }) => (
                            <NavLink
                              to={item.href}
                              className={classNames(
                                item.isPrivate && !user.level
                                  ? "hidden"
                                  : "block",
                                active ? "bg-gray-100" : "",
                                "px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              {item.name === "پروفایل"
                                ? user.username
                                : item.name}
                            </NavLink>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
          {/* <Breadcrumbs /> */}
          <main className="flex justify-center w-full">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}
