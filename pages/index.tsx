import type { NextPage } from 'next';
import InputForm from '../components/InputForm';
import styled from 'styled-components';

const Container = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;

    width: 360px;
    height: 432px;
    background-color: #fff;
    border-radius: 6px;
`;

const Index: NextPage = () => {
    return (
        <Container>
            <InputForm />
        </Container>
    );
};

export default Index;
