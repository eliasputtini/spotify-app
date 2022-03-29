import styled from 'styled-components/native';

const Container = styled.View` 
position: absolute;
width: 230px;
height: 230px;
 align-items: center;
  justify-content: center;
};`;

const Icon = styled.Text`
  color: white;
  font-size: 20px;
  height: 230px;
  width: 230px;
  line-height: 260px;
  text-align: center;
  text-shadow-color: rgba(0, 0, 0, 0.75);
  text-shadow-offset: {width: 0, height: 0};
  text-shadow-radius: 8px;
};`;

export {Icon, Container};
