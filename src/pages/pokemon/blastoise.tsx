import Cookies from "js-cookie";
import Link from "next/link";

const Blastoise = () => {
  return (
    <div>
      <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/009.png" />
      <p>
        saved cookie - key: `flag-pokemon_test` value:{" "}
        {Cookies.get("flag-pokemon_test")}
      </p>
      <Link href={"/"}>Back</Link>
    </div>
  );
};

export default Blastoise;
