interface IErrorValidation{
  value:number
}

const ErrorValidation:React.FC<IErrorValidation> =  ({value}) => {
  return (
    <span className="error-message">Превышен лимит текста задачи на {value} символов</span>
  )
}

export default ErrorValidation