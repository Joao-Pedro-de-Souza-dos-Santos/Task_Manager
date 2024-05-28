import { useNavigate } from "react-router-dom";
import { Container } from "../FormLogin/styles";
import { Button } from "../Button";
import { SubmitHandler, useForm } from "react-hook-form";

type InputTypes = {
  name: string;
  email: string;
  password: string;
};

export function FormSingUp(){
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<InputTypes>()

  const onSubmit: SubmitHandler<InputTypes> = (data) => {
    console.log(data);
    reset();
    navigate("/")
  }

  return (
    <Container>
      <h2>Faça seu cadastro</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
      <section>
          <label>
            Name: <input
              type="text"
              placeholder="Digite seu nome"
              {
                ...register("name",
                    { required: "Campo obrigatório", }
                )
              } />
          </label>
          <span className="inputError">{errors.name?.message}</span>
        </section>

        <section>
          <label>
            Email: <input
              type="email"
              placeholder="exemplo@gmail.com"
              {
                ...register("email",
                    { required: "Campo obrigatório",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Endereço de e-mail inválido",
                      },
                    }
                )
              } />
          </label>
          <span className="inputError">{errors.email?.message}</span>
        </section>

        <section>
          <label>
          <input
              type="password"
              placeholder="Digite sua senha"
              {...register("password", {
                required: "Campo obrigatório",
                minLength: {
                  value: 7,
                  message: "A senha deve ter no mínimo 7 dígitos",
                },
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}|:"<>?,./\\[\]-]).+$/,
                  message:
                    "A senha deve ter número, letra maiúscula e caractere especial",
                },
              })}
          />
          </label>
          <span className="inputError">{errors.password?.message}</span>
        </section>

        <Button title="Finalizar" loading={false} variant="secundary"/>
      </form>

      <span className="messageChangePage">Não tem uma conta?</span>
      <button className="buttonChangePage" onClick={() => navigate("/")}>
        Registre-se
      </button>
    </Container>
  );
}
