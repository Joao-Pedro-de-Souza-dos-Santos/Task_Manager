import { Container } from "./styles";
import { Link } from "react-router-dom";
import logo from "../../assets/logo-rj.png";
import { FormSignUp } from "../../components/FormSignUp";

export function SingUp() {
  return (
    <Container>
      <div className="singInPart2">
        <FormSignUp />
      </div>

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
    </Container>
  );
}
