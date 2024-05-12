import { Typography } from 'antd';

const { Title, Text } = Typography;

const MainTitle = () => {
    return (
        <>
            <Title class-name="welcome-hero">The Canine Shelter</Title>
            <Text type='success'>You can’t change a dog’s past, but you could rewrite his future.</Text>
        </>
    )
}

export default MainTitle