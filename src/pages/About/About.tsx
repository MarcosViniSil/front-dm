import { Card, Typography, List } from 'antd';

const { Title, Paragraph } = Typography;

const items = [
  'justificativa 1',
  'justificativa 2',
  'justificativa 3',
  'justificativa 4',
];

function About() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', padding: '2rem 1rem' }}>
      <Title level={2} style={{ textAlign: 'center' }}>Sobre o projeto</Title>

      <Card style={{ width: '100%', maxWidth: 800 }}>
        <Paragraph type="secondary">
          Descrição do projeto
        </Paragraph>

        <List
          dataSource={items}
          renderItem={(item) => (
            <List.Item style={{ borderBottom: 'none', padding: '6px 0' }}>
              <span style={{ marginRight: 8 }}>🌱</span>
              {item}
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
}

export default About;
