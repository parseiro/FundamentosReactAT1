import './App.css';
import {Button, Card, Footer, Label, TextInput} from "flowbite-react";
import {useState} from "react";

export default function App() {
  const [estado, setEstado] = useState({peso: '70', altura: '1,70'});
  const [imc, setImc] = useState({estado: 'aguardando', valor: null, erro: null});

  const handleChange = ({target: {id, value}}) => {
    setEstado({...estado, [id]: value});
    setImc({estado: 'aguardando', valor: null, avaliacao: null});
  };

  return (
    <>
      <main className="flex flex-col items-center justify-center">
        <form
          className="flex flex-col gap-4 max-w-md"
          onSubmit={e => {
            e.preventDefault();

            const altura = parseFloat(estado.altura.replace(',', '.'));
            const peso = parseFloat(estado.peso.replace(',', '.'));

            const valor = peso / (altura * altura);
            if (isNaN(altura) || isNaN(peso) || isNaN(valor)) {
              setImc({
                estado: 'erro',
                erro: 'Erro: não foi possível calcular o IMC',
              });
              return;
            }

            let avaliacao;
            if (valor < 18.5) {
              avaliacao = 'Magreza';
            } else if (valor < 25) {
              avaliacao = 'Peso normal';
            } else if (valor < 30) {
              avaliacao = 'Sobrepeso (obesidade grau I)';
            } else if (valor < 40) {
              avaliacao = 'Obesidade (grau II)';
            } else {
              avaliacao = 'Obesidade grave (grau III)';
            }

            setImc({
              estado: 'pronto',
              valor,
              avaliacao,
            });
          }}
        >
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="peso"
                value="Seu peso em quilos (apenas número)"
              />
            </div>
            <TextInput
              id="peso"
              type="text"
              placeholder="70"
              value={estado.peso}
              required={true}
              onChange={handleChange}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="altura"
                value="Sua altura em metros"
              />
            </div>
            <TextInput
              id="altura"
              type="text"
              placeholder="1,50"
              value={estado.altura}
              required={true}
              onChange={handleChange}
            />
          </div>
          <Button type="submit">
            Calcular
          </Button>
        </form>
        {imc.estado === 'pronto' && (
          <Card href="#">
            <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Seu IMC é {imc.valor.toFixed(2).replace('.', ',')}
            </h2>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              Avaliação: {imc.avaliacao}
            </p>
          </Card>
        )}
        {imc.estado === 'erro' && (
          <Card href="#">
            <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {imc.erro}
            </h2>
          </Card>
        )}
      </main>
      <Footer container={true}>
        <Footer.Copyright
          href="https://parseiro.github.io"
          by="Leonardo Vilela Pinheiro"
          year={2023}
        />
      </Footer>
    </>
  );
}
