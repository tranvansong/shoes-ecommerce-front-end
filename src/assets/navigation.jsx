import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import StackedLineChartOutlinedIcon from '@mui/icons-material/StackedLineChartOutlined';
const iconStyle = { fontSize: '24px' };
export const dashboard_sidebar_link = [
    {
        key: "dashboard",
        label: "Dashboard",
        path: "/admin/dashboard",
        icon: <DashboardOutlinedIcon style={iconStyle}/>
    },
    {
        key: "product",
        label: "Product",
        path: "/admin/products",
        icon: <ShoppingCartOutlinedIcon style={iconStyle} />,
        subitems: [
            {
                key: "list-product",
                label: "List Product",
                path: "/admin/products"
            },
            {
                key: "new-product",
                label: "New Product",
                path: "/admin/products/new"
            }
        ]
    },
    {
        key: "category",
        label: "Category",
        path: "/categories",
        icon: <CategoryOutlinedIcon style={iconStyle}/>,
        subitems: [
            {
                key: "list-category",
                label: "List Category",
                path: "/admin/categories"
            },
            {
                key: "new-category",
                label: "New Category",
                path: "/admin/categories/new"
            }
        ]
    },
    {
        key: "brand",
        label: "Brand",
        path: "/admin/brands",
        icon: <Inventory2OutlinedIcon style={iconStyle} />,
        subitems: [
            {
                key: "list-brand",
                label: "List Brand",
                path: "/admin/brands"
            },
            {
                key: "new-brand",
                label: "New Brand",
                path: "/admin/brands/new"
            }
        ]
    },
    {
        key: "order",
        label: "Order",
        path: "/admin/orders",
        icon: <LocalMallOutlinedIcon style={iconStyle}/>,
        subitems: [
            {
                key: "list-order",
                label: "List Order",
                path: "/orders"
            },
            {
                key: "new-order",
                label: "New Order",
                path: "/admin/orders/new"
            }
        ]
    },
    {
        key: "user",
        label: "User",
        path: "/admin/users",
        icon: <PersonOutlineOutlinedIcon style={iconStyle}/>,
        subitems: [
            {
                key: "list-user",
                label: "List User",
                path: "/admin/users"
            },
            {
                key: "list-admin",
                label: "List Admin",
                path: "/admin/users/admins"
            },
            {
                key: "new-user",
                label: "New User",
                path: "/admin/users/new"
            },
            {
                key: "new-admin",
                label: "New Admin",
                path: "/admin/users/admins/new"
            }
        ]
    },
    {
        key: "role",
        label: "Roles",
        path: "/admin/roles",
        icon: <AssignmentIndOutlinedIcon style={iconStyle} />,
        subitems: [
            {
                key: "list-role",
                label: "List Role",
                path: "/admin/roles"
            },
            {
                key: "new-role",
                label: "New Role",
                path: "/admin/roles/new"
            }
        ]
    },
    {
        key: "statistic",
        label: "Statistic",
        path: "/admin/statistic",
        icon: <StackedLineChartOutlinedIcon style={iconStyle} />
    }
];