import { Meta } from '@/layout/Meta';
import { Main } from '@/templates/Main';

const About = () => {
  return (
    <Main
      meta={
        <Meta
          title="Weather Forecast UI"
          description="A web application for weather forecast exercise."
        />
      }
    >
      <p>
        <span role="img" aria-label="rocket">
          🚀
        </span>{' '}
        Weather forecast web app is based on Next.js (a flavour of ReactJs
        library, that is opinionated and mostly pre-configured).
        <br />
        <span role="img" aria-label="zap">
          ⚡️
        </span>{' '}
        Made with Next.js, TypeScript, ESLint, Prettier, Husky, Lint-Staged,
        VSCode, PostCSS, Tailwind CSS.
      </p>
      <h2 className="font-semibold text-lg">
        Weather Forecast Web App Features
      </h2>
      <p>Libraries used in this project:</p>
      <ul>
        <li>
          <span role="img" aria-label="fire">
            🔥
          </span>{' '}
          <a href="https://nextjs.org" rel="nofollow">
            Next.js
          </a>{' '}
          for mainly Static Site Generator (and dynamic if updated).
        </li>
        <li>
          <span role="img" aria-label="art">
            🎨
          </span>{' '}
          Integrate with{' '}
          <a href="https://tailwindcss.com" rel="nofollow">
            Tailwind CSS
          </a>
        </li>
        <li>
          <span role="img" aria-label="nail_care">
            💅
          </span>{' '}
          PostCSS for processing Tailwind CSS
        </li>
        <li>
          <span role="img" aria-label="tada">
            🎉
          </span>{' '}
          Type checking Typescript
        </li>

        <li>
          <span role="img" aria-label="pencil2">
            ✏️
          </span>{' '}
          Linter with{' '}
          <a href="https://eslint.org" rel="nofollow">
            ESLint
          </a>
        </li>
        <li>
          <span role="img" aria-label="hammer_and_wrench">
            🛠
          </span>{' '}
          Code Formatter with{' '}
          <a href="https://prettier.io" rel="nofollow">
            Prettier
          </a>
        </li>
        <li>
          <span role="img" aria-label="fox_face">
            🦊
          </span>{' '}
          Husky for Git Hooks
        </li>
        <li>
          <span role="img" aria-label="no_entry_sign">
            🚫
          </span>{' '}
          Lint-staged for running linters on Git staged files
        </li>
        <li>
          <span role="img" aria-label="no_entry_sign">
            🗂
          </span>{' '}
          VSCode configuration: Debug, Settings, Tasks and extension for
          PostCSS, ESLint, Prettier, TypeScript
        </li>
        <li>
          <span role="img" aria-label="robot">
            🤖
          </span>{' '}
          SEO metadata, JSON-LD and Open Graph tags with Next SEO
        </li>
        <li>
          <span role="img" aria-label="robot">
            <img
              width="25"
              height="25"
              style={{ display: 'inline' }}
              alt="react query"
              src="https://react-query.tanstack.com/_next/static/images/emblem-light-628080660fddb35787ff6c77e97ca43e.svg"
            />
          </span>{' '}
          <a href="https://react-query.tanstack.com/" rel="nofollow">
            React Query
          </a>
        </li>
        <li>
          <span role="img" aria-label="robot">
            ⚙️
          </span>{' '}
          <a
            style={{ display: 'inline' }}
            href="https://www.npmjs.com/package/@next/bundle-analyzer"
            rel="nofollow"
          >
            Bundler Analyzer
          </a>
        </li>
      </ul>

      <h2 className="font-semibold text-lg">
        No state management library was used as there was no point in using it
        as we are not really need to persist state among pages. React Query was
        good enough to keep state between pages.
      </h2>
    </Main>
  );
};

export default About;
