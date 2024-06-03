import { useNavigate } from "react-router-dom";
import { Container } from "../../components/FormLogin/styles";
import { Button } from "../Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAuth } from "../../hook/useAuth";

type InputTypes = {
  email: string;
  password: string;
};

export function FormLogin(){
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<InputTypes>();
  const {singIn, isLoading} = useAuth();

  const onSubmit: SubmitHandler<InputTypes> = async ({email, password}) => {
    const userLogged = await singIn({email, password});
    if(userLogged) reset();
  }

  return (
    <Container>
      <h2>Faça seu login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
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
              })}
          />
          </label>
          <span className="inputError">{errors.password?.message}</span>
        </section>

        <Button title="Login" loading={isLoading}/>
      </form>

      <span className="messageChangePage">Não tem uma conta?</span>
      <button className="buttonChangePage" onClick={() => navigate("/singup")}>
        Registre-se
      </button>
    </Container>
  );
}
