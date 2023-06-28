import { Coffee } from '../ui/icons/coffee'
import { FiitSticks } from '../ui/icons/fiit-sticks'
import { HeetSticks } from '../ui/icons/heet-sticks'

export const quizData = [
  {
    id: '1',
    question: 'Что дороже?',
    answers: [
      {
        id: 'a',
        icon: Coffee,
        text: 'Кофейная чашка',
        isTrue: true,
      },
      {
        id: 'b',
        icon: HeetSticks,
        text: 'HEETS\nпачка стиков',
        wrongText: 'Пачка HEETS стоит 180 ₽ *',
        subWrongText:
          '*Цена в фирменных магазинах Q STORE и в ряде магазинов-партнеров Q PARTNER',
      },
      {
        id: 'c',
        icon: FiitSticks,
        text: 'Fiit\nпачка стиков',
        wrongText: 'Пачка Fiit стоит 160 ₽ *',
        subWrongText:
          '*Цена в фирменных магазинах Q STORE и в ряде магазинов-партнеров Q PARTNER',
      },
    ],
  },
  {
    id: '2',
    question: 'Что д?',
    answers: [
      {
        id: '1',
        icon: Coffee,
        text: 'Кофейная чашка',
        isTrue: true,
      },
      {
        id: '2',
        icon: Coffee,
        text: 'HEETS пачка стиков',
      },
      {
        id: '3',
        icon: Coffee,
        text: 'Fiit пачка стиков',
      },
    ],
  },
]
