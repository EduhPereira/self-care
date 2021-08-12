import { Container, ContentCategory, Cards, Card } from "./styles";

export const Habits = () => {
    const test = {
        results: [
            {
                category: "Todas"
                
            },
            {
                category: "Entreterimento"
            },

            {
                category: "Leitura"
            }

        ]
    }


  return (
    <Container>
      <ContentCategory>
        <h3>Categorias</h3>
        <select name="select">
        {test.results.map((el)=>{
                return <option key={el.category} value={el.category}>{el.category}</option>
            })}
          
        </select>
      </ContentCategory>

      <Cards>
            <Card>
                Card aqui
            </Card>
      </Cards>


    </Container>
  );
};
