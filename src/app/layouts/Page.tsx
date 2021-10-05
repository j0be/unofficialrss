import React, { FunctionComponent } from 'react';
import Head from 'next/head';

const Page: FunctionComponent = ({ children }) => {
  return (
    <div className="page">
      <Head>
        <title>UnofficialRSS for Stitcher Premium v2</title>
        <link rel="icon" type="image/png" href="/static/icon.png" />
      </Head>
      {children}
      <style jsx global>{`
        * {
          box-sizing: border-box;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
            Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
            'Segoe UI Symbol';
        }
        html,
        body {
          margin: 0;
          padding: 0;
          background-color: hsl(240, 26%, 12%);
          color: white;
        }
        h1 {
          font-weight: 500;
        }
        h2,
        h4 {
          font-weight: 500;
          color: hsl(326, 100%, 50%);
        }
        a {
          color: inherit;
          text-underline-offset: 0.11em;
        }

        .podcast-grid {
          position: relative;
        }

        .podcast-preview-grid {
          display: flex;
          flex-wrap: wrap;
          transition: 400ms opacity ease-in-out;
          background: hsl(240, 26%, 12%);
          margin: 4em -15px 0;
        }

        .loading {
          position: absolute;
          display: grid;
          place-items: center;
          width: 100%;
          height: 300px;
          background: hsl(240, 26%, 12%);
          transition: 400ms all ease-in-out;
          pointer-events: none;
          z-index: 1000;
        }

        @media (max-width: 768px) {
          .podcast-preview-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        .podcast-preview {
          cursor: pointer;
          overflow: hidden;
          opacity: 0;
          transform: translateY(50px);
          animation: 450ms fadeUp forwards;
          flex-basis: 33%;
          padding: 15px;
        }

        @keyframes fadeUp {
          0% {
            opacity: 0;
            transform: translateY(50px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .image {
          width: 100%;
          height: auto;
          background: black;
        }

        .meta {
          padding-top: 5px;
        }

        .title {
          color: #ccc;
          font-size: 13px;
          line-height: 1.4em;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .podcast-preview:hover .title {
          text-decoration: underline;
        }

        .description {
          font-size: 11px;
          color: #aaa;
          line-height: 1.4em;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          margin-bottom: 5px;
          display: none;
        }

        .episode-count {
          display: none;
          font-size: 12px;
          font-weight: 400;
        }

        .podcast-preview.list {
          flex-basis: 100%;
          display: flex;
          position: relative;
          align-items: center;
        }

        .podcast-preview.list:hover {
          background: rgba(255,255,255,.1);
        }

        .podcast-preview.list .image {
          width: 64px;
          display: inline-block;
          margin-right: 1em;
        }

        .podcast-preview.premium:first-child {
          overflow: visible;
        }

        .podcast-preview.premium + .podcast-preview.list {
          margin-top: 8em;
          overflow: visible;
        }

        .podcast-preview.premium:first-child::before,
        .podcast-preview.premium + .podcast-preview.list::before {
          display: block;
          position: absolute;
          top: -2em;
          opacity: .5;
        }

        .podcast-preview.premium:first-child::before {
          content: "Premium Podcasts";
        }

        .podcast-preview.premium + .podcast-preview.list::before {
          content: "Free Podcasts";
        }

      `}</style>
    </div>
  );
};

export default Page;
