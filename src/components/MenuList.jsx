import { Menu } from 'antd'
import { dashboard_sidebar_link } from '../assets/navigation'
import { Link } from 'react-router-dom';
export const MenuList = () => {

  
  return (
    <Menu mode='inline' className='flex flex-col text-base gap-3'>
      {dashboard_sidebar_link.map(item => (
        item.subitems ? (
          <Menu.SubMenu key={item.key} icon={item.icon} title={item.label}>
            {item.subitems.map(subItem => (
              <Menu.Item key={subItem.key}>
                <Link to={subItem.path}>{subItem.label}</Link>
                {/* {subItem.label} */}
              </Menu.Item>
            ))}
          </Menu.SubMenu>
        ) : (
          <Menu.Item key={item.key} icon={item.icon}>
              <Link to={item.path}>{item.label}</Link>
          </Menu.Item>
        )
      ))}
    </Menu>
  )
}
