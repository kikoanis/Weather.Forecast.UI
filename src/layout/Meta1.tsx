import { NextSeo } from 'next-seo';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { AppConfig } from '@/utils/AppConfig';

type IMetaProps = {
  title: string;
  description: string;
  canonical?: string;
};

const Meta = (props: IMetaProps) => {
  const router = useRouter();

  return (
    <>
      <Head>
        <meta charSet="UTF-8" key="charset" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1"
          key="viewport"
        />
        <link
          rel="apple-touch-icon"
          href={`${router.basePath}/apple-touch-icon.png`}
          key="apple"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={`${router.basePath}/favicon-32x32.png`}
          key="icon32"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={`${router.basePath}/favicon-16x16.png`}
          key="icon16"
        />
        <link
          rel="icon"
          href={`${router.basePath}/favicon.ico`}
          key="favicon"
        />
      </Head>
      <NextSeo
        title={props.title}
        description={props.description}
        canonical={props.canonical}
        openGraph={{
          title: props.title,
          description: props.description,
          url: props.canonical,
          locale: AppConfig.locale,
          site_name: AppConfig.site_name,
        }}
      />
      <div className="min-h-full">
        <nav className="bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <div className="flex-shrink">
                  <img
                    className="h-8 w-8"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                    alt="Workflow"
                  />
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    <Link href="/">
                      <a
                        className={`${
                          router.asPath === '/'
                            ? 'bg-gray-900'
                            : 'hover:text-white hover:bg-gray-700'
                        } text-white px-3 py-2 rounded-md text-md font-medium`}
                        aria-current={router.asPath === '/' ? 'page' : ''}
                      >
                        Home
                      </a>
                    </Link>
                    <a
                      href="#"
                      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-md font-medium"
                    >
                      Web App GitHub
                    </a>

                    <a
                      href="#"
                      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-md font-medium"
                    >
                      API Endpoints GitHub
                    </a>
                    <Link href="/about">
                      <a
                        className={`${
                          router.asPath === '/about/'
                            ? 'bg-gray-900'
                            : 'hover:text-white hover:bg-gray-700'
                        } text-white px-3 py-2 rounded-md text-md font-medium`}
                        aria-current={router.asPath === '/about/' ? 'page' : ''}
                      >
                        About
                      </a>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="-mr-2 flex md:hidden">
                <button
                  type="button"
                  className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  aria-controls="mobile-menu"
                  aria-expanded="false"
                >
                  <span className="sr-only">Open main menu</span>
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                  <svg
                    className="hidden h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="md:hidden" id="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link href="/">
                <a
                  className={`${
                    router.asPath === '/'
                      ? 'bg-gray-900'
                      : 'hover:text-white hover:bg-gray-700'
                  }  text-white block px-3 py-2 rounded-md text-base font-medium`}
                  aria-current={router.asPath === '/' ? 'page' : ''}
                >
                  Home
                </a>
              </Link>
              <a
                href="#"
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Web App GitHub
              </a>

              <a
                href="#"
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                API Endpoints GitHub
              </a>
              <Link href="/about">
                <a
                  className={`${
                    router.asPath === '/about/'
                      ? 'bg-gray-900'
                      : 'hover:text-white hover:bg-gray-700'
                  } text-white block px-3 py-2 rounded-md text-base font-medium`}
                  aria-current={router.asPath === '/about/' ? 'page' : ''}
                >
                  About
                </a>
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export { Meta };
