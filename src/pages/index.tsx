import Cookies from "js-cookie";
import Link from "next/link";

const Index = () => {
  const removeCookie = (name: string) => {
    Cookies.remove(name);
    window.location.reload();
  };

  return (
    <div>
      <h1 className="mb-6">AB testing with Nextjs + Vercel edge config</h1>
      <p className="mb-4">
        The pokemon page has a 50% chance of showing a blastoise and a 50%
        chance of showing a pikachu.
      </p>
      <Link href="/pokemon">/pokemon</Link>
      <p className="text-lg mb-4">
        Click the buttons below if you want to change the current variant (each
        variant has a 50% chance)
      </p>
      <div>
        <button
          className="mr-2.5"
          onClick={() => removeCookie(`flag-pokemon_test`)}
        >
          Remove /about cookie & reload
        </button>
      </div>
    </div>
  );
};

export default Index;
