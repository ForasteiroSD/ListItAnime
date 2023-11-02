import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function NavItem({title, path, isSelected}) {
  return (
    <li>
      <Link to={path} className={isSelected && 'selected'}>{title}</Link>
      {isSelected && <motion.div className="highlight" layoutId="gioge" />}
    </li>
  );
}

export default NavItem;
