interface ICreateUserDTO {
  id?: string;
  nome: string;
  email: string;
  telefone: string;
  cargo: string;
  empresa: string;
  foto?: string;
}

export {  ICreateUserDTO };