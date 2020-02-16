import React from 'react';

const Breadcrumbs = React.lazy(() => import('./views/Base/Breadcrumbs'));
const Cards = React.lazy(() => import('./views/Base/Cards'));
const Carousels = React.lazy(() => import('./views/Base/Carousels'));
const Collapses = React.lazy(() => import('./views/Base/Collapses'));
const Dropdowns = React.lazy(() => import('./views/Base/Dropdowns'));
const Forms = React.lazy(() => import('./views/Base/Forms'));
const Jumbotrons = React.lazy(() => import('./views/Base/Jumbotrons'));
const ListGroups = React.lazy(() => import('./views/Base/ListGroups'));
const Navbars = React.lazy(() => import('./views/Base/Navbars'));
const Navs = React.lazy(() => import('./views/Base/Navs'));
const Paginations = React.lazy(() => import('./views/Base/Paginations'));
const Popovers = React.lazy(() => import('./views/Base/Popovers'));
const ProgressBar = React.lazy(() => import('./views/Base/ProgressBar'));
const Switches = React.lazy(() => import('./views/Base/Switches'));
const Tables = React.lazy(() => import('./views/Base/Tables'));
const Tabs = React.lazy(() => import('./views/Base/Tabs'));
const Tooltips = React.lazy(() => import('./views/Base/Tooltips'));
const BrandButtons = React.lazy(() => import('./views/Buttons/BrandButtons'));
const ButtonDropdowns = React.lazy(() => import('./views/Buttons/ButtonDropdowns'));
const ButtonGroups = React.lazy(() => import('./views/Buttons/ButtonGroups'));
const Buttons = React.lazy(() => import('./views/Buttons/Buttons'));
const Charts = React.lazy(() => import('./views/Charts'));
const Dashboard = React.lazy(() => import('./views/Dashboard'));
const CoreUIIcons = React.lazy(() => import('./views/Icons/CoreUIIcons'));
const Flags = React.lazy(() => import('./views/Icons/Flags'));
const FontAwesome = React.lazy(() => import('./views/Icons/FontAwesome'));
const SimpleLineIcons = React.lazy(() => import('./views/Icons/SimpleLineIcons'));
const Alerts = React.lazy(() => import('./views/Notifications/Alerts'));
const Badges = React.lazy(() => import('./views/Notifications/Badges'));
const Modals = React.lazy(() => import('./views/Notifications/Modals'));
const Colors = React.lazy(() => import('./views/Theme/Colors'));
const Typography = React.lazy(() => import('./views/Theme/Typography'));
const Widgets = React.lazy(() => import('./views/Widgets/Widgets'));
const Users = React.lazy(() => import('./views/Users/Users'));
const User = React.lazy(() => import('./views/Users/User'));
const AddUser = React.lazy(() => import('./views/Users/AddUser'));
const Orders =  React.lazy(() => import('./views/Users/Orders'));
const Order = React.lazy(() => import('./views/Users/Order'));
const Media = React.lazy(() => import('./views/Media/Media'));
const AddMedia = React.lazy(() => import('./views/Media/AddMedia'));
const Category = React.lazy(() => import('./views/Shop/Category'));
const Brand = React.lazy(() => import('./views/Shop/Brand'));
const Scoring = React.lazy(() => import('./views/Shop/Scoring'));
const ScoringItem = React.lazy(() => import('./views/Shop/ScoringItem'));
const Specifications = React.lazy(() => import('./views/Shop/Specifications'));
const SubSpecifications = React.lazy(() => import('./views/Shop/SubSpecifications'));
const AddProduct  = React.lazy(() => import('./views/Products/AddProduct'));
const Products  = React.lazy(() => import('./views/Products/Products'));
const EditProduct  = React.lazy(() => import('./views/Products/EditProduct'));
const Seller  = React.lazy(() => import('./views/Products/Seller'));
const Warranty  = React.lazy(() => import('./views/Products/Warranty'));
const Comments = React.lazy(() => import('./views/Comments/Comments'));
const CommentInfo = React.lazy(() => import('./views/Comments/CommentInfo'));
const AllOrders = React.lazy(()=>import('./views/Orders/Orders'));
const OrderDetails = React.lazy(()=>import('./views/Orders/Order'));
// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  
  { path: '/dashboard', name: 'داشبورد', component: Dashboard },
  { path: '/theme', exact: true, name: 'Theme', component: Colors },
  { path: '/theme/colors', name: 'Colors', component: Colors },
  { path: '/theme/typography', name: 'Typography', component: Typography },
  { path: '/comments', exact: true, name: 'نظرات', component: Comments },
  { path: '/comments/comment/:commentid', exact: true, name: 'جزئیات نظر', component: CommentInfo },
  { path: '/shop', exact: true, name: 'امور فروشگاه', component: Category },
  { path: '/shop/category', exact: true, name: 'دسته بندی ها', component: Category },
  { path: '/shop/brand', exact: true, name: ' برند ها', component: Brand },
  { path: '/shop/scoring', exact: true, name: 'نحوه امتیاز دهی', component: Scoring },
  { path: '/shop/scoring/:scoringid', exact: true, name: ' معیار های نحوه امتیاز دهی ', component: ScoringItem },
  { path: '/shop/specifications', exact: true, name: 'مشخصات', component: Specifications },
  { path: '/shop/subSpecifications', exact: true, name: 'مشخصات', component: SubSpecifications },
  { path: '/base/cards', name: 'Cards', component: Cards },
  { path: '/base/forms', name: 'Forms', component: Forms },
  { path: '/base/switches', name: 'Switches', component: Switches },
  { path: '/base/tables', name: 'Tables', component: Tables },
  { path: '/base/tabs', name: 'Tabs', component: Tabs },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', component: Breadcrumbs },
  { path: '/base/carousels', name: 'Carousel', component: Carousels },
  { path: '/base/collapses', name: 'Collapse', component: Collapses },
  { path: '/base/dropdowns', name: 'Dropdowns', component: Dropdowns },
  { path: '/base/jumbotrons', name: 'Jumbotrons', component: Jumbotrons },
  { path: '/base/list-groups', name: 'List Groups', component: ListGroups },
  { path: '/base/navbars', name: 'Navbars', component: Navbars },
  { path: '/base/navs', name: 'Navs', component: Navs },
  { path: '/base/paginations', name: 'Paginations', component: Paginations },
  { path: '/base/popovers', name: 'Popovers', component: Popovers },
  { path: '/base/progress-bar', name: 'Progress Bar', component: ProgressBar },
  { path: '/base/tooltips', name: 'Tooltips', component: Tooltips },
  { path: '/buttons', exact: true, name: 'امور کاربران', component: Buttons },
  { path: '/buttons/buttons', name: 'Buttons', component: Buttons },
  { path: '/buttons/button-dropdowns', name: 'Button Dropdowns', component: ButtonDropdowns },
  { path: '/buttons/button-groups', name: 'Button Groups', component: ButtonGroups },
  { path: '/buttons/brand-buttons', name: 'Brand Buttons', component: BrandButtons },
  { path: '/products', exact: true, name: 'محصولات', component: AddProduct },
  { path: '/products/addproduct', exact: true, name: 'محصولات', component: AddProduct },
  { path: '/products/allproducts', exact: true, name: 'محصولات', component: Products },
  { path: '/products/seller', exact: true, name: 'فروشنده ها', component: Seller },
  { path: '/products/warranty', exact: true, name: 'گارانتی', component: Warranty },
  { path: '/products/product/:productid', exact: true, name: 'محصولات', component: EditProduct },
  { path: '/products/coreui-icons', name: 'CoreUI Icons', component: CoreUIIcons },
  { path: '/products/flags', name: 'Flags', component: Flags },
  { path: '/products/font-awesome', name: 'Font Awesome', component: FontAwesome },
  { path: '/products/simple-line-icons', name: 'Simple Line Icons', component: SimpleLineIcons },
  { path: '/orders', exact: true, name: 'مالی و فروش', component: Alerts },
  { path: '/orders/allorders', exact: true, name: 'سفارشات', component: AllOrders },
  { path: '/orders/detail/:orderNumber', exact: true, name: 'جزئیات سفارش', component: OrderDetails },
  { path: '/orders/alerts', name: 'Alerts', component: Alerts },
  { path: '/orders/badges', name: 'Badges', component: Badges },
  { path: '/orders/modals', name: 'Modals', component: Modals },
  { path: '/widgets', name: 'Widgets', component: Widgets },
  { path: '/charts', name: 'Charts', component: Charts },
  { path: '/users', exact: true,  name: 'کاربران', component: Users },
  { path: '/users/adduser', exact: true,  name: 'اضافه کردن کاربر', component: AddUser },
  { path: '/users/:id', exact: true, name: 'مشخصات کاربران', component: User },
  { path: '/users/orders/:userid', exact: true, name: 'سفارشات کاربر', component: Orders },
  { path: '/users/orders/:userid/order/:orderid', exact: true, name: ' جزئیات سفارش کاربر ', component: Order },
  { path: '/media/allmedia', exact: true, name: ' کتابخانه', component: Media },
  { path: '/media/addMedia', exact: true, name: ' افزودن', component: AddMedia },
  { path: '/media/font-awesome', name: 'Font Awesome', component: FontAwesome },
];

export default routes;
