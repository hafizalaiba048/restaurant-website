export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'Arial, sans-serif', background: '#FFF8F0' }}>
        {children}
      </body>
    </html>
  );
}
