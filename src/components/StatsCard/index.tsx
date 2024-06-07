import { Container } from "./styles";
import { CardStyleType } from "./styles";

type StatsCardsProps = {
  title: string;
  icon: string;
  number?: number;
  total?: number;
  variant?: CardStyleType;
  onClick?: () => void;
};

export function StatsCard({ title, icon, number, total, variant = "neutral", onClick }: StatsCardsProps) {
  const porcetage = number && total? (number/total) * 100 : 0;

  return (
    <Container onClick={onClick} variant={variant}>
      <div>
        <h3>
            {title} {total && `(${porcetage.toFixed(2)}%)`}
        </h3>
        <p>{number == undefined? "-" : number}</p>
      </div>



      <i className="material-icons">{icon}</i>

    </Container>
  );
}