export default {
  save: 'Сохранить',
  clientName: 'Имя',
  phone: 'Телефон',
  time: 'Время',
  address: 'Адрес',
  comment: 'Комментарий',
  commentPlaceholder: 'Комментарии к заказу(не обязательно)',
  namePlaceholder: 'Ваше имя',
  phonePlaceholder: 'Ваш телефон',
  productNamePlaceholder: 'Введите название продукта',
  makeOrder: 'Оформить заказ',
  goBack: 'Вернуться',
  currency: 'руб',
  price: 'Прайс',
  news: 'Новости',
  saveAndSend: 'сохранить и отправить',
  reset: 'сбросить',
  table: {
    price: 'Цена, шт.',
    num: '№',
    unitName: 'Название',
    minAmount: 'Мин. кол-во',
    inOrder: 'В заказе, шт',
    total: 'Итого',
    totalPrice: 'Итого, цена',
    title: 'Заголовок',
    subTitle: 'Подзаголовок',
    text: 'Текст',
    link: 'Ссылка',
    linkTxt: 'Текст ссылки'
  },
  newOrderModal: {
    header: 'Ваш заказ подготовлен',
    msg: 'Введите ваше имя, телефон и адрес',
    successMsg: 'Ваш заказ отправлен!<br>Мы вам перезвоним.'
  },
  admin: {
    passwordPlaceholder: 'Введите пароль',
    enter: 'Войти'
  },
  routes: {
    home: 'прайс-лист',
    news: 'новости',
    admin: 'админ',
    'new orders': 'новые заказы',
    forClient: 'Раздел для клиента',
    forAdmin: 'Раздел для администратора'
  },
  units: {
    piece: 'шт'
  },
  warnings: {
    errorMsg: 'Не удалось оформить заказ автоматически',
    connectToUsMsg: 'Свяжитесь с нами по телефону:'
  }
} as const
