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
  productNamePlaceholder: 'Enter a product name',
  makeOrder: 'Checkout',
  goBack: 'Go back',
  currency: 'GBP',
  price: 'Price',
  news: 'News',
  saveAndSend: 'save and send',
  reset: 'reset',
  table: {
    price: 'Unit price',
    num: 'No.',
    unitName: 'Name',
    minAmount: 'min. qty',
    inOrder: 'In order, qty',
    total: 'Total',
    totalPrice: 'Total, price',
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
    home: 'price list',
    news: 'news',
    admin: 'admin',
    'new orders': 'new orders',
    forClient: 'Route managed by client',
    forAdmin: 'Route managed by supplier'
  },
  units: {
    piece: ''
  },
  warnings: {
    errorMsg: 'Failed to place an order automatically',
    connectToUsMsg: 'Contact us by phone:'
  },
  'testing app explanation': 'This is a testing app. Password:'
} as const
