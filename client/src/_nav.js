export default {
  items: [
    {
      name: 'داشبورد',
      url: '/dashboard',
      icon: 'icon-speedometer',
      
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
        }
      ],
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
        
      ],
    },
    
   
    
  ],
};
