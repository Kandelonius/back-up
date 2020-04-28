import styled from 'styled-components'

const Div = styled.div`
    display:flex;
    flex-direction: column;
    height:700px;
    width: 700px;
    margin: 2% auto;
    padding: 1%;
    border: 3px solid orange;

    header{
        background-color: orange;
        display:flex;
        justify-content:center;
        width:100%;
    }

    img{
        border: 1px solid orange;
        width:98%;
        margin:2% auto;
    }
`

export default Div