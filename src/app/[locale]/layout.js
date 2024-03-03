import "./globals.scss";
import Header from "@/components/header/Header";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { roboto, montserrat } from "@/font";
import BreadCrumbs from "@/components/breadcrumbs/BreadCrumbs";
import AuthProvider from "@/components/auth-provider/AuthProvider";
import { getDictionary } from "@/utils/dictionaries";


export default async function RootLayout({ children, params: { locale } }) {
  const i18n = await getDictionary(locale);

  return (
    <html lang="en">
      <body className={`${roboto.variable} ${montserrat.variable}`}>
        <AuthProvider>
          <Header locale={locale} i18n={i18n.header}/>
          <main>
            {/* <BreadCrumbs locale={locale} /> */}
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
