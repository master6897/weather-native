import React from "react";
import { View } from "react-native-web";
import styled, {keyframes} from "styled-components/native";

const StyledDiv = styled.View`
    width: 100%;
    height: 100%;
    position: absolute;
    top:0;
    left:0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`
const StyledCircle = styled.View`
    position: relative;
    width: 80px;
    height: 80px;
`
const StyledTitle = styled.Text`
    color: white;
    font-size: 20;
`
function LoadingWindow(){
    return(
        <StyledDiv>
            <StyledTitle>Loading...</StyledTitle>
        </StyledDiv>
    )
}

export default LoadingWindow;