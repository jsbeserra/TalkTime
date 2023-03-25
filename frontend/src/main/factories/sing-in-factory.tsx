import React from 'react'
import SignInUseCase from '../../aplication/usecase/sign-in/sign-in';
import SignGateway from '../../infra/gateways/sign/sign-gateway';
import AxiosAdapter from '../../infra/http/http-axios-adpter';
import SingIn from '../../presentation/pages/sing-in/components/sing-in';
import { environment } from '../config/config';

const MakeSingIn: React.FC = () => {
  const axiosAdapter =  new AxiosAdapter(environment.API_AUTH)
  const signGateway = new SignGateway(axiosAdapter)
  const signInUseCase = new SignInUseCase(signGateway)
  return <SingIn signInUseCase={signInUseCase} />;
}

export default MakeSingIn;