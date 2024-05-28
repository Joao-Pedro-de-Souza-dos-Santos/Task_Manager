import { Container } from "./styles";
import { Link } from "react-router-dom";
import logo from "../../assets/logo-reprograma-jucas.png";
import { FormLogin } from "../../components/FormLogin";

export function SingIn() {

  return (
    <Container>
      <div className="singInPart1">
        <div>
          <Link
            to={"https://emanuelquintino.github.io/Page-WDC"}
            target="_blank"
          >
            <img src={logo} alt="" width={850} />
          </Link>
        </div>
      </div>

      <div className="singInPart2">
        <FormLogin />
      </div>
    </Container>
  );
}
