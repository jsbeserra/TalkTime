import React from 'react'
import SignInUseCase from '../../aplication/usecase/sign-in';
import SignGateway from '../../infra/gateways/sign/sign-gateway';
import AxiosAdapter from '../../infra/http/http-axios-adpter';
import SingIn from '../../presentation/pages/sing-in/sing-in'

const MakeSingIn: React.FC = () => {
  const axiosAdapter =  new AxiosAdapter()
  const signGateway = new SignGateway(axiosAdapter)
  const signInUseCase = new SignInUseCase(signGateway)
  return <SingIn signInUseCase={signInUseCase} />;
}

export default MakeSingIn;