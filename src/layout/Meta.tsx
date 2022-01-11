import { useEffect, useState } from 'react';

import { Disclosure } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { NextSeo } from 'next-seo';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { AppConfig } from '@/utils/AppConfig';

const initialNavigation = [
  {
    name: 'Weather Forecast',
    href: '#',
    link: '/',
    current: false,
  },
  {
    name: ' Web App GitHub',
    href: 'https://github.com/kikoanis/Weather.Forecast.UI',
    link: '',
    current: false,
    target: '_blank',
  },
  {
    name: ' API Endpoints GitHub',
    href: 'https://github.com/kikoanis/Weather.Forecast',
    link: '',
    current: false,
    target: '_blank',
  },
  { name: 'About', href: '#', link: '/about/', current: false },
];

type IMetaProps = {
  title: string;
  description: string;
  canonical?: string;
};

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

const Meta = (props: IMetaProps) => {
  const router = useRouter();
  const [navigation, setNavigation] = useState(initialNavigation);

  useEffect(() => {
    setNavigation(
      initialNavigation.map((item) => {
        return {
          ...item,
          current: router.asPath === item.link,
        };
      })
    );
  }, [router.asPath]);

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
        <Disclosure as="nav" className="bg-gray-800">
          {({ open }) => (
            <>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <img
                        className="h-8 w-8"
                        src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                        alt="Workflow"
                      />
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map((item) => (
                          <Link href={item.link} key={item.name}>
                            <a
                              href={item.href}
                              target={item.href === '#' ? '' : '_blank'}
                              className={classNames(
                                item.current
                                  ? 'bg-gray-900 text-white'
                                  : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                'px-3 py-2 rounded-md text-sm font-medium'
                              )}
                              aria-current={item.current ? 'page' : undefined}
                              rel="noreferrer"
                            >
                              {item.name}
                            </a>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <MenuIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                  {navigation.map((item) => (
                    <Link href={item.link} key={item.name} passHref>
                      <a
                        href={item.href}
                        className={classNames(
                          item.current
                            ? 'bg-gray-900 text-white'
                            : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'block px-3 py-2 rounded-md text-base font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </a>
                    </Link>
                  ))}
                </div>
                <div className="pt-4 pb-3 border-t border-gray-700"></div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </>
  );
};

export { Meta };
