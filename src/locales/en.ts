export default {
  save: 'Save',
  clientName: 'Client',
  phone: 'Phone',
  time: 'Time',
  address: 'Address',
  comment: 'Comment',
  commentPlaceholder: 'Comments on the order (optional)',
  namePlaceholder: 'Your name',
  phonePlaceholder: 'Your phone',
  makeOrder: 'Checkout',
  goBack: 'Go back',
  currency: 'GBP',
  price: 'Price',
  news: 'News',
  table: {
    price: 'Unit price',
    num: 'No.',
    unitName: 'Name',
    minAmount: 'min. qty',
    inOrder: 'In order, qty',
    total: 'Total',
    superTotal: 'TOTAL:',
    title: 'Title',
    subTitle: 'Subtitle',
    text: 'Text',
    link: 'Link',
    linkTxt: 'Link text'
  },
  newOrderModal: {
    header: 'Your order has been prepared',
    msg: 'Enter your name, phone and address number',
    successMsg: 'Your order have been prepared!<br>We\'ll call you back.'
  },
  admin: {
    passwordPlaceholder: 'Enter the password',
    enter: 'Submit'
  },
  routes: {
    home: 'home',
    news: 'news',
    admin: 'admin',
    'new orders': 'new orders',
  },
  units: {
    piece: ''
  },
  warnings: {
    errorMsg: 'Failed to place an order automatically',
    connectToUsMsg: 'Contact us by phone:'
  }
} as const
