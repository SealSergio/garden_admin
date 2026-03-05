import { FC } from "react";
import { Link } from "react-router-dom";
import "./Aside.scss";

export const Aside: FC = () => {
    return (
        <aside className="aside">
            <div className="aside__inner">
                <button className="aside-menu__btn aside__btn-close btn-reset">
                    Закрыть
                </button>
                <ul className="aside-menu">
                    <li className="aside-menu__item">
                    <Link to={"/products"}>
                        <button className="aside-menu__btn">
                            Изделия
                        </button>
                    </Link>
                    </li>
                    <li className="aside-menu__item">
                        <Link to={"/support"}>
                            <button className="aside-menu__btn aside-menu__btn--support">
                                Справка
                            </button>
                        </Link>
                    </li>
                </ul>
            </div>
        </aside> 
    )
}
