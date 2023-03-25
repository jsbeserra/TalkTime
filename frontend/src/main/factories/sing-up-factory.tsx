import React from 'react';
import SingUpUseCase from '../../aplication/usecase/sign-up/sign-up';
import SignGateway from '../../infra/gateways/sign/sign-gateway';
import AxiosAdapter from '../../infra/http/http-axios-adpter';
import SignUp from '../../presentation/pages/sing-in/components/sing-up';
import { environment } from '../config/config';

const MakeSingUp: React.FC = () => {
  const axiosAdapter =  new AxiosAdapter(environment.API_AUTH)
  const signGateway = new SignGateway(axiosAdapter)
  const singUpUseCase = new SingUpUseCase(signGateway)
  return <SignUp signUpUseCase={singUpUseCase} />;
}

export default MakeSingUp;