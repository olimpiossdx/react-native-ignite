import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';

import { SignInSocialButton } from '../../components/SignInSocialButton';

import { Container, Header, TitleWrapper, Title, SignInTitle, Footer, FooterWrapper } from './styles';

import AppleSvg from '../../assets/apple.svg';
import GoogleSvg from '../../assets/google.svg';
import LogoSvg from '../../assets/logo.svg';
import { useAuth } from '../../hooks/auth';
import { Alert } from 'react-native';

export function SignIn() {
  const { signInWithGoogle } = useAuth();

  async function hanldeSignInWithGoogle() {
    try {
      await signInWithGoogle();
    } catch (error: any) {
      console.error(`screen:SignI\nmétodo:hanldeSignInWithGoogle\nerror:`, error);
      Alert.alert('Não foi possível conectar a conta Google.');
    }
  };

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg width={RFValue(120)} height={RFValue(68)} />
          <Title>
            Controle suas {'\n'}
            finanças de forma {'\n'}
            muito simples
          </Title>
        </TitleWrapper>
        <SignInTitle>
          Faça seu login com {'\n'}
          uma das contas abaixo
        </SignInTitle>
      </Header>
      <Footer>
        <FooterWrapper>

          <SignInSocialButton title='Entrar com google' svg={GoogleSvg} onPress={hanldeSignInWithGoogle} />
          <SignInSocialButton title='Entrar com apple' svg={AppleSvg} />

        </FooterWrapper>
      </Footer>
    </Container>
  )
}
