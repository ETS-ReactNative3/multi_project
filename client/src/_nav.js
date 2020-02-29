export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info',
        text: 'NEW',
      },
    },
    {
      name: 'Colors',
      url: '/theme/colors',
      icon: 'icon-drop',
    },
    {
      name: 'Typography',
      url: '/theme/typography',
      icon: 'icon-pencil',
    },
    {
      name: 'اسلایدر',
      url: '/slider',
      icon: 'icon-pencil',
    },
    {
      name: 'بنر',
      url: '/banner',
      icon: 'icon-pencil',
    },
    {
      name: 'نظرات',
      url: '/comments',
      icon: 'icon-puzzle',
    },
    {
      name: 'رسانه',
      url: '/media',
      icon: 'icon-puzzle',
      children: [
        {
          name: 'کتابخانه',
          url: '/media/allmedia',
          icon: 'icon-puzzle',
        },
        {
          name: 'افزودن',
          url: '/media/addMedia',
          icon: 'icon-puzzle',
        },
        {
          name: 'Font Awesome',
          url: '/media/font-awesome',
          icon: 'icon-star',
          badge: {
            variant: 'secondary',
            text: '4.7',
          },
        },
      ],
    },
    
    {
      name: 'امور فروشگاه',
      url: '/shop',
      icon: 'icon-puzzle',
      children: [
        {
          name: 'دسته بندی ها',
          url: '/shop/category',
          icon: 'icon-puzzle',
        },
        {
          name: ' برندها',
          url: '/shop/brand',
          icon: 'icon-puzzle',
        },
        {
          name: 'نحوه امتیاز دهی',
          url: '/shop/scoring',
          icon: 'icon-puzzle',
        },
        {
          name: 'مشخصات',
          url: '/shop/specifications',
          icon: 'icon-puzzle',
        },
        {
          name: ' ریز مشخصات',
          url: '/shop/subSpecifications',
          icon: 'icon-puzzle',
        },
        {
          name: 'Breadcrumbs',
          url: '/base/breadcrumbs',
          icon: 'icon-puzzle',
        },
        {
          name: 'Cards',
          url: '/base/cards',
          icon: 'icon-puzzle',
        },
        {
          name: 'Carousels',
          url: '/base/carousels',
          icon: 'icon-puzzle',
        },
        {
          name: 'Collapses',
          url: '/base/collapses',
          icon: 'icon-puzzle',
        },
        {
          name: 'Dropdowns',
          url: '/base/dropdowns',
          icon: 'icon-puzzle',
        },
        {
          name: 'Forms',
          url: '/base/forms',
          icon: 'icon-puzzle',
        },
        {
          name: 'Jumbotrons',
          url: '/base/jumbotrons',
          icon: 'icon-puzzle',
        },
        {
          name: 'List groups',
          url: '/base/list-groups',
          icon: 'icon-puzzle',
        },
        {
          name: 'Navs',
          url: '/base/navs',
          icon: 'icon-puzzle',
        },
        {
          name: 'Paginations',
          url: '/base/paginations',
          icon: 'icon-puzzle',
        },
        {
          name: 'Popovers',
          url: '/base/popovers',
          icon: 'icon-puzzle',
        },
        {
          name: 'Progress Bar',
          url: '/base/progress-bar',
          icon: 'icon-puzzle',
        },
        {
          name: 'Switches',
          url: '/base/switches',
          icon: 'icon-puzzle',
        },
        {
          name: 'Tables',
          url: '/base/tables',
          icon: 'icon-puzzle',
        },
        {
          name: 'Tabs',
          url: '/base/tabs',
          icon: 'icon-puzzle',
        },
        {
          name: 'Tooltips',
          url: '/base/tooltips',
          icon: 'icon-puzzle',
        },
      ],
    },
    {
      name: 'امور کاربران',
      url: '/buttons',
      icon: 'icon-cursor',
      children: [
        {
          name: 'پرونده کاربران',
          url: '/users',
          icon: 'icon-cursor',
        },
        {
          name: 'اضافه کردن کاربر ',
          url: '/users/adduser',
          icon: 'icon-cursor',
        },
        {
          name: 'Buttons',
          url: '/buttons/buttons',
          icon: 'icon-cursor',
        },
        {
          name: 'Button dropdowns',
          url: '/buttons/button-dropdowns',
          icon: 'icon-cursor',
        },
        {
          name: 'Button groups',
          url: '/buttons/button-groups',
          icon: 'icon-cursor',
        },
        {
          name: 'Brand Buttons',
          url: '/buttons/brand-buttons',
          icon: 'icon-cursor',
        },
      ],
    },
    {
      name: 'Charts',
      url: '/charts',
      icon: 'icon-pie-chart',
    },
    {
      name: 'محصولات',
      url: '/products',
      icon: 'icon-star',
      children: [
        {
          name: 'همه محصولات',
          url: '/products/allproducts',
          icon: 'icon-star',
        },
        {
          name: 'اضافه کردن محصول',
          url: '/products/addproduct',
          icon: 'icon-star',
        },
        {
          name: 'فروشنده ها',
          url: '/products/seller',
          icon: 'icon-star',
        },
        {
          name: 'گارانتی',
          url: '/products/warranty',
          icon: 'icon-star',
        },
        
      ],
    },
    {
      name: 'مالی و فروش',
      url: '/orders',
      icon: 'icon-bell',
      children: [
        {
          name: 'سفارشات',
          url: '/orders/allorders',
          icon: 'icon-bell',
        },
        {
          name: 'وضعیت سفارشات',
          url: '/orders/status',
          icon: 'icon-bell',
        },
        {
          name: 'Alerts',
          url: '/orders/alerts',
          icon: 'icon-bell',
        },
        {
          name: 'Badges',
          url: '/orders/badges',
          icon: 'icon-bell',
        },
        {
          name: 'Modals',
          url: '/orders/modals',
          icon: 'icon-bell',
        },
      ],
    },
    {
      name: 'Widgets',
      url: '/widgets',
      icon: 'icon-calculator',
      badge: {
        variant: 'info',
        text: 'NEW',
      },
    },
    {
      divider: true,
    },
    {
      title: true,
      name: 'اضافی',
    },
    {
      name: 'صفحات',
      url: '/pages',
      icon: 'icon-star',
      children: [
        {
          name: 'Login',
          url: '/login',
          icon: 'icon-star',
        },
        {
          name: 'Register',
          url: '/register',
          icon: 'icon-star',
        },
        {
          name: 'Error 404',
          url: '/404',
          icon: 'icon-star',
        },
        {
          name: 'Error 500',
          url: '/500',
          icon: 'icon-star',
        },
      ],
    },
    {
      name: 'Disabled',
      url: '/dashboard',
      icon: 'icon-ban',
      attributes: { disabled: true },
    },
    
  ],
};
