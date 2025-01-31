import { ICommons } from "@utils/utils";
interface IHeader extends ICommons {
  title: string
}
export default function Header({ children, title }: IHeader) {
  return (
    <header className="header">
      <h1 className="header_icon"></h1>
      <h1 className="header__title">
        {title}
      </h1>
      {children || <h1 className="header_icon"></h1>}
    </header>
  )
}