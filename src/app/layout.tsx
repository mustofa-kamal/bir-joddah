// src/app/layout.tsx
import './globals.css';

export const metadata = {
  title: 'IOU',
  description: 'Martyrs of the July-August 2024 Revolution in Bangladesh',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-8ZK5HWGD57"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-8ZK5HWGD57');
          `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
