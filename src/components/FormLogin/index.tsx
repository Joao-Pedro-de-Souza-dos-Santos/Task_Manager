import { Container } from "./styles";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../Button";
import { useAuth } from "../../hook/useAuth";
import { useNavigate } from "react-router-dom";

type InputsTypes = {
  email: string;
  password: string;
};

export function FormLogin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<InputsTypes>();

  const { singIn, isLoading } = useAuth();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<InputsTypes> = async ({ email, password }) => {
    const isUserLogged = await singIn({ email, password });
    if (isUserLogged) {
      reset();
      navigate("/");
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <section>
          <label>
            Email:
            <input
              type="email"
              placeholder="exemplo@email.com"
              {...register("email", {
                required: "Campo obrigatório",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Endereço de e-mail inválido",
                },
              })}
            />
          </label>
          <span className="inputError">{errors.email?.message}</span>
        </section>

        <section>
          <label>
            Senha:
            <input
              type="password"
              placeholder="digite sua senha"
              {...register("password", {
                required: "Campo obrigatório",
              })}
            />
          </label>
          <span className="inputError">{errors.password?.message}</span>
        </section>

        <Button title={"Login"} loading={isLoading} />
      </form>
    </Container>
  );
}