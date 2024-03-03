import Link from "next/link";

export default async function NotFound() {
  return (
    <div className="error">
      <h1>404</h1>
      <p>Oups, la page que vous demandez n&apos;existe pas.</p>
      <Link href={"/"}>Retour à la page d&apos;accueil</Link>
    </div>
  );
}
