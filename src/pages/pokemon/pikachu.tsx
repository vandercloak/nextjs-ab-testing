import Cookies from "js-cookie";
import Link from "next/link";

const Pikachu = () => {
  return (
    <div>
      <img src="https://upload.wikimedia.org/wikipedia/ro/thumb/8/89/Pikachu.jpg/220px-Pikachu.jpg" />
      <p>
        saved cookie - key: `flag-pokemon_test` value:{" "}
        {Cookies.get("flag-pokemon_test")}
      </p>
      <Link href={"/"}>Back</Link>
    </div>
  );
};

export default Pikachu;
