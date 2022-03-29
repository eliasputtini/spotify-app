import styled from 'styled-components/native';

const Image = styled.Image`
  height: 230px;
  width: 230px;
};`;

const ImageContainer = styled.View`
  height: 230px;
  width: 230px; 
  position: relative;
};`;

const Container = styled.SafeAreaView`
  background-color: #232323;
  flex: 1;
};`;

const Title = styled.Text`
  color: #e6eaee;
  font-family: 'Montserrat-Bold';
  font-size: 20px;
`;

const Header = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
  padding: 20px;
};`;

const HeaderContent = styled.View`
  flex: 1;
  padding-right: 20px;
};`;

const ScrollView = styled.ScrollView.attrs(() => ({
  contentContainerStyle: {
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
}))`
  flex: 1;
`;

const Section = styled.View`
  margin-top: 20px;
};`;

const SectionHeader = styled.Text`
  color: #ababab;
  font-size: 18px;
  font-family: 'Montserrat-Medium';
  text-transform: capitalize;
  margin-bottom: 8px;
};`;

export {
  Image,
  ImageContainer,
  Container,
  Header,
  HeaderContent,
  Title,
  ScrollView,
  Section,
  SectionHeader,
};
