import { ICommons } from "@utils/utils";

export default function Header({ children }: ICommons) {
  return (
    <header className="header">
      <h1 className="header_icon"></h1>
      <h1 className="header__title">
        Dev Tasks
      </h1>
      {children || <h1 className="header_icon"></h1>}
    </header>
  )
}